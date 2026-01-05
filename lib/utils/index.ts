export const timeout = async (seconds: number) => {
	await new Promise<void>((resolve) =>
		setTimeout(() => resolve(), seconds * 1000)
	)
}

export const isBrowser = typeof window !== "undefined"

export const parseJwtExp = (token: string) => {
	try {
		console.log(`>>> parseJwtExp: token: ${token}`)

		if (!token) return null

		const payload = JSON.parse(atob(token.split(".")[1]))

		console.log(">>> parseJwtExp: payload: ", payload)

		return payload.exp as number // Epoch timestamp, Unix timestamp (integer in seconds)
	} catch (e) {
		throw new Error(">>> parseJwtExp: failed")
	}
}

export function copy(text: string) {
	navigator.clipboard.writeText(text)
}

export function copyId(num: number) {
	navigator.clipboard
		.writeText(String(num))
		.then(() => {
			console.log("ID copied to clipboard: " + num)
		})
		.catch((err) => {
			console.error("Failed to copy ID: ", err)
		})
}
