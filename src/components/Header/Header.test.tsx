import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { act } from 'react'
import Header from './Header'

jest.useFakeTimers()

describe('Header', () => {
  it('renderuje logo, tytuł oraz pasek wyszukiwania', () => {
    const onSearchMock = jest.fn()

    render(<Header onSearch={onSearchMock} />)

    const logoImage = screen.getByAltText(/logo image/i)
    expect(logoImage).toBeInTheDocument()

    const title = screen.getByText(/ShopOnline/i)
    expect(title).toBeInTheDocument()

    const searchInput = screen.getByRole('textbox')
    expect(searchInput).toBeInTheDocument()
  })

  it('wywołuje onSearch po debounce, gdy użytkownik wpisuje tekst', async () => {
    const onSearchMock = jest.fn()

    render(<Header onSearch={onSearchMock} />)

    const searchInput = screen.getByRole('textbox')

    // symulujemy wpisanie tekstu w pole wyszukiwania
    fireEvent.change(searchInput, { target: { value: 'test product' } })

    // na początku funkcja onSearch nie powinna być wywołana (debounce)
    expect(onSearchMock).not.toHaveBeenCalled()

    // przesuwamy czas o 500ms (czas debounce)
    act(() => {
      jest.advanceTimersByTime(500)
    })

    // czekamy aż onSearch zostanie wywołana z podanym tekstem
    await waitFor(() => {
      expect(onSearchMock).toHaveBeenCalledWith('test product')
    })
  })

  it('wywołuje onSearch, gdy użytkownik szybko wpisuje tekst, a potem naciska Enter', async () => {
    const onSearchMock = jest.fn()

    render(<Header onSearch={onSearchMock} />)

    const searchInput = screen.getByRole('textbox')

    // wpisujemy tekst
    fireEvent.change(searchInput, { target: { value: 'new product' } })
    // symulujemy naciśnięcie klawisza Enter
    fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' })

    // przesuwamy czas o 500ms
    act(() => {
      jest.advanceTimersByTime(500)
    })

    // czekamy na wywołanie onSearch z wpisanym tekstem
    await waitFor(() => {
      expect(onSearchMock).toHaveBeenCalledWith('new product')
    })

    // sprawdzamy, że onSearch został wywołany dokładnie 1 raz
    expect(onSearchMock).toHaveBeenCalledTimes(1)
  })
})
