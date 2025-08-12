"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, TrendingUp, TrendingDown, BarChart3 } from "lucide-react"
import type { Cryptocurrency } from "@/types/crypto"
import Image from "next/image"
import { MiniChart } from "./mini-chart"

interface CryptoCardProps {
  crypto: Cryptocurrency
  isFavorite?: boolean
  onToggleFavorite?: (id: string) => void
  onShowChart?: (crypto: Cryptocurrency) => void
}

export function CryptoCard({ crypto, isFavorite = false, onToggleFavorite, onShowChart }: CryptoCardProps) {
  const priceChange = crypto.price_change_percentage_24h
  const isPositive = priceChange > 0

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: price < 1 ? 6 : 2,
    }).format(price)
  }

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1e12) {
      return `$${(marketCap / 1e12).toFixed(2)}T`
    } else if (marketCap >= 1e9) {
      return `$${(marketCap / 1e9).toFixed(2)}B`
    } else if (marketCap >= 1e6) {
      return `$${(marketCap / 1e6).toFixed(2)}M`
    }
    return `$${marketCap.toLocaleString()}`
  }

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <Image
                src={crypto.image || "/placeholder.svg"}
                alt={crypto.name}
                fill
                className="rounded-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{crypto.name}</h3>
              <p className="text-sm text-muted-foreground uppercase">{crypto.symbol}</p>
            </div>
          </div>
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" onClick={() => onShowChart?.(crypto)} className="p-2">
              <BarChart3 className="w-4 h-4 text-muted-foreground" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onToggleFavorite?.(crypto.id)} className="p-2">
              <Heart className={`w-4 h-4 ${isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">{formatPrice(crypto.current_price)}</span>
            <Badge
              variant={isPositive ? "default" : "destructive"}
              className={`flex items-center gap-1 ${
                isPositive ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : ""
              }`}
            >
              {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {Math.abs(priceChange).toFixed(2)}%
            </Badge>
          </div>

          {crypto.sparkline_in_7d?.price && crypto.sparkline_in_7d.price.length > 0 && (
            <div className="my-4">
              <MiniChart data={crypto.sparkline_in_7d.price} isPositive={isPositive} />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Market Cap</p>
              <p className="font-medium">{formatMarketCap(crypto.market_cap)}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Rank</p>
              <p className="font-medium">#{crypto.market_cap_rank}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
