"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Save, Upload, Plus, X } from "lucide-react"

export default function AddProductPage() {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    cost: "",
    sku: "",
    category: "",
    stock: "",
    weight: "",
    dimensions: "",
    active: true,
  })

  const [images, setImages] = useState<string[]>([])
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")

  const categories = [
    "Eletrônicos",
    "Moda",
    "Casa e Decoração",
    "Esportes",
    "Beleza",
    "Livros",
    "Brinquedos",
    "Automotivo",
  ]

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Product data:", productData)
    // Aqui você implementaria o salvamento do produto
  }

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
              <h1 className="text-3xl font-bold text-gray-900">Adicionar Produto</h1>
              <p className="text-gray-600">Crie um novo produto para sua loja</p>
            </div>
          </div>
          <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
            <Save className="h-4 w-4 mr-2" />
            Salvar Produto
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Informações Básicas</CardTitle>
                <CardDescription>Dados principais do produto</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Nome do Produto</Label>
                  <Input
                    id="name"
                    value={productData.name}
                    onChange={(e) => setProductData({ ...productData, name: e.target.value })}
                    placeholder="Ex: Smartphone Galaxy Pro"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={productData.description}
                    onChange={(e) => setProductData({ ...productData, description: e.target.value })}
                    placeholder="Descreva o produto em detalhes..."
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="sku">SKU</Label>
                    <Input
                      id="sku"
                      value={productData.sku}
                      onChange={(e) => setProductData({ ...productData, sku: e.target.value })}
                      placeholder="Ex: SMRT-001"
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Categoria</Label>
                    <Select onValueChange={(value) => setProductData({ ...productData, category: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pricing */}
            <Card>
              <CardHeader>
                <CardTitle>Preços e Estoque</CardTitle>
                <CardDescription>Defina preços e quantidade disponível</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="cost">Custo (R$)</Label>
                    <Input
                      id="cost"
                      type="number"
                      step="0.01"
                      value={productData.cost}
                      onChange={(e) => setProductData({ ...productData, cost: e.target.value })}
                      placeholder="0,00"
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Preço de Venda (R$)</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={productData.price}
                      onChange={(e) => setProductData({ ...productData, price: e.target.value })}
                      placeholder="0,00"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="stock">Estoque</Label>
                    <Input
                      id="stock"
                      type="number"
                      value={productData.stock}
                      onChange={(e) => setProductData({ ...productData, stock: e.target.value })}
                      placeholder="0"
                    />
                  </div>
                </div>

                {productData.cost && productData.price && (
                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-800">
                      <strong>Margem de Lucro:</strong>{" "}
                      {(
                        ((Number.parseFloat(productData.price) - Number.parseFloat(productData.cost)) /
                          Number.parseFloat(productData.price)) *
                        100
                      ).toFixed(1)}
                      %
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Images */}
            <Card>
              <CardHeader>
                <CardTitle>Imagens do Produto</CardTitle>
                <CardDescription>Adicione fotos do produto</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">Arraste imagens aqui ou clique para selecionar</p>
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Selecionar Imagens
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status */}
            <Card>
              <CardHeader>
                <CardTitle>Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="active"
                    checked={productData.active}
                    onCheckedChange={(checked) => setProductData({ ...productData, active: checked as boolean })}
                  />
                  <Label htmlFor="active">Produto ativo</Label>
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
                <CardDescription>Adicione palavras-chave</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Nova tag"
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                  />
                  <Button type="button" onClick={addTag} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <div
                      key={tag}
                      className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
                    >
                      {tag}
                      <button type="button" onClick={() => removeTag(tag)} className="ml-1">
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Shipping */}
            <Card>
              <CardHeader>
                <CardTitle>Envio</CardTitle>
                <CardDescription>Informações de entrega</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="weight">Peso (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.01"
                    value={productData.weight}
                    onChange={(e) => setProductData({ ...productData, weight: e.target.value })}
                    placeholder="0,00"
                  />
                </div>
                <div>
                  <Label htmlFor="dimensions">Dimensões (cm)</Label>
                  <Input
                    id="dimensions"
                    value={productData.dimensions}
                    onChange={(e) => setProductData({ ...productData, dimensions: e.target.value })}
                    placeholder="20x15x10"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </form>
      </div>
    </div>
  )
}
