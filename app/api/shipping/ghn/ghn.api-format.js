const errorExample1 = {
	code: 400,
	message: "Sai thông tin Required Note",
	data: null,
	code_message: "USER_ERR_COMMON",
	code_message_value:
		"Sai thông tin đầu vào. Vui lòng thử lại.",
}

const errorExample2 = {
	code: 400,
	message: "Too many request. This request is processing",
	data: null,
}

const errorExample3 = {
	code: 400,
	message:
		"Fail when get place name of to ward code: Lỗi gọi API: tenant_masterdata_get_ward_byname - <nil>",
	data: null,
	code_message: "WARD_NAME_NOT_VALID",
	code_message_value:
		"Không tìm thấy thông tin phường xã. Vui lòng thử lại sau.",
}

const errorExample4 = {
	code: 400,
	message: "[online] Chưa init Redis",
	data: null,
}

const order = {
	id: 34,
	allPrice: 18790,
	allDiscount: 0,
	shippingFee: 46,
	total: 18836,
	note: "",
	paymentType: "COD",
	toUserName: "NGUYỄN TRUNG NHÂN",
	toPhone: "0869018606",
	toProvinceId: 215,
	toWardId: 560707,
	toStreet: "Ngã 3 Mỹ Thạnh",
	fromUserName: "TOP 1 TTECH",
	fromPhone: "0395669245",
	fromProvinceId: 202,
	fromWardId: 90745,
	fromStreet: "Số 1 Võ Văn Ngân",
	orderTime: "2025-12-05T08:12:47.271320Z",
	status: "PENDING",
	lines: [
		{
			product: [Object],
			quantity: 1,
			mainPrice: 18790,
			sidePrice: 0,
		},
	],
}

const GhnParcelCreationBody = {
	payment_type_id: 2,
	note: "Không cho khách xem hàng",
	required_note: "KHONGCHOXEMHANG",
	from_name: "TOP 1 TTECH",
	from_phone: "0395669245",
	from_address: "Số 1 Võ Văn Ngân",
	from_ward_name: "Phường Linh Chiểu",
	from_district_name: "Thành Phố Thủ Đức",
	from_province_name: "Thành Phố Hồ Chí Minh",
	return_phone: null,
	return_address: null,
	return_district_id: null,
	return_ward_code: null,
	client_order_code: null,
	to_name: "NGUYỄN TRUNG NHÂN",
	to_phone: "0869018606",
	to_address: "Ngã 3 Mỹ Thạnh",
	to_ward_code: "560707",
	to_district_id: 1888,
	cod_amount: 18836000,
	content: "TTECH PRODUCT SHOPPING",
	weight: 200,
	length: 18,
	width: 9,
	height: 3,
	pick_station_id: null,
	deliver_station_id: null,
	insurance_value: 5000000,
	service_id: 53321,
	service_type_id: 2,
	coupon: null,
	pick_shift: [2],
	items: [
		{
			code: "854",
			name: "iPhone 15 Plus 128GB Hồng",
			price: undefined,
			quantity: 1,
			length: 18,
			width: 9,
			height: 3,
			weight: 200,
			category: null,
		},
	],
}

const GhnParcelCreationResponse = {
	code: 200,
	code_message_value: "",
	data: {
		order_code: "LK3U4A",
		sort_code: "000-D-00-00",
		trans_type: "truck",
		ward_encode: "",
		district_encode: "",
		fee: {
			main_service: 20500,
			insurance: 25000,
			cod_fee: 0,
			station_do: 0,
			station_pu: 0,
			return: 0,
			r2s: 0,
			return_again: 0,
			coupon: 0,
			document_return: 0,
			double_check: 0,
			double_check_deliver: 0,
			pick_remote_areas_fee: 0,
			deliver_remote_areas_fee: 0,
			pick_remote_areas_fee_return: 0,
			deliver_remote_areas_fee_return: 0,
			cod_failed_fee: 0,
		},
		total_fee: 45500,
		expected_delivery_time: "2025-12-06T16:59:59Z",
		operation_partner: "",
	},
	message: "Success",
	message_display:
		"Tạo đơn hàng thành công. Mã đơn hàng: LK3U4A",
}

const Parcel = {
	parcelCode: "LK3U4A",
	sortCode: "000-D-00-00",
	transType: "truck",
	shippingFee: 46,
	leadingTime: "12/06/2025, 11:59:59 PM",
}
