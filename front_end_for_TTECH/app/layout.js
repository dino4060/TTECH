import { CartContextProvider } from "@/context/CartContext"
import https from "https"
import { Inter } from "next/font/google"
import { AuthContextProvider } from "../context/AuthContext"
import "./globals.css"
import { IdProvider } from "@/context/IdContext"

https.globalAgent.options.rejectUnauthorized = false

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
	title: "Tech Products",
	description: "E-comerce",
	icons: {
		url: "/icon.png",
	},
}

export default function RootLayout({ children }) {
	return (
		<html lang='en' suppressHydrationWarning={true}>
			<IdProvider>
				<CartContextProvider>
					<AuthContextProvider>
						<body className={inter.className}>{children}</body>
					</AuthContextProvider>
				</CartContextProvider>
			</IdProvider>
		</html>
	)
}
