import { render, screen } from '@testing-library/react'
import SkeletonTitle from './SkeletonTitle'

describe('SkeletonTitle', () => {
  it('renderuje szkieletowy tytuł', () => {
    render(<SkeletonTitle />)

    // Szukamy elementu z klasą, która odpowiada skeletonowi
    const skeleton = screen.getByTestId('skeleton-title')
    expect(skeleton).toBeInTheDocument()
  })

  it('posiada odpowiednie klasy CSS', () => {
    render(<SkeletonTitle />)

    const skeleton = screen.getByTestId('skeleton-title')
    expect(skeleton).toHaveClass('h-7', 'w-40', 'bg-gray-300', 'rounded', 'mb-4', 'animate-pulse')
  })
})
