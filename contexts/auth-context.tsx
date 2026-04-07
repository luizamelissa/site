"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import type { User as SupabaseUser } from "@supabase/supabase-js"

interface UserProfile {
  id: string
  name: string
  email: string
  phone: string | null
  userType: "seller" | "supplier"
}

interface AuthContextType {
  user: UserProfile | null
  supabaseUser: SupabaseUser | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (userData: RegisterData) => Promise<{ success: boolean; error?: string; needsConfirmation?: boolean }>
  logout: () => Promise<void>
  isLoading: boolean
}

interface RegisterData {
  name: string
  email: string
  password: string
  phone: string
  userType: "seller" | "supplier"
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [supabaseUser, setSupabaseUser] = useState<SupabaseUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  // Função para buscar o perfil do usuário
  const fetchUserProfile = async (userId: string): Promise<UserProfile | null> => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single()

    if (error || !data) {
      console.error("Erro ao buscar perfil:", error)
      return null
    }

    return {
      id: data.id,
      name: data.name || "",
      email: data.email || "",
      phone: data.phone,
      userType: data.user_type || "seller",
    }
  }

  useEffect(() => {
    // Verificar sessão atual
    const checkSession = async () => {
      try {
        const { data: { user: currentUser } } = await supabase.auth.getUser()
        
        if (currentUser) {
          setSupabaseUser(currentUser)
          const profile = await fetchUserProfile(currentUser.id)
          setUser(profile)
        }
      } catch (error) {
        console.error("Erro ao verificar sessão:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkSession()

    // Escutar mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session?.user) {
          setSupabaseUser(session.user)
          const profile = await fetchUserProfile(session.user.id)
          setUser(profile)
        } else if (event === "SIGNED_OUT") {
          setSupabaseUser(null)
          setUser(null)
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setIsLoading(false)
        
        // Traduzir mensagens de erro comuns
        if (error.message.includes("Invalid login credentials")) {
          return { success: false, error: "Email ou senha incorretos" }
        }
        if (error.message.includes("Email not confirmed")) {
          return { success: false, error: "Por favor, confirme seu email antes de fazer login" }
        }
        
        return { success: false, error: error.message }
      }

      if (data.user) {
        setSupabaseUser(data.user)
        const profile = await fetchUserProfile(data.user.id)
        setUser(profile)
      }

      setIsLoading(false)
      return { success: true }
    } catch (error) {
      setIsLoading(false)
      return { success: false, error: "Erro ao fazer login. Tente novamente." }
    }
  }

  const register = async (userData: RegisterData): Promise<{ success: boolean; error?: string; needsConfirmation?: boolean }> => {
    setIsLoading(true)

    try {
      // Verificar se o email já existe
      const { data: existingUser } = await supabase
        .from("profiles")
        .select("email")
        .eq("email", userData.email)
        .single()

      if (existingUser) {
        setIsLoading(false)
        return { success: false, error: "Este email já está cadastrado" }
      }

      // Criar usuário no Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ||
            `${window.location.origin}/dashboard`,
          data: {
            name: userData.name,
            phone: userData.phone,
            user_type: userData.userType,
          },
        },
      })

      if (error) {
        setIsLoading(false)
        
        // Traduzir mensagens de erro comuns
        if (error.message.includes("already registered")) {
          return { success: false, error: "Este email já está cadastrado" }
        }
        if (error.message.includes("Password should be")) {
          return { success: false, error: "A senha deve ter pelo menos 6 caracteres" }
        }
        
        return { success: false, error: error.message }
      }

      // Verificar se precisa de confirmação de email
      if (data.user && !data.session) {
        setIsLoading(false)
        return { 
          success: true, 
          needsConfirmation: true 
        }
      }

      // Se o usuário foi criado e tem sessão (email confirmation desabilitado)
      if (data.user && data.session) {
        setSupabaseUser(data.user)
        const profile = await fetchUserProfile(data.user.id)
        setUser(profile)
      }

      setIsLoading(false)
      return { success: true }
    } catch (error) {
      setIsLoading(false)
      return { success: false, error: "Erro ao criar conta. Tente novamente." }
    }
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setSupabaseUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, supabaseUser, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
