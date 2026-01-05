import {
	GHN_V2_PUBLIC_API,
	GHN_SHOP_ID,
	GHN_TOKEN,
} from "@/lib/utils/shipping/ghn"
import { NextResponse } from "next/server"

export async function DELETE(request, { params }) {
	try {
		const { parcelCode } = params

		// Validate
		if (!parcelCode) {
			return NextResponse.json(
				{
					success: false,
					error: "Thiếu mã bưu kiện",
				},
				{ status: 400 }
			)
		}

		// Send the api to GHN
		const ghnBody = {
			order_codes: [parcelCode],
		}

		console.log("Sending GHN Cancel Parcel API...")
		console.log("GHN Body: ", ghnBody)

		const rawRes = await fetch(
			`${GHN_V2_PUBLIC_API}/switch-status/cancel`,
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

		const ghnRes = await rawRes.json()
		console.log("GHN Response:", ghnRes)

		// Send response to Next Client
		if (ghnRes.code !== 200) {
			return Response.json(
				{
					success: false,
					error:
						ghnRes.message || "Lỗi của GHN đang được khắc phục",
				},
				{ status: 400 }
			)
		}

		const cancelResult = ghnRes.data[0]
		if (!cancelResult.result) {
			return Response.json(
				{
					success: false,
					error:
						cancelResult.message || "Không thể hủy bưu kiện",
				},
				{ status: 400 }
			)
		}

		return Response.json({
			success: true,
		})
	} catch (error) {
		console.error("GHN Cancel Parcel API/R Error:", error)
		return NextResponse.json(
			{
				success: false,
				error: "Lỗi phần mềm đang được khắc phục",
			},
			{ status: 500 }
		)
	}
}
