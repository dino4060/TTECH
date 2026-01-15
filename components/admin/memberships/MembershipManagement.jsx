"use client"
import { useState } from "react"
import MembershipPanel from "./MembershipPanel"
import MembershipTable from "./MembershipTable"
import { ModeEnum } from "./MembershipUtils"

const MembershipManagement = () => {
	const [asyncList, setAsyncList] = useState(false)
	const [currentMBS, setCurrentMBS] = useState({})
	const [mode, setMode] = useState(ModeEnum.ADD)

	return (
		<div className='container mx-auto flex mt-10 gap-10'>
			<div className='flex-[4]'>
				<MembershipTable
					currentMBS={currentMBS}
					setCurrentMBS={setCurrentMBS}
					asyncList={asyncList}
					setMode={setMode}
				/>
			</div>
			<div className='flex-[6] bg-white'>
				<MembershipPanel
					currentMBS={currentMBS}
					mode={mode}
					setCurrentMBS={setCurrentMBS}
					setAsyncList={setAsyncList}
					setMode={setMode}
				/>
			</div>
		</div>
	)
}

export default MembershipManagement
