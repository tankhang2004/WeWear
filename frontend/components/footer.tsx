import Link from 'next/link'
import { Facebook, Instagram, Twitter } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-background border-t">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About LUXE</h3>
            <p className="text-muted-foreground">
              Discover the future of fashion with our innovative virtual try-on technology
              and curated collection of premium clothing.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/new-arrivals" className="hover:text-primary">New Arrivals</Link></li>
              <li><Link href="/best-sellers" className="hover:text-primary">Best Sellers</Link></li>
              <li><Link href="/sale" className="hover:text-primary">Sale</Link></li>
              <li><Link href="/virtual-try-on" className="hover:text-primary">Virtual Try-On</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link href="/contact" className="hover:text-primary">Contact Us</Link></li>
              <li><Link href="/shipping" className="hover:text-primary">Shipping Information</Link></li>
              <li><Link href="/returns" className="hover:text-primary">Returns & Exchanges</Link></li>
              <li><Link href="/size-guide" className="hover:text-primary">Size Guide</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <Link href="https://facebook.com" className="hover:text-primary">
                <Facebook className="h-6 w-6" />
              </Link>
              <Link href="https://instagram.com" className="hover:text-primary">
                <Instagram className="h-6 w-6" />
              </Link>
              <Link href="https://twitter.com" className="hover:text-primary">
                <Twitter className="h-6 w-6" />
              </Link>
            </div>
            <div className="mt-4">
              <h4 className="font-medium mb-2">Subscribe to our newsletter</h4>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 border rounded-md"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t">
          <p className="text-center text-muted-foreground">
            © {new Date().getFullYear()} LUXE. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer