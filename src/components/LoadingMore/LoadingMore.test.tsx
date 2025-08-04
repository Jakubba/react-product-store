import React from 'react'
import { render, screen } from '@testing-library/react'
import LoadingMore from './LoadingMore'

describe('LoadingMore', () => {
  it('renders spinner and loading text', () => {
    render(<LoadingMore />)

    // Sprawdzamy, czy spinner jest widoczny
    const spinner = screen.getByRole('status')

    // Możemy sprawdzić istnienie elementu z klasą animate-spin
    const spinnerDiv = document.querySelector('.animate-spin')
    expect(spinnerDiv).toBeInTheDocument()

    // Sprawdzamy, czy tekst się wyświetla
    const loadingText = screen.getByText(/Loading more products.../i)
    expect(loadingText).toBeInTheDocument()
  })
})
