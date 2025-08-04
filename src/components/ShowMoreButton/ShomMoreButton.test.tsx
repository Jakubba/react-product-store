import { render, screen, fireEvent } from '@testing-library/react'
import ShowMoreButton from './ShowMoreButton'

describe('ShowMoreButton', () => {
  it('renderuje przycisk z tekstem "Show More"', () => {
    render(<ShowMoreButton onClick={() => {}} />)

    // Szukamy przycisku po jego tekście
    const button = screen.getByRole('button', { name: /show more/i })
    expect(button).toBeInTheDocument()
  })

  it('wywołuje funkcję onClick po kliknięciu', () => {
    const handleClick = jest.fn()
    render(<ShowMoreButton onClick={handleClick} />)

    const button = screen.getByRole('button', { name: /show more/i })
    fireEvent.click(button)

    // Sprawdzamy, czy funkcja została wywołana
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('nie wywołuje onClick, jeśli przycisk jest zablokowany', () => {
    const handleClick = jest.fn()
    render(<ShowMoreButton onClick={handleClick} disabled />)

    const button = screen.getByRole('button', { name: /show more/i })

    // Kliknięcie przy zablokowanym przycisku
    fireEvent.click(button)

    // Funkcja nie powinna być wywołana
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('renderuje przycisk jako zablokowany, gdy przekazano prop "disabled"', () => {
    render(<ShowMoreButton onClick={() => {}} disabled />)

    const button = screen.getByRole('button', { name: /show more/i })

    // Sprawdzamy, czy przycisk jest faktycznie zablokowany
    expect(button).toBeDisabled()
  })
})
