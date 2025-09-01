"use client"

import * as React from "react"
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CreditCard,
  DollarSign,
  PiggyBank,
  TrendingUp,
  Wallet,
  Receipt,
  Target,
  Calendar
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { MetricCard } from "@/components/dashboard/metric-card"
import { ChartCard, SimpleBarChart, SimpleLineChart } from "@/components/dashboard/chart-card"

// Dados mockados para o dashboard empresarial
const monthlyData = [
  { month: "Jan", value: 450000 },
  { month: "Fev", value: 520000 },
  { month: "Mar", value: 480000 },
  { month: "Abr", value: 610000 },
  { month: "Mai", value: 580000 },
  { month: "Jun", value: 650000 },
]

const expenseData = [
  { label: "Operacional", value: 250000, color: "hsl(var(--chart-1))" },
  { label: "Pessoal", value: 180000, color: "hsl(var(--chart-2))" },
  { label: "Marketing", value: 80000, color: "hsl(var(--chart-3))" },
  { label: "Tecnologia", value: 60000, color: "hsl(var(--chart-4))" },
  { label: "Outros", value: 40000, color: "hsl(var(--chart-5))" },
]

const recentTransactions = [
  { id: 1, description: "Pagamento Fornecedor ABC", amount: -15050.00, date: "Hoje", type: "expense" },
  { id: 2, description: "Recebimento Cliente XYZ", amount: 50000.00, date: "Ontem", type: "income" },
  { id: 3, description: "Folha de Pagamento", amount: -85000.00, date: "2 dias", type: "expense" },
  { id: 4, description: "Venda Produto Premium", amount: 28000.00, date: "3 dias", type: "income" },
]

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
        <div className="flex h-16 items-center gap-4 px-6">
          <SidebarTrigger className="-ml-1" />
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground">Dashboard Executivo</h1>
            <p className="text-sm text-muted-foreground">
              Visão geral das finanças corporativas
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Este mês
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-6">
        {/* Métricas principais */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Caixa Total"
            value="R$ 1.245.000,00"
            change="+12% em relação ao mês passado"
            changeType="positive"
            icon={Wallet}
          />
          <MetricCard
            title="Faturamento"
            value="R$ 820.000,00"
            change="+5% em relação ao mês passado"
            changeType="positive"
            icon={TrendingUp}
          />
          <MetricCard
            title="Custos Operacionais"
            value="R$ 575.000,00"
            change="-3% em relação ao mês passado"
            changeType="positive"
            icon={Receipt}
          />
          <MetricCard
            title="Margem Líquida"
            value="R$ 245.000,00"
            change="+18% em relação ao mês passado"
            changeType="positive"
            icon={PiggyBank}
          />
        </div>

        {/* Gráficos e análises */}
        <div className="grid gap-6 lg:grid-cols-2">
          <ChartCard
            title="Faturamento Mensal"
            description="Evolução do faturamento dos últimos 6 meses"
          >
            <SimpleLineChart data={monthlyData} />
          </ChartCard>

          <ChartCard
            title="Custos por Departamento"
            description="Distribuição dos custos operacionais deste mês"
          >
            <SimpleBarChart data={expenseData} />
          </ChartCard>
        </div>

        {/* Transações recentes e metas */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Transações recentes */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Receipt className="h-5 w-5" />
                Movimentações Recentes
              </CardTitle>
              <CardDescription>
                Últimas transações financeiras da empresa
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${
                        transaction.type === "income" 
                          ? "bg-green-100 text-green-600" 
                          : "bg-red-100 text-red-600"
                      }`}>
                        {transaction.type === "income" ? (
                          <ArrowUpIcon className="h-4 w-4" />
                        ) : (
                          <ArrowDownIcon className="h-4 w-4" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-muted-foreground">{transaction.date}</p>
                      </div>
                    </div>
                    <div className={`font-semibold ${
                      transaction.type === "income" ? "text-green-600" : "text-red-600"
                    }`}>
                      {transaction.type === "income" ? "+" : ""}
                      R$ {Math.abs(transaction.amount).toLocaleString("pt-BR", {
                        minimumFractionDigits: 2
                      })}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <Button variant="outline" className="w-full">
                  Ver todas as transações
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Metas financeiras */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Metas
              </CardTitle>
              <CardDescription>
                Progresso das suas metas financeiras
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Reserva de Emergência</span>
                  <span>75%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full w-3/4"></div>
                </div>
                <p className="text-xs text-muted-foreground">
                  R$ 7.500 de R$ 10.000
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Viagem de Férias</span>
                  <span>45%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-chart-2 h-2 rounded-full w-[45%]"></div>
                </div>
                <p className="text-xs text-muted-foreground">
                  R$ 2.250 de R$ 5.000
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Novo Carro</span>
                  <span>20%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-chart-3 h-2 rounded-full w-1/5"></div>
                </div>
                <p className="text-xs text-muted-foreground">
                  R$ 6.000 de R$ 30.000
                </p>
              </div>

              <Button variant="outline" className="w-full mt-4">
                Gerenciar Metas
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}