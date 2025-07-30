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
import { Box, Mail, Phone, MapPin, Clock, Send, MessageCircle, Headphones, Users } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function ContactPage() {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    subject: "",
    category: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Contact form submitted:", formData)
    // Aqui você implementaria o envio do formulário
  }

  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      description: "Resposta em até 24 horas",
      contact: "contato@dropspace.com",
      color: "text-blue-600",
    },
    {
      icon: Phone,
      title: "Telefone",
      description: "Seg-Sex, 9h às 18h",
      contact: "(11) 99999-9999",
      color: "text-green-600",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      description: "Resposta rápida",
      contact: "(11) 99999-9999",
      color: "text-green-500",
    },
  ]

  const supportTeam = [
    {
      name: "Suporte Técnico",
      description: "Problemas com a plataforma",
      icon: Headphones,
      color: "text-purple-600",
    },
    {
      name: "Vendas",
      description: "Dúvidas sobre planos",
      icon: Users,
      color: "text-orange-600",
    },
    {
      name: "Fornecedores",
      description: "Parcerias e integração",
      icon: Box,
      color: "text-blue-600",
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
            <Link href="/help" className="text-gray-600 hover:text-blue-600">
              Ajuda
            </Link>
            <Link href="/contact" className="text-blue-600 font-medium">
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Entre em Contato</h1>
          <p className="text-xl text-gray-600">Estamos aqui para ajudar você a ter sucesso</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Envie sua Mensagem</CardTitle>
                <CardDescription>Preencha o formulário abaixo e entraremos em contato em breve</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Nome Completo</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">E-mail</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">Categoria</Label>
                      <Select onValueChange={(value) => setFormData({ ...formData, category: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technical">Suporte Técnico</SelectItem>
                          <SelectItem value="sales">Vendas</SelectItem>
                          <SelectItem value="supplier">Fornecedores</SelectItem>
                          <SelectItem value="billing">Faturamento</SelectItem>
                          <SelectItem value="other">Outros</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="subject">Assunto</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message">Mensagem</Label>
                    <Textarea
                      id="message"
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Descreva sua dúvida ou solicitação..."
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                    <Send className="h-4 w-4 mr-2" />
                    Enviar Mensagem
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            {/* Contact Methods */}
            <Card>
              <CardHeader>
                <CardTitle>Formas de Contato</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactMethods.map((method, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                    <method.icon className={`h-6 w-6 ${method.color}`} />
                    <div>
                      <h4 className="font-medium">{method.title}</h4>
                      <p className="text-sm text-gray-600">{method.description}</p>
                      <p className="text-sm font-medium">{method.contact}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Support Team */}
            <Card>
              <CardHeader>
                <CardTitle>Equipe de Suporte</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {supportTeam.map((team, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                    <team.icon className={`h-6 w-6 ${team.color}`} />
                    <div>
                      <h4 className="font-medium">{team.name}</h4>
                      <p className="text-sm text-gray-600">{team.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Business Hours */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Horário de Atendimento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Segunda - Sexta</span>
                    <span className="font-medium">9h às 18h</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sábado</span>
                    <span className="font-medium">9h às 14h</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Domingo</span>
                    <span className="text-gray-500">Fechado</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Office Location */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Nosso Escritório
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm space-y-1">
                  <p className="font-medium">DropSpace Tecnologia</p>
                  <p>Av. Paulista, 1000 - Sala 1001</p>
                  <p>Bela Vista, São Paulo - SP</p>
                  <p>CEP: 01310-100</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Perguntas Frequentes</h2>
            <p className="text-gray-600">Talvez sua dúvida já tenha sido respondida</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Como começar a vender?</h3>
                <p className="text-gray-600 text-sm">
                  Cadastre-se gratuitamente, conecte-se com fornecedores e crie sua loja em minutos usando nosso
                  construtor visual.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Quanto custa usar a plataforma?</h3>
                <p className="text-gray-600 text-sm">
                  Oferecemos um plano gratuito para começar e planos pagos com recursos avançados a partir de R$ 29/mês.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Como funcionam os pagamentos?</h3>
                <p className="text-gray-600 text-sm">
                  Integramos com as principais formas de pagamento do Brasil, incluindo PIX, cartões e boleto bancário.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Posso personalizar minha loja?</h3>
                <p className="text-gray-600 text-sm">
                  Sim! Use nosso construtor visual para personalizar cores, layout, textos e adicionar sua marca.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Link href="/help">
              <Button variant="outline" size="lg">
                Ver Mais Perguntas
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
