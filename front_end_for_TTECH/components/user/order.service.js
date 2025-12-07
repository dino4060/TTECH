import { ghnApiRt } from "@/app/api/shipping/ghn/ghn.api-route"
import { orderApi } from "@/lib/api/order.api"
import { clientFetch } from "@/lib/http/fetch.client"

export const cancelOrder = async ({
	orderId,
	parcelCode,
}) => {
	const ghnRes = await ghnApiRt.cancelParcel(parcelCode)

	if (ghnRes.success === false) {
		alert(`Lỗi hủy bưu kiện: ${ghnRes.error}`)
		return false
	}

	const apiRes = await clientFetch(
		orderApi.update({ id: orderId, status: "CANCELED" })
	)

	if (apiRes.success === false) {
		alert(`Lỗi hủy đơn hàng: ${apiRes.error}`)
		return false
	}

	return true
}

export const trackGhnParcel = async (parcelCode) => {
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
	if (status === "CANCELED") return "Đã hủy"

	return "Không xác định trạng thái"
}
