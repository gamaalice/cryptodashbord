"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DetailedChart } from "./detailed-chart"
import type { Cryptocurrency } from "@/types/crypto"

interface ChartModalProps {
  crypto: Cryptocurrency | null
  isOpen: boolean
  onClose: () => void
}

export function ChartModal({ crypto, isOpen, onClose }: ChartModalProps) {
  if (!crypto) return null

  const isPositive = crypto.price_change_percentage_24h > 0

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <img src={crypto.image || "/placeholder.svg"} alt={crypto.name} className="w-8 h-8 rounded-full" />
            {crypto.name} Price Chart
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <DetailedChart
            data={crypto.sparkline_in_7d.price}
            coinName={crypto.name}
            coinSymbol={crypto.symbol}
            isPositive={isPositive}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
