"use client"
import { copyId } from "@/lib/utils"
import {
	createContext,
	useContext,
	useEffect,
	useState,
} from "react"

// Tạo Context
const IdContext = createContext()

// Provider Component
export const IdProvider = ({ children }) => {
	const [id, setId] = useState(null)

	const onCopyId = (id) => {
		copyId(id)
		setId(id)
	}

	const value = { id, setId, onCopyId }

	return (
		<IdContext.Provider value={value}>
			{children}
		</IdContext.Provider>
	)
}

// Custom Hook
export const useIdContext = (isRefresh = false) => {
	const context = useContext(IdContext)

	if (!context) {
		alert("useIdContext phải được sử dụng trong IdProvider")
	}

	const { id, setId, onCopyId } = context

	useEffect(() => {
		if (isRefresh) {
			setId(null)
		}
	}, [isRefresh])

	return { id, onCopyId }
}
