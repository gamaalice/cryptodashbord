"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface DetailedChartProps {
  data: number[]
  coinName: string
  coinSymbol: string
  isPositive: boolean
}

export function DetailedChart({ data, coinName, coinSymbol, isPositive }: DetailedChartProps) {
  // Convert price array to chart data format with dates
  const chartData = data.map((price, index) => {
    const date = new Date()
    date.setDate(date.getDate() - (6 - index))
    return {
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      price: price || 0,
      fullDate: date.toISOString(),
    }
  })

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: value < 1 ? 6 : 2,
    }).format(value)
  }

  return (
    <div className="w-full h-80">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">
          {coinName} ({coinSymbol.toUpperCase()}) - 7 Day Price Chart
        </h3>
        <p className="text-sm text-muted-foreground">Price movement over the last 7 days</p>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
            className="text-muted-foreground"
          />
          <YAxis
            domain={["dataMin", "dataMax"]}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
            tickFormatter={formatPrice}
            className="text-muted-foreground"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
            }}
            formatter={(value: number) => [formatPrice(value), "Price"]}
            labelStyle={{ color: "hsl(var(--foreground))" }}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke={isPositive ? "#22c55e" : "#ef4444"}
            strokeWidth={3}
            dot={{ fill: isPositive ? "#22c55e" : "#ef4444", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: isPositive ? "#22c55e" : "#ef4444", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
