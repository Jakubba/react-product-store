import { useEffect, useState } from 'react'

export const useSearchQuery = (query: string, setQuery: (q: string) => void) => {
  const [searchTerm, setSearchTerm] = useState(query)

  useEffect(() => {
    setSearchTerm(query)
  }, [query])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setQuery(searchTerm)
    }, 500)
    return () => clearTimeout(timeout)
  }, [searchTerm, setQuery])

  return { searchTerm, setSearchTerm }
}
