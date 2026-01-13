import { ghnApiRt } from "@/app/api/shipping/ghn/ghn.api-route"
import { addressApi } from "@/lib/api/address.api"
import { clientFetch } from "@/lib/http/fetch.client"
import { findGhnAddress } from "@/lib/utils/shipping/address"
import { roundTo1K } from "@/lib/utils/number2"
import { couponApi } from "@/lib/api/coupon.api"
import { benefitApi } from "@/lib/api/benefit.api"

export const fetchPreviewBenefits = async ({
	body,
	onSuccess,
}) => {
	const res = await clientFetch(benefitApi.preview(body))

	if (!res.success) {
		alert(`Benefit API error: ${res.error}`)
		return
	}

	onSuccess(res.data)
}

export const fetchPreviewClaims = async ({
	body,
	onSuccess,
}) => {
	const res = await clientFetch(
		couponApi.previewClaims(body)
	)

	if (!res.success) {
		alert(`Coupon API error: ${res.error}`)
		return
	}

	onSuccess(res.data)
}

export const applyCouponCode = async ({
	couponCode,
	totalPrice,
	cart,
	onSuccess,
	onError,
}) => {
	if (!couponCode || couponCode.trim() === "") {
		onError("Vui lòng nhập mã coupon")
		return
	}

	if (!cart?.lines || cart.lines.length === 0) {
		onError("Giỏ hàng trống, không thể áp dụng coupon")
		return
	}

	if (!totalPrice) {
		onError("Chi tiêu bằng 0, không thể áp dụng coupon")
		return
	}

	// Get product IDs
	const productIDs = cart.lines.map(
		(line) => line.product.id
	)

	// Call API
	const { success, data, error } = await clientFetch(
		couponApi.preview({
			couponCode: couponCode.trim().toUpperCase(),
			spendAmount: totalPrice,
			productIDs,
		})
	)

	if (success === false) {
		onError(error || "Lỗi khi kiểm tra mã coupon")
		return
	}

	if (!data.isApplied) {
		onError(data.message || "Không đủ điều kiện áp dụng")
		return
	}

	onSuccess(data)
}

export const calcPayment = (
	totalPrice,
	discountAmount,
	shippingFee
) => {
	return Math.ceil(totalPrice + shippingFee - discountAmount)
}

export const formatDateTimeRange = (
	fromDateStr,
	toDateStr
) => {
	// Parse dates (assuming format: "MM/DD/YYYY, HH:MM:SS AM/PM")
	const fromDate = new Date(fromDateStr)
	const toDate = new Date(toDateStr)

	const fromDay = fromDate.getDate()
	const fromMonth = fromDate.getMonth() + 1
	const fromYear = fromDate.getFullYear()

	const toDay = toDate.getDate()
	const toMonth = toDate.getMonth() + 1
	const toYear = toDate.getFullYear()

	// Same day
	if (
		fromDay === toDay &&
		fromMonth === toMonth &&
		fromYear === toYear
	) {
		return `${fromDay}/${fromMonth}/${fromYear}`
	}

	// Same month and year
	if (fromMonth === toMonth && fromYear === toYear) {
		return `${fromDay} - ${toDay}/${toMonth}/${fromYear}`
	}

	// Different month, same year
	if (fromYear === toYear) {
		return `${fromDay}/${fromMonth} - ${toDay}/${toMonth}/${fromYear}`
	}

	// Different year
	return `${fromDay}/${fromMonth}/${fromYear} - ${toDay}/${toMonth}/${toYear}`
}

export const fetchGetWarehouseAddress = async (
	setWarehouseAddr
) => {
	const api = await clientFetch(addressApi.getWarehouse())
	if (api.success) setWarehouseAddr(api.data)
	else alert("Lỗi lấy địa chỉ kho hàng: ", api.error)
}

export const fetchEstimateGhnLeadtime = async (
	warehouseAddr,
	customerAddr,
	setDeliveryTime
) => {
	// Prepare parameters
	const warehouseGhnAddr = findGhnAddress(
		warehouseAddr,
		"kho hàng"
	)
	if (!warehouseGhnAddr) return

	const customerGhnAddr = findGhnAddress(
		customerAddr,
		"giao hàng"
	)
	if (!customerGhnAddr) return

	// Call GHN API
	const ghnRes = await ghnApiRt.estimateLeadtime({
		fromDistrictId: warehouseGhnAddr.districtId,
		fromWardCode: warehouseGhnAddr.wardCode,
		toDistrictId: customerGhnAddr.districtId,
		toWardCode: customerGhnAddr.wardCode,
	})

	if (ghnRes.code === 200) {
		setDeliveryTime({
			from: ghnRes.data.leadtime_order.from_estimate_date_vn,
			to: ghnRes.data.leadtime_order.to_estimate_date_vn,
		})
	} else {
		alert("Lỗi dự tính thời gian giao hàng: " + ghnRes.error)
	}
}

export const fetchCalcGhnShippingFee = async (
	warehouseAddr,
	customerAddr,
	cartLineItems,
	setShippingFee
) => {
	// Prepare parameters
	const warehouseGhnAddr = findGhnAddress(
		warehouseAddr,
		"kho hàng"
	)
	if (!warehouseGhnAddr) return

	const customerGhnAddr = findGhnAddress(
		customerAddr,
		"giao hàng"
	)
	if (!customerGhnAddr) return

	// Call GHN API
	const ghnRes = await ghnApiRt.calcShippingFee({
		fromDistrictId: warehouseGhnAddr.districtId,
		fromWardCode: warehouseGhnAddr.wardCode,
		toDistrictId: customerGhnAddr.districtId,
		toWardCode: customerGhnAddr.wardCode,
		cartLineItems,
	})

	if (ghnRes.code === 200) {
		setShippingFee(roundTo1K(ghnRes.data.total))
	} else {
		alert("Lỗi tính phí vận chuyển: " + ghnRes.error)
	}
}
