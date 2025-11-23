export const checkV = (value: any) => {
	console.log("Check : ", value)
}

export const checkKV = (key: string, value: any) => {
	console.log("Check ", key, ": ", value)
}

type FormField = {
	key: string
	name: string
	type: "text" | "number" | "select" | "checkbox"
	disabled: boolean
	required: boolean
	side?: {
		test: (value: any) => boolean
		message: string
	}
}

export const checkSubmitForm = (
	Form: FormField[],
	body: Record<string, any>,
	feedback: Record<string, string>
) => {
	let isValid = true

	Form.map((FF) => {
		if (FF.type === "text") {
			body[FF.key] = body[FF.key]?.trim() || ""
		}

		if (FF.required && !body[FF.key]) {
			feedback[FF.key] = `Vui lòng nhập ${FF.name}`
		}

		if (feedback[FF.key]) {
			isValid = false
		}
	})

	return isValid
}

export const checkDateTimePair = (
	data: Record<string, any>,
	startKey: string,
	endKey: string
) => {
	const startTime = new Date(data[startKey])
	const endTime = new Date(data[endKey])
	return startTime <= endTime
}
