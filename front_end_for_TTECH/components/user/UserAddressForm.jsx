"use client"
import { Fragment } from "react"
import { motion } from "framer-motion"

const UserAddressForm = ({
	formData,
	formError,
	onChange,
}) => {
	return (
		<Fragment>
			{FormFieldList.map((FF) => {
				const ReactComponent = FormInputMap[FF.type]

				return (
					<ReactComponent
						formField={FF}
						formData={formData}
						formError={formError}
						onChange={onChange}
					/>
				)
			})}
		</Fragment>
	)
}

export default UserAddressForm

const FormFieldList = [
	{
		key: "province",
		name: "Địa chỉ tỉnh",
		type: "select",
		options: [
			{
				key: "",
				name: "",
			},
			{
				key: "HN",
				name: "HN",
			},
			{
				key: "HCM",
				name: "HCM",
			},
		],
	},
	{
		key: "ward",
		name: "Địa chỉ xã",
		type: "select",
		options: [
			{
				key: "",
				name: "",
			},
			{
				key: "HN",
				name: "HN",
			},
			{
				key: "HCM",
				name: "HCM",
			},
		],
	},
	{
		key: "street",
		name: "Địa chỉ nhà",
		type: "text",
	},
]

const FormInputMap = {
	text: ({ formField, formData, formError, onChange }) => {
		const FF = formField
		const FD = formData
		const FE = formError
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
						className='py-1 w-full outline-none border-[1px] border-gray-500/60 px-4 rounded-xl bg-slate-200'
						whileFocus={{
							borderColor: "#2563eb",
							color: "#172554",
						}}
						style={{
							borderColor: FE[FF.key] == "" ? "gray" : "red",
						}}
						name={FF.key}
						type={FF.type}
						value={FD[FF.key]}
						onChange={(e) => onChange(e)}
					/>
				</div>
				<h2 className='error-message text-[1rem] mt-2 text-red-500'>
					{FE[FF.key]}
				</h2>
			</div>
		)
	},

	select: ({ formField, formData, formError, onChange }) => {
		const FF = formField
		const FData = formData
		const FErr = formError
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
						className='py-1 w-full outline-none border-[1px] border-gray-500/60 px-4 rounded-xl bg-slate-200'
						whileFocus={{
							borderColor: "#2563eb",
							color: "#172554",
						}}
						style={{
							borderColor: FErr[FF.key] == "" ? "gray" : "red",
						}}
						name={FF.key}
						value={FData[FF.key]}
						onChange={(e) => onChange(e)}
					>
						{FF.options.map((o) => (
							<option value={o.key}>{o.name}</option>
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
