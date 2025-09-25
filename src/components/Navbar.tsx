'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Calendar, User, Briefcase, Phone, Car } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '/', label: 'Início', icon: Car },
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

  return (
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
          {/* Logo Container - Layout Vertical Compacto */}
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
                  alt='Elite Driver'
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
                    Elite Driver
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
            {/* Links de navegação com ícones opcionais */}
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

            {/* Divisor vertical elegante */}
            <div
              className={`h-8 w-px mr-6 ${
                isScrolled || !isHomePage
                  ? 'bg-gradient-to-b from-transparent via-gray-300 to-transparent'
                  : 'bg-gradient-to-b from-transparent via-white/30 to-transparent'
              }`}
            />

            {/* Botões de ação com melhor destaque */}
            <div className='flex items-center gap-3'>
              {/* Botão Agendamento Principal */}
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
                  {/* Animated background effect */}
                  <div className='absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300' />

                  <Calendar className='w-4 h-4 relative z-10' />
                  <span className='relative z-10'>Agendamento</span>
                </motion.button>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button com animação */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`
              lg:hidden relative p-2.5 rounded-lg transition-all duration-300
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

      {/* Mobile Menu Melhorado */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className='fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden'
              style={{ top: '60px' }}
            />

            {/* Menu Slide */}
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className='fixed right-0 top-[60px] bottom-0 w-[85%] max-w-sm bg-white shadow-2xl z-50 lg:hidden overflow-y-auto'
            >
              <div className='p-6 space-y-3'>
                {/* Logo e título no menu */}
                <div className='pb-4 mb-4 border-b border-gray-200'>
                  <Image
                    src='/logo-preto-seo.png'
                    alt='Elite Driver'
                    width={120}
                    height={35}
                    className='object-contain mb-2'
                    onError={e => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <p className='text-sm font-medium text-gray-600'>
                    Mobilidade Executiva
                  </p>
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
                          flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
                          ${
                            isActive
                              ? 'bg-primary/10 text-primary font-medium'
                              : 'text-gray-700 hover:bg-gray-50 hover:text-primary'
                          }
                        `}
                      >
                        <Icon className='w-5 h-5' />
                        <span>{item.label}</span>
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

                {/* Botões de ação mobile */}
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
                    <button className='w-full bg-gradient-to-r from-primary to-primary-600 text-white px-4 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all'>
                      <Calendar className='w-5 h-5' />
                      Fazer Agendamento
                    </button>
                  </Link>

                  <a href='tel:+5511999999999'>
                    <button
                      onClick={() => setIsMobileMenuOpen(false)}
                      className='w-full bg-green-500 text-white px-4 py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-green-600 transition-colors'
                    >
                      <Phone className='w-5 h-5 animate-pulse' />
                      Ligar Agora
                    </button>
                  </a>
                </motion.div>

                {/* Info de contato */}
                <div className='text-center pt-4'>
                  <p className='text-xs text-gray-500'>Atendimento 24/7</p>
                  <p className='text-sm font-semibold text-primary'>
                    (11) 99999-9999
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
