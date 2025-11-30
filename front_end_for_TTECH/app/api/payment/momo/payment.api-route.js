export const paymentApiRt = {
	momoApiRt: {
		createPayUrl: async ({ amount, orderId, returnUrl }) => {
			try {
				// route should be /api/payments/momo/pay-url
				const response = await fetch("/api/payment/momo", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						amount,
						orderId,
						returnUrl,
					}),
				})
				const data = await response.json()

				return data
			} catch (error) {
				console.error("Fetch Momo API Route Error:", error)
				throw error
			}
		},
	},
}
