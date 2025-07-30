"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Eye, Save, Smartphone, Monitor, Type, ImageIcon, Layout, Plus, Trash2, Move } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function StoreBuilderPage() {
  const [selectedElement, setSelectedElement] = useState(null)
  const [storeData, setStoreData] = useState({
    name: "Minha Loja",
    description: "Descrição da minha loja",
    logo: "",
    primaryColor: "#3B82F6",
    secondaryColor: "#1E40AF",
  })

  const elements = [
    { id: "header", name: "Cabeçalho", icon: Layout, type: "layout" },
    { id: "hero", name: "Seção Hero", icon: ImageIcon, type: "content" },
    { id: "products", name: "Produtos", icon: Plus, type: "content" },
    { id: "text", name: "Texto", icon: Type, type: "content" },
    { id: "image", name: "Imagem", icon: ImageIcon, type: "media" },
    { id: "footer", name: "Rodapé", icon: Layout, type: "layout" },
  ]

  const pageElements = [
    { id: 1, type: "header", content: "Cabeçalho da Loja" },
    { id: 2, type: "hero", content: "Bem-vindo à nossa loja!" },
    { id: 3, type: "products", content: "Produtos em Destaque" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {/* Sidebar - Elements */}
        <div className="w-80 bg-white border-r shadow-sm">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between mb-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar
                </Button>
              </Link>
            </div>
            <h2 className="text-lg font-semibold">Construtor de Loja</h2>
            <p className="text-sm text-gray-600">Arraste e solte elementos</p>
          </div>

          <Tabs defaultValue="elements" className="w-full">
            <TabsList className="grid w-full grid-cols-2 m-4">
              <TabsTrigger value="elements">Elementos</TabsTrigger>
              <TabsTrigger value="settings">Configurações</TabsTrigger>
            </TabsList>

            <TabsContent value="elements" className="p-4 space-y-4">
              <div>
                <h3 className="font-medium mb-3">Layout</h3>
                <div className="space-y-2">
                  {elements
                    .filter((el) => el.type === "layout")
                    .map((element) => (
                      <Card key={element.id} className="cursor-move hover:shadow-md transition-shadow">
                        <CardContent className="p-3">
                          <div className="flex items-center space-x-2">
                            <element.icon className="h-4 w-4 text-blue-600" />
                            <span className="text-sm font-medium">{element.name}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Conteúdo</h3>
                <div className="space-y-2">
                  {elements
                    .filter((el) => el.type === "content")
                    .map((element) => (
                      <Card key={element.id} className="cursor-move hover:shadow-md transition-shadow">
                        <CardContent className="p-3">
                          <div className="flex items-center space-x-2">
                            <element.icon className="h-4 w-4 text-green-600" />
                            <span className="text-sm font-medium">{element.name}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Mídia</h3>
                <div className="space-y-2">
                  {elements
                    .filter((el) => el.type === "media")
                    .map((element) => (
                      <Card key={element.id} className="cursor-move hover:shadow-md transition-shadow">
                        <CardContent className="p-3">
                          <div className="flex items-center space-x-2">
                            <element.icon className="h-4 w-4 text-purple-600" />
                            <span className="text-sm font-medium">{element.name}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="p-4 space-y-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="storeName">Nome da Loja</Label>
                  <Input
                    id="storeName"
                    value={storeData.name}
                    onChange={(e) => setStoreData({ ...storeData, name: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="storeDescription">Descrição</Label>
                  <Textarea
                    id="storeDescription"
                    value={storeData.description}
                    onChange={(e) => setStoreData({ ...storeData, description: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="primaryColor">Cor Primária</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="primaryColor"
                      type="color"
                      value={storeData.primaryColor}
                      onChange={(e) => setStoreData({ ...storeData, primaryColor: e.target.value })}
                      className="w-16 h-10"
                    />
                    <Input
                      value={storeData.primaryColor}
                      onChange={(e) => setStoreData({ ...storeData, primaryColor: e.target.value })}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="secondaryColor">Cor Secundária</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="secondaryColor"
                      type="color"
                      value={storeData.secondaryColor}
                      onChange={(e) => setStoreData({ ...storeData, secondaryColor: e.target.value })}
                      className="w-16 h-10"
                    />
                    <Input
                      value={storeData.secondaryColor}
                      onChange={(e) => setStoreData({ ...storeData, secondaryColor: e.target.value })}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Main Canvas */}
        <div className="flex-1 flex flex-col">
          {/* Toolbar */}
          <div className="bg-white border-b p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold">Editor de Loja</h1>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Monitor className="h-4 w-4 mr-2" />
                  Desktop
                </Button>
                <Button variant="ghost" size="sm">
                  <Smartphone className="h-4 w-4 mr-2" />
                  Mobile
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                Visualizar
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Save className="h-4 w-4 mr-2" />
                Salvar
              </Button>
            </div>
          </div>

          {/* Canvas */}
          <div className="flex-1 p-8 overflow-auto">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-lg min-h-[600px] border-2 border-dashed border-gray-200">
                {/* Preview Area */}
                <div className="p-8">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold mb-2" style={{ color: storeData.primaryColor }}>
                      {storeData.name}
                    </h2>
                    <p className="text-gray-600">{storeData.description}</p>
                  </div>

                  {/* Drop Zone */}
                  <div className="space-y-4">
                    {pageElements.map((element, index) => (
                      <div
                        key={element.id}
                        className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-400 transition-colors cursor-pointer"
                        onClick={() => setSelectedElement(element.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            <span className="font-medium">{element.content}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Button variant="ghost" size="sm">
                              <Move className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-400 transition-colors">
                      <Plus className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">Arraste elementos aqui para construir sua loja</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Properties Panel */}
        {selectedElement && (
          <div className="w-80 bg-white border-l shadow-sm">
            <div className="p-4 border-b">
              <h3 className="font-semibold">Propriedades do Elemento</h3>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <Label htmlFor="elementText">Texto</Label>
                <Input id="elementText" placeholder="Digite o texto..." />
              </div>
              <div>
                <Label htmlFor="elementColor">Cor</Label>
                <Input id="elementColor" type="color" />
              </div>
              <div>
                <Label htmlFor="elementSize">Tamanho</Label>
                <Input id="elementSize" placeholder="16px" />
              </div>
              <Button className="w-full">Aplicar Alterações</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
