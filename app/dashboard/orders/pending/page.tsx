"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Search, Filter, Eye, Clock, AlertCircle, CheckCircle } from "lucide-react"

export default function PendingOrdersPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const pendingOrders = [
    {
      id: "#001",
      customer: "João Silva",
      email: "joao@email.com",
      products: 2,
      total: "R$ 1.299,00",
      status: "payment_pending",
      date: "2024-01-15",
      priority: "high",
    },
    {
      id: "#006",
      customer: "Lucia Ferreira",
      email: "lucia@email.com",
      products: 1,
      total: "R$ 299,00",
      status: "processing",
      date: "2024-01-15",
      priority: "medium",
    },
    {
      id: "#007",
      customer: "Roberto Lima",
      email: "roberto@email.com",
      products: 3,
      total: "R$ 789,00",
      status: "payment_pending",
      date: "2024-01-14",
      priority: "high",
    },
    {
      id: "#008",
      customer: "Fernanda Costa",
      email: "fernanda@email.com",
      products: 1,
      total: "R$ 159,00",
      status: "processing",
      date: "2024-01-14",
      priority: "low",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "payment_pending":
        return <Badge className="bg-red-100 text-red-800">Aguardando Pagamento</Badge>
      case "processing":
        return <Badge className="bg-yellow-100 text-yellow-800">Processando</Badge>
      default:
        return <Badge variant="secondary">-</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">Alta</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Média</Badge>
      case "low":
        return <Badge variant="secondary">Baixa</Badge>
      default:
        return <Badge variant="secondary">-</Badge>
    }
  }

  const filteredOrders = pendingOrders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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
              <h1 className="text-3xl font-bold text-gray-900">Pedidos Pendentes</h1>
              <p className="text-gray-600">Pedidos que requerem sua atenção</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">Processar Todos</Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <CheckCircle className="h-4 w-4 mr-2" />
              Marcar como Processado
            </Button>
          </div>
        </div>

        {/* Alert */}
        <Card className="mb-8 border-orange-200 bg-orange-50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <AlertCircle className="h-6 w-6 text-orange-600" />
              <div>
                <h3 className="font-medium text-orange-900">Atenção Necessária</h3>
                <p className="text-sm text-orange-700">
                  Você tem {pendingOrders.length} pedidos pendentes que precisam ser processados.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Aguardando Pagamento</p>
                  <p className="text-2xl font-bold text-red-600">2</p>
                </div>
                <Clock className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Em Processamento</p>
                  <p className="text-2xl font-bold text-yellow-600">2</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Valor Total</p>
                  <p className="text-2xl font-bold text-gray-900">R$ 2.546</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
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
                  placeholder="Buscar pedidos pendentes..."
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

        {/* Pending Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle>Pedidos Pendentes</CardTitle>
            <CardDescription>Pedidos que precisam de ação imediata</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pedido</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Produtos</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Prioridade</TableHead>
                  <TableHead>Data</TableHead>
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
                    <TableCell>{order.products} itens</TableCell>
                    <TableCell className="font-medium">{order.total}</TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell>{getPriorityBadge(order.priority)}</TableCell>
                    <TableCell className="text-gray-600">{new Date(order.date).toLocaleDateString("pt-BR")}</TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          Processar
                        </Button>
                      </div>
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
