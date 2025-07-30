"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Camera, Save, User, Store, CreditCard, Shield, MapPin, Calendar } from "lucide-react"

export default function ProfilePage() {
  const [profileData, setProfileData] = useState({
    name: "João Silva",
    email: "joao@email.com",
    phone: "(11) 99999-9999",
    bio: "Empreendedor apaixonado por tecnologia e vendas online.",
    address: "São Paulo, SP",
    joinDate: "Janeiro 2024",
  })

  const [storeData, setStoreData] = useState({
    storeName: "Tech Store JS",
    storeUrl: "techstore-js",
    category: "Eletrônicos",
    description: "Loja especializada em produtos tecnológicos",
  })

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
              <h1 className="text-3xl font-bold text-gray-900">Meu Perfil</h1>
              <p className="text-gray-600">Gerencie suas informações pessoais e da loja</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="relative inline-block mb-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback className="text-2xl">JS</AvatarFallback>
                  </Avatar>
                  <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0">
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>

                <h3 className="text-xl font-semibold mb-1">{profileData.name}</h3>
                <p className="text-gray-600 mb-4">{profileData.email}</p>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>Membro desde {profileData.joinDate}</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span>{profileData.address}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <Badge className="bg-blue-100 text-blue-800">Vendedor Verificado</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Estatísticas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Vendas este mês</span>
                  <span className="font-semibold">R$ 12.450</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Produtos ativos</span>
                  <span className="font-semibold">76</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Avaliação</span>
                  <span className="font-semibold">4.8 ⭐</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="personal" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Pessoal</span>
                </TabsTrigger>
                <TabsTrigger value="store" className="flex items-center space-x-2">
                  <Store className="h-4 w-4" />
                  <span>Loja</span>
                </TabsTrigger>
                <TabsTrigger value="billing" className="flex items-center space-x-2">
                  <CreditCard className="h-4 w-4" />
                  <span>Pagamento</span>
                </TabsTrigger>
                <TabsTrigger value="security" className="flex items-center space-x-2">
                  <Shield className="h-4 w-4" />
                  <span>Segurança</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Informações Pessoais</CardTitle>
                    <CardDescription>Atualize suas informações pessoais aqui</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name">Nome Completo</Label>
                        <Input
                          id="name"
                          value={profileData.name}
                          onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">E-mail</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Telefone</Label>
                        <Input
                          id="phone"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="address">Endereço</Label>
                        <Input
                          id="address"
                          value={profileData.address}
                          onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="bio">Biografia</Label>
                      <Textarea
                        id="bio"
                        value={profileData.bio}
                        onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                        rows={4}
                      />
                    </div>

                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Save className="h-4 w-4 mr-2" />
                      Salvar Alterações
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="store" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Configurações da Loja</CardTitle>
                    <CardDescription>Configure as informações da sua loja virtual</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="storeName">Nome da Loja</Label>
                        <Input
                          id="storeName"
                          value={storeData.storeName}
                          onChange={(e) => setStoreData({ ...storeData, storeName: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="storeUrl">URL da Loja</Label>
                        <div className="flex">
                          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                            dropspace.com/
                          </span>
                          <Input
                            id="storeUrl"
                            value={storeData.storeUrl}
                            onChange={(e) => setStoreData({ ...storeData, storeUrl: e.target.value })}
                            className="rounded-l-none"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="category">Categoria</Label>
                        <Input
                          id="category"
                          value={storeData.category}
                          onChange={(e) => setStoreData({ ...storeData, category: e.target.value })}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="storeDescription">Descrição da Loja</Label>
                      <Textarea
                        id="storeDescription"
                        value={storeData.description}
                        onChange={(e) => setStoreData({ ...storeData, description: e.target.value })}
                        rows={4}
                      />
                    </div>

                    <div className="flex space-x-4">
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        <Save className="h-4 w-4 mr-2" />
                        Salvar Configurações
                      </Button>
                      <Button variant="outline">Visualizar Loja</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="billing" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Informações de Pagamento</CardTitle>
                    <CardDescription>Gerencie seus métodos de pagamento e faturas</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center">
                            <span className="text-white text-xs font-bold">VISA</span>
                          </div>
                          <div>
                            <p className="font-medium">**** **** **** 1234</p>
                            <p className="text-sm text-gray-600">Expira em 12/25</p>
                          </div>
                        </div>
                        <Badge>Principal</Badge>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full bg-transparent">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Adicionar Novo Cartão
                    </Button>

                    <div className="border-t pt-6">
                      <h4 className="font-medium mb-4">Plano Atual</h4>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h5 className="font-medium text-blue-900">Plano Pro</h5>
                            <p className="text-sm text-blue-700">Até 1000 produtos</p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-blue-900">R$ 49</p>
                            <p className="text-sm text-blue-700">/mês</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Segurança</CardTitle>
                    <CardDescription>Mantenha sua conta segura</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-medium mb-4">Alterar Senha</h4>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="currentPassword">Senha Atual</Label>
                          <Input id="currentPassword" type="password" />
                        </div>
                        <div>
                          <Label htmlFor="newPassword">Nova Senha</Label>
                          <Input id="newPassword" type="password" />
                        </div>
                        <div>
                          <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                          <Input id="confirmPassword" type="password" />
                        </div>
                        <Button>Alterar Senha</Button>
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <h4 className="font-medium mb-4">Autenticação de Dois Fatores</h4>
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">2FA via SMS</p>
                          <p className="text-sm text-gray-600">Receba códigos por SMS</p>
                        </div>
                        <Button variant="outline">Ativar</Button>
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <h4 className="font-medium mb-4">Sessões Ativas</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">Chrome - Windows</p>
                            <p className="text-sm text-gray-600">São Paulo, Brasil - Agora</p>
                          </div>
                          <Badge variant="secondary">Atual</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">Safari - iPhone</p>
                            <p className="text-sm text-gray-600">São Paulo, Brasil - 2 horas atrás</p>
                          </div>
                          <Button variant="outline" size="sm">
                            Encerrar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
