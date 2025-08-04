import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import ErrorRetry from './ErrorRetry'

describe('ErrorRetry', () => {
  const errorMessage = 'Something went wrong'
  const onRetryMock = jest.fn()

  beforeEach(() => {
    onRetryMock.mockClear()
  })

  it('renderuje komunikat błędu', () => {
    render(<ErrorRetry error={errorMessage} onRetry={onRetryMock} />)

    // Sprawdzamy, czy komunikat błędu jest widoczny
    const errorText = screen.getByText(errorMessage)
    expect(errorText).toBeInTheDocument()
    expect(errorText).toHaveClass('text-red-500', 'font-bold')
  })

  it('wywołuje onRetry po kliknięciu przycisku', () => {
    render(<ErrorRetry error={errorMessage} onRetry={onRetryMock} />)

    const button = screen.getByRole('button', { name: /try again/i })
    expect(button).toBeInTheDocument()

    fireEvent.click(button)

    expect(onRetryMock).toHaveBeenCalledTimes(1)
  })
})
