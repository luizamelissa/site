"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DollarSign, ShoppingCart, Users, Plus, Package, BarChart3, Store, Truck } from "lucide-react"

export default function DashboardPage() {
  const stats = [
    {
      title: "Vendas do Mês",
      value: "R$ 12.450",
      change: "+12%",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: "Pedidos",
      value: "156",
      change: "+8%",
      icon: ShoppingCart,
      color: "text-blue-600",
    },
    {
      title: "Produtos",
      value: "89",
      change: "+3",
      icon: Package,
      color: "text-purple-600",
    },
    {
      title: "Visitantes",
      value: "2.341",
      change: "+15%",
      icon: Users,
      color: "text-orange-600",
    },
  ]

  const recentOrders = [
    { id: "#001", customer: "João Silva", product: "Smartphone XYZ", value: "R$ 899", status: "Pago" },
    { id: "#002", customer: "Maria Santos", product: "Fone Bluetooth", value: "R$ 199", status: "Processando" },
    { id: "#003", customer: "Pedro Costa", product: "Carregador Wireless", value: "R$ 89", status: "Enviado" },
  ]

  return (
    <div className="p-6 space-y-8">
      {/* Welcome Section */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Olá, João! 👋</h2>
        <p className="text-gray-600">Aqui está um resumo do seu negócio hoje.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className={`text-sm ${stat.color}`}>{stat.change} vs mês anterior</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
            <CardDescription>Acelere seu trabalho com essas ações</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/dashboard/products/new">
                <Button variant="outline" className="h-20 flex-col bg-transparent">
                  <Plus className="h-6 w-6 mb-2" />
                  Novo Produto
                </Button>
              </Link>
              <Link href="/store-builder">
                <Button variant="outline" className="h-20 flex-col bg-transparent">
                  <Store className="h-6 w-6 mb-2" />
                  Editar Loja
                </Button>
              </Link>
              <Link href="/suppliers">
                <Button variant="outline" className="h-20 flex-col bg-transparent">
                  <Truck className="h-6 w-6 mb-2" />
                  Fornecedores
                </Button>
              </Link>
              <Link href="/dashboard/analytics">
                <Button variant="outline" className="h-20 flex-col bg-transparent">
                  <BarChart3 className="h-6 w-6 mb-2" />
                  Relatórios
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>IA Assistant</CardTitle>
            <CardDescription>Dicas personalizadas para seu negócio</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  💡 Considere adicionar produtos de tecnologia - eles estão em alta!
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-green-800">📈 Suas vendas aumentaram 12% este mês. Continue assim!</p>
              </div>
              <Button size="sm" className="w-full">
                Ver Mais Dicas
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Pedidos Recentes</CardTitle>
          <CardDescription>Seus últimos pedidos e status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOrders.map((order, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div>
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm text-gray-600">{order.customer}</p>
                  </div>
                  <div>
                    <p className="text-sm">{order.product}</p>
                    <p className="text-sm font-medium">{order.value}</p>
                  </div>
                </div>
                <Badge
                  variant={order.status === "Pago" ? "default" : order.status === "Enviado" ? "secondary" : "outline"}
                >
                  {order.status}
                </Badge>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Link href="/dashboard/orders">
              <Button variant="outline" className="w-full bg-transparent">
                Ver Todos os Pedidos
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
