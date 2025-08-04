import React from 'react'
import { render, screen } from '@testing-library/react'
import NoProducts from './NoProducts'

describe('NoProducts', () => {
  it('renders the no products message', () => {
    render(<NoProducts />)

    const message = screen.getByText(/no products to display\./i)
    expect(message).toBeInTheDocument()
    expect(message).toHaveClass('text-center', 'text-gray-500', 'text-lg')
  })
})
