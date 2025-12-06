import {
	GHN_DEV_BE,
	GHN_SHOP_ID,
	GHN_TOKEN,
} from "@/lib/utils/shipping/ghn"
import { NextResponse } from "next/server"

export async function GET(request, { params }) {
	try {
		const { parcelCode } = params

		// Validate
		if (!parcelCode) {
			return NextResponse.json(
				{
					code: 400,
					message: "Thiếu mã bưu kiện",
					data: null,
				},
				{ status: 400 }
			)
		}

		// Send the request to GHN API
		const ghnBody = {
			order_code: parcelCode,
		}

		console.log("Sending GHN Get Tracking Logs API...")
		console.log("Body: ", ghnBody)

		const rawResponse = await fetch(
			`${GHN_DEV_BE}/order-tracking/public-api/client/tracking-logs`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Token: GHN_TOKEN,
					ShopId: GHN_SHOP_ID,
				},
				body: JSON.stringify(ghnBody),
			}
		)

		const ghnResponse = await rawResponse.json()
		console.log("GHN Tracking Logs Response:", ghnResponse)

		const {
			code,
			data,
			code_message_value = "Lỗi của GHN đang được khắc phục",
			message_display = "Thành công lấy lịch sử vận chuyển của GHN",
		} = ghnResponse

		if (code !== 200) {
			return Response.json(
				{
					code,
					message: code_message_value,
				},
				{ status: 400 }
			)
		}

		// Send response to Next Client
		const trackingLogs = data.tracking_logs.map((log) => ({
			orderCode: log.order_code,
			status: log.status,
			statusName: log.status_name,
			location: {
				address: log.location.address,
				wardCode: log.location.ward_code,
				districtId: log.location.district_id,
				warehouseId: log.location.warehouse_id,
			},
			executor: {
				clientId: log.executor.client_id,
				name: log.executor.name,
				phone: log.executor.phone,
			},
			actionAt: log.action_at,
		}))

		return Response.json({
			code,
			message: message_display,
			data: {
				trackingLogs,
			},
		})
	} catch (error) {
		console.error("GHN Tracking Logs API/R Error:", error)
		return NextResponse.json(
			{
				code: 500,
				message: "Lỗi phần mềm đang được khắc phục",
			},
			{ status: 500 }
		)
	}
}
