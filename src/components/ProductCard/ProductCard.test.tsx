import { render, screen, act, waitFor } from '@testing-library/react'
import ProductCard from './ProductCard'
import React from 'react'

const mockProduct = {
  id: 1,
  title: 'Testowy Produkt',
  price: 29.99,
  thumbnail: './../../assets/image/test-product-image.jpg',
} as const

describe('ProductCard', () => {
  it('wyświetla tytuł produktu, cenę oraz obrazek', () => {
    render(<ProductCard product={mockProduct} />)

    const title = screen.getByText(/Testowy Produkt/i)
    expect(title).toBeInTheDocument()

    const price = screen.getByText(/\$29\.99/)
    expect(price).toBeInTheDocument()

    const image = screen.getByAltText(/Testowy Produkt/i) as HTMLImageElement
    expect(image).toBeInTheDocument()

    expect(image.src).toContain('test-product-image.jpg')
  })

  it('ukrywa placeholder i pokazuje obrazek po załadowaniu', async () => {
    render(<ProductCard product={mockProduct} />)

    const image = screen.getByAltText(/Testowy Produkt/i) as HTMLImageElement

    expect(image).toHaveClass('opacity-0')

    // ręcznie wywołujemy event 'load' na obrazku
    act(() => {
      image.dispatchEvent(new Event('load'))
    })

    // czekamy aż klasa się zmieni na opacity-100
    await waitFor(() => {
      expect(image).toHaveClass('opacity-100')
    })
  })
})
