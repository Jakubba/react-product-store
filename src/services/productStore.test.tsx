import { act, renderHook, waitFor } from '@testing-library/react'
import { useProductStore } from './productStore'
import { PRODUCTS_LIMIT } from '../config/constants'

jest.mock('../utils/retryFetch', () => ({
  retryFetch: jest.fn(),
}))

import { retryFetch } from '../utils/retryFetch'

describe('useProductStore', () => {
  const mockProducts = Array.from({ length: PRODUCTS_LIMIT }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
  }))

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('fetchProducts ładuje produkty i aktualizuje stan', async () => {
    ;(retryFetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ products: mockProducts }),
    })

    const { result } = renderHook(() => useProductStore())

    act(() => {
      result.current.fetchProducts(true)
    })

    expect(result.current.loading).toBe(true)

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.products.length).toBeLessThanOrEqual(60)
    expect(result.current.page).toBe(2)
    expect(result.current.hasMore).toBe(true)
    expect(result.current.error).toBeNull()
  })

  it('fetchProducts dokłada kolejne produkty przy reset=false', async () => {
    ;(retryFetch as jest.Mock).mockResolvedValue({
      json: async () => ({ products: mockProducts }),
    })

    const { result } = renderHook(() => useProductStore())

    // pierwsze ładowanie z reset=true
    await act(async () => {
      await result.current.fetchProducts(true)
    })

    expect(result.current.products.length).toBeLessThanOrEqual(60)
    expect(result.current.page).toBe(2)

    // drugie ładowanie (dokładanie)
    await act(async () => {
      await result.current.fetchProducts(false)
    })

    expect(result.current.products.length).toBeLessThanOrEqual(60)
    expect(result.current.page).toBe(3)
  })

  it('setQuery resetuje stan i wywołuje fetchProducts z reset=true', async () => {
    ;(retryFetch as jest.Mock).mockResolvedValue({
      json: async () => ({ products: mockProducts }),
    })

    const { result } = renderHook(() => useProductStore())

    await act(async () => {
      result.current.setQuery('test query')
    })

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.query).toBe('test query')
    expect(result.current.page).toBe(2)
    expect(result.current.products.length).toBeLessThanOrEqual(60)
  })

  it('ustawia błąd gdy fetchProducts rzuci wyjątek', async () => {
    ;(retryFetch as jest.Mock).mockRejectedValue(new Error('fetch failed'))

    const { result } = renderHook(() => useProductStore())

    await act(async () => {
      result.current.fetchProducts(true)
    })

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.error).toBeDefined()
  })
})
