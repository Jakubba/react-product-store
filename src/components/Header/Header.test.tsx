import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Header from './Header'

jest.mock('../SearchBar/SearchBar', () => ({ onSearch, searchValue }: any) => (
  <input data-testid="search-bar" value={searchValue} onChange={(e) => onSearch(e.target.value)} />
))

describe('Header', () => {
  it('renders logo image and title', () => {
    render(<Header onSearch={() => {}} searchValue="" />)

    // Logo jest widoczne i ma poprawny alt
    const logoImage = screen.getByAltText('logo image')
    expect(logoImage).toBeInTheDocument()

    // Tytuł jest widoczny na większych ekranach
    const title = screen.getByText('ShopOnline')
    expect(title).toBeInTheDocument()
  })

  it('passes props to SearchBar and reacts to input changes', () => {
    const onSearchMock = jest.fn()
    const searchValue = 'test value'

    render(<Header onSearch={onSearchMock} searchValue={searchValue} />)

    const searchInput = screen.getByTestId('search-bar')
    expect(searchInput).toHaveValue(searchValue)

    // Symulujemy zmianę inputa
    fireEvent.change(searchInput, { target: { value: 'new value' } })

    expect(onSearchMock).toHaveBeenCalledWith('new value')
  })
})
