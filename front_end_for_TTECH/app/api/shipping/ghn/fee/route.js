import {
	GHN_COD_FAILED,
	GHN_INSURANCE,
	GHN_LIGHT_SERVICE,
	GHN_SHOP_ID,
	GHN_TOKEN,
} from "@/lib/utils/shipping/ghn"
import { SMARTPHONE_SIZE } from "@/lib/utils/shipping/product-size"
import { NextResponse } from "next/server"

export async function POST(request) {
	try {
		const {
			fromDistrictId,
			fromWardCode,
			toDistrictId,
			toWardCode,
			// cartLineItems = [],
		} = await request.json()

		const cartLineItems = [
			{ product: { name: "IPhone Test 1" }, quantity: 1 },
			{ product: { name: "IPhone Test 2" }, quantity: 2 },
		]

		// Prepare parameters
		let ghnLength = 0
		let ghnWidth = 0
		let ghnHeight = 0
		let ghnWeight = 0
		const ghnLineItems = []

		for (const cli of cartLineItems) {
			const quantity = cli.quantity

			ghnWeight += SMARTPHONE_SIZE.weight_gram * quantity
			ghnHeight += SMARTPHONE_SIZE.height_cm * quantity
			ghnLength = SMARTPHONE_SIZE.length_cm
			ghnWidth = SMARTPHONE_SIZE.width_cm

			ghnLineItems.push({
				name: cli.product.name,
				quantity: quantity,
				length: SMARTPHONE_SIZE.length_cm,
				width: SMARTPHONE_SIZE.width_cm,
				height: SMARTPHONE_SIZE.height_cm,
				weight: SMARTPHONE_SIZE.weight_gram,
			})
		}

		// Prepare Request Body
		const requestBody = JSON.stringify({
			from_district_id: parseInt(fromDistrictId),
			from_ward_code: fromWardCode,

			to_district_id: parseInt(toDistrictId),
			to_ward_code: toWardCode,

			service_id: parseInt(GHN_LIGHT_SERVICE.service_id),
			service_type_id: null,

			length: ghnLength,
			width: ghnWidth,
			height: ghnHeight,
			weight: ghnWeight,

			insurance_value: GHN_INSURANCE,
			cod_failed_amount: GHN_COD_FAILED,
			coupon: null,
			items: ghnLineItems,
		})

		// Send request to GHN API
		console.log("Sending GHN Calc Shipping Fee API...")
		console.log(requestBody)

		const response = await fetch(
			"https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Token: GHN_TOKEN,
					ShopId: GHN_SHOP_ID,
				},
				body: requestBody,
			}
		)

		const body = await response.json()
		console.log("GHN Fee Response:", body)

		return Response.json(body)
	} catch (error) {
		console.error("Call GHN Fee API Error:", error)
		return NextResponse.json(
			{
				message: "Call GHN Fee API Error",
				error:
					error?.message ||
					"Lỗi gọi API tính phí vận chuyển của GHN",
			},
			{ status: 500 }
		)
	}
}
