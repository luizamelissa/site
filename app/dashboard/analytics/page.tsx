"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Download, TrendingUp, DollarSign, ShoppingCart, Users, Calendar, BarChart3 } from "lucide-react"

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30d")

  const stats = [
    {
      title: "Receita Total",
      value: "R$ 45.231",
      change: "+20.1%",
      changeType: "positive",
      icon: DollarSign,
      description: "vs período anterior",
    },
    {
      title: "Pedidos",
      value: "1,234",
      change: "+15.3%",
      changeType: "positive",
      icon: ShoppingCart,
      description: "vs período anterior",
    },
    {
      title: "Clientes",
      value: "892",
      change: "+8.2%",
      changeType: "positive",
      icon: Users,
      description: "vs período anterior",
    },
    {
      title: "Taxa de Conversão",
      value: "3.2%",
      change: "-0.5%",
      changeType: "negative",
      icon: TrendingUp,
      description: "vs período anterior",
    },
  ]

  const topProducts = [
    { name: "Smartphone Galaxy Pro", sales: 45, revenue: "R$ 40.455" },
    { name: "Fone Bluetooth Premium", sales: 32, revenue: "R$ 6.368" },
    { name: "Carregador Wireless", sales: 28, revenue: "R$ 2.492" },
    { name: "Capa Protetora", sales: 24, revenue: "R$ 1.176" },
    { name: "Cabo USB-C", sales: 19, revenue: "R$ 570" },
  ]

  const salesByCategory = [
    { category: "Eletrônicos", percentage: 65, value: "R$ 29.400" },
    { category: "Acessórios", percentage: 20, value: "R$ 9.046" },
    { category: "Casa", percentage: 10, value: "R$ 4.523" },
    { category: "Outros", percentage: 5, value: "R$ 2.262" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Relatórios e Analytics</h1>
              <p className="text-gray-600">Acompanhe o desempenho do seu negócio</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Últimos 7 dias</SelectItem>
                <SelectItem value="30d">Últimos 30 dias</SelectItem>
                <SelectItem value="90d">Últimos 90 dias</SelectItem>
                <SelectItem value="1y">Último ano</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <div className="flex items-center mt-1">
                      <span
                        className={`text-sm font-medium ${
                          stat.changeType === "positive" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {stat.change}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">{stat.description}</span>
                    </div>
                  </div>
                  <stat.icon className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Sales Chart Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                Vendas por Período
              </CardTitle>
              <CardDescription>
                Evolução das vendas nos últimos {timeRange === "30d" ? "30 dias" : timeRange}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Gráfico de vendas seria exibido aqui</p>
                  <p className="text-sm text-gray-400">Integração com biblioteca de gráficos</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Revenue Chart Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2" />
                Receita por Período
              </CardTitle>
              <CardDescription>
                Evolução da receita nos últimos {timeRange === "30d" ? "30 dias" : timeRange}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Gráfico de receita seria exibido aqui</p>
                  <p className="text-sm text-gray-400">Integração com biblioteca de gráficos</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Products */}
          <Card>
            <CardHeader>
              <CardTitle>Produtos Mais Vendidos</CardTitle>
              <CardDescription>Ranking dos produtos com melhor desempenho</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-blue-600">#{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-600">{product.sales} vendas</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{product.revenue}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Sales by Category */}
          <Card>
            <CardHeader>
              <CardTitle>Vendas por Categoria</CardTitle>
              <CardDescription>Distribuição das vendas por categoria de produto</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {salesByCategory.map((category, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{category.category}</span>
                      <span className="text-sm text-gray-600">{category.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${category.percentage}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{category.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Insights */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Insights e Recomendações
              </CardTitle>
              <CardDescription>Análises automáticas baseadas nos seus dados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-medium text-green-900 mb-2">📈 Crescimento Positivo</h4>
                  <p className="text-sm text-green-700">
                    Suas vendas cresceram 20% este mês. Continue investindo em marketing para manter o crescimento.
                  </p>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-900 mb-2">🎯 Oportunidade</h4>
                  <p className="text-sm text-blue-700">
                    Eletrônicos representam 65% das vendas. Considere expandir esta categoria com novos produtos.
                  </p>
                </div>

                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <h4 className="font-medium text-orange-900 mb-2">⚠️ Atenção</h4>
                  <p className="text-sm text-orange-700">
                    Taxa de conversão caiu 0.5%. Revise a experiência do usuário e processo de checkout.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
