import React, { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import type { SearchBarProps } from './SearchBar.types'

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [value, setValue] = useState('')

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(value)
    }, 500)

    return () => clearTimeout(handler)
  }, [value, onSearch])

  return (
    <div className="relative w-72">
      <input
        type="text"
        className="w-full text-[#964F52] rounded-[16px] bg-[#F2E8E8] py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-pink-200 brown-placeholder"
        placeholder="Search for products"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        aria-label="Search for products"
      />
      <Search
        className="absolute left-3 top-2.5 text-[#964F52]"
        size={20}
        aria-hidden="true"
        focusable="false"
      />
    </div>
  )
}

export default React.memo(SearchBar)
