"use client"

import { useState, useEffect } from "react"
import type { Cryptocurrency } from "@/types/crypto"
import { fetchCryptocurrencies, searchCryptocurrencies } from "@/lib/api"
import { CryptoCard } from "@/components/crypto-card"
import { SearchBar } from "@/components/search-bar"
import { ChartModal } from "@/components/chart-modal"
import { Button } from "@/components/ui/button"
import { Moon, Sun, TrendingUp } from "lucide-react"
import { useTheme } from "next-themes"

export default function CryptoDashboard() {
  const [cryptos, setCryptos] = useState<Cryptocurrency[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [favorites, setFavorites] = useState<string[]>([])
  const [selectedCrypto, setSelectedCrypto] = useState<Cryptocurrency | null>(null)
  const [isChartModalOpen, setIsChartModalOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem("crypto-favorites")
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem("crypto-favorites", JSON.stringify(favorites))
  }, [favorites])

  // Fetch initial data
  useEffect(() => {
    const loadCryptos = async () => {
      try {
        setLoading(true)
        const data = await fetchCryptocurrencies(50)
        setCryptos(data)
        setError(null)
      } catch (err) {
        setError("Failed to load cryptocurrency data")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadCryptos()
  }, [])

  // Handle search
  useEffect(() => {
    const handleSearch = async () => {
      if (searchQuery.trim() === "") {
        // Reset to original data
        try {
          const data = await fetchCryptocurrencies(50)
          setCryptos(data)
        } catch (err) {
          console.error("Error resetting data:", err)
        }
        return
      }

      try {
        const results = await searchCryptocurrencies(searchQuery)
        setCryptos(results)
      } catch (err) {
        console.error("Error searching:", err)
      }
    }

    const debounceTimer = setTimeout(handleSearch, 300)
    return () => clearTimeout(debounceTimer)
  }, [searchQuery])

  const toggleFavorite = (cryptoId: string) => {
    setFavorites((prev) => (prev.includes(cryptoId) ? prev.filter((id) => id !== cryptoId) : [...prev, cryptoId]))
  }

  const handleShowChart = (crypto: Cryptocurrency) => {
    setSelectedCrypto(crypto)
    setIsChartModalOpen(true)
  }

  const handleCloseChart = () => {
    setIsChartModalOpen(false)
    setSelectedCrypto(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <p className="text-destructive text-lg mb-4">{error}</p>
              <Button onClick={() => window.location.reload()}>Try Again</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold">CryptoDash</h1>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Search Section */}
        <div className="mb-8 flex justify-center">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search cryptocurrencies by name or symbol..."
          />
        </div>

        {/* Stats */}
        <div className="mb-8 text-center">
          <p className="text-muted-foreground">
            Showing {cryptos.length} cryptocurrencies
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </div>

        {/* Crypto Grid */}
        {cryptos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cryptos.map((crypto) => (
              <CryptoCard
                key={crypto.id}
                crypto={crypto}
                isFavorite={favorites.includes(crypto.id)}
                onToggleFavorite={toggleFavorite}
                onShowChart={handleShowChart}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No cryptocurrencies found for "{searchQuery}"</p>
          </div>
        )}
      </main>

      <ChartModal crypto={selectedCrypto} isOpen={isChartModalOpen} onClose={handleCloseChart} />
    </div>
  )
}
