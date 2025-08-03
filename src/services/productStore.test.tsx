import { act } from '@testing-library/react'
import { useProductStore } from './productStore'
import { retryFetch } from './../utils/retryFetch'
import { ERROR_MESSAGES } from './../config/messages'

jest.mock('./../utils/retryFetch')

const mockedRetryFetch = retryFetch as jest.MockedFunction<typeof retryFetch>

describe('useProductStore', () => {
  beforeEach(() => {
    // Reset stanu store przed każdym testem
    useProductStore.setState({
      products: [],
      loading: false,
      error: null,
      page: 1,
      hasMore: true,
      query: '',
    })
    jest.clearAllMocks()
  })

  it('powinien mieć poprawne wartości początkowe', () => {
    const state = useProductStore.getState()
    expect(state.products).toEqual([])
    expect(state.loading).toBe(false)
    expect(state.error).toBeNull()
    expect(state.page).toBe(1)
    expect(state.hasMore).toBe(true)
    expect(state.query).toBe('')
  })

  it('fetchProducts pobiera produkty i aktualizuje stan', async () => {
    const fakeProducts = [
      { id: 1, title: 'Produkt 1', price: 10, thumbnail: 'thumb1' },
      { id: 2, title: 'Produkt 2', price: 20, thumbnail: 'thumb2' },
    ]
    const total = 10

    mockedRetryFetch.mockResolvedValueOnce({
      json: async () => ({ products: fakeProducts, total }),
    } as Response)

    await act(async () => {
      await useProductStore.getState().fetchProducts()
    })

    const state = useProductStore.getState()
    expect(state.loading).toBe(false)
    expect(state.error).toBeNull()
    expect(state.products).toEqual(fakeProducts)
    expect(state.page).toBe(2)
    expect(state.hasMore).toBe(true)
  })

  it('fetchProducts resetuje listę przy parametrze reset', async () => {
    // najpierw ustawimy produkty w stanie
    useProductStore.setState({
      products: [{ id: 99, title: 'Stary', price: 5, thumbnail: 'x' }],
      page: 3,
    })

    const newProducts = [
      { id: 3, title: 'Nowy 1', price: 15, thumbnail: 'n1' },
      { id: 4, title: 'Nowy 2', price: 25, thumbnail: 'n2' },
    ]

    mockedRetryFetch.mockResolvedValueOnce({
      json: async () => ({ products: newProducts, total: 20 }),
    } as Response)

    await act(async () => {
      await useProductStore.getState().fetchProducts(true)
    })

    const state = useProductStore.getState()
    expect(state.products).toEqual(newProducts)
    expect(state.page).toBe(2)
    expect(state.hasMore).toBe(true)
  })

  it('fetchProducts obsługuje błędy i ustawia odpowiedni komunikat', async () => {
    // Symulujemy błąd sieci
    mockedRetryFetch.mockRejectedValueOnce(new Error('HTTP 500 Internal Server Error'))

    // Symulujemy navigator.onLine = false
    Object.defineProperty(window.navigator, 'onLine', { value: false, configurable: true })

    await act(async () => {
      await useProductStore.getState().fetchProducts()
    })

    let state = useProductStore.getState()
    expect(state.loading).toBe(false)
    expect(state.error).toBe(ERROR_MESSAGES.fetchProducts.offline)

    // Przywróć navigator.onLine
    Object.defineProperty(window.navigator, 'onLine', { value: true, configurable: true })

    // Symulujemy błąd HTTP 5xx
    mockedRetryFetch.mockRejectedValueOnce(new Error('HTTP 502 Bad Gateway'))

    await act(async () => {
      await useProductStore.getState().fetchProducts()
    })

    state = useProductStore.getState()
    expect(state.error).toBe(ERROR_MESSAGES.fetchProducts.timeout)

    // Symulujemy inny błąd
    mockedRetryFetch.mockRejectedValueOnce(new Error('Inny błąd'))

    await act(async () => {
      await useProductStore.getState().fetchProducts()
    })

    state = useProductStore.getState()
    expect(state.error).toBe(ERROR_MESSAGES.fetchProducts.generic)
  })

  it('setQuery aktualizuje query i resetuje produkty', async () => {
    const newProducts = [{ id: 7, title: 'Search Produkt', price: 35, thumbnail: 's1' }]

    mockedRetryFetch.mockResolvedValueOnce({
      json: async () => ({ products: newProducts, total: 1 }),
    } as Response)

    await act(async () => {
      useProductStore.getState().setQuery('search-term')
    })

    const state = useProductStore.getState()
    expect(state.query).toBe('search-term')
    expect(state.page).toBe(2)
    expect(state.products).toEqual(newProducts)
  })
})
