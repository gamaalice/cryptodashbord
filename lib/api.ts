const COINGECKO_BASE_URL = "https://api.coingecko.com/api/v3"

interface Cryptocurrency {
  name: string
  symbol: string
  // other properties here
}

export async function fetchCryptocurrencies(limit = 50, currency = "usd"): Promise<Cryptocurrency[]> {
  try {
    const response = await fetch(
      `${COINGECKO_BASE_URL}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=true&price_change_percentage=24h`,
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching cryptocurrencies:", error)
    throw error
  }
}

export async function searchCryptocurrencies(query: string): Promise<Cryptocurrency[]> {
  try {
    const response = await fetch(
      `${COINGECKO_BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=24h`,
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    // Filter results based on query
    return data.filter(
      (coin: Cryptocurrency) =>
        coin.name.toLowerCase().includes(query.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(query.toLowerCase()),
    )
  } catch (error) {
    console.error("Error searching cryptocurrencies:", error)
    throw error
  }
}
