const HA_NOI_WARDS = [
	{
		id: 1020114,
		ghnWardCode: "1A0114",
		ghnDistrictID: 1484,
		name: "Phường Vĩnh Phúc",
	},
	{
		id: 102113,
		ghnWardCode: "1A0113",
		ghnDistrictID: 1484,
		name: "Phường Trúc Bạch",
	},
	{
		id: 1020112,
		ghnWardCode: "1A0112",
		ghnDistrictID: 1484,
		name: "Phường Thành Công",
	},
	{
		id: 1020111,
		ghnWardCode: "1A0111",
		ghnDistrictID: 1484,
		name: "Phường Quán Thánh",
	},
	{
		id: 1020110,
		ghnWardCode: "1A0110",
		ghnDistrictID: 1484,
		name: "Phường Phúc Xá",
	},
	{
		id: 1020109,
		ghnWardCode: "1A0109",
		ghnDistrictID: 1484,
		name: "Phường Nguyễn Trung Trực",
	},
	{
		id: 1020108,
		ghnWardCode: "1A0108",
		ghnDistrictID: 1484,
		name: "Phường Ngọc Khánh",
	},
	{
		id: 1020107,
		ghnWardCode: "1A0107",
		ghnDistrictID: 1484,
		name: "Phường Ngọc Hà",
	},
	{
		id: 1020106,
		ghnWardCode: "1A0106",
		ghnDistrictID: 1484,
		name: "Phường Liễu Giai",
	},
	{
		id: 1020105,
		ghnWardCode: "1A0105",
		ghnDistrictID: 1484,
		name: "Phường Kim Mã",
	},
	{
		id: 1020104,
		ghnWardCode: "1A0104",
		ghnDistrictID: 1484,
		name: "Phường Giảng Võ",
	},
	{
		id: 1020103,
		ghnWardCode: "1A0103",
		ghnDistrictID: 1484,
		name: "Phường Đội Cấn",
	},
	{
		id: 1020102,
		ghnWardCode: "1A0102",
		ghnDistrictID: 1484,
		name: "Phường Điện Biên",
	},
	{
		id: 1020102,
		ghnWardCode: "1A0101",
		ghnDistrictID: 1484,
		name: "Phường Cống Vị",
	},
]

const THU_DUC_WARDS = [
	{
		name: "Phường An Khánh",
		id: 90768,
		ghnWardCode: "90768",
		ghnDistrictID: 3695,
	},
	{
		name: "Phường Bình Trưng",
		id: 90766,
		ghnWardCode: "90766",
		ghnDistrictID: 3695,
	},
	{
		name: "Phường Cát Lái",
		id: 90747,
		ghnWardCode: "90747",
		ghnDistrictID: 3695,
	},
	{
		name: "Phường Hiệp Bình",
		id: 90741,
		ghnWardCode: "90741",
		ghnDistrictID: 3695,
	},
	{
		name: "Phường Tam Bình",
		id: 90736,
		wardCode: "90736",
		ghnDistrictID: 3695,
	},
	{
		name: "Phường Thủ Đức",
		id: 90745,
		ghnWardCode: "90745",
		ghnDistrictID: 3695,
	},
	{
		name: "Phường Linh Xuân",
		id: 90737,
		ghnWardCode: "90737",
		ghnDistrictID: 3695,
	},
	{
		name: "Phường Tăng Nhơn Phú",
		id: 90754,
		ghnWardCode: "90754",
		ghnDistrictID: 3695,
	},
	{
		name: "Phường Phước Long",
		id: 90762,
		ghnWardCode: "90762",
		ghnDistrictID: 3695,
	},
	{
		name: "Phường Long Bình",
		id: 90751,
		ghnWardCode: "90751",
		ghnDistrictID: 3695,
	},
	{
		name: "Phường Long Phước",
		id: 90760,
		ghnWardCode: "90760",
		ghnDistrictID: 3695,
	},
	{
		name: "Phường Long Trường",
		id: 90761,
		ghnWardCode: "90761",
		ghnDistrictID: 3695,
	},
]

const BA_TRI_WARDS = [
	{
		id: 560721,
		ghnWardCode: "560721",
		ghnDistrictID: 1888,
		name: "Xã Tân Thủy",
	},
	{
		id: 560710,
		ghnWardCode: "560710",
		ghnDistrictID: 1888,
		name: "Xã Bảo Thạnh",
	},
	{
		id: 560701,
		ghnWardCode: "560701",
		ghnDistrictID: 1888,
		name: "Xã Ba Tri",
	},
	{
		id: 560722,
		ghnWardCode: "560722",
		ghnDistrictID: 1888,
		name: "Xã Tân Xuân",
	},
	{
		id: 560712,
		ghnWardCode: "560712",
		ghnDistrictID: 1888,
		name: "Xã Mỹ Chánh",
	},
	{
		id: 560707,
		ghnWardCode: "560707",
		ghnDistrictID: 1888,
		name: "Xã An Ngãi Trung",
	},
	{
		id: 560707,
		ghnWardCode: "560704",
		ghnDistrictID: 1888,
		name: "Xã An Hiệp",
	},
]

export const PROVINCES = [
	{
		id: 217,
		name: "An Giang",
		ghnProvinceID: 217,
		wards: [],
	},
	{
		id: 207,
		name: "Bắc Ninh",
		ghnProvinceID: 207,
		wards: [],
	},
	{
		id: 215,
		name: "Bến Tre",
		ghnProvinceID: 215,
		wards: [...BA_TRI_WARDS],
	},
	{
		id: 208,
		name: "Khánh Hòa",
		ghnProvinceID: 208,
		wards: [],
	},
	{
		id: 220,
		name: "Cần Thơ",
		ghnProvinceID: 220,
		wards: [],
	},
	{
		id: 203,
		name: "Đà Nẵng",
		ghnProvinceID: 203,
		wards: [],
	},
	{
		id: 201,
		name: "Hà Nội",
		ghnProvinceID: 201,
		wards: [...HA_NOI_WARDS],
	},
	{
		id: 225,
		name: "Hải Phòng",
		ghnProvinceID: 225,
		wards: [],
	},
	{
		id: 202,
		name: "Hồ Chí Minh",
		ghnProvinceID: 202,
		wards: [...THU_DUC_WARDS],
	},
	{
		id: 209,
		name: "Lâm Đồng",
		ghnProvinceID: 209,
		wards: [],
	},
	{
		id: 235,
		name: "Nghệ An",
		ghnProvinceID: 235,
		wards: [],
	},
	{
		id: 244,
		name: "Thái Nguyên",
		ghnProvinceID: 244,
		wards: [],
	},
	{
		id: 230,
		name: "Quảng Ninh",
		ghnProvinceID: 230,
		wards: [],
	},
]
