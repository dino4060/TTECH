type TProvince = {
	id: number
	name: string
	ghnProvinceID: number
	wards: TWard[]
}

type TWard = {
	id: number
	name: string
	ghnWardCode: string
	ghnWardName: string
	ghnDistrictID: number
	ghnDistrictName: string
}

const BA_DINH_WARDS: TWard[] = [
	{
		id: 1020114,
		ghnWardCode: "1A0114",
		ghnDistrictID: 1484,
		name: "Phường Vĩnh Phúc",
		ghnWardName: "Phường Vĩnh Phúc",
		ghnDistrictName: "Quận Ba Đình",
	},
	{
		id: 102113,
		ghnWardCode: "1A0113",
		ghnDistrictID: 1484,
		name: "Phường Trúc Bạch",
		ghnWardName: "Phường Trúc Bạch",
		ghnDistrictName: "Quận Ba Đình",
	},
	{
		id: 1020112,
		ghnWardCode: "1A0112",
		ghnDistrictID: 1484,
		name: "Phường Thành Công",
		ghnWardName: "Phường Thành Công",
		ghnDistrictName: "Quận Ba Đình",
	},
	{
		id: 1020111,
		ghnWardCode: "1A0111",
		ghnDistrictID: 1484,
		name: "Phường Quán Thánh",
		ghnWardName: "Phường Quán Thánh",
		ghnDistrictName: "Quận Ba Đình",
	},
	{
		id: 1020110,
		ghnWardCode: "1A0110",
		ghnDistrictID: 1484,
		name: "Phường Phúc Xá",
		ghnWardName: "Phường Phúc Xá",
		ghnDistrictName: "Quận Ba Đình",
	},
	{
		id: 1020109,
		ghnWardCode: "1A0109",
		ghnDistrictID: 1484,
		name: "Phường Nguyễn Trung Trực",
		ghnWardName: "Phường Nguyễn Trung Trực",
		ghnDistrictName: "Quận Ba Đình",
	},
	{
		id: 1020108,
		ghnWardCode: "1A0108",
		ghnDistrictID: 1484,
		name: "Phường Ngọc Khánh",
		ghnWardName: "Phường Ngọc Khánh",
		ghnDistrictName: "Quận Ba Đình",
	},
	{
		id: 1020107,
		ghnWardCode: "1A0107",
		ghnDistrictID: 1484,
		name: "Phường Ngọc Hà",
		ghnWardName: "Phường Ngọc Hà",
		ghnDistrictName: "Quận Ba Đình",
	},
	{
		id: 1020106,
		ghnWardCode: "1A0106",
		ghnDistrictID: 1484,
		name: "Phường Liễu Giai",
		ghnWardName: "Phường Liễu Giai",
		ghnDistrictName: "Quận Ba Đình",
	},
	{
		id: 1020105,
		ghnWardCode: "1A0105",
		ghnDistrictID: 1484,
		name: "Phường Kim Mã",
		ghnWardName: "Phường Kim Mã",
		ghnDistrictName: "Quận Ba Đình",
	},
	{
		id: 1020104,
		ghnWardCode: "1A0104",
		ghnDistrictID: 1484,
		name: "Phường Giảng Võ",
		ghnWardName: "Phường Giảng Võ",
		ghnDistrictName: "Quận Ba Đình",
	},
	{
		id: 1020103,
		ghnWardCode: "1A0103",
		ghnDistrictID: 1484,
		name: "Phường Đội Cấn",
		ghnWardName: "Phường Đội Cấn",
		ghnDistrictName: "Quận Ba Đình",
	},
	{
		id: 1020102,
		ghnWardCode: "1A0102",
		ghnDistrictID: 1484,
		name: "Phường Điện Biên",
		ghnWardName: "Phường Điện Biên",
		ghnDistrictName: "Quận Ba Đình",
	},
	{
		id: 1020102,
		ghnWardCode: "1A0101",
		ghnDistrictID: 1484,
		name: "Phường Cống Vị",
		ghnWardName: "Phường Cống Vị",
		ghnDistrictName: "Quận Ba Đình",
	},
]

