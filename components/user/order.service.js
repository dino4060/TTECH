import { ghnApiRt } from "@/app/api/shipping/ghn/ghn.api-route"
import { orderApi } from "@/lib/api/order.api"
import { clientFetch } from "@/lib/http/fetch.client"

export const listOrders = async (setOrderList) => {
	const { data } = await clientFetch(orderApi.list())
	setOrderList(data.items)
}

export const cancelOrder = async ({
	orderId,
	parcelCode,
	onToggleCanceling,
	setAsyncOrderList,
}) => {
	const ghnRes = await ghnApiRt.cancelParcel(parcelCode)

	if (ghnRes.success === false) {
		alert(`Lỗi hủy bưu kiện: ${ghnRes.error}`)
	}

	const apiRes = await clientFetch(
		orderApi.update({ id: orderId, status: "CANCELED" })
	)

	if (apiRes.success === false) {
		alert(`Lỗi hủy đơn hàng: ${apiRes.error}`)
	}

	onToggleCanceling(orderId)
	setAsyncOrderList((prev) => !prev)
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

export const translateTrackingAddr = (address) => {
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

export const mapParcelStatus = (status) => {
	if (status === "ready_to_pick")
		return "Cửa hàng đang đóng gói bưu kiện"

	if (status === "cancel") return "Bạn đã hủy bưu kiện"

	return "Không xác định trạng thái"
}

export const mapOrderStatus = (status) => {
	if (status === "UNPAID") return "Chưa thanh toán"
	if (status === "PENDING") return "Đang xử lý"
	if (status === "SHIPPING") return "Đang giao"
	if (status === "COMPLETED") return "Hoàn thành"
	if (status === "CANCELED") return "Đã hủy"

	return "Không xác định trạng thái"
}

export const allowCancelOrder = (orderStatus) => {
	return ["PENDING", "UNPAID"].includes(orderStatus)
}

export const allowPayOrder = (orderStatus) => {
	return orderStatus === "UNPAID"
}
