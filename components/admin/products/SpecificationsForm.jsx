"use client"
import {
	IoAddCircleOutline,
	IoRemoveCircleOutline,
} from "react-icons/io5"

const SpecificationsForm = ({
	specifications,
	setSpecifications,
	action,
}) => {
	// Nhóm các specifications theo group name để hiển thị
	const groups = specifications.reduce((acc, spec) => {
		const groupName = spec.group || "Chưa phân nhóm"
		if (!acc[groupName]) acc[groupName] = []
		acc[groupName].push(spec)
		return acc
	}, {})

	const groupNames = Object.keys(groups)

	// Thêm một hàng mới vào một group
	const addRow = (groupName) => {
		setSpecifications([
			...specifications,
			{ name: "", value: "", group: groupName },
		])
	}

	// Xóa một hàng cụ thể
	const removeRow = (indexToRemove) => {
		setSpecifications(
			specifications.filter(
				(_, index) => index !== indexToRemove
			)
		)
	}

	// Cập nhật giá trị input
	const handleUpdate = (index, field, val) => {
		const newSpecs = [...specifications]
		newSpecs[index][field] = val
		setSpecifications(newSpecs)
	}

	// Thêm một group mới
	const addGroup = () => {
		const newGroupName = `Nhóm mới ${groupNames.length + 1}`
		setSpecifications([
			...specifications,
			{ name: "", value: "", group: newGroupName },
		])
	}

	// Xóa toàn bộ group
	const removeGroup = (groupName) => {
		setSpecifications(
			specifications.filter((spec) => spec.group !== groupName)
		)
	}

	// Đổi tên group cho tất cả các con thuộc group đó
	const renameGroup = (oldName, newName) => {
		setSpecifications(
			specifications.map((spec) =>
				spec.group === oldName
					? { ...spec, group: newName }
					: spec
			)
		)
	}

	return (
		<div>
			<div className='flex justify-between items-center mt-14 border-t pt-4'>
				{action === "ADD" && (
					<h1 className='text-3xl font-[600] bg-blue-500/30 rounded-2xl inline-block p-2 mb-2'>
						Thông số kỹ thuật
					</h1>
				)}

				{action === "UPDATE" && (
					<h3 className='text-[2.2rem] font-semibold'>
						Thông số kỹ thuật
					</h3>
				)}
			</div>

			<div className='flex flex-col gap-4'>
				{groupNames.map((groupName) => (
					<div
						key={groupName}
						className='flex gap-4 mt-8 border-b pb-6'
					>
						{/* Cột bên trái: Tên Group */}
						<div className='flex-[3] flex flex-col gap-2'>
							<label className='text-black/50 text-[1.4rem]'>
								Nhóm thông số
							</label>
							<div className='flex items-center gap-2'>
								<input
									className='w-full outline-none border-b-2 border-blue-200 font-bold p-2 focus:border-blue-500'
									value={groupName}
									onChange={(e) =>
										renameGroup(groupName, e.target.value)
									}
								/>
								<td className='py-2 text-center'>
									<IoRemoveCircleOutline
										className='ml-1 mr-4 text-black/60 hover:text-red-500 cursor-pointer transition-colors'
										size={20}
										onClick={() => removeGroup(groupName)}
									/>
								</td>
							</div>
						</div>

						{/* Cột bên phải: Table chi tiết */}
						<div className='flex-[7]'>
							<table className='w-full border-collapse'>
								<thead>
									<tr className='text-left text-[1.4rem] text-black/40'>
										<th className='pb-2 font-medium'>Thông số</th>
										<th className='pb-2 font-medium'>Giá trị</th>
										<th className='pb-2 w-10'></th>
									</tr>
								</thead>
								<tbody>
									{specifications.map((spec, index) => {
										if (spec.group !== groupName) return null
										return (
											<tr key={index} className='group'>
												<td className='py-2 pr-2'>
													<input
														className='w-full outline-none border p-2 rounded-lg focus:border-blue-500'
														placeholder='Nhập thông số'
														value={spec.name}
														onChange={(e) =>
															handleUpdate(index, "name", e.target.value)
														}
													/>
												</td>
												<td className='py-2'>
													<input
														className='w-full outline-none border p-2 rounded-lg focus:border-blue-500'
														placeholder='Nhập giá trị'
														value={spec.value}
														onChange={(e) =>
															handleUpdate(index, "value", e.target.value)
														}
													/>
												</td>
												<td className='py-2 text-center'>
													<IoRemoveCircleOutline
														className='ml-4 text-black/60 hover:text-red-500 cursor-pointer transition-colors'
														size={20}
														onClick={() => removeRow(index)}
													/>
												</td>
											</tr>
										)
									})}
								</tbody>
							</table>

							<button
								type='button'
								onClick={() => addRow(groupName)}
								className='mt-3 text-black/60 hover:text-blue-500 text-[1.4rem] font-medium'
							>
								<IoAddCircleOutline size={20} />
							</button>
						</div>
					</div>
				))}

				<button
					type='button'
					onClick={addGroup}
					className='mt-1 text-black/60 hover:text-blue-500 text-[1.4rem] font-medium'
				>
					<IoAddCircleOutline size={20} />
				</button>
			</div>
		</div>
	)
}

export default SpecificationsForm
