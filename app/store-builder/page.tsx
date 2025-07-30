"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Eye,
  Save,
  Smartphone,
  Monitor,
  Type,
  ImageIcon,
  Layout,
  Plus,
  Trash2,
  Move,
  Box,
  Grid,
  Palette,
  Settings,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/contexts/auth-context"

export default function StoreBuilderPage() {
  const [selectedElement, setSelectedElement] = useState<number | null>(null)
  const [storeData, setStoreData] = useState({
    name: "Minha Loja",
    description: "Descrição da minha loja",
    logo: "",
    primaryColor: "#3B82F6",
    secondaryColor: "#1E40AF",
  })
  const { user } = useAuth()

  const elements = [
    { id: "header", name: "Cabeçalho", icon: Layout, type: "layout", description: "Navegação e logo" },
    { id: "hero", name: "Seção Hero", icon: ImageIcon, type: "content", description: "Banner principal" },
    { id: "products", name: "Grade de Produtos", icon: Grid, type: "content", description: "Vitrine de produtos" },
    { id: "text", name: "Bloco de Texto", icon: Type, type: "content", description: "Texto personalizado" },
    { id: "image", name: "Imagem", icon: ImageIcon, type: "media", description: "Imagem ou banner" },
    { id: "gallery", name: "Galeria", icon: Grid, type: "media", description: "Galeria de imagens" },
    { id: "testimonials", name: "Depoimentos", icon: Type, type: "content", description: "Avaliações de clientes" },
    { id: "contact", name: "Contato", icon: Layout, type: "layout", description: "Formulário de contato" },
    { id: "footer", name: "Rodapé", icon: Layout, type: "layout", description: "Informações finais" },
  ]

  const pageElements = [
    { id: 1, type: "header", content: "Cabeçalho da Loja", config: { title: "Minha Loja" } },
    {
      id: 2,
      type: "hero",
      content: "Bem-vindo à nossa loja!",
      config: { title: "Bem-vindo", subtitle: "Os melhores produtos você encontra aqui" },
    },
    { id: 3, type: "products", content: "Produtos em Destaque", config: { title: "Produtos em Destaque", columns: 3 } },
  ]

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <Box className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Acesso Restrito</h2>
            <p className="text-gray-600 mb-6">Você precisa estar logado para usar nosso construtor de sites.</p>
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
            <Link href="/suppliers" className="text-gray-600 hover:text-blue-600">
              Fornecedores
            </Link>
            <Link href="/store-builder" className="text-blue-600 font-medium">
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
          </div>
        </div>
      </header>

      <div className="flex h-screen">
        {/* Sidebar - Elements */}
        <div className="w-80 bg-white border-r shadow-sm">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between mb-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
            </div>
            <h2 className="text-lg font-semibold">Construtor de Site</h2>
            <p className="text-sm text-gray-600">Arraste e solte elementos</p>
          </div>

          <Tabs defaultValue="elements" className="w-full">
            <TabsList className="grid w-full grid-cols-2 m-4">
              <TabsTrigger value="elements">Elementos</TabsTrigger>
              <TabsTrigger value="settings">Configurações</TabsTrigger>
            </TabsList>

            <TabsContent value="elements" className="p-4 space-y-4">
              <div>
                <h3 className="font-medium mb-3 flex items-center">
                  <Layout className="h-4 w-4 mr-2 text-blue-600" />
                  Layout
                </h3>
                <div className="space-y-2">
                  {elements
                    .filter((el) => el.type === "layout")
                    .map((element) => (
                      <Card key={element.id} className="cursor-move hover:shadow-md transition-shadow">
                        <CardContent className="p-3">
                          <div className="flex items-center space-x-2">
                            <element.icon className="h-4 w-4 text-blue-600" />
                            <div className="flex-1">
                              <span className="text-sm font-medium block">{element.name}</span>
                              <span className="text-xs text-gray-500">{element.description}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3 flex items-center">
                  <Type className="h-4 w-4 mr-2 text-green-600" />
                  Conteúdo
                </h3>
                <div className="space-y-2">
                  {elements
                    .filter((el) => el.type === "content")
                    .map((element) => (
                      <Card key={element.id} className="cursor-move hover:shadow-md transition-shadow">
                        <CardContent className="p-3">
                          <div className="flex items-center space-x-2">
                            <element.icon className="h-4 w-4 text-green-600" />
                            <div className="flex-1">
                              <span className="text-sm font-medium block">{element.name}</span>
                              <span className="text-xs text-gray-500">{element.description}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3 flex items-center">
                  <ImageIcon className="h-4 w-4 mr-2 text-purple-600" />
                  Mídia
                </h3>
                <div className="space-y-2">
                  {elements
                    .filter((el) => el.type === "media")
                    .map((element) => (
                      <Card key={element.id} className="cursor-move hover:shadow-md transition-shadow">
                        <CardContent className="p-3">
                          <div className="flex items-center space-x-2">
                            <element.icon className="h-4 w-4 text-purple-600" />
                            <div className="flex-1">
                              <span className="text-sm font-medium block">{element.name}</span>
                              <span className="text-xs text-gray-500">{element.description}</span>
                            </div>
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

                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Palette className="h-4 w-4 mr-2" />
                  Aplicar Tema
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Main Canvas */}
        <div className="flex-1 flex flex-col">
          {/* Toolbar */}
          <div className="bg-white border-b p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold">Editor de Site</h1>
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
                Publicar Site
              </Button>
            </div>
          </div>

          {/* Canvas */}
          <div className="flex-1 p-8 overflow-auto bg-gray-100">
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
                        className={`border-2 border-dashed rounded-lg p-6 transition-colors cursor-pointer ${
                          selectedElement === element.id
                            ? "border-blue-400 bg-blue-50"
                            : "border-gray-300 hover:border-blue-400"
                        }`}
                        onClick={() => setSelectedElement(element.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                            <div>
                              <span className="font-medium">{element.content}</span>
                              <Badge variant="outline" className="ml-2 text-xs">
                                {element.type}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Button variant="ghost" size="sm">
                              <Settings className="h-4 w-4" />
                            </Button>
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
                      <p className="text-gray-500">Arraste elementos aqui para construir seu site</p>
                      <p className="text-sm text-gray-400 mt-1">Ou clique em um elemento da barra lateral</p>
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
              <p className="text-sm text-gray-600">Elemento selecionado: #{selectedElement}</p>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <Label htmlFor="elementText">Título</Label>
                <Input id="elementText" placeholder="Digite o título..." />
              </div>
              <div>
                <Label htmlFor="elementSubtext">Subtítulo</Label>
                <Input id="elementSubtext" placeholder="Digite o subtítulo..." />
              </div>
              <div>
                <Label htmlFor="elementColor">Cor do Texto</Label>
                <Input id="elementColor" type="color" />
              </div>
              <div>
                <Label htmlFor="elementSize">Tamanho</Label>
                <Input id="elementSize" placeholder="16px" />
              </div>
              <Button className="w-full">Aplicar Alterações</Button>
              <Button variant="outline" className="w-full bg-transparent">
                Duplicar Elemento
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