const THU_DUC_WARDS: TWard[] = [
	{
		name: "Phường An Khánh",
		id: 90768,
		ghnWardCode: "90768",
		ghnDistrictID: 3695,
		ghnWardName: "Phường An Khánh",
		ghnDistrictName: "Thành Phố Thủ Đức",
	},
	{
		name: "Phường Bình Trưng",
		id: 90766,
		ghnWardCode: "90766",
		ghnDistrictID: 3695,
		ghnWardName: "Phường Bình Trưng Đông",
		ghnDistrictName: "Thành Phố Thủ Đức",
	},
	{
		name: "Phường Cát Lái",
		id: 90747,
		ghnWardCode: "90747",
		ghnDistrictID: 3695,
		ghnWardName: "Phường Cát Lái",
		ghnDistrictName: "Thành Phố Thủ Đức",
	},
	{
		name: "Phường Hiệp Bình",
		id: 90741,
		ghnWardCode: "90741",
		ghnDistrictID: 3695,
		ghnWardName: "Phường Hiệp Bình Chánh",
		ghnDistrictName: "Thành Phố Thủ Đức",
	},
	{
		name: "Phường Tam Bình",
		id: 90736,
		ghnWardCode: "90736",
		ghnDistrictID: 3695,
		ghnWardName: "Phường Tam Bình",
		ghnDistrictName: "Thành Phố Thủ Đức",
	},
	{
		name: "Phường Thủ Đức",
		id: 90745,
		ghnWardCode: "90745",
		ghnDistrictID: 3695,
		ghnWardName: "Phường Linh Chiểu",
		ghnDistrictName: "Thành Phố Thủ Đức",
	},
	{
		name: "Phường Linh Xuân",
		id: 90737,
		ghnWardCode: "90737",
		ghnDistrictID: 3695,
		ghnWardName: "Phường Linh Xuân",
		ghnDistrictName: "Thành Phố Thủ Đức",
	},
	{
		name: "Phường Tăng Nhơn Phú",
		id: 90754,
		ghnWardCode: "90754",
		ghnDistrictID: 3695,
		ghnWardName: "Phường Tăng Nhơn Phú A",
		ghnDistrictName: "Thành Phố Thủ Đức",
	},
	{
		name: "Phường Phước Long",
		id: 90762,
		ghnWardCode: "90762",
		ghnDistrictID: 3695,
		ghnWardName: "Phường Phước Long A",
		ghnDistrictName: "Thành Phố Thủ Đức",
	},
	{
		name: "Phường Long Bình",
		id: 90751,
		ghnWardCode: "90751",
		ghnDistrictID: 3695,
		ghnWardName: "Phường Long Bình",
		ghnDistrictName: "Thành Phố Thủ Đức",
	},
	{
		name: "Phường Long Phước",
		id: 90760,
		ghnWardCode: "90760",
		ghnDistrictID: 3695,
		ghnWardName: "Phường Long Phước",
		ghnDistrictName: "Thành Phố Thủ Đức",
	},
	{
		name: "Phường Long Trường",
		id: 90761,
		ghnWardCode: "90761",
		ghnDistrictID: 3695,
		ghnWardName: "Phường Long Trường",
		ghnDistrictName: "Thành Phố Thủ Đức",
	},
]

const BA_TRI_WARDS: TWard[] = [
	{
		id: 560721,
		ghnWardCode: "560721",
		ghnDistrictID: 1888,
		name: "Xã Tân Thủy",
		ghnWardName: "Xã Tân Thủy",
		ghnDistrictName: "Huyện Ba Tri",
	},
	{
		id: 560710,
		ghnWardCode: "560710",
		ghnDistrictID: 1888,
		name: "Xã Bảo Thạnh",
		ghnWardName: "Xã Bảo Thạnh",
		ghnDistrictName: "Huyện Ba Tri",
	},
	{
		id: 560701,
		ghnWardCode: "560701",
		ghnDistrictID: 1888,
		name: "Xã Ba Tri",
		ghnWardName: "Thị trấn Ba Tri",
		ghnDistrictName: "Huyện Ba Tri",
	},
	{
		id: 560722,
		ghnWardCode: "560722",
		ghnDistrictID: 1888,
		name: "Xã Tân Xuân",
		ghnWardName: "Xã Tân Xuân",
		ghnDistrictName: "Huyện Ba Tri",
	},
	{
		id: 560712,
		ghnWardCode: "560712",
		ghnDistrictID: 1888,
		name: "Xã Mỹ Chánh Hòa",
		ghnWardName: "Xã Mỹ Chánh",
		ghnDistrictName: "Huyện Ba Tri",
	},
	{
		id: 560707,
		ghnWardCode: "560707",
		ghnDistrictID: 1888,
		name: "Xã An Ngãi Trung",
		ghnWardName: "Xã An Ngãi Trung",
		ghnDistrictName: "Huyện Ba Tri",
	},
	{
		id: 560707,
		ghnWardCode: "560704",
		ghnDistrictID: 1888,
		name: "Xã An Hiệp",
		ghnWardName: "Xã An Hiệp",
		ghnDistrictName: "Huyện Ba Tri",
	},
]

