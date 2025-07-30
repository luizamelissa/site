"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Save, Bell, Shield, CreditCard, Store, Globe, Mail } from "lucide-react"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    // Store Settings
    storeName: "Minha Loja DropSpace",
    storeDescription: "A melhor loja de produtos tecnológicos",
    storeEmail: "contato@minhaloja.com",
    storePhone: "(11) 99999-9999",
    currency: "BRL",
    timezone: "America/Sao_Paulo",

    // Notifications
    emailNotifications: true,
    smsNotifications: false,
    orderNotifications: true,
    marketingEmails: true,

    // Security
    twoFactorAuth: false,
    loginAlerts: true,

    // Payment
    pixEnabled: true,
    creditCardEnabled: true,
    boletoEnabled: true,
  })

  const handleSave = () => {
    console.log("Saving settings:", settings)
    // Aqui você implementaria o salvamento das configurações
  }

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
              <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
              <p className="text-gray-600">Gerencie as configurações da sua conta e loja</p>
            </div>
          </div>
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
            <Save className="h-4 w-4 mr-2" />
            Salvar Alterações
          </Button>
        </div>

        <Tabs defaultValue="store" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="store" className="flex items-center space-x-2">
              <Store className="h-4 w-4" />
              <span>Loja</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center space-x-2">
              <Bell className="h-4 w-4" />
              <span>Notificações</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Segurança</span>
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center space-x-2">
              <CreditCard className="h-4 w-4" />
              <span>Pagamentos</span>
            </TabsTrigger>
            <TabsTrigger value="integrations" className="flex items-center space-x-2">
              <Globe className="h-4 w-4" />
              <span>Integrações</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="store" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Informações da Loja</CardTitle>
                  <CardDescription>Configure os dados básicos da sua loja</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="storeName">Nome da Loja</Label>
                    <Input
                      id="storeName"
                      value={settings.storeName}
                      onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="storeDescription">Descrição</Label>
                    <Textarea
                      id="storeDescription"
                      value={settings.storeDescription}
                      onChange={(e) => setSettings({ ...settings, storeDescription: e.target.value })}
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="storeEmail">E-mail de Contato</Label>
                    <Input
                      id="storeEmail"
                      type="email"
                      value={settings.storeEmail}
                      onChange={(e) => setSettings({ ...settings, storeEmail: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="storePhone">Telefone</Label>
                    <Input
                      id="storePhone"
                      value={settings.storePhone}
                      onChange={(e) => setSettings({ ...settings, storePhone: e.target.value })}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Configurações Regionais</CardTitle>
                  <CardDescription>Defina moeda, fuso horário e localização</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="currency">Moeda</Label>
                    <Select
                      value={settings.currency}
                      onValueChange={(value) => setSettings({ ...settings, currency: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="BRL">Real Brasileiro (R$)</SelectItem>
                        <SelectItem value="USD">Dólar Americano ($)</SelectItem>
                        <SelectItem value="EUR">Euro (€)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="timezone">Fuso Horário</Label>
                    <Select
                      value={settings.timezone}
                      onValueChange={(value) => setSettings({ ...settings, timezone: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/Sao_Paulo">São Paulo (GMT-3)</SelectItem>
                        <SelectItem value="America/New_York">Nova York (GMT-5)</SelectItem>
                        <SelectItem value="Europe/London">Londres (GMT+0)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium">URL da Loja</h4>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        dropspace.com/
                      </span>
                      <Input placeholder="minha-loja" className="rounded-l-none" />
                    </div>
                    <p className="text-sm text-gray-500">Esta será a URL pública da sua loja</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Preferências de Notificação</CardTitle>
                <CardDescription>Configure como e quando você quer receber notificações</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium mb-4">Notificações por E-mail</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="emailNotifications"
                        checked={settings.emailNotifications}
                        onCheckedChange={(checked) =>
                          setSettings({ ...settings, emailNotifications: checked as boolean })
                        }
                      />
                      <Label htmlFor="emailNotifications">Receber notificações por e-mail</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="orderNotifications"
                        checked={settings.orderNotifications}
                        onCheckedChange={(checked) =>
                          setSettings({ ...settings, orderNotifications: checked as boolean })
                        }
                      />
                      <Label htmlFor="orderNotifications">Novos pedidos</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="marketingEmails"
                        checked={settings.marketingEmails}
                        onCheckedChange={(checked) => setSettings({ ...settings, marketingEmails: checked as boolean })}
                      />
                      <Label htmlFor="marketingEmails">E-mails promocionais e dicas</Label>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-4">Notificações por SMS</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="smsNotifications"
                        checked={settings.smsNotifications}
                        onCheckedChange={(checked) =>
                          setSettings({ ...settings, smsNotifications: checked as boolean })
                        }
                      />
                      <Label htmlFor="smsNotifications">Receber notificações por SMS</Label>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900">Configurar E-mail de Notificação</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        Configure um e-mail personalizado para receber notificações da sua loja.
                      </p>
                      <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                        Configurar
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Autenticação</CardTitle>
                  <CardDescription>Configure opções de segurança para sua conta</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="twoFactorAuth"
                      checked={settings.twoFactorAuth}
                      onCheckedChange={(checked) => setSettings({ ...settings, twoFactorAuth: checked as boolean })}
                    />
                    <Label htmlFor="twoFactorAuth">Autenticação de dois fatores (2FA)</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="loginAlerts"
                      checked={settings.loginAlerts}
                      onCheckedChange={(checked) => setSettings({ ...settings, loginAlerts: checked as boolean })}
                    />
                    <Label htmlFor="loginAlerts">Alertas de login</Label>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-medium mb-2">Alterar Senha</h4>
                    <div className="space-y-3">
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
                      <Button variant="outline">Alterar Senha</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sessões Ativas</CardTitle>
                  <CardDescription>Gerencie onde você está logado</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Chrome - Windows</p>
                        <p className="text-sm text-gray-600">São Paulo, Brasil - Agora</p>
                      </div>
                      <Button variant="outline" size="sm" disabled>
                        Atual
                      </Button>
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

                    <Button variant="destructive" className="w-full">
                      Encerrar Todas as Outras Sessões
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="payments" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Métodos de Pagamento</CardTitle>
                <CardDescription>Configure as formas de pagamento aceitas na sua loja</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium mb-4">Métodos Disponíveis</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-8 bg-green-100 rounded flex items-center justify-center">
                          <span className="text-xs font-bold text-green-600">PIX</span>
                        </div>
                        <div>
                          <p className="font-medium">PIX</p>
                          <p className="text-sm text-gray-600">Pagamento instantâneo</p>
                        </div>
                      </div>
                      <Checkbox
                        checked={settings.pixEnabled}
                        onCheckedChange={(checked) => setSettings({ ...settings, pixEnabled: checked as boolean })}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-8 bg-blue-100 rounded flex items-center justify-center">
                          <span className="text-xs font-bold text-blue-600">CARD</span>
                        </div>
                        <div>
                          <p className="font-medium">Cartão de Crédito</p>
                          <p className="text-sm text-gray-600">Visa, Mastercard, Elo</p>
                        </div>
                      </div>
                      <Checkbox
                        checked={settings.creditCardEnabled}
                        onCheckedChange={(checked) =>
                          setSettings({ ...settings, creditCardEnabled: checked as boolean })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-8 bg-orange-100 rounded flex items-center justify-center">
                          <span className="text-xs font-bold text-orange-600">BOL</span>
                        </div>
                        <div>
                          <p className="font-medium">Boleto Bancário</p>
                          <p className="text-sm text-gray-600">Vencimento em 3 dias</p>
                        </div>
                      </div>
                      <Checkbox
                        checked={settings.boletoEnabled}
                        onCheckedChange={(checked) => setSettings({ ...settings, boletoEnabled: checked as boolean })}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-medium text-yellow-900 mb-2">⚠️ Configuração Necessária</h4>
                  <p className="text-sm text-yellow-700 mb-3">
                    Para receber pagamentos, você precisa configurar sua conta no gateway de pagamento.
                  </p>
                  <Button variant="outline" size="sm">
                    Configurar Gateway
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Integrações Disponíveis</CardTitle>
                  <CardDescription>Conecte sua loja com outras ferramentas</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <span className="text-sm font-bold text-green-600">WA</span>
                      </div>
                      <div>
                        <p className="font-medium">WhatsApp Business</p>
                        <p className="text-sm text-gray-600">Atendimento ao cliente</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Conectar
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-sm font-bold text-blue-600">GA</span>
                      </div>
                      <div>
                        <p className="font-medium">Google Analytics</p>
                        <p className="text-sm text-gray-600">Análise de tráfego</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Conectar
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                        <span className="text-sm font-bold text-pink-600">ML</span>
                      </div>
                      <div>
                        <p className="font-medium">Mailchimp</p>
                        <p className="text-sm text-gray-600">E-mail marketing</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Conectar
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>APIs e Webhooks</CardTitle>
                  <CardDescription>Configurações avançadas para desenvolvedores</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="apiKey">Chave da API</Label>
                    <div className="flex space-x-2">
                      <Input id="apiKey" value="sk_live_..." readOnly />
                      <Button variant="outline" size="sm">
                        Copiar
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="webhookUrl">URL do Webhook</Label>
                    <Input id="webhookUrl" placeholder="https://sua-api.com/webhook" />
                  </div>

                  <Button variant="outline" className="w-full bg-transparent">
                    Testar Webhook
                  </Button>

                  <Separator />

                  <div className="p-3 bg-gray-50 rounded-lg">
                    <h4 className="font-medium mb-2">Documentação da API</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Acesse nossa documentação completa para integrar com a API do DropSpace.
                    </p>
                    <Button variant="outline" size="sm">
                      Ver Documentação
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
