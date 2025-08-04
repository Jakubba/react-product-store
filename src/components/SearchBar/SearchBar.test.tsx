import React, { act } from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import SearchBar from './SearchBar'

jest.useFakeTimers()

describe('SearchBar', () => {
  it('renderuje pole wyszukiwania i ikonę', () => {
    render(<SearchBar onSearch={() => {}} searchValue="" />)

    const input = screen.getByRole('textbox', {
      name: /search for products/i,
    })

    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('placeholder', 'Search for products')
  })

  it('wywołuje onSearch z opóźnieniem po wpisaniu tekstu', async () => {
    const onSearchMock = jest.fn()
    render(<SearchBar onSearch={onSearchMock} searchValue="example" />)

    const input = screen.getByRole('textbox')

    fireEvent.change(input, { target: { value: 'buty' } })

    expect(onSearchMock).not.toHaveBeenCalled()

    act(() => {
      jest.advanceTimersByTime(500)
    })

    await waitFor(() => {
      expect(onSearchMock).toHaveBeenCalledWith('buty')
    })
  })

  it('czyści poprzedni timeout przy szybkim wpisywaniu', () => {
    const onSearchMock = jest.fn()
    render(<SearchBar onSearch={onSearchMock} searchValue="example" />)

    const input = screen.getByRole('textbox')

    // Wpisanie pierwszego ciągu znaków
    fireEvent.change(input, { target: { value: 'bu' } })
    act(() => {
      jest.advanceTimersByTime(300)
    })

    // Zmiana wartości przed upłynięciem debounce
    fireEvent.change(input, { target: { value: 'buty' } })
    act(() => {
      jest.advanceTimersByTime(200)
    })

    expect(onSearchMock).not.toHaveBeenCalled()

    act(() => {
      jest.advanceTimersByTime(300)
    })

    expect(onSearchMock).toHaveBeenCalledWith('buty')
  })
})
