"use client"

import { LineChart, Line, ResponsiveContainer } from "recharts"

interface MiniChartProps {
  data: number[]
  isPositive: boolean
  className?: string
}

export function MiniChart({ data, isPositive, className = "" }: MiniChartProps) {
  // Convert price array to chart data format
  const chartData = data.map((price, index) => ({
    index,
    price: price || 0,
  }))

  return (
    <div className={`h-16 w-full ${className}`}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <Line
            type="monotone"
            dataKey="price"
            stroke={isPositive ? "#22c55e" : "#ef4444"}
            strokeWidth={2}
            dot={false}
            activeDot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
