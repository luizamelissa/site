import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Box, Users, Zap, Sparkles } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Box className="h-8 w-8 text-blue-600 transform rotate-12" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
            </div>
            <span className="text-2xl font-bold text-gray-900">DropSpace</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost" className="text-blue-600 hover:text-blue-700">
                Entrar
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-blue-600 hover:bg-blue-700">Começar Grátis</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Transforme sua ideia em um
              <span className="text-blue-600 block">negócio de sucesso</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              A plataforma completa para conectar fornecedores e lojistas. Crie sua loja virtual em minutos, sem
              programação, com IA integrada.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4">
                  Criar Minha Loja Grátis
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 bg-transparent">
                Ver Demonstração
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Tudo que você precisa em um só lugar</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ferramentas poderosas para criar, gerenciar e escalar seu negócio online
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <Zap className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Criação Low-Code</CardTitle>
                <CardDescription>
                  Monte sua loja arrastando e soltando elementos. Sem programação necessária.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <Users className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Fornecedores Confiáveis</CardTitle>
                <CardDescription>
                  Acesso a uma rede de fornecedores verificados e produtos de qualidade.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <Sparkles className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>IA para Marketing</CardTitle>
                <CardDescription>
                  Inteligência artificial para criar conteúdo, textos de venda e estratégias.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-blue-600">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Pronto para começar seu negócio?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de empreendedores que já estão vendendo na DropSpace
          </p>
          <Link href="/register">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4">
              Começar Agora - É Grátis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Box className="h-8 w-8 text-blue-400 transform rotate-12" />
                <span className="text-2xl font-bold">DropSpace</span>
              </div>
              <p className="text-gray-400">A plataforma completa para seu negócio online.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Produto</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white">
                    Ajuda
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contato
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white">
                    Sobre
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white">
                    Termos
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    Privacidade
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-gray-400">
                <li>contato@dropspace.com</li>
                <li>(11) 99999-9999</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 DropSpace. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
