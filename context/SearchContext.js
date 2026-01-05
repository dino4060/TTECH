"use client"

import React, {
	createContext,
	useContext,
	useState,
	useCallback,
} from "react"

const initialParam = {
	keywords: "",
	category: 0,
}

const SearchContext = createContext(undefined)

export function SearchProvider({ children }) {
	const [param, setParam] = useState(initialParam)

	const setKeywords = useCallback((keywords) => {
		setParam((prev) => ({ ...prev, keywords }))
	}, [])

	const setCategory = useCallback((category) => {
		setParam((prev) => ({
			...prev,
			category: Number(category),
		}))
	}, [])

	const setNewParam = useCallback((newParam) => {
		setParam(newParam)
	}, [])

	const resetParam = useCallback(() => {
		setParam(initialParam)
	}, [])

	return (
		<SearchContext.Provider
			value={{
				param,
				setKeywords,
				setCategory,
				setNewParam,
				resetParam,
			}}
		>
			{children}
		</SearchContext.Provider>
	)
}

export function useSearch() {
	const context = useContext(SearchContext)
	if (context === undefined) {
		throw new Error(
			"useSearch must be used within a SearchProvider"
		)
	}
	return context
}
