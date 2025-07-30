"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Box,
  Search,
  HelpCircle,
  BookOpen,
  Video,
  MessageCircle,
  ArrowRight,
  ChevronRight,
  Star,
  Clock,
  Layout,
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function HelpPage() {
  const { user } = useAuth()

  const categories = [
    {
      title: "Primeiros Passos",
      icon: BookOpen,
      articles: 12,
      description: "Como começar na plataforma",
      color: "text-blue-600",
    },
    {
      title: "Construtor de Sites",
      icon: Layout,
      articles: 8,
      description: "Criando sua loja virtual",
      color: "text-green-600",
    },
    {
      title: "Fornecedores",
      icon: MessageCircle,
      articles: 15,
      description: "Conectando com fornecedores",
      color: "text-purple-600",
    },
    {
      title: "Pagamentos",
      icon: Star,
      articles: 6,
      description: "Configurando pagamentos",
      color: "text-orange-600",
    },
  ]

  const popularArticles = [
    {
      title: "Como criar minha primeira loja",
      category: "Primeiros Passos",
      readTime: "5 min",
      views: "2.1k",
    },
    {
      title: "Conectando com fornecedores",
      category: "Fornecedores",
      readTime: "3 min",
      views: "1.8k",
    },
    {
      title: "Configurando métodos de pagamento",
      category: "Pagamentos",
      readTime: "4 min",
      views: "1.5k",
    },
    {
      title: "Personalizando o design da loja",
      category: "Construtor",
      readTime: "7 min",
      views: "1.2k",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href={user ? "/dashboard" : "/"} className="flex items-center space-x-2">
              <div className="relative">
                <Box className="h-8 w-8 text-blue-600 transform rotate-12" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
              </div>
              <span className="text-2xl font-bold text-gray-900">DropSpace</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href={user ? "/dashboard" : "/"} className="text-gray-600 hover:text-blue-600">
              {user ? "Dashboard" : "Início"}
            </Link>
            {user && (
              <>
                <Link href="/suppliers" className="text-gray-600 hover:text-blue-600">
                  Fornecedores
                </Link>
                <Link href="/store-builder" className="text-gray-600 hover:text-blue-600">
                  Criar Site
                </Link>
              </>
            )}
            <Link href="/help" className="text-blue-600 font-medium">
              Ajuda
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-blue-600">
              Contato
            </Link>
          </nav>
          <div className="flex items-center space-x-2">
            {user ? (
              <span className="text-sm text-gray-600">Olá, {user.name}</span>
            ) : (
              <div className="space-x-2">
                <Link href="/login">
                  <Button variant="ghost">Entrar</Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-blue-600 hover:bg-blue-700">Cadastrar</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Central de Ajuda</h1>
          <p className="text-xl text-gray-600 mb-8">Encontre respostas para suas dúvidas</p>

          {/* Search */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input placeholder="Buscar artigos de ajuda..." className="pl-12 h-14 text-lg" />
          </div>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {categories.map((category, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <category.icon className={`h-8 w-8 ${category.color}`} />
                  <div>
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                    <CardDescription>{category.articles} artigos</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  Ver Artigos
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Popular Articles */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Artigos Populares</h2>
            <div className="space-y-4">
              {popularArticles.map((article, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{article.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <Badge variant="outline">{article.category}</Badge>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{article.readTime}</span>
                          </div>
                          <span>{article.views} visualizações</span>
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Precisa de Mais Ajuda?</h2>
            <div className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <Video className="h-8 w-8 text-blue-600 mb-3" />
                  <h3 className="font-semibold mb-2">Tutoriais em Vídeo</h3>
                  <p className="text-gray-600 text-sm mb-4">Assista nossos tutoriais passo a passo</p>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    Ver Vídeos
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <MessageCircle className="h-8 w-8 text-green-600 mb-3" />
                  <h3 className="font-semibold mb-2">Chat ao Vivo</h3>
                  <p className="text-gray-600 text-sm mb-4">Converse com nossa equipe de suporte</p>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    Iniciar Chat
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <HelpCircle className="h-8 w-8 text-purple-600 mb-3" />
                  <h3 className="font-semibold mb-2">Contato Direto</h3>
                  <p className="text-gray-600 text-sm mb-4">Entre em contato por email ou telefone</p>
                  <Link href="/contact">
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      Falar Conosco
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
