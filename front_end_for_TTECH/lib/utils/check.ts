export const checkV = (value: string) => {
	console.log("Check : ", value)
}

export const checkKV = (key: string, value: string) => {
	console.log("Check ", key, ": ", value)
}

type FormField = {
	key: string
	name: string
	type: "text" | "number" | "select" | "checkbox"
	disabled: boolean
	required: boolean
}

export const checkSubmitForm = (
	form: FormField[],
	body: Record<string, any>,
	feedback: Record<string, string>
) => {
	let isOke = true

	form.map((ff) => {
		if (ff.type === "text") {
			body[ff.key] = body[ff.key]?.trim() || ""
		}

		if (ff.required && !body[ff.key]) {
			feedback[ff.key] = `Vui lòng nhập ${ff.name}`
		}

		if (feedback[ff.key]) {
			isOke = false
		}
	})

	return isOke
}
