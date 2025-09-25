'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Car, Calendar, User, Briefcase } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '/', label: 'Início', icon: Car },
    { href: '/servicos', label: 'Serviços', icon: Briefcase },
    { href: '/sobre', label: 'Sobre Mim', icon: User },
    { href: '/agendamento', label: 'Agendamento', icon: Calendar, highlight: true },
  ]

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-40 transition-all duration-300
        ${isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-2' 
          : 'bg-transparent py-4'
        }
      `}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="bg-gradient-primary rounded-full p-2">
              <Car className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className={`font-bold text-xl ${isScrolled ? 'text-primary' : 'text-white'}`}>
                Elite Driver
              </h1>
              <p className={`text-xs ${isScrolled ? 'text-gray-600' : 'text-gray-200'}`}>
                Motorista Executiva
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-200
                  ${item.highlight 
                    ? 'bg-gradient-primary text-white shadow-lg hover:shadow-xl transform hover:scale-105' 
                    : pathname === item.href
                      ? isScrolled ? 'bg-primary/10 text-primary' : 'bg-white/20 text-white'
                      : isScrolled 
                        ? 'text-gray-700 hover:bg-gray-100' 
                        : 'text-white hover:bg-white/10'
                  }
                  font-medium
                `}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`
              md:hidden p-2 rounded-lg transition-colors
              ${isScrolled ? 'text-primary hover:bg-primary/10' : 'text-white hover:bg-white/10'}
            `}
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t mt-2"
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                    ${item.highlight 
                      ? 'bg-gradient-primary text-white shadow-md' 
                      : pathname === item.href
                        ? 'bg-primary/10 text-primary'
                        : 'text-gray-700 hover:bg-gray-50'
                    }
                  `}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
