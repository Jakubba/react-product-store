import * as React from 'react'
import { render, screen } from '@testing-library/react'
import ProductSection from './ProductSection'
import type { Product } from '../../services/productStore'

jest.mock('../ProductCard/ProductCard.tsx', () =>
  React.forwardRef<HTMLDivElement, { product: Product }>((props, ref) => (
    <div ref={ref} data-testid="mock-product-card">
      {props.product.title}
    </div>
  )),
)

const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Produkt A',
    price: 10,
    thumbnail: './../../assets/image/test-product-image.jpg',
  },
  {
    id: 2,
    title: 'Produkt B',
    price: 20,
    thumbnail: './../../assets/image/test-product-image-2.png',
  },
  {
    id: 3,
    title: 'Produkt C',
    price: 30,
    thumbnail: './../../assets/image/test-product-image-3.png',
  },
]

describe('Komponent ProductSection', () => {
  it('wyświetla tytuł sekcji oraz wszystkie produkty', async () => {
    const { findAllByTestId } = render(
      <ProductSection title="Polecane" products={mockProducts} loading={false} />,
    )
    // Sprawdza, czy tytuł sekcji jest wyświetlany
    expect(screen.getByText('Polecane')).toBeInTheDocument()
    // czekaj aż produkty się załadują
    const cards = await findAllByTestId('mock-product-card')
    expect(cards.length).toBe(mockProducts.length)
    // Sprawdza, czy tytuły produktów są widoczne
    mockProducts.forEach((product) => {
      expect(screen.getByText(product.title)).toBeInTheDocument()
    })
  })

  it('przekazuje lastProductRef tylko do ostatniego produktu', () => {
    const refMock = jest.fn()
    render(
      <ProductSection
        title="Ostatni ref"
        products={mockProducts}
        loading={false}
        lastProductRef={refMock}
      />,
    )
    expect(refMock).toHaveBeenCalledTimes(1)
    const calledWith = refMock.mock.calls[0][0]
    expect(calledWith).toBeInstanceOf(HTMLElement)
  })
})
