"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Search, Filter, Eye, Truck, Package, MapPin } from "lucide-react"

export default function ShippedOrdersPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const shippedOrders = [
    {
      id: "#003",
      customer: "Pedro Costa",
      email: "pedro@email.com",
      products: 3,
      total: "R$ 567,00",
      trackingCode: "BR123456789",
      carrier: "Correios",
      shippedDate: "2024-01-13",
      estimatedDelivery: "2024-01-18",
      destination: "São Paulo, SP",
    },
    {
      id: "#009",
      customer: "Mariana Silva",
      email: "mariana@email.com",
      products: 1,
      total: "R$ 299,00",
      trackingCode: "BR987654321",
      carrier: "Jadlog",
      shippedDate: "2024-01-12",
      estimatedDelivery: "2024-01-17",
      destination: "Rio de Janeiro, RJ",
    },
    {
      id: "#010",
      customer: "Carlos Santos",
      email: "carlos@email.com",
      products: 2,
      total: "R$ 445,00",
      trackingCode: "BR456789123",
      carrier: "Total Express",
      shippedDate: "2024-01-11",
      estimatedDelivery: "2024-01-16",
      destination: "Belo Horizonte, MG",
    },
  ]

  const filteredOrders = shippedOrders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.trackingCode.toLowerCase().includes(searchTerm.toLowerCase()),
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
              <h1 className="text-3xl font-bold text-gray-900">Pedidos Enviados</h1>
              <p className="text-gray-600">Acompanhe os pedidos em trânsito</p>
            </div>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Truck className="h-4 w-4 mr-2" />
            Rastrear Todos
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pedidos Enviados</p>
                  <p className="text-2xl font-bold text-purple-600">{shippedOrders.length}</p>
                </div>
                <Truck className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Valor em Trânsito</p>
                  <p className="text-2xl font-bold text-gray-900">R$ 1.311</p>
                </div>
                <Package className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Prazo Médio</p>
                  <p className="text-2xl font-bold text-gray-900">5 dias</p>
                </div>
                <MapPin className="h-8 w-8 text-green-600" />
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
                  placeholder="Buscar por pedido, cliente ou código de rastreamento..."
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

        {/* Shipped Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle>Pedidos Enviados</CardTitle>
            <CardDescription>Pedidos que estão a caminho dos clientes</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pedido</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Destino</TableHead>
                  <TableHead>Transportadora</TableHead>
                  <TableHead>Código de Rastreamento</TableHead>
                  <TableHead>Enviado em</TableHead>
                  <TableHead>Previsão</TableHead>
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
                        <p className="text-sm text-gray-600">{order.total}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600">{order.destination}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{order.carrier}</Badge>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{order.trackingCode}</TableCell>
                    <TableCell className="text-gray-600">
                      {new Date(order.shippedDate).toLocaleDateString("pt-BR")}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {new Date(order.estimatedDelivery).toLocaleDateString("pt-BR")}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          Rastrear
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
