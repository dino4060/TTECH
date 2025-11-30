export const paymentApiRt = {
	momoApiRt: {
		createUrl: async () => {
			try {
				const response = await fetch("/api/payment/momo", {
					method: "POST",
				})
				const data = await response.json()

				if (data.resultCode === 0) {
					// Redirect đến trang thanh toán MoMo
					// window.location.href = data.payUrl
				} else {
					console.error("MoMo Error:", data)
					alert("Có lỗi xảy ra: " + data.message)
				}

				return data
			} catch (error) {
				console.error("Payment Error:", error)
				throw error
			}
		},
	},
}
