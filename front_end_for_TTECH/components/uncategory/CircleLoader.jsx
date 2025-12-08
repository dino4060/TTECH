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

const redContainerStyle = {
	position: "relative",
	width: "2rem",
	height: "2rem",
	boxSizing: "border-box",
}

const redCircleStyle = {
	display: "block",
	width: "2rem",
	height: "2rem",
	border: "0.4rem solid #e9e9e9",
	borderTop: "0.4rem solid #3498db", // #e74c3c",
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
			<div style={redContainerStyle}>
				<motion.span
					style={redCircleStyle}
					animate={{ rotate: 360 }}
					transition={spinTransition}
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
