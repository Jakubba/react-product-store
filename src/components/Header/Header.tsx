import React from 'react'
import SearchBar from '../SearchBar/SearchBar'
import logo from './../../assets/image/logo-shopOnline.png'
import type { HeaderProps } from './Header.types'

const Header: React.FC<HeaderProps> = ({ onSearch, searchValue }) => {
  return (
    <div className="flex items-center w-full justify-between  border-b border-gray-200 fixed top-0 left-0 bg-white z-50">
      <div className="flex items-center justify-between w-full py-4 px-4 sm:px-10  max-w-[1200px] mx-auto">
        <div className="flex items-center gap-4">
          <img className="w-auto h-[14px] object-contain" src={logo} alt="logo image" />
          <h1 className="hidden sm:block font-bold text-[18px] leading-[23px] tracking-[0px] font-[Plus Jakarta Sans]">
            ShopOnline
          </h1>
        </div>
        <SearchBar onSearch={onSearch} searchValue={searchValue} />
      </div>
    </div>
  )
}

export default React.memo(Header)
