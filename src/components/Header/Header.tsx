import React from 'react'
import SearchBar from '../SearchBar/SearchBar'
import logo from './../../assets/image/logo-shopOnline.png'
import type { HeaderProps } from './Header.types'

const Header: React.FC<HeaderProps> = ({ onSearch, searchValue }) => {
  return (
    <div className="flex items-center justify-between  py-4 border-b border-gray-200 md:px-4 sm:px-10">
      <div className="flex items-center gap-4">
        <img className="w-auto h-[14px] object-contain" src={logo} alt="logo image" />
        <h1 className="hidden sm:block font-bold text-[18px] leading-[23px] tracking-[0px] font-[Plus Jakarta Sans]">
          ShopOnline
        </h1>
      </div>
      <SearchBar onSearch={onSearch}  searchValue={searchValue} />
    </div>
  )
}

export default React.memo(Header)
