"use client"

import { useState } from 'react'
import Link from 'next/link'
import { ShoppingCart, User, Search, Menu, X, ShoppingBag } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { cn } from '@/lib/utils'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  const navigation = [
    { name: 'New Arrivals', href: '/new-arrivals' },
    { name: 'Women', href: '/women' },
    { name: 'Men', href: '/men' },
    { name: 'Accessories', href: '/accessories' },
    { name: 'Virtual Try-On', href: '/virtual-try-on' },
  ]

  return (
    <header className="border-b">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <ShoppingBag className="h-8 w-8" />
              <span className="ml-2 text-2xl font-bold">LUXE</span>
            </Link>
          </div>

          <div className="hidden lg:block">
            <div className="flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium hover:text-primary"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>

            <Link href="/account">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <ShoppingCart className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col h-full">
                  <h2 className="text-lg font-semibold">Shopping Cart</h2>
                  <div className="flex-1 mt-4">
                    {/* Cart items will go here */}
                    <p className="text-muted-foreground">Your cart is empty</p>
                  </div>
                  <Button className="mt-auto">Checkout</Button>
                </div>
              </SheetContent>
            </Sheet>

            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={cn(
            "lg:hidden",
            isMenuOpen ? "block" : "hidden"
          )}
        >
          <div className="space-y-1 pb-3 pt-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-base font-medium hover:bg-accent"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Search bar */}
        <div
          className={cn(
            "border-t py-4",
            searchOpen ? "block" : "hidden"
          )}
        >
          <div className="mx-auto max-w-3xl">
            <Input
              type="search"
              placeholder="Search for products..."
              className="w-full"
            />
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header