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

export const mapParcelStatus = (status) => {
	if (status === "ready_to_pick")
		return "Cửa hàng đang đóng gói bưu kiện"

	return "Không xác định trạng thái"
}

export const translateAddress = (address) => {
	const prefixToRemove = "xxxx "
	const suffixesToFix = ["Hồ Chí Minh", "Hà Nội", "Bến Tre"]

	let newAddr = address

	if (newAddr.startsWith(prefixToRemove)) {
		newAddr = newAddr.slice(prefixToRemove.length)
	}

	for (const suffix of suffixesToFix) {
		const pattern = new RegExp(`([^])\\s+(${suffix})$`)

		if (pattern.test(newAddr)) {
			newAddr = newAddr.replace(pattern, "$1, $2")
			break
		}
	}

	return newAddr
}

export const mapOrderStatus = (status) => {
	if (status === "PENDING") return "Đang xử lý"

	return "Không xác định trạng thái"
}
