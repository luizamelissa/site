"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Search, Filter, Eye, Download, DollarSign, ShoppingCart, Clock, CheckCircle } from "lucide-react"

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const orders = [
    {
      id: "#001",
      customer: "João Silva",
      email: "joao@email.com",
      products: 2,
      total: "R$ 1.299,00",
      status: "paid",
      date: "2024-01-15",
      shipping: "pending",
    },
    {
      id: "#002",
      customer: "Maria Santos",
      email: "maria@email.com",
      products: 1,
      total: "R$ 199,00",
      status: "processing",
      date: "2024-01-14",
      shipping: "processing",
    },
    {
      id: "#003",
      customer: "Pedro Costa",
      email: "pedro@email.com",
      products: 3,
      total: "R$ 567,00",
      status: "shipped",
      date: "2024-01-13",
      shipping: "shipped",
    },
    {
      id: "#004",
      customer: "Ana Oliveira",
      email: "ana@email.com",
      products: 1,
      total: "R$ 89,00",
      status: "completed",
      date: "2024-01-12",
      shipping: "delivered",
    },
    {
      id: "#005",
      customer: "Carlos Mendes",
      email: "carlos@email.com",
      products: 2,
      total: "R$ 445,00",
      status: "cancelled",
      date: "2024-01-11",
      shipping: "cancelled",
    },
  ]

  const stats = [
    {
      title: "Total de Pedidos",
      value: "156",
      change: "+8% vs mês anterior",
      icon: ShoppingCart,
      color: "text-blue-600",
    },
    {
      title: "Receita Total",
      value: "R$ 12.450",
      change: "+12% vs mês anterior",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: "Pedidos Pendentes",
      value: "23",
      change: "Requer atenção",
      icon: Clock,
      color: "text-orange-600",
    },
    {
      title: "Taxa de Conclusão",
      value: "94%",
      change: "+2% vs mês anterior",
      icon: CheckCircle,
      color: "text-purple-600",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-blue-100 text-blue-800">Pago</Badge>
      case "processing":
        return <Badge className="bg-yellow-100 text-yellow-800">Processando</Badge>
      case "shipped":
        return <Badge className="bg-purple-100 text-purple-800">Enviado</Badge>
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Concluído</Badge>
      case "cancelled":
        return <Badge variant="destructive">Cancelado</Badge>
      default:
        return <Badge variant="secondary">-</Badge>
    }
  }

  const filteredOrders = orders.filter(
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
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Todos os Pedidos</h1>
              <p className="text-gray-600">Gerencie todos os pedidos da sua loja</p>
            </div>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className={`text-sm ${stat.color}`}>{stat.change}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Link href="/dashboard/orders">
            <Button variant="default" size="sm">
              Todos
            </Button>
          </Link>
          <Link href="/dashboard/orders/pending">
            <Button variant="outline" size="sm">
              Pendentes
            </Button>
          </Link>
          <Link href="/dashboard/orders/shipped">
            <Button variant="outline" size="sm">
              Enviados
            </Button>
          </Link>
          <Link href="/dashboard/orders/completed">
            <Button variant="outline" size="sm">
              Concluídos
            </Button>
          </Link>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar pedidos..."
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

        {/* Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Pedidos</CardTitle>
            <CardDescription>Todos os pedidos realizados na sua loja</CardDescription>
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
                    <TableCell className="text-gray-600">{new Date(order.date).toLocaleDateString("pt-BR")}</TableCell>
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
