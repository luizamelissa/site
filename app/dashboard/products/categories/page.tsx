"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus, Edit, Trash2, Search, Package } from "lucide-react"

export default function CategoriesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddForm, setShowAddForm] = useState(false)
  const [newCategory, setNewCategory] = useState({ name: "", description: "" })

  const categories = [
    {
      id: 1,
      name: "Eletrônicos",
      description: "Smartphones, tablets, notebooks e acessórios",
      productCount: 45,
      color: "bg-blue-100 text-blue-800",
    },
    {
      id: 2,
      name: "Moda",
      description: "Roupas, calçados e acessórios de moda",
      productCount: 32,
      color: "bg-pink-100 text-pink-800",
    },
    {
      id: 3,
      name: "Casa e Decoração",
      description: "Móveis, decoração e utilidades domésticas",
      productCount: 28,
      color: "bg-green-100 text-green-800",
    },
    {
      id: 4,
      name: "Esportes",
      description: "Equipamentos esportivos e fitness",
      productCount: 19,
      color: "bg-orange-100 text-orange-800",
    },
    {
      id: 5,
      name: "Beleza",
      description: "Cosméticos, perfumes e cuidados pessoais",
      productCount: 15,
      color: "bg-purple-100 text-purple-800",
    },
    {
      id: 6,
      name: "Livros",
      description: "Livros físicos e digitais",
      productCount: 8,
      color: "bg-yellow-100 text-yellow-800",
    },
  ]

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Adding category:", newCategory)
    setNewCategory({ name: "", description: "" })
    setShowAddForm(false)
  }

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()),
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
              <h1 className="text-3xl font-bold text-gray-900">Categorias</h1>
              <p className="text-gray-600">Organize seus produtos por categorias</p>
            </div>
          </div>
          <Button onClick={() => setShowAddForm(true)} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Nova Categoria
          </Button>
        </div>

        {/* Search */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar categorias..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Add Category Form */}
        {showAddForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Nova Categoria</CardTitle>
              <CardDescription>Adicione uma nova categoria de produtos</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddCategory} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="categoryName">Nome da Categoria</Label>
                    <Input
                      id="categoryName"
                      value={newCategory.name}
                      onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                      placeholder="Ex: Eletrônicos"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="categoryDescription">Descrição</Label>
                    <Input
                      id="categoryDescription"
                      value={newCategory.description}
                      onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                      placeholder="Breve descrição da categoria"
                    />
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    Criar Categoria
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                    Cancelar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => (
            <Card key={category.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${category.color}`}>
                      <Package className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{category.name}</CardTitle>
                      <Badge variant="secondary" className="mt-1">
                        {category.productCount} produtos
                      </Badge>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">{category.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-500">Última atualização: Hoje</span>
                  <Button variant="outline" size="sm">
                    Ver Produtos
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma categoria encontrada</h3>
            <p className="text-gray-600">Tente ajustar sua busca ou crie uma nova categoria.</p>
          </div>
        )}
      </div>
    </div>
  )
}
