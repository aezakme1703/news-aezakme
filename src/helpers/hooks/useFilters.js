import { useState } from "react"

export const useFilters = (initialFilter) => {
  const [ filters, setFilters ] = useState(initialFilter)
  const changeFilter = (key, value) => {
    setFilters(prev => {
      return {...prev, [key]: value}
    })
  }

  return {filters, changeFilter}
}