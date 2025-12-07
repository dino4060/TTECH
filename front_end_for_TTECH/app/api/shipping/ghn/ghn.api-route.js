export const ghnApiRt = {
	cancelParcel: async (parcelCode) => {
		const response = await fetch(
			`/api/shipping/ghn/parcels/${parcelCode}`,
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			}
		)
		const data = await response.json()
		return data
	},

	trackParcel: async (parcelCode) => {
		const response = await fetch(
			`/api/shipping/ghn/parcels/${parcelCode}/tracking`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		)
		const data = await response.json()
		return data
	},

	createParcel: async (body) => {
		const response = await fetch(
			"/api/shipping/ghn/parcels",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			}
		)
		const data = await response.json()
		return data
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
