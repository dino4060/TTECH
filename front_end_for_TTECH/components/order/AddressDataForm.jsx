"use client"
import { PROVINCES } from "@/lib/utils/shipping/provinces"
import { motion } from "framer-motion"
import { Fragment, useEffect, useState } from "react"

const AddressDataForm = ({
	formData,
	formError,
	onChangeValue,
}) => {
	const mapOptions = (list, placeholder) => [
		{ key: "", name: placeholder },
		...list.map(({ id: key, name }) => ({ key, name })),
	]
	const [provinceOpts, setProvinceOpts] = useState(
		mapOptions(PROVINCES, "Chọn địa chỉ tỉnh")
	)
	const [wardOpts, setWardOpts] = useState(
		mapOptions([], "Chọn địa chỉ xã")
	)

	useEffect(() => {
		if (!formData.provinceId) {
			setWardOpts(mapOptions([], "Chọn địa chỉ xã"))
			return
		}

		const PROVINCE = PROVINCES.find(
			(p) => p.id == formData.provinceId
		)
		const WARDS = PROVINCE ? PROVINCE.wards : []
		if (WARDS.length === 0) {
			setWardOpts(mapOptions([], "Chọn địa chỉ xã"))
			return
		}

		setWardOpts(mapOptions(WARDS, "Chọn địa chỉ xã"))
	}, [formData])

	return (
		<Fragment>
			{FormFieldList.map((FF) => {
				const ReactComponent = FormInputMap[FF.type]
				return (
					<ReactComponent
						formField={FF}
						formData={formData}
						formError={formError}
						onChangeValue={onChangeValue}
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

export default AddressDataForm

export const FormFieldList = [
	{
		key: "provinceId",
		name: "Địa chỉ tỉnh",
		required: true,
		placeholder: "Chọn địa chỉ tỉnh",
		type: "select",
		options: [],
	},
	{
		key: "wardId",
		name: "Địa chỉ xã",
		required: true,
		placeholder: "Chọn địa chỉ xã",
		type: "select",
	},
	{
		key: "street",
		name: "Địa chỉ nhà",
		required: true,
		placeholder: "Nhập địa chỉ nhà",
		type: "text",
	},
]

const FormInputMap = {
	text: ({
		formField: FF,
		formData: FData,
		formError: FErr,
		onChangeValue,
	}) => {
		return (
			<div key={FF.key}>
				<div className='flex flex-col'>
					<label className='text-xl mb-1'>{FF.name}</label>
					<motion.input
						id={FF.key}
						className='border-none outline-none bg-transparent text-2xl origin-top-left'
						whileFocus={{
							margin: 4,
							scale: 1.2,
						}}
						type='text'
						placeholder={FF.placeholder}
						value={FData[FF.key]}
						onChange={(e) => onChangeValue(e, FF)}
					/>
				</div>
				<h2 className='text-red-500 mt-1 text-left text-md'>
					{FErr[FF.key]}
				</h2>
			</div>
		)
	},

	select: ({
		formField: FF,
		formData: FData,
		formError: FErr,
		onChangeValue,
		options,
	}) => {
		return (
			<div key={FF.key}>
				<div className='flex flex-col'>
					<label className='text-xl mb-1'>{FF.name}</label>
					<motion.select
						id={FF.key}
						className='border-none outline-none bg-transparent text-2xl origin-top-left'
						placeholder={FF.placeholder}
						value={FData[FF.key]}
						onChange={(e) => onChangeValue(e, FF)}
					>
						{options.map((o) => (
							<option key={o.name} value={o.key}>
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
