// formatPercent //
export function formatPercent(
	value: number | string,
	withMinus = true
): string {
	const number =
		typeof value === "string" ? parseFloat(value) : value

	if (isNaN(number)) return "-0%"

	return withMinus ? `-${number}%` : `${number}%`
}

// formatCurrency //
export function formatCurrency(
	value: number | string | null | undefined,
	isSinglePrice = true,
	withSymbol = true
): string {
	if (!value) return "0₫"

	const number: number =
		typeof value === "string" ? parseFloat(value) : value

	if (isNaN(number)) return "0₫"

	let result: string = number.toLocaleString("vi-VN")

	if (withSymbol) result = `${result}₫`

	if (!isSinglePrice) result = `từ ${result}`

	return result
}

// parsePrice //
export function parsePrice(
	value: string | number,
	padding: number = 1
): number {
	let parsedValue: number

	if (typeof value === "string") {
		Number.parseInt(value)
	} else {
		parsedValue = value
	}

	if (isNaN(parsedValue)) {
		return 0
	}

	return parsedValue * padding
}

// utils/dateFormat.js

/**
 * Format ISO datetime sang định dạng Việt Nam
 * @param {string} isoString - ISO datetime string (VD: "2025-11-24T00:10")
 * @returns {string} - Định dạng DD/MM/YYYY HH:mm
 */
export const toDateTimeVN = (isoString: string) => {
	if (!isoString) return ""

	const date = new Date(isoString)

	const day = String(date.getDate()).padStart(2, "0")
	const month = String(date.getMonth() + 1).padStart(2, "0")
	const year = date.getFullYear()
	const hours = String(date.getHours()).padStart(2, "0")
	const minutes = String(date.getMinutes()).padStart(2, "0")

	return `${day}/${month}/${year} ${hours}:${minutes}`
}

/**
 * Format ISO datetime sang định dạng ngắn gọn
 * @param {string} isoString - ISO datetime string
 * @returns {string} - Định dạng DD/MM/YYYY
 */
export const formatDateOnly = (isoString: string) => {
	if (!isoString) return ""

	const date = new Date(isoString)

	const day = String(date.getDate()).padStart(2, "0")
	const month = String(date.getMonth() + 1).padStart(2, "0")
	const year = date.getFullYear()

	return `${day}/${month}/${year}`
}

/**
 * Format ISO datetime sang giờ
 * @param {string} isoString - ISO datetime string
 * @returns {string} - Định dạng HH:mm
 */
export const formatTimeOnly = (isoString: string) => {
	if (!isoString) return ""

	const date = new Date(isoString)

	const hours = String(date.getHours()).padStart(2, "0")
	const minutes = String(date.getMinutes()).padStart(2, "0")

	return `${hours}:${minutes}`
}

export const calcPartOfPercent = (
	percent: number,
	total: number
) => {
	return parseInt(String(total * (1 - percent / 100)))
}

export const calcPercentOfPart = (
	part: number,
	total: number
) => {
	return parseInt(String((1 - part / total) * 100))
}

export const convertDate = (date: string) => {
	const datePortion = date?.slice(0, 10)
	if (!datePortion) return ""
	const [year, month, day] = datePortion?.split("-")
	const formattedDate = `${day}/${month}/${year}`
	return formattedDate
}