export const PROVINCES: TProvince[] = [
	{
		id: 201,
		name: "Thành Phố Hà Nội",
		ghnProvinceID: 201,
		wards: [...BA_DINH_WARDS],
	},
	{
		id: 225,
		name: "Thành Phố Hải Phòng",
		ghnProvinceID: 225,
		wards: [],
	},
	{
		id: 203,
		name: "Thành Phố Đà Nẵng",
		ghnProvinceID: 203,
		wards: [],
	},
	{
		id: 202,
		name: "Thành Phố Hồ Chí Minh",
		ghnProvinceID: 202,
		wards: [...THU_DUC_WARDS],
	},
	{
		id: 220,
		name: "Thành Phố Cần Thơ",
		ghnProvinceID: 220,
		wards: [],
	},
	{
		id: 217,
		name: "Tỉnh An Giang",
		ghnProvinceID: 217,
		wards: [],
	},
	{
		id: 207,
		name: "Tỉnh Bắc Ninh",
		ghnProvinceID: 207,
		wards: [],
	},
	{
		id: 215,
		name: "Tỉnh Bến Tre",
		ghnProvinceID: 215,
		wards: [...BA_TRI_WARDS],
	},
	{
		id: 208,
		name: "Tỉnh Khánh Hòa",
		ghnProvinceID: 208,
		wards: [],
	},
	{
		id: 209,
		name: "Tỉnh Lâm Đồng",
		ghnProvinceID: 209,
		wards: [],
	},
	{
		id: 235,
		name: "Tỉnh Nghệ An",
		ghnProvinceID: 235,
		wards: [],
	},
	{
		id: 244,
		name: "Tỉnh Thái Nguyên",
		ghnProvinceID: 244,
		wards: [],
	},
	{
		id: 230,
		name: "Tỉnh Quảng Ninh",
		ghnProvinceID: 230,
		wards: [],
	},
]

type TAddress = {
	userName: string
	phone: string
	provinceId: number
	wardId: number
	street: string
}

type TFullAddress = {
	userName: string
	phone: string
	province: TProvince
	ward: TWard
	street: string
}

type TGhnAddress = {
	userName: string
	phone: string
	provinceId: number
	districtId: number
	wardCode: string
	street: string
}

export const findFullAddress = (
	address: TAddress,
	addressName = "người dùng"
): TFullAddress => {
	const { userName, phone, provinceId, wardId, street } =
		address

	const province = PROVINCES.find(
		(province) => province.id === provinceId
	)

	if (!province) {
		console.error(`Không tìm thấy tỉnh/tp ${addressName}`)
		return null
	}

	const ward = province.wards.find(
		(ward) => ward.id === wardId
	)

	if (!ward) {
		console.error(`Không tìm thấy phường/xã ${addressName}`)
		return null
	}

	return { userName, phone, province, ward, street }
}

export const findGhnAddress = (
	address: TAddress,
	addressName = "địa chỉ"
): TGhnAddress => {
	const fullAddress = findFullAddress(address, addressName)
	if (!fullAddress) return null

	const { userName, phone, province, ward, street } =
		fullAddress

	return {
		userName,
		phone,
		provinceId: province.ghnProvinceID,
		districtId: ward.ghnDistrictID,
		wardCode: ward.ghnWardCode,
		street,
	}
}
