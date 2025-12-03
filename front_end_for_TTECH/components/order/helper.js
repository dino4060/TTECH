import { ghnApiRt } from "@/app/api/shipping/ghn/ghn.api-route"
import { addressApi } from "@/lib/api/address.api"
import { clientFetch } from "@/lib/http/fetch.client"
import { findGhnAddress } from "@/lib/utils/shipping/provinces"

export const getWarehouseAddress = async (
	setWarehouseAddr
) => {
	const api = await clientFetch(addressApi.getWarehouse())
	if (api.success) setWarehouseAddr(api.data)
	else alert("Lỗi lấy địa chỉ kho hàng: ", api.error)
}

export const estimateGhnLeadtime = async (
	warehouseAddr,
	customerAddr,
	setDeliveryTime
) => {
	// Get GHN parameters
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

	// Call GHN API with mapped parameters
	const ghnRes = await ghnApiRt.estimateLeadtime({
		fromDistrictId: warehouseGhnAddr.districtId,
		fromWardCode: warehouseGhnAddr.wardCode,
		toDistrictId: customerGhnAddr.districtId,
		toWardCode: customerGhnAddr.wardCode,
	})

	if (ghnRes.code === 200) {
		const { from_estimate_date_vn, to_estimate_date_vn } =
			ghnRes.data.leadtime_order

		setDeliveryTime({
			from: from_estimate_date_vn,
			to: to_estimate_date_vn,
		})
	} else {
		console.error("Call Client GHN API Error:", ghnRes)
		alert("Lỗi dự tính thời gian giao hàng: " + ghnRes.error)
	}
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
