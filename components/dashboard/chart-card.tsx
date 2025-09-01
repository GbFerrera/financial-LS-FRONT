"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ChartCardProps {
  title: string
  description?: string
  children: React.ReactNode
  className?: string
}

export function ChartCard({ title, description, children, className }: ChartCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        {description && (
          <CardDescription>{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}

// Componente de gráfico simples usando CSS
export function SimpleBarChart({ data }: { data: { label: string; value: number; color: string }[] }) {
  const maxValue = Math.max(...data.map(item => item.value))
  
  return (
    <div className="space-y-3">
      {data.map((item, index) => (
        <div key={index} className="flex items-center gap-3">
          <div className="w-16 text-sm text-muted-foreground">{item.label}</div>
          <div className="flex-1 bg-muted rounded-full h-2 relative overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${(item.value / maxValue) * 100}%`,
                backgroundColor: item.color,
              }}
            />
          </div>
          <div className="w-12 text-sm font-medium text-right">
            R$ {item.value.toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  )
}

export function SimpleLineChart({ data }: { data: { month: string; value: number }[] }) {
  const maxValue = Math.max(...data.map(item => item.value))
  const minValue = Math.min(...data.map(item => item.value))
  const range = maxValue - minValue || 1

  return (
    <div className="h-64 flex items-end justify-between gap-2 p-4">
      {data.map((item, index) => {
        const height = ((item.value - minValue) / range) * 200 + 20
        return (
          <div key={index} className="flex flex-col items-center gap-2 flex-1">
            <div className="text-xs font-medium">
              R$ {item.value.toLocaleString()}
            </div>
            <div
              className="bg-primary rounded-t-sm transition-all duration-500 w-full min-h-[20px]"
              style={{ height: `${height}px` }}
            />
            <div className="text-xs text-muted-foreground">{item.month}</div>
          </div>
        )
      })}
    </div>
  )
}
