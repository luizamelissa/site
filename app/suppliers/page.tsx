"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Filter, Star, MapPin, Package, TrendingUp, Plus, Box, ArrowLeft } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function SuppliersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const { user } = useAuth()

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
      minOrder: "R$ 500",
      deliveryTime: "3-5 dias",
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
      minOrder: "R$ 300",
      deliveryTime: "2-4 dias",
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
      minOrder: "R$ 200",
      deliveryTime: "5-7 dias",
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
      minOrder: "R$ 400",
      deliveryTime: "3-6 dias",
    },
    {
      id: 5,
      name: "Beauty Plus",
      category: "Beleza",
      location: "Fortaleza, CE",
      rating: 4.5,
      products: 780,
      image: "/placeholder.svg?height=60&width=60",
      verified: true,
      description: "Cosméticos e produtos de beleza nacionais e importados",
      minOrder: "R$ 250",
      deliveryTime: "4-7 dias",
    },
    {
      id: 6,
      name: "Pet World",
      category: "Pet Shop",
      location: "Porto Alegre, RS",
      rating: 4.4,
      products: 320,
      image: "/placeholder.svg?height=60&width=60",
      verified: true,
      description: "Produtos para pets, ração, brinquedos e acessórios",
      minOrder: "R$ 150",
      deliveryTime: "2-5 dias",
    },
  ]

  const categories = ["Todos", "Eletrônicos", "Moda", "Casa", "Esportes", "Beleza", "Pet Shop", "Livros"]

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <Box className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Acesso Restrito</h2>
            <p className="text-gray-600 mb-6">Você precisa estar logado para acessar nossa rede de fornecedores.</p>
            <div className="space-y-3">
              <Link href="/login" className="block">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Fazer Login</Button>
              </Link>
              <Link href="/register" className="block">
                <Button variant="outline" className="w-full bg-transparent">
                  Criar Conta Grátis
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <div className="relative">
                <Box className="h-8 w-8 text-blue-600 transform rotate-12" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
              </div>
              <span className="text-2xl font-bold text-gray-900">DropSpace</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/dashboard" className="text-gray-600 hover:text-blue-600">
              Dashboard
            </Link>
            <Link href="/suppliers" className="text-blue-600 font-medium">
              Fornecedores
            </Link>
            <Link href="/store-builder" className="text-gray-600 hover:text-blue-600">
              Criar Site
            </Link>
            <Link href="/help" className="text-gray-600 hover:text-blue-600">
              Ajuda
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-blue-600">
              Contato
            </Link>
          </nav>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Olá, {user.name}</span>
            <Avatar className="h-8 w-8">
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar ao Dashboard
              </Button>
            </Link>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Fornecedores</h1>
          <p className="text-xl text-gray-600">Encontre os melhores fornecedores para seu negócio</p>
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

                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {supplier.location}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Package className="h-4 w-4 mr-2" />
                    {supplier.products} produtos
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pedido mín:</span>
                    <span className="font-medium">{supplier.minOrder}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Entrega:</span>
                    <span className="font-medium">{supplier.deliveryTime}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-6">
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
