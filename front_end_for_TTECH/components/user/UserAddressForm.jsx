"use client"
import { PROVINCES } from "@/lib/utils/shipping/address"
import { motion } from "framer-motion"
import { Fragment, useEffect, useState } from "react"

const UserAddressForm = ({
	formData,
	formError,
	onChange,
}) => {
	const mapOptions = (list) => [
		{ key: "", name: "" },
		...list.map(({ id: key, name }) => ({ key, name })),
	]
	const provinceOpts = mapOptions(PROVINCES)
	const [wardOpts, setWardOpts] = useState([])

	useEffect(() => {
		if (!formData.provinceId) {
			setWardOpts([])
			return
		}

		const PROVINCE = PROVINCES.find(
			(p) => p.id == formData.provinceId
		)
		const WARDS = PROVINCE ? PROVINCE.wards : []
		if (WARDS.length === 0) {
			setWardOpts([])
			return
		}

		setWardOpts(mapOptions(WARDS))
	}, [formData])

	return (
		<Fragment>
			{FormFieldList.map((FF) => {
				const ReactComponent = FormInputMap[FF.type]

				return (
					<ReactComponent
						key={FF.key}
						formField={FF}
						formData={formData}
						formError={formError}
						onChange={onChange}
						options={
							FF.key === "provinceId"
								? provinceOpts
								: FF.key === "wardId"
								? wardOpts
								: []
						}
					/>
				)
			})}
		</Fragment>
	)
}

export default UserAddressForm

const FormFieldList = [
	{
		key: "provinceId",
		name: "Địa chỉ tỉnh",
		type: "select",
		options: [],
		checkDisabled: () => false,
	},
	{
		key: "wardId",
		name: "Địa chỉ xã",
		type: "select",
		checkDisabled: (FData) => !FData?.provinceId,
	},
	{
		key: "street",
		name: "Địa chỉ nhà",
		type: "text",
		checkDisabled: (FData) => !FData?.wardId,
	},
]

const FormInputMap = {
	text: ({
		formField: FF,
		formData: FData,
		formError: FErr,
		onChange,
	}) => {
		return (
			<div key={FF.key}>
				<div className='flex flex-col'>
					<motion.label
						className='text-black/70 text-[1.4rem] font-[600]'
						htmlFor={FF.key}
					>
						{FF.name}
					</motion.label>
					<motion.input
						id={FF.key}
						className='
              py-1 w-full outline-none border-[1px] border-gray-500/60 px-4 rounded-xl
              bg-slate-200 disabled:bg-slate-300'
						whileFocus={{
							borderColor: "#2563eb",
							color: "#172554",
						}}
						style={{
							borderColor:
								FErr[FF.key] == ""
									? "rgb(107 114 128)" // gray-500
									: "rgb(239 68 68)", // red-500
						}}
						name={FF.key}
						type={FF.type}
						value={FData[FF.key]}
						onChange={(e) => onChange(e)}
						disabled={FF.checkDisabled(FData)}
					/>
				</div>
				<h2 className='error-message text-[1rem] mt-2 text-red-500'>
					{FErr[FF.key]}
				</h2>
			</div>
		)
	},

	select: ({
		formField: FF,
		formData: FData,
		formError: FErr,
		onChange,
		options,
	}) => {
		return (
			<div key={FF.key}>
				<div className='flex flex-col'>
					<motion.label
						className='text-black/70 text-[1.4rem] font-[600]'
						htmlFor={FF.key}
					>
						{FF.name}
					</motion.label>
					<motion.select
						id={FF.key}
						className='
              py-1 w-full outline-none border-[1px] border-gray-500/60 px-4 rounded-xl
              bg-slate-200 disabled:bg-slate-300'
						whileFocus={{
							borderColor: "#2563eb",
							color: "#172554",
						}}
						style={{
							borderColor: FErr[FF.key] === "" ? "gray" : "red",
						}}
						name={FF.key}
						value={FData[FF.key]}
						onChange={(e) => onChange(e)}
						disabled={FF.checkDisabled(FData)}
					>
						{options.map((o, i) => (
							<option key={i} value={o.key}>
								{o.name}
							</option>
						))}
					</motion.select>
				</div>
				<h2 className='error-message text-[1rem] mt-2 text-red-500'>
					{FErr[FF.key]}
				</h2>
			</div>
		)
	},
}
