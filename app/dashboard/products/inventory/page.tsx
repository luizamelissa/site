"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Search, Filter, AlertTriangle, TrendingUp, Package, Edit } from "lucide-react"

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const inventoryData = [
    {
      id: 1,
      name: "Smartphone Galaxy Pro",
      sku: "SMRT-001",
      currentStock: 5,
      minStock: 10,
      maxStock: 100,
      avgSales: 8,
      category: "Eletrônicos",
      lastUpdated: "2024-01-15",
      status: "low",
    },
    {
      id: 2,
      name: "Fone Bluetooth Premium",
      sku: "FONE-002",
      currentStock: 25,
      minStock: 15,
      maxStock: 80,
      avgSales: 12,
      category: "Eletrônicos",
      lastUpdated: "2024-01-14",
      status: "good",
    },
    {
      id: 3,
      name: "Camiseta Básica Cotton",
      sku: "CAMI-003",
      currentStock: 0,
      minStock: 20,
      maxStock: 200,
      avgSales: 25,
      category: "Moda",
      lastUpdated: "2024-01-13",
      status: "out",
    },
    {
      id: 4,
      name: "Carregador Wireless",
      sku: "CARR-004",
      currentStock: 45,
      minStock: 10,
      maxStock: 60,
      avgSales: 6,
      category: "Eletrônicos",
      lastUpdated: "2024-01-15",
      status: "good",
    },
  ]

  const stats = [
    {
      title: "Total de Produtos",
      value: "89",
      change: "+3 este mês",
      icon: Package,
      color: "text-blue-600",
    },
    {
      title: "Estoque Baixo",
      value: "8",
      change: "Requer atenção",
      icon: AlertTriangle,
      color: "text-orange-600",
    },
    {
      title: "Produtos Esgotados",
      value: "3",
      change: "Reabastecer urgente",
      icon: AlertTriangle,
      color: "text-red-600",
    },
    {
      title: "Valor Total do Estoque",
      value: "R$ 45.670",
      change: "+12% este mês",
      icon: TrendingUp,
      color: "text-green-600",
    },
  ]

  const getStatusBadge = (status: string, currentStock: number) => {
    switch (status) {
      case "out":
        return <Badge variant="destructive">Esgotado</Badge>
      case "low":
        return <Badge className="bg-orange-100 text-orange-800">Estoque Baixo</Badge>
      case "good":
        return <Badge className="bg-green-100 text-green-800">Em Estoque</Badge>
      default:
        return <Badge variant="secondary">-</Badge>
    }
  }

  const filteredInventory = inventoryData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard/products">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Controle de Estoque</h1>
              <p className="text-gray-600">Monitore e gerencie seu inventário</p>
            </div>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">Atualizar Estoque</Button>
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

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar produtos..."
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

        {/* Inventory Table */}
        <Card>
          <CardHeader>
            <CardTitle>Inventário</CardTitle>
            <CardDescription>Lista completa de produtos e seus estoques</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produto</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Estoque Atual</TableHead>
                  <TableHead>Estoque Mín.</TableHead>
                  <TableHead>Vendas/Mês</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInventory.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">{item.category}</p>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{item.sku}</TableCell>
                    <TableCell>
                      <span
                        className={`font-medium ${
                          item.currentStock === 0
                            ? "text-red-600"
                            : item.currentStock < item.minStock
                              ? "text-orange-600"
                              : "text-gray-900"
                        }`}
                      >
                        {item.currentStock}
                      </span>
                    </TableCell>
                    <TableCell className="text-gray-600">{item.minStock}</TableCell>
                    <TableCell className="text-gray-600">{item.avgSales}</TableCell>
                    <TableCell>{getStatusBadge(item.status, item.currentStock)}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
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
