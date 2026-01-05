import Header from "../components/uncategory/Header"
import Navigator from "../components/uncategory/Navigator"
import MainContent from "../components/uncategory/MainContent"
import Footer from "@/components/uncategory/Footer"
import { Fragment } from "react"

export default function Home() {
	return (
		<Fragment>
			<div className='h-[70px]'></div>

			<div>
				<Header />
			</div>

			<div>
				<Navigator />
			</div>

			<MainContent />

			<div>
				<Footer />
			</div>
		</Fragment>
	)
}
