import { render, screen, fireEvent } from '@testing-library/react'
import ScrollToTopButton from './ScrollToTopButton'

describe('ScrollToTopButton', () => {
  beforeEach(() => {
    // Resetowanie funkcji scrollTo i położenia scrolla przed każdym testem
    window.scrollTo = jest.fn()
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 0,
    })
  })

  it('nie pokazuje przycisku początkowo', () => {
    render(<ScrollToTopButton />)

    const button = screen.getByRole('button', { name: /scroll to top/i })

    // Oczekujemy, że przycisk będzie niewidoczny na początku
    expect(button).toHaveClass('opacity-0 pointer-events-none')
  })

  it('pokazuje przycisk po przewinięciu w dół', () => {
    render(<ScrollToTopButton />)

    // Symulujemy przewinięcie strony
    window.scrollY = 200
    fireEvent.scroll(window)

    const button = screen.getByRole('button', { name: /scroll to top/i })

    // Oczekujemy, że przycisk stanie się widoczny
    expect(button).toHaveClass('opacity-100')
  })

  it('przewija do góry po kliknięciu przycisku', () => {
    render(<ScrollToTopButton />)

    // Symulujemy przewinięcie, żeby przycisk był widoczny
    window.scrollY = 200
    fireEvent.scroll(window)

    const button = screen.getByRole('button', { name: /scroll to top/i })

    // Klikamy w przycisk
    fireEvent.click(button)

    // Oczekujemy, że funkcja window.scrollTo zostanie wywołana z odpowiednimi parametrami
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    })
  })
})
