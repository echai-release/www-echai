"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const products = [
    { name: "LoopX", href: "/loopx", status: "Pilot" },
    { name: "Whispr", href: "/whispr", status: "Beta" },
    { name: "Concierge", href: "/concierge", status: "Live" },
  ]

  // Generate current month for Calendly link
  const getCurrentMonth = () => {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, "0")
    return `${year}-${month}`
  }

  const calendlyUrl = `https://calendly.com/pallavi-ose4/30min?month=${getCurrentMonth()}`

  return (
    <header className="bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <img src="/images/logo-black.png" alt="EnterpriseChai" className="h-10 w-auto" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-1 text-gray-700 hover:text-black font-medium">
                <span>Products</span>
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {products.map((product) => (
                  <DropdownMenuItem key={product.name} asChild>
                    <Link href={product.href} className="flex items-center justify-between w-full">
                      <span>{product.name}</span>
                      <span className="text-xs text-gray-500">{product.status}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/about" className="text-gray-700 hover:text-black font-medium">
              About
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-black font-medium">
              Blog
            </Link>
            <Link href="/docs" className="text-gray-700 hover:text-black font-medium">
              Docs
            </Link>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                asChild
              >
                <Link href="https://app.enterprisechai.com/login">
                  <span className="mr-2">👤</span>
                  Login
                </Link>
              </Button>
              <Button size="sm" className="bg-black hover:bg-gray-800 text-white rounded-full px-6" asChild>
                <Link href={calendlyUrl} target="_blank" rel="noopener noreferrer">
                  Request Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-900">Products</p>
                {products.map((product) => (
                  <Link key={product.name} href={product.href} className="block pl-4 text-gray-600 hover:text-gray-900">
                    {product.name} <span className="text-xs text-gray-500">({product.status})</span>
                  </Link>
                ))}
              </div>
              <Link href="/about" className="text-gray-600 hover:text-gray-900">
                About
              </Link>
              <Link href="/blog" className="text-gray-600 hover:text-gray-900">
                Blog
              </Link>
              <Link href="/docs" className="text-gray-600 hover:text-gray-900">
                Docs
              </Link>
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="outline" size="sm" className="rounded-full bg-transparent" asChild>
                  <Link href="https://app.enterprisechai.com/login">
                    <span className="mr-2">👤</span>
                    Login
                  </Link>
                </Button>
                <Button size="sm" className="bg-black hover:bg-gray-800 rounded-full" asChild>
                  <Link href={calendlyUrl} target="_blank" rel="noopener noreferrer">
                    Request Demo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
