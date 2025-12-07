import React from "react"
import { motion } from "framer-motion"

const containerStyle = {
	position: "relative",
	width: "3rem",
	height: "3rem",
	boxSizing: "border-box",
}

const circleStyle = {
	display: "block",
	width: "3rem",
	height: "3rem",
	border: "0.5rem solid #e9e9e9",
	borderTop: "0.5rem solid #3498db",
	borderRadius: "50%",
	position: "absolute",
	boxSizing: "border-box",
	top: 0,
	left: 0,
}

const redStyle = {
	display: "block",
	width: "3rem",
	height: "3rem",
	border: "0.5rem solid #e9e9e9",
	borderTop: "0.5rem solid #e74c3c",
	borderRadius: "50%",
	position: "absolute",
	boxSizing: "border-box",
	top: 0,
	left: 0,
}

const spinTransition = {
	loop: Infinity,
	ease: "linear",
	duration: 1,
}

export default function CircleLoader({ type = "blue" }) {
	if (type === "red")
		return (
			<div style={containerStyle}>
				<motion.span
					style={redStyle}
					animate={{ rotate: 360 }}
					transition={spinTransition}
					className='bg-blue-500'
				/>
			</div>
		)

	return (
		<div style={containerStyle}>
			<motion.span
				style={circleStyle}
				animate={{ rotate: 360 }}
				transition={spinTransition}
			/>
		</div>
	)
}
