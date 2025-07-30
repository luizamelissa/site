"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Search, Filter, Eye, CheckCircle, Star, Download } from "lucide-react"

export default function CompletedOrdersPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const completedOrders = [
    {
      id: "#004",
      customer: "Ana Oliveira",
      email: "ana@email.com",
      products: 1,
      total: "R$ 89,00",
      completedDate: "2024-01-12",
      rating: 5,
      hasReview: true,
      deliveryTime: 3,
    },
    {
      id: "#011",
      customer: "Ricardo Pereira",
      email: "ricardo@email.com",
      products: 2,
      total: "R$ 345,00",
      completedDate: "2024-01-10",
      rating: 4,
      hasReview: true,
      deliveryTime: 5,
    },
    {
      id: "#012",
      customer: "Juliana Costa",
      email: "juliana@email.com",
      products: 1,
      total: "R$ 199,00",
      completedDate: "2024-01-09",
      rating: 5,
      hasReview: false,
      deliveryTime: 4,
    },
    {
      id: "#013",
      customer: "Fernando Lima",
      email: "fernando@email.com",
      products: 3,
      total: "R$ 678,00",
      completedDate: "2024-01-08",
      rating: 4,
      hasReview: true,
      deliveryTime: 6,
    },
  ]

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  const filteredOrders = completedOrders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalRevenue = completedOrders.reduce((sum, order) => {
    return sum + Number.parseFloat(order.total.replace("R$ ", "").replace(".", "").replace(",", "."))
  }, 0)

  const averageRating = completedOrders.reduce((sum, order) => sum + order.rating, 0) / completedOrders.length

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard/orders">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Pedidos Concluídos</h1>
              <p className="text-gray-600">Histórico de pedidos finalizados com sucesso</p>
            </div>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Download className="h-4 w-4 mr-2" />
            Relatório
          </Button>
        </div>

        {/* Success Message */}
        <Card className="mb-8 border-green-200 bg-green-50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <div>
                <h3 className="font-medium text-green-900">Excelente Trabalho!</h3>
                <p className="text-sm text-green-700">
                  Você tem {completedOrders.length} pedidos concluídos com sucesso este mês.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pedidos Concluídos</p>
                  <p className="text-2xl font-bold text-green-600">{completedOrders.length}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Receita Total</p>
                  <p className="text-2xl font-bold text-gray-900">
                    R$ {totalRevenue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avaliação Média</p>
                  <div className="flex items-center space-x-1">
                    <p className="text-2xl font-bold text-gray-900">{averageRating.toFixed(1)}</p>
                    <div className="flex">{getRatingStars(Math.round(averageRating))}</div>
                  </div>
                </div>
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tempo Médio de Entrega</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {Math.round(
                      completedOrders.reduce((sum, order) => sum + order.deliveryTime, 0) / completedOrders.length,
                    )}{" "}
                    dias
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar pedidos concluídos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Completed Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle>Pedidos Concluídos</CardTitle>
            <CardDescription>Histórico de pedidos entregues com sucesso</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pedido</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Concluído em</TableHead>
                  <TableHead>Tempo de Entrega</TableHead>
                  <TableHead>Avaliação</TableHead>
                  <TableHead>Review</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{order.customer}</p>
                        <p className="text-sm text-gray-600">{order.email}</p>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{order.total}</TableCell>
                    <TableCell className="text-gray-600">
                      {new Date(order.completedDate).toLocaleDateString("pt-BR")}
                    </TableCell>
                    <TableCell className="text-gray-600">{order.deliveryTime} dias</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <span className="text-sm font-medium">{order.rating}</span>
                        <div className="flex">{getRatingStars(order.rating)}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {order.hasReview ? (
                        <Badge className="bg-green-100 text-green-800">Sim</Badge>
                      ) : (
                        <Badge variant="outline">Não</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
