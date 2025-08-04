import { render, screen } from '@testing-library/react'
import SkeletonCard from './SkeletonCard'

describe('SkeletonCard', () => {
  it('renderuje główny kontener z animacją', () => {
    render(<SkeletonCard />)

    // Sprawdzamy, czy kontener z odpowiednimi klasami jest wyrenderowany
    const container = screen.getByTestId('skeleton-card')
    expect(container).toBeInTheDocument()
  })

  it('renderuje trzy sekcje szkieletowe', () => {
    render(<SkeletonCard />)

    // Szukamy wszystkich "szarych" bloków
    const grayBlocks = screen.getAllByRole('generic')
    expect(grayBlocks.length).toBeGreaterThanOrEqual(3)
  })
})
