"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Filter, Star, MapPin, Package, TrendingUp, Plus, ArrowLeft } from "lucide-react"

export default function SuppliersPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const suppliers = [
    {
      id: 1,
      name: "TechSupply Brasil",
      category: "Eletrônicos",
      location: "São Paulo, SP",
      rating: 4.8,
      products: 1250,
      image: "/placeholder.svg?height=60&width=60",
      verified: true,
      description: "Fornecedor especializado em eletrônicos e gadgets tecnológicos",
    },
    {
      id: 2,
      name: "Fashion Forward",
      category: "Moda",
      location: "Rio de Janeiro, RJ",
      rating: 4.6,
      products: 890,
      image: "/placeholder.svg?height=60&width=60",
      verified: true,
      description: "Roupas e acessórios da moda com qualidade premium",
    },
    {
      id: 3,
      name: "Casa & Decoração",
      category: "Casa",
      location: "Belo Horizonte, MG",
      rating: 4.7,
      products: 650,
      image: "/placeholder.svg?height=60&width=60",
      verified: false,
      description: "Produtos para casa, decoração e utilidades domésticas",
    },
    {
      id: 4,
      name: "Sports Pro",
      category: "Esportes",
      location: "Curitiba, PR",
      rating: 4.9,
      products: 420,
      image: "/placeholder.svg?height=60&width=60",
      verified: true,
      description: "Equipamentos esportivos e artigos para fitness",
    },
  ]

  const categories = ["Todos", "Eletrônicos", "Moda", "Casa", "Esportes", "Beleza", "Livros"]

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
              <h1 className="text-3xl font-bold text-gray-900">Fornecedores</h1>
              <p className="text-gray-600">Encontre os melhores fornecedores para seu negócio</p>
            </div>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Solicitar Fornecedor
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar fornecedores..."
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

            <div className="flex flex-wrap gap-2 mt-4">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={category === "Todos" ? "default" : "outline"}
                  size="sm"
                  className={category === "Todos" ? "bg-blue-600 hover:bg-blue-700" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total de Fornecedores</p>
                  <p className="text-2xl font-bold text-gray-900">1,247</p>
                </div>
                <Package className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Verificados</p>
                  <p className="text-2xl font-bold text-gray-900">892</p>
                </div>
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Produtos Disponíveis</p>
                  <p className="text-2xl font-bold text-gray-900">45.2K</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Novos Esta Semana</p>
                  <p className="text-2xl font-bold text-gray-900">23</p>
                </div>
                <Plus className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Suppliers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {suppliers.map((supplier) => (
            <Card key={supplier.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={supplier.image || "/placeholder.svg"} />
                      <AvatarFallback>{supplier.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-2">
                        <CardTitle className="text-lg">{supplier.name}</CardTitle>
                        {supplier.verified && (
                          <Badge variant="secondary" className="text-xs">
                            Verificado
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-1 mt-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{supplier.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <CardDescription className="mb-4">{supplier.description}</CardDescription>

                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {supplier.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Package className="h-4 w-4 mr-2" />
                    {supplier.products} produtos
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <Badge variant="outline">{supplier.category}</Badge>
                  <div className="space-x-2">
                    <Button variant="outline" size="sm">
                      Ver Produtos
                    </Button>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Conectar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            Carregar Mais Fornecedores
          </Button>
        </div>
      </div>
    </div>
  )
}
