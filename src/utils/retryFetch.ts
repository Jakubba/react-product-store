export async function retryFetch(
  url: string,
  options: RequestInit = {},
  retries = 3,
  delay = 1000,
): Promise<Response> {
  try {
    const res = await fetch(url, options)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return res
  } catch (err) {
    if (retries <= 0) throw err
    await new Promise((res) => setTimeout(res, delay))
    return retryFetch(url, options, retries - 1, delay * 2)
  }
}
