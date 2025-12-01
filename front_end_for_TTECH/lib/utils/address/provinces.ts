const BA_DINH_WARDS = [
	{
		ghnWardCode: "1A0101",
		WardID: 1010101,
		WardName: "Phường Cống Vị",
	},
	{
		ghnWardCode: "1A0102",
		WardID: 1010102,
		WardName: "Phường Điện Biên",
	},
	{
		ghnWardCode: "1A0114",
		WardID: 1010114,
		WardName: "Phường Vĩnh Phúc",
	},
]

const THU_DUC_WARDS = [
	{
		ghnWardCode: "90768",
		WardID: 90768,
		WardName: "Phường An Khánh",
	},
	{
		WardCode: "90742",
		WardID: 3695,
		WardName: "Phường Linh Chiểu",
	},
	{
		ghnWardCode: "90735",
		WardID: 90735,
		WardName: "Phường Linh Xuân",
	},
	{
		ghnWardCode: "90741",
		WardID: 90735,
		WardName: "Phường Hiệp Phú",
	},
]

const BA_TRI_WARDS = [
	{
		WardID: 560701,
		ghnWardCode: "560701",
		WardName: "Thị trấn Ba Tri",
	},
	{
		WardID: 560702,
		ghnWardCode: "560702",
		WardName: "Xã An Bình Tây",
	},
	{
		WardID: 910386,
		ghnWardCode: "910386",
		WardName: "Thị trấn Tiệm Tôm",
	},
]

const HA_NOI_DISTRICTS = [
	{
		DistrictID: 1484,
		DistrictName: "Quận Ba Đình",
		ghnDistrictID: 1484,
		wards: [...BA_DINH_WARDS],
	},
	{
		DistrictID: 1488,
		DistrictName: "Quận Hoàn Kiếm",
		ghnDistrictID: 1488,
		wards: [],
	},
	{
		DistrictID: 1485,
		DistrictName: "Quận Cầu Giấy",
		ghnDistrictID: 1485,
		wards: [],
	},
	{
		DistrictID: 1488,
		DistrictName: "Quận Hai Bà Trưng",
		ghnDistrictID: 1488,
		wards: [],
	},
]

const HO_CHI_MINH_DISTRICTS = [
	{
		DistrictID: 1442,
		DistrictName: "Quận 1",
		ghnDistrictID: 1442,
		wards: [],
	},
	{
		DistrictID: 1462,
		DistrictName: "Quận Bình Thạnh",
		ghnDistrictID: 1462,
		wards: [],
	},
	{
		DistrictID: 1461,
		DistrictName: "Quận Gò Vấp",
		ghnDistrictID: 1461,
		wards: [],
	},
	{
		DistrictID: 3695,
		DistrictName: "Thành phố Thủ Đức",
		ghnDistrictID: 3695,
		wards: [...THU_DUC_WARDS],
	},
]

const BEN_TRE_DISTRICTS = [
	{
		DistrictID: 1558,
		DistrictName: "Thành phố Bến Tre",
		ghnDistrictID: 1558,
		wards: [],
	},
	{
		DistrictID: 1742,
		DistrictName: "Huyện Châu Thành",
		ghnDistrictID: 1742,
		wards: [],
	},
	{
		DistrictID: 1888,
		DistrictName: "Huyện Ba Tri",
		ghnDistrictID: 1888,
		wards: [...BA_TRI_WARDS],
	},
]

const VN_PROVINCES = [
	{
		ProvinceID: 206,
		ProvinceName: "An Giang",
		ghnProvinceID: 206,
		districts: [],
	},
	{
		ProvinceID: 207,
		ProvinceName: "Bắc Giang",
		ghnProvinceID: 207,
		districts: [],
	},
	{
		ProvinceID: 213,
		ProvinceName: "Bến Tre",
		ghnProvinceID: 213,
		districts: [...BEN_TRE_DISTRICTS],
	},
	{
		ProvinceID: 208,
		ProvinceName: "Bình Dương",
		ghnProvinceID: 208,
		districts: [],
	},
	{
		ProvinceID: 205,
		ProvinceName: "Cần Thơ",
		ghnProvinceID: 205,
		districts: [],
	},
	{
		ProvinceID: 203,
		ProvinceName: "Đà Nẵng",
		ghnProvinceID: 203,
		districts: [],
	},
	{
		ProvinceID: 201,
		ProvinceName: "Hà Nội",
		ghnProvinceID: 201,
		districts: [...HA_NOI_DISTRICTS],
	},
	{
		ProvinceID: 204,
		ProvinceName: "Hải Phòng",
		ghnProvinceID: 204,
		districts: [],
	},
	{
		ProvinceID: 202,
		ProvinceName: "Hồ Chí Minh",
		ghnProvinceID: 202,
		districts: [...HO_CHI_MINH_DISTRICTS],
	},
	{
		ProvinceID: 210,
		ProvinceName: "Lâm Đồng",
		ghnProvinceID: 210,
		districts: [],
	},
	{
		ProvinceID: 211,
		ProvinceName: "Nghệ An",
		ghnProvinceID: 211,
		districts: [],
	},
	{
		ProvinceID: 209,
		ProvinceName: "Thái Nguyên",
		ghnProvinceID: 209,
		districts: [],
	},
	{
		ProvinceID: 212,
		ProvinceName: "Quảng Ninh",
		ghnProvinceID: 212,
		districts: [],
	},
]
