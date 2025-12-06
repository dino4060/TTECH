import { ghnApiRt } from "@/app/api/shipping/ghn/ghn.api-route"

export const trackGhnParcel = async ({ parcelCode }) => {
	console.log("parcelCode", parcelCode)

	const ghnRes = await ghnApiRt.trackParcel(parcelCode)

	if (ghnRes.code !== 200) {
		alert("Lỗi lấy lịch sử vận chuyển: " + ghnRes.message)
		return
	}

	return ghnRes.data
}

export const mapTrackingLog = (ghnLog) => {
	if (ghnLog === "ready_to_pick")
		return "Cửa hàng đang đóng gói bưu kiện"

	return "Không xác định trạng thái"
}

export const translateAddress = (address) => {
	const prefixToRemove = "xxxx "

	if (address.startsWith(prefixToRemove)) {
		return address.slice(prefixToRemove.length)
	}

	return address
}
