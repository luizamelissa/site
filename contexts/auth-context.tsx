"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  name: string
  email: string
  userType: "seller" | "supplier"
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (userData: any) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Verificar se há usuário logado no localStorage
    const savedUser = localStorage.getItem("dropspace_user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simular API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Simular login bem-sucedido
    const mockUser: User = {
      id: "1",
      name: "João Silva",
      email: email,
      userType: "seller",
    }

    setUser(mockUser)
    localStorage.setItem("dropspace_user", JSON.stringify(mockUser))
    setIsLoading(false)
    return true
  }

  const register = async (userData: any): Promise<boolean> => {
    setIsLoading(true)

    // Simular API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Simular registro bem-sucedido
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      userType: userData.userType,
    }

    setUser(newUser)
    localStorage.setItem("dropspace_user", JSON.stringify(newUser))
    setIsLoading(false)
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("dropspace_user")
  }

  return <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
