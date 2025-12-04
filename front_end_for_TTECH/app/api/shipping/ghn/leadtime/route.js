import {
	GHN_LIGHT_SERVICE,
	GHN_SHOP_ID,
	GHN_TOKEN,
} from "@/lib/utils/shipping/ghn"
import { TTECH_PICKUP_DAYS } from "@/lib/utils/shipping/ttech"
import { NextResponse } from "next/server"

export async function POST(request) {
	try {
		const {
			fromDistrictId,
			fromWardCode,
			toDistrictId,
			toWardCode,
		} = await request.json()

		// Get credentials
		const token = GHN_TOKEN
		const shopId = GHN_SHOP_ID
		const serviceId = GHN_LIGHT_SERVICE.service_id

		if (!token || !shopId || !serviceId) {
			return NextResponse.json(
				{
					message: "Missing GHN credentials",
				},
				{ status: 500 }
			)
		}

		const requestBody = JSON.stringify({
			from_district_id: parseInt(fromDistrictId),
			from_ward_code: fromWardCode,
			to_district_id: parseInt(toDistrictId),
			to_ward_code: toWardCode,
			service_id: parseInt(serviceId),
		})

		console.log("Sending GHN lead time API...")

		const response = await fetch(
			"https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/leadtime",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Token: token,
					ShopId: shopId,
				},
				body: requestBody,
			}
		)

		const body = await response.json()

		console.log("GHN Response:")
		console.log(body)

		// Process leadtime_order dates if success
		if (body.code === 200 && body.data?.leadtime_order) {
			const { from_estimate_date, to_estimate_date } =
				body.data.leadtime_order

			const fromDate = new Date(from_estimate_date)
			const toDate = new Date(to_estimate_date)

			// Plus pickup days (in milliseconds)
			const oneDayMs = TTECH_PICKUP_DAYS * 24 * 60 * 60 * 1000
			fromDate.setTime(fromDate.getTime() + oneDayMs)
			toDate.setTime(toDate.getTime() + oneDayMs)

			// Format to GMT+7 (Vietnam timezone)
			const options = {
				timeZone: "Asia/Ho_Chi_Minh",
				year: "numeric",
				month: "2-digit",
				day: "2-digit",
				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit",
			}

			body.data.leadtime_order.from_estimate_date_vn =
				fromDate.toLocaleString("en-US", options)
			body.data.leadtime_order.to_estimate_date_vn =
				toDate.toLocaleString("en-US", options)
			body.data.leadtime_order.from_estimate_date_iso =
				fromDate.toISOString()
			body.data.leadtime_order.to_estimate_date_iso =
				toDate.toISOString()

			return Response.json(body)
		} else {
			return NextResponse.json(
				{
					message: "Call GHN API Error",
					error: "Status is failed or data is empty",
				},
				{ status: 500 }
			)
		}
	} catch (error) {
		console.error("Call Leadtime GHN API Error:", error)
		return NextResponse.json(
			{
				message: "Call Leadtime GHN API Error",
				error: error.message,
			},
			{ status: 500 }
		)
	}
}
