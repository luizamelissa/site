"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Filter,
  Plus,
  ArrowLeft,
  Edit,
  Trash2,
  Eye,
  TrendingUp,
  Package,
  DollarSign,
  AlertTriangle,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const products = [
    {
      id: 1,
      name: "Smartphone Galaxy Pro",
      image: "/placeholder.svg?height=60&width=60",
      price: "R$ 899,00",
      cost: "R$ 650,00",
      stock: 45,
      sold: 23,
      status: "Ativo",
      category: "Eletrônicos",
    },
    {
      id: 2,
      name: "Fone Bluetooth Premium",
      image: "/placeholder.svg?height=60&width=60",
      price: "R$ 199,00",
      cost: "R$ 120,00",
      stock: 12,
      sold: 67,
      status: "Ativo",
      category: "Eletrônicos",
    },
    {
      id: 3,
      name: "Camiseta Básica Cotton",
      image: "/placeholder.svg?height=60&width=60",
      price: "R$ 49,00",
      cost: "R$ 25,00",
      stock: 0,
      sold: 156,
      status: "Esgotado",
      category: "Moda",
    },
    {
      id: 4,
      name: "Carregador Wireless",
      image: "/placeholder.svg?height=60&width=60",
      price: "R$ 89,00",
      cost: "R$ 45,00",
      stock: 78,
      sold: 34,
      status: "Ativo",
      category: "Eletrônicos",
    },
  ]

  const stats = [
    {
      title: "Total de Produtos",
      value: "89",
      change: "+3 novos",
      icon: Package,
      color: "text-blue-600",
    },
    {
      title: "Produtos Ativos",
      value: "76",
      change: "85% do total",
      icon: TrendingUp,
      color: "text-green-600",
    },
    {
      title: "Valor Total",
      value: "R$ 45.670",
      change: "+12% este mês",
      icon: DollarSign,
      color: "text-purple-600",
    },
    {
      title: "Estoque Baixo",
      value: "8",
      change: "Requer atenção",
      icon: AlertTriangle,
      color: "text-orange-600",
    },
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
              <h1 className="text-3xl font-bold text-gray-900">Produtos</h1>
              <p className="text-gray-600">Gerencie seu catálogo de produtos</p>
            </div>
          </div>
          <Link href="/dashboard/products/new">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Novo Produto
            </Button>
          </Link>
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

        {/* Products Table */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Produtos</CardTitle>
            <CardDescription>Todos os seus produtos em um só lugar</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produto</TableHead>
                  <TableHead>Preço</TableHead>
                  <TableHead>Custo</TableHead>
                  <TableHead>Estoque</TableHead>
                  <TableHead>Vendidos</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={40}
                          height={40}
                          className="rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-gray-600">{product.category}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{product.price}</TableCell>
                    <TableCell className="text-gray-600">{product.cost}</TableCell>
                    <TableCell>
                      <span className={`${product.stock < 20 ? "text-orange-600" : "text-gray-900"}`}>
                        {product.stock}
                      </span>
                    </TableCell>
                    <TableCell>{product.sold}</TableCell>
                    <TableCell>
                      <Badge
                        variant={product.status === "Ativo" ? "default" : "secondary"}
                        className={
                          product.status === "Ativo" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }
                      >
                        {product.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
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
