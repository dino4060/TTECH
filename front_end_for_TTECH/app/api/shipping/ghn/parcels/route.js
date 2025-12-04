import { findFullAddress } from "@/lib/utils/shipping/address"
import {
	GHN_INSURANCE,
	GHN_LIGHT_SERVICE,
	GHN_REQUIRED_NOTE_ENUM,
	GHN_SHOP_ID,
	GHN_TOKEN,
	GHN_V2_PUBLIC_API,
} from "@/lib/utils/shipping/ghn"
import { SMARTPHONE_SIZE } from "@/lib/utils/shipping/product-size"
import { NextResponse } from "next/server"

export async function POST(request) {
	try {
		const {
			fromAddress: fromAddr,
			toAddress: toAddr,
			order,
		} = await request.json()

		// Prepare fields
		const fromFullAddr = findFullAddress(fromAddr, "kho hàng")
		if (!fromFullAddr) return

		const toFullAddr = findFullAddress(toAddr, "giao hàng")
		if (!toFullAddr) return

		let length = 0
		let width = 0
		let height = 0
		let weight = 0
		const items = []

		for (const ol of order.lines) {
			const { product, quantity } = ol

			weight += SMARTPHONE_SIZE.weight_gram * quantity
			height += SMARTPHONE_SIZE.height_cm * quantity
			length = SMARTPHONE_SIZE.length_cm
			width = SMARTPHONE_SIZE.width_cm

			items.push({
				code: String(product.id),
				name: product.name,
				price: product.mainPrice,
				quantity: quantity,
				length: SMARTPHONE_SIZE.length_cm,
				width: SMARTPHONE_SIZE.width_cm,
				height: SMARTPHONE_SIZE.height_cm,
				weight: SMARTPHONE_SIZE.weight_gram,
				category: null,
			})
		}

		// Prepare GHN Request Body
		const requestBody = {
			payment_type_id: 2,
			note: "Cho khách xem hàng",
			required_note: GHN_REQUIRED_NOTE_ENUM.CHO_THU_HANG,
			from_name: fromFullAddr.userName,
			from_phone: fromFullAddr.phone,
			from_address: fromFullAddr.street,

			from_address:
				"72 Thành Thái, Phường 14, Quận 10, Hồ Chí Minh, Vietnam",
			from_ward_name: "Phường 14",
			from_district_name: "Quận 10",
			from_province_name: "HCM",
			// from_ward_name: fromFullAddr.ward.name,
			// from_district_name: fromFullAddr.ward.districtName,
			// from_province_name: fromFullAddr.province.name,

			return_phone: null,
			return_address: null,
			return_district_id: null,
			return_ward_code: null,
			client_order_code: null,
			to_name: toFullAddr.userName,
			to_phone: toFullAddr.phone,

			to_address:
				"73 Thành Thái, Phường 14, Quận 10, Hồ Chí Minh, Vietnam",
			to_ward_code: "20308",
			to_district_id: 1444,
			// to_address: toFullAddr.street,
			// to_ward_code: toFullAddr.ward.ghnWardCode,
			// to_district_id: toFullAddr.ward.ghnDistrictID,

			cod_amount: order.total,
			content: "TTECH",
			weight,
			length,
			width,
			height,
			pick_station_id: null,
			deliver_station_id: null,
			insurance_value: GHN_INSURANCE,
			service_id: GHN_LIGHT_SERVICE.service_id,
			service_type_id: GHN_LIGHT_SERVICE.service_type_id,
			coupon: null,
			pick_shift: [2],
			items,
		}

		// Send request to GHN API
		console.log("Sending GHN Create Parcel API...")
		console.log("Body: ", requestBody)

		const rawResponse = await fetch(
			`${GHN_V2_PUBLIC_API}/shipping-order/create`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Token: GHN_TOKEN,
					ShopId: GHN_SHOP_ID,
				},
				body: JSON.stringify(requestBody),
			}
		)
		const response = await rawResponse.json()
		console.log("GHN Parcel Creation Response:", response)

		const {
			code,
			data,
			code_message_value,
			message_display,
		} = response

		if (code === 200) {
			return Response.json({
				code,
				message: message_display,
				data: {
					parcelCode: data.order_code,
					sortCode: data.sort_code,
					transType: data.trans_type,
					shippingFee: data.total_fee,
					expectedDeliveryTime: data.expected_delivery_time,
				},
			})
		} else {
			return Response.json({
				code,
				message:
					code_message_value || "Lỗi GHN đang được khắc phục",
				data: null,
			})
		}
	} catch (error) {
		console.error("GHN Parcel Creation API Error:", error)
		return NextResponse.json(
			{
				code: 500,
				message: "Lỗi phần mềm đang được khắc phục",
				data: null,
			},
			{ status: 500 }
		)
	}
}
