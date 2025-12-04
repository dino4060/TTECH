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

	calcShippingFee: async ({
		fromDistrictId,
		fromWardCode,
		toDistrictId,
		toWardCode,
		cartLineItems,
	}) => {
		try {
			const response = await fetch("/api/shipping/ghn/fee", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					fromDistrictId,
					fromWardCode,
					toDistrictId,
					toWardCode,
					cartLineItems,
				}),
			})
			const data = await response.json()

			return data
		} catch (error) {
			console.error("Call GHN Fee API Route Error:", error)
			return {
				code: 500,
				message: "Call GHN Fee API Route Error",
				error: error.message,
			}
		}
	},
}
