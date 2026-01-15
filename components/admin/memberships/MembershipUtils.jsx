import {
	ArrowBigUpDash,
	RefreshCcw,
	ShieldCheck,
	TicketPercent,
} from "lucide-react"

export const ModeEnum = {
	ADD: "ADD",
	EDIT: "EDIT",
	DELETE: "DELETE",
	CONFIG: "CONFIG",
}

export const BenefitUnit = {
	FIXED: "FIXED",
	PERCENT: "PERCENT",
	MONTHS: "MONTHS",
}

export const BenefitUnitRenderEnum = {
	FIXED: {
		key: BenefitUnit.FIXED,
		show: "Giá tiền",
		symbol: ".000đ",
	},
	PERCENT: {
		key: BenefitUnit.PERCENT,
		show: "Phần trăm",
		symbol: "%",
	},
	MONTHS: {
		key: BenefitUnit.MONTHS,
		show: "Tháng",
		symbol: " tháng",
	},
}

export const BenefitType = {
	UPGRADE: "UPGRADE",
	RENEW: "RENEW",
	COUPON: "COUPON",
	GUARANTEE: "GUARANTEE",
}

export const BenefitTypeRenderEnum = {
	UPGRADE: {
		key: BenefitType.UPGRADE,
		show: "Thăng hạng",
		icon: ArrowBigUpDash,
	},
	RENEW: {
		key: BenefitType.RENEW,
		show: "Duy trì",
		icon: RefreshCcw,
	},
	COUPON: {
		key: BenefitType.COUPON,
		show: "Mua hàng",
		icon: TicketPercent,
	},
	GUARANTEE: {
		key: BenefitType.GUARANTEE,
		show: "Bảo hành",
		icon: ShieldCheck,
	},
}

export const DEFAULT_MEMBERSHIP = {
	id: undefined,
	membershipCode: undefined,
	minPoint: undefined,
	isAlive: undefined,
	benefits: [],
}

export const pickMembership = (data) => {
	return {
		id: data.id,
		membershipCode: data.membershipCode,
		minPoint: data.minPoint,
		benefits: data.benefits,
		isAlive: data.isAlive,
	}
}
