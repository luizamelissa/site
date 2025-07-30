"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Box, Eye, EyeOff, Loader2 } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    userType: "",
    acceptTerms: false,
  })
  const [error, setError] = useState("")
  const { register, isLoading } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!formData.acceptTerms) {
      setError("Você deve aceitar os termos de uso")
      return
    }

    try {
      const success = await register(formData)
      if (success) {
        router.push("/dashboard")
      }
    } catch (err) {
      setError("Erro ao criar conta. Tente novamente.")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <div className="relative">
              <Box className="h-10 w-10 text-blue-600 transform rotate-12" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
            </div>
            <span className="text-3xl font-bold text-gray-900">DropSpace</span>
          </Link>
        </div>

        <Card className="border-2 shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-900">Crie sua conta grátis</CardTitle>
            <CardDescription>Comece a vender em poucos minutos</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">{error}</div>
              )}

              <div className="space-y-2">
                <Label htmlFor="name">Nome completo</Label>
                <Input
                  id="name"
                  placeholder="Seu nome completo"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  placeholder="(11) 99999-9999"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="userType">Tipo de usuário</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, userType: value })}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Selecione uma opção" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="seller">Quero vender produtos</SelectItem>
                    <SelectItem value="supplier">Sou fornecedor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Crie uma senha forte"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    className="h-12 pr-12"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-12 px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.acceptTerms}
                  onCheckedChange={(checked) => setFormData({ ...formData, acceptTerms: checked as boolean })}
                />
                <Label htmlFor="terms" className="text-sm">
                  Aceito os{" "}
                  <Link href="/terms" className="text-blue-600 hover:underline">
                    termos de uso
                  </Link>{" "}
                  e{" "}
                  <Link href="/privacy" className="text-blue-600 hover:underline">
                    política de privacidade
                  </Link>
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-blue-600 hover:bg-blue-700"
                disabled={!formData.acceptTerms || isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Criando conta...
                  </>
                ) : (
                  "Criar Conta Grátis"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Já tem uma conta?{" "}
                <Link href="/login" className="text-blue-600 hover:underline font-medium">
                  Faça login
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
