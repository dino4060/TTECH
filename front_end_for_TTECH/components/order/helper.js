import { ghnApiRt } from "@/app/api/shipping/ghn/ghn.api-route"
import { addressApi } from "@/lib/api/address.api"
import { orderApi } from "@/lib/api/order.api"
import { clientFetch } from "@/lib/http/fetch.client"
import { checkKV } from "@/lib/utils/check"
import { findGhnAddress } from "@/lib/utils/shipping/address"
import { roundTo1K } from "@/utils/until"

export const calcDiscount = (totalPrice, dealPercent) => {
	return Math.ceil(totalPrice * (dealPercent / 100))
}

export const calcPayment = (
	totalPrice,
	dealPercent,
	shippingFee
) => {
	const totalDeal = calcDiscount(totalPrice, dealPercent)
	return Math.ceil(totalPrice + shippingFee - totalDeal)
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

export const createGhnParcel = async ({
	order,
	setParcel,
}) => {
	const orderId = 34
	const apiRes = await clientFetch(orderApi.get(orderId))

	if (!apiRes.success) {
		alert("Lỗi lấy đơn hàng: " + apiRes.error)
		return
	}

	const ghnRes = await ghnApiRt.createParcel({
		order: apiRes.data,
	})

	if (ghnRes.code === 200) {
		checkKV("setParcel", ghnRes.data)
		setParcel(ghnRes.data)
	} else {
		alert("Lỗi tạo bưu kiện: " + ghnRes.message)
	}
}
