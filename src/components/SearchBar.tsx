import React, { useState } from 'react';
import type { ChangeEvent } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [value, setValue] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className='relative w-72'>
      <input
        type='text'
        className='w-full text-[#964F52] rounded-[16px] bg-[#F2E8E8] py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-pink-200 brown-placeholder'
        placeholder='Search for products'
        value={value}
        onChange={handleChange}
      />
      <Search className='absolute left-3 top-2.5 text-[#964F52]' size={20} />
    </div>
  );
};

export default SearchBar;
