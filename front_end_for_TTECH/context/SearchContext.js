"use client"

import React, {
	createContext,
	useContext,
	useState,
	useCallback,
} from "react"

const initialCriteria = {
	keyword: "",
	category: 0,
}

const SearchContext = createContext(undefined)

export function SearchProvider({ children }) {
	const [criteria, setCriteriaState] =
		useState(initialCriteria)

	const setKeyword = useCallback((keyword) => {
		setCriteriaState((prev) => ({ ...prev, keyword }))
	}, [])

	const setCategory = useCallback((category) => {
		setCriteriaState((prev) => ({
			...prev,
			category: Number(category),
		}))
	}, [])

	const setCriteria = useCallback((newCriteria) => {
		setCriteriaState(newCriteria)
	}, [])

	const resetCriteria = useCallback(() => {
		setCriteriaState(initialCriteria)
	}, [])

	return (
		<SearchContext.Provider
			value={{
				criteria,
				setKeyword,
				setCategory,
				setCriteria,
				resetCriteria,
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
