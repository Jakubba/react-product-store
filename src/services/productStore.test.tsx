import { act } from '@testing-library/react'
import { useProductStore } from './productStore'
import * as retryFetchModule from '../utils/retryFetch'

jest.mock('../utils/retryFetch')

const mockRetryFetch = retryFetchModule.retryFetch as jest.Mock

describe('useProductStore', () => {
  beforeEach(() => {
    act(() => {
      useProductStore.setState({
        products: [],
        loading: false,
        error: null,
        page: 1,
        hasMore: true,
        query: '',
      })
    })
    jest.clearAllMocks()
  })

  test('fetchProducts poprawnie ładuje produkty', async () => {
    const mockProducts = [
      { id: 1, title: 'Product 1', price: 100, thumbnail: 'img1.jpg' },
      { id: 2, title: 'Product 2', price: 200, thumbnail: 'img2.jpg' },
    ]

    mockRetryFetch.mockResolvedValue({
      json: () => Promise.resolve({ products: mockProducts, total: 2 }),
    })

    await act(async () => {
      await useProductStore.getState().fetchProducts()
    })

    const state = useProductStore.getState()

    expect(state.loading).toBe(false)
    expect(state.error).toBeNull()
    expect(state.products).toEqual(mockProducts)
    // Po udanym fetchu strona powinna być inkrementowana (jeśli implementacja tak robi)
    expect(state.page).toBe(1)
    expect(state.hasMore).toBe(false) // jeśli total === products.length to hasMore false
  })

  test('fetchProducts ustawia błąd przy braku połączenia', async () => {
    mockRetryFetch.mockRejectedValue(new Error('Network Error'))

    // Symulujemy offline
    Object.defineProperty(navigator, 'onLine', {
      value: false,
      configurable: true,
      writable: true,
    })

    await act(async () => {
      await useProductStore.getState().fetchProducts()
    })

    const state = useProductStore.getState()

    expect(state.loading).toBe(false)
    expect(state.error).toBe('Brak połączenia z internetem. Spróbuj ponownie później.')
  })

  test('setQuery ustawia query i wywołuje fetchProducts', async () => {
    // podmiana fetchProducts na mocka, by śledzić wywołania
    const fetchProductsSpy = jest
      .spyOn(useProductStore.getState(), 'fetchProducts')
      .mockResolvedValue()

    await act(async () => {
      await useProductStore.getState().setQuery('test-query')
    })

    const state = useProductStore.getState()

    expect(state.query).toBe('test-query')
    expect(state.page).toBe(1)
    expect(state.products).toEqual([])
    expect(state.hasMore).toBe(true)
    expect(fetchProductsSpy).toHaveBeenCalledWith(true)

    fetchProductsSpy.mockRestore()
  })
})
