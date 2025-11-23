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