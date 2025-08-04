import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Home from './Home'

jest.mock('../../services/productStore', () => ({
  useProductStore: jest.fn(),
}))

jest.mock('./../../hooks/useSearchQuery', () => ({
  useSearchQuery: jest.fn(),
}))

jest.mock('../../components/Header/Header', () => (props: any) => (
  <div data-testid="header">
    <button onClick={() => props.onSearch('query')} data-testid="search-btn">
      Search
    </button>
    <span>{props.searchValue}</span>
  </div>
))

jest.mock('../../components/ErrorRetry/ErrorRetry', () => (props: any) => (
  <div data-testid="error-retry" onClick={props.onRetry}>
    {props.error}
  </div>
))

jest.mock('../../components/NoProducts/NoProducts', () => () => (
  <div data-testid="no-products">No Products</div>
))

jest.mock('../../components/ProductsDisplay/ProductsDisplay', () => (props: any) => (
  <div data-testid="products-display">{props.products.length} products</div>
))

jest.mock('../../components/LoadingMore/LoadingMore', () => () => (
  <div data-testid="loading-more">Loading...</div>
))

jest.mock('../../components/ScrollToTopButton/ScrollToTopButton', () => () => (
  <div data-testid="scroll-to-top-button">Scroll to Top</div>
))

import { useProductStore } from '../../services/productStore'
import { useSearchQuery } from './../../hooks/useSearchQuery'

describe('Komponent Home', () => {
  const fetchProductsMock = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('wywołuje fetchProducts przy mount, gdy brak zapytania i produktów', () => {
    ;(useProductStore as unknown as jest.Mock).mockReturnValue({
      products: [],
      loading: false,
      error: '',
      fetchProducts: fetchProductsMock,
      query: '',
      setQuery: jest.fn(),
    })
    ;(useSearchQuery as jest.Mock).mockReturnValue({
      searchTerm: '',
      setSearchTerm: jest.fn(),
    })

    render(<Home />)

    expect(fetchProductsMock).toHaveBeenCalledWith(true)
  })

  it('renderuje poprawnie komponenty w zależności od stanu', () => {
    const setSearchTermMock = jest.fn()

    // Stan: error
    ;(useProductStore as unknown as jest.Mock).mockReturnValue({
      products: [],
      loading: false,
      error: 'Network error',
      fetchProducts: fetchProductsMock,
      query: '',
      setQuery: jest.fn(),
    })
    ;(useSearchQuery as jest.Mock).mockReturnValue({
      searchTerm: '',
      setSearchTerm: setSearchTermMock,
    })

    const { rerender } = render(<Home />)
    expect(screen.getByTestId('error-retry')).toHaveTextContent('Network error')

    // Stan: brak produktów, brak błędu, nie ładuje
    ;(useProductStore as unknown as jest.Mock).mockReturnValue({
      products: [],
      loading: false,
      error: '',
      fetchProducts: fetchProductsMock,
      query: '',
      setQuery: jest.fn(),
    })
    rerender(<Home />)
    expect(screen.getByTestId('no-products')).toBeInTheDocument()

    // Stan: są produkty, loading: false
    ;(useProductStore as unknown as jest.Mock).mockReturnValue({
      products: [{ id: 1 }, { id: 2 }],
      loading: false,
      error: '',
      fetchProducts: fetchProductsMock,
      query: '',
      setQuery: jest.fn(),
    })
    rerender(<Home />)
    expect(screen.getByTestId('products-display')).toHaveTextContent('2 products')

    // Stan: są produkty, loading: true (pokazuje "LoadingMore")
    ;(useProductStore as unknown as jest.Mock).mockReturnValue({
      products: [{ id: 1 }, { id: 2 }],
      loading: true,
      error: '',
      fetchProducts: fetchProductsMock,
      query: '',
      setQuery: jest.fn(),
    })
    rerender(<Home />)
    expect(screen.getByTestId('loading-more')).toBeInTheDocument()
  })

  it('przekazuje handleSearch do Header i aktualizuje searchValue', () => {
    const setSearchTermMock = jest.fn()

    ;(useProductStore as unknown as jest.Mock).mockReturnValue({
      products: [],
      loading: false,
      error: '',
      fetchProducts: fetchProductsMock,
      query: '',
      setQuery: jest.fn(),
    })
    ;(useSearchQuery as jest.Mock).mockReturnValue({
      searchTerm: 'initial',
      setSearchTerm: setSearchTermMock,
    })

    render(<Home />)

    const searchBtn = screen.getByTestId('search-btn')
    fireEvent.click(searchBtn)

    expect(setSearchTermMock).toHaveBeenCalledWith('query')
    expect(screen.getByText('initial')).toBeInTheDocument()
  })
})
