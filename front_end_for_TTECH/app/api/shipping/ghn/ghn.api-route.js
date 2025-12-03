export const ghnApiRt = {
	estimateLeadtime: async ({
		fromDistrictId,
		fromWardCode,
		toDistrictId,
		toWardCode,
	}) => {
		try {
			const response = await fetch(
				"/api/shipping/ghn/leadtime",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						fromDistrictId,
						fromWardCode,
						toDistrictId,
						toWardCode,
					}),
				}
			)
			const data = await response.json()

			return data
		} catch (error) {
			console.error("Call GHN API Route Error:", error)
			return {
				code: error.status,
				message: error.message,
				error: error.error,
			}
		}
	},
}
