"use client"

import type React from "react"

import { useState, Suspense, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Box,
  Menu,
  Bell,
  Search,
  Home,
  Package,
  ShoppingCart,
  Truck,
  Store,
  BarChart3,
  Settings,
  User,
  LogOut,
  ChevronRight,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/contexts/auth-context"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [expandedMenus, setExpandedMenus] = useState<string[]>([])
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const toggleMenu = (menuName: string) => {
    setExpandedMenus((prev) =>
      prev.includes(menuName) ? prev.filter((name) => name !== menuName) : [...prev, menuName],
    )
  }

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    {
      name: "Produtos",
      icon: Package,
      submenu: [
        { name: "Todos os Produtos", href: "/dashboard/products" },
        { name: "Adicionar Produto", href: "/dashboard/products/new" },
        { name: "Categorias", href: "/dashboard/products/categories" },
        { name: "Estoque", href: "/dashboard/products/inventory" },
      ],
    },
    {
      name: "Pedidos",
      icon: ShoppingCart,
      submenu: [
        { name: "Todos os Pedidos", href: "/dashboard/orders" },
        { name: "Pendentes", href: "/dashboard/orders/pending" },
        { name: "Enviados", href: "/dashboard/orders/shipped" },
        { name: "Concluídos", href: "/dashboard/orders/completed" },
      ],
    },
    { name: "Fornecedores", href: "/suppliers", icon: Truck },
    { name: "Criar Site", href: "/store-builder", icon: Store },
    { name: "Relatórios", href: "/dashboard/analytics", icon: BarChart3 },
    { name: "Configurações", href: "/dashboard/settings", icon: Settings },
  ]

  useEffect(() => {
    // Auto-expandir menu baseado na rota atual
    if (pathname.startsWith("/dashboard/products")) {
      setExpandedMenus((prev) => (prev.includes("Produtos") ? prev : [...prev, "Produtos"]))
    }
    if (pathname.startsWith("/dashboard/orders")) {
      setExpandedMenus((prev) => (prev.includes("Pedidos") ? prev : [...prev, "Pedidos"]))
    }
  }, [pathname])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Box className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-spin" />
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 flex flex-col`}
      >
        {/* Logo */}
        <div className="flex items-center justify-center h-16 border-b bg-white">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative">
              <Box className="h-8 w-8 text-blue-600 transform rotate-12" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
            </div>
            <span className="text-xl font-bold text-gray-900">DropSpace</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <div className="space-y-1">
            {navigation.map((item) => {
              if (item.submenu) {
                const isExpanded = expandedMenus.includes(item.name)
                const hasActiveSubmenu = item.submenu.some(
                  (subItem) => pathname === subItem.href || pathname.startsWith(subItem.href + "/"),
                )

                return (
                  <div key={item.name} className="space-y-1">
                    <button
                      onClick={() => toggleMenu(item.name)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        hasActiveSubmenu
                          ? "text-blue-600 bg-blue-50"
                          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                    >
                      <div className="flex items-center">
                        <item.icon className="h-5 w-5 mr-3" />
                        <span>{item.name}</span>
                      </div>
                      <ChevronRight
                        className={`h-4 w-4 transition-transform duration-200 ${isExpanded ? "rotate-90" : ""}`}
                      />
                    </button>

                    {/* Submenu */}
                    <div className={`ml-8 space-y-1 transition-all duration-300 ${isExpanded ? "block" : "hidden"}`}>
                      {item.submenu.map((subItem) => {
                        const isActive = pathname === subItem.href || pathname.startsWith(subItem.href + "/")
                        return (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                              isActive
                                ? "text-blue-600 bg-blue-50 font-medium"
                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            }`}
                          >
                            {subItem.name}
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                )
              } else {
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    <span>{item.name}</span>
                  </Link>
                )
              }
            })}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Header */}
        <header className="bg-white shadow-sm border-b sticky top-0 z-40">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center">
              <Button variant="ghost" size="sm" className="lg:hidden mr-2" onClick={() => setSidebarOpen(!sidebarOpen)}>
                <Menu className="h-6 w-6" />
              </Button>
              <h1 className="text-xl font-semibold text-gray-900">
                {pathname === "/dashboard" && "Dashboard"}
                {pathname === "/dashboard/products" && "Todos os Produtos"}
                {pathname === "/dashboard/products/new" && "Adicionar Produto"}
                {pathname === "/dashboard/products/categories" && "Categorias"}
                {pathname === "/dashboard/products/inventory" && "Estoque"}
                {pathname === "/dashboard/orders" && "Todos os Pedidos"}
                {pathname === "/dashboard/orders/pending" && "Pedidos Pendentes"}
                {pathname === "/dashboard/orders/shipped" && "Pedidos Enviados"}
                {pathname === "/dashboard/orders/completed" && "Pedidos Concluídos"}
                {pathname === "/dashboard/analytics" && "Relatórios"}
                {pathname === "/dashboard/settings" && "Configurações"}
                {pathname === "/dashboard/profile" && "Perfil"}
                {pathname.startsWith("/suppliers") && "Fornecedores"}
                {pathname.startsWith("/store-builder") && "Construtor de Site"}
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input placeholder="Buscar..." className="pl-10 w-64" />
              </div>

              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  3
                </span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder-user.jpg" alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/profile">
                      <User className="mr-2 h-4 w-4" />
                      <span>Perfil</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Configurações</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sair</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1">
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}
