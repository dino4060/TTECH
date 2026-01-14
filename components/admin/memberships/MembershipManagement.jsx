"use client"
import { useState } from "react"
import MembershipPanel from "./MembershipPanel"
import MembershipTable from "./MembershipTable"

const MembershipManagement = () => {
	const [asyncList, setAsyncList] = useState(false)
	const [currentMBS, setCurrentMBS] = useState({})

	return (
		<div className='container mx-auto flex mt-10 gap-10'>
			<div className='flex-[4]'>
				<MembershipTable
					currentMBS={currentMBS}
					setCurrentMBS={setCurrentMBS}
					asyncList={asyncList}
				/>
			</div>
			<div className='flex-[6] bg-white'>
				<MembershipPanel
					currentMBS={currentMBS}
					setCurrentMBS={setCurrentMBS}
					setAsyncList={setAsyncList}
				/>
			</div>
		</div>
	)
}

export default MembershipManagement
