'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  Calendar,
  User,
  Briefcase,
  Phone,
  Car,
  Home,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fechar menu ao mudar de rota
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navItems = [
    { href: '/', label: 'Início', icon: Home },
    { href: '/servicos', label: 'Serviços', icon: Briefcase },
    { href: '/sobre', label: 'Sobre Mim', icon: User },
  ];

  // Determinar se estamos na home page
  const isHomePage = pathname === '/';

  // Determinar qual logo usar baseado no estado da navbar
  const logoSrc =
    isScrolled || !isHomePage ? '/logo-preto-seo.png' : '/logo-branco-seo.png';

  // Cores do subtítulo baseado no estado
  const subtitleColor =
    isScrolled || !isHomePage
      ? 'text-gray-600'
      : 'text-gray-200 drop-shadow-md';

  // Componente do Menu Mobile
  const MobileMenu = () => (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className='lg:hidden'
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
              zIndex: 999998,
            }}
          />

          {/* Menu Slide */}
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className='lg:hidden'
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: '85%',
              maxWidth: '384px',
              backgroundColor: 'white',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              zIndex: 999999,
              overflowY: 'auto',
              paddingTop: isScrolled ? '70px' : '80px',
            }}
          >
            <div className='p-6 space-y-3'>
              {/* Header do menu com logo e botão fechar */}
              <div className='flex items-center justify-between pb-4 mb-4 border-b border-gray-200'>
                {/* Logo à esquerda */}
                <div className='flex flex-col'>
                  {!logoError ? (
                    <Image
                      src='/logo-preto-seo.png'
                      alt='SEO Mobilidade Executiva'
                      width={120}
                      height={36}
                      className='object-contain h-8 w-auto'
                      onError={() => setLogoError(true)}
                    />
                  ) : (
                    <div className='flex items-center gap-2'>
                      <div className='rounded-full p-1.5 bg-gradient-to-r from-primary to-primary-600'>
                        <Car className='w-5 h-5 text-white' />
                      </div>
                      <span className='font-bold text-lg text-primary'>
                        SEO
                      </span>
                    </div>
                  )}
                  <p className='text-xs text-gray-500 mt-1'>
                    Mobilidade Executiva
                  </p>
                </div>

                {/* Botão X à direita */}
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className='p-2 rounded-full hover:bg-gray-100 transition-all duration-200 hover:rotate-90'
                  aria-label='Fechar menu'
                >
                  <X className='w-5 h-5 text-gray-500 hover:text-gray-700' />
                </button>
              </div>

              {/* Links de navegação mobile */}
              {navItems.map((item, index) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`
                        flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300
                        ${
                          isActive
                            ? 'bg-primary/10 text-primary font-semibold border-l-4 border-primary'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-primary border-l-4 border-transparent'
                        }
                      `}
                    >
                      <Icon className='w-5 h-5' />
                      <span className='text-base'>{item.label}</span>
                      {isActive && (
                        <motion.div
                          layoutId='mobile-active'
                          className='ml-auto w-2 h-2 bg-primary rounded-full'
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}

              {/* Divisor */}
              <div className='my-4 border-t border-gray-200' />

              {/* Botão de ação principal */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className='space-y-3'
              >
                <Link
                  href='/agendamento'
                  onClick={() => setIsMobileMenuOpen(false)}
                  className='block'
                >
                  <button className='w-full bg-gradient-to-r from-primary to-primary-600 text-white px-4 py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all'>
                    <Calendar className='w-5 h-5' />
                    Fazer Agendamento
                  </button>
                </Link>
              </motion.div>

              {/* Info de contato */}
              <div className='bg-gray-50 rounded-xl p-4 mt-6'>
                <p className='text-xs text-gray-500 text-center'>
                  Atendimento 24/7
                </p>
                <a href='tel:+5511999999999' className='block text-center mt-1'>
                  <p className='text-base font-bold text-primary hover:text-primary-600 transition-colors'>
                    (11) 99999-9999
                  </p>
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <nav
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${
            isScrolled
              ? 'bg-white shadow-lg py-2'
              : isHomePage
              ? 'bg-gradient-to-b from-black/50 to-transparent backdrop-blur-sm py-4'
              : 'bg-white/95 backdrop-blur-sm shadow-md py-3'
          }
        `}
      >
        <div className='container mx-auto px-4'>
          <div className='flex items-center justify-between'>
            {/* Logo Container */}
            <Link href='/' className='group'>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className='flex flex-col items-center'
              >
                {/* Logo Image ou Fallback */}
                {!logoError ? (
                  <Image
                    src={logoSrc}
                    alt='SEO Mobilidade Executiva'
                    width={150}
                    height={45}
                    className='object-contain h-10 w-auto'
                    priority
                    onError={() => setLogoError(true)}
                  />
                ) : (
                  // Fallback caso as imagens não carreguem
                  <div className='flex items-center gap-2'>
                    <div
                      className={`
                      rounded-full p-2 transition-all duration-300
                      ${
                        isScrolled || !isHomePage
                          ? 'bg-gradient-to-r from-primary to-primary-600'
                          : 'bg-white/20 backdrop-blur-sm'
                      }
                    `}
                    >
                      <Car className='w-6 h-6 text-white' />
                    </div>
                    <span
                      className={`
                      font-bold text-xl
                      ${
                        isScrolled || !isHomePage
                          ? 'text-primary'
                          : 'text-white drop-shadow-lg'
                      }
                    `}
                    >
                      SEO
                    </span>
                  </div>
                )}

                {/* Subtítulo abaixo do logo */}
                <p
                  className={`
                  text-xs font-medium transition-colors duration-300 mt-1
                  ${subtitleColor}
                `}
                >
                  Mobilidade Executiva
                </p>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className='hidden lg:flex items-center'>
              {/* Links de navegação */}
              <div className='flex items-center gap-6 mr-6'>
                {navItems.map(item => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`
                        flex items-center gap-1.5 transition-all duration-300
                        font-medium relative group
                        ${
                          isActive
                            ? isScrolled || !isHomePage
                              ? 'text-primary'
                              : 'text-white drop-shadow'
                            : isScrolled || !isHomePage
                            ? 'text-gray-600 hover:text-primary'
                            : 'text-white/90 hover:text-white drop-shadow'
                        }
                      `}
                    >
                      <Icon className='w-4 h-4 opacity-70' />
                      <span>{item.label}</span>

                      {/* Indicador de página ativa */}
                      {isActive && (
                        <motion.div
                          layoutId='navbar-active'
                          className='absolute -bottom-2 left-0 right-0 h-0.5 bg-current rounded-full'
                          transition={{
                            type: 'spring',
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      )}

                      {/* Hover effect */}
                      {!isActive && (
                        <span className='absolute -bottom-2 left-0 right-0 h-0.5 bg-current rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center opacity-60' />
                      )}
                    </Link>
                  );
                })}
              </div>

              {/* Divisor vertical */}
              <div
                className={`h-8 w-px mr-6 ${
                  isScrolled || !isHomePage
                    ? 'bg-gradient-to-b from-transparent via-gray-300 to-transparent'
                    : 'bg-gradient-to-b from-transparent via-white/30 to-transparent'
                }`}
              />

              {/* Botão de ação principal */}
              <div className='flex items-center gap-3'>
                <Link href='/agendamento'>
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      relative flex items-center gap-2 px-6 py-2.5 rounded-full 
                      transition-all duration-300 font-semibold overflow-hidden
                      ${
                        isScrolled || !isHomePage
                          ? 'bg-gradient-to-r from-primary to-primary-600 text-white shadow-lg hover:shadow-xl'
                          : 'bg-gradient-to-r from-secondary to-secondary-600 text-primary shadow-lg hover:shadow-xl'
                      }
                    `}
                  >
                    <Calendar className='w-4 h-4 relative z-10' />
                    <span className='relative z-10'>Fazer Agendamento</span>
                  </motion.button>
                </Link>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`
                lg:hidden relative p-2.5 rounded-lg transition-all duration-300 z-50
                ${
                  isScrolled || !isHomePage
                    ? 'text-primary hover:bg-primary/10'
                    : 'text-white hover:bg-white/10 backdrop-blur-sm'
                }
              `}
              aria-label='Menu'
            >
              <div className='relative w-6 h-6 flex items-center justify-center'>
                <span
                  className={`
                  absolute h-0.5 w-6 bg-current transition-all duration-300
                  ${isMobileMenuOpen ? 'rotate-45' : '-translate-y-2'}
                `}
                />
                <span
                  className={`
                  absolute h-0.5 w-6 bg-current transition-all duration-300
                  ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}
                `}
                />
                <span
                  className={`
                  absolute h-0.5 w-6 bg-current transition-all duration-300
                  ${isMobileMenuOpen ? '-rotate-45' : 'translate-y-2'}
                `}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu renderizado com createPortal */}
      {mounted && createPortal(<MobileMenu />, document.body)}
    </>
  );
}
