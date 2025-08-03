import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Home from './Home'

let productsMock = []
let loadingMock = false
let errorMock = null
let hasMoreMock = true

const fetchProductsMock = jest.fn()
const setQueryMock = jest.fn()

jest.mock('../../services/productStore', () => ({
  useProductStore: () => ({
    products: productsMock,
    loading: loadingMock,
    error: errorMock,
    fetchProducts: fetchProductsMock,
    hasMore: hasMoreMock,
    query: '',
    setQuery: setQueryMock,
  }),
}))

jest.mock('../../components/Header/Header', () => (props: any) => (
  <div data-testid="header">
    <button onClick={() => props.onSearch && props.onSearch('test')}>Search</button>
    Header
  </div>
))

jest.mock('../../components/ProductSection/ProductSection', () => (props: any) => (
  <div data-testid="product-section">
    {props.title}
    {props.products.map((p: any) => (
      <div key={p.id} data-testid="product">
        {p.title}
      </div>
    ))}
    {props.lastProductRef && <div data-testid="last-product-ref" />}
  </div>
))

describe('Komponent Home', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    productsMock = [
      { id: 1, title: 'Produkt 1', price: 10, thumbnail: 'thumb1.jpg' },
      { id: 2, title: 'Produkt 2', price: 20, thumbnail: 'thumb2.jpg' },
      { id: 3, title: 'Produkt 3', price: 30, thumbnail: 'thumb3.jpg' },
      { id: 4, title: 'Produkt 4', price: 40, thumbnail: 'thumb4.jpg' },
      { id: 5, title: 'Produkt 5', price: 50, thumbnail: 'thumb5.jpg' },
      { id: 6, title: 'Produkt 6', price: 60, thumbnail: 'thumb6.jpg' },
      { id: 7, title: 'Produkt 7', price: 70, thumbnail: 'thumb7.jpg' },
    ]
    loadingMock = false
    errorMock = null
    hasMoreMock = true
  })

  it('renderuje sekcje produktów i header', () => {
    render(<Home />)

    expect(screen.getByTestId('header')).toBeInTheDocument()
    expect(screen.getAllByTestId('product-section')).toHaveLength(2)
    expect(screen.getByText('Featured Products')).toBeInTheDocument()
    expect(screen.getByText('New Arrivals')).toBeInTheDocument()
    expect(screen.getAllByTestId('product')).toHaveLength(7)
    expect(screen.getByTestId('last-product-ref')).toBeInTheDocument()
  })

  it('pokazuje komunikat o błędzie i przycisk retry', () => {
    productsMock = []
    loadingMock = false
    errorMock = 'Błąd ładowania'
    hasMoreMock = false

    render(<Home />)

    expect(screen.getByText('Błąd ładowania')).toBeInTheDocument()
    const btn = screen.getByRole('button', { name: /retry fetching products/i })
    expect(btn).toBeInTheDocument()

    fireEvent.click(btn)
    expect(fetchProductsMock).toHaveBeenCalled()
  })

  it('pokazuje loading placeholder gdy ładuje i brak produktów', () => {
    productsMock = []
    loadingMock = true
    errorMock = null

    render(<Home />)

    expect(screen.getByTestId('loading')).toBeInTheDocument()
  })

  it('obsługuje wyszukiwanie i przekazuje wartość do setQuery', () => {
    render(<Home />)

    const header = screen.getByTestId('header')
    fireEvent.click(screen.getByText('Search'))

    expect(setQueryMock).toHaveBeenCalledWith('test')
  })
})
