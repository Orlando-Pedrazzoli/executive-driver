'use client';

import Link from 'next/link';
import {
  Car,
  MapPin,
  Phone,
  Mail,
  Shield,
  Award,
  Clock,
  CreditCard,
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-gradient-to-br from-primary via-primary-600 to-primary-800 text-white'>
      {/* Main Footer Content */}
      <div className='container mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {/* Company Info */}
          <div className='space-y-4'>
            <div className='flex items-center space-x-3'>
              <div className='bg-white/10 backdrop-blur-sm rounded-full p-2'>
                <Car className='w-8 h-8 text-secondary' />
              </div>
              <div>
                <h3 className='font-bold text-xl'>Seo</h3>
                <p className='text-xs text-gray-300'>Mobilidade Executiva</p>
              </div>
            </div>
            <p className='text-gray-300 leading-relaxed'>
              Serviço premium de motorista executiva com segurança, conforto e
              pontualidade para suas viagens corporativas e pessoais.
            </p>
            <div className='flex flex-col space-y-2 text-sm'>
              <p className='text-gray-300'>CNPJ: 00.000.000/0001-00</p>
              <p className='text-gray-300'>São Paulo - SP</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className='space-y-4'>
            <h4 className='font-semibold text-lg text-secondary'>
              Links Rápidos
            </h4>
            <ul className='space-y-2'>
              {[
                { href: '/', label: 'Início' },
                { href: '/servicos', label: 'Nossos Serviços' },
                { href: '/sobre', label: 'Sobre a Motorista' },
                { href: '/agendamento', label: 'Agendar Viagem' },
              ].map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className='text-gray-300 hover:text-secondary transition-colors duration-200 text-sm'
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className='space-y-4'>
            <h4 className='font-semibold text-lg text-secondary'>
              Nossos Serviços
            </h4>
            <ul className='space-y-2 text-sm'>
              {[
                'Transfer Executivo',
                'Aeroporto VIP',
                'Motorista por Contrato',
                'Eventos Corporativos',
                'City Tour Premium',
                'Viagens Intermunicipais',
              ].map(service => (
                <li
                  key={service}
                  className='text-gray-300 flex items-center gap-2'
                >
                  <span className='w-1.5 h-1.5 bg-secondary rounded-full' />
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Trust Signals */}
          <div className='space-y-4'>
            <h4 className='font-semibold text-lg text-secondary'>
              Contato & Segurança
            </h4>

            <div className='space-y-3 text-sm'>
              <a
                href='tel:+5511999999999'
                className='flex items-center gap-3 text-gray-300 hover:text-secondary transition-colors'
              >
                <Phone className='w-4 h-4' />
                <span>(11) 99999-9999</span>
              </a>

              <a
                href='mailto:contato@elitedriver.com.br'
                className='flex items-center gap-3 text-gray-300 hover:text-secondary transition-colors'
              >
                <Mail className='w-4 h-4' />
                <span>contato@elitedriver.com.br</span>
              </a>

              <div className='flex items-center gap-3 text-gray-300'>
                <MapPin className='w-4 h-4 flex-shrink-0' />
                <span>São Paulo, SP - Brasil</span>
              </div>
            </div>

            {/* Trust Badges */}
            <div className='grid grid-cols-2 gap-2 pt-4'>
              <div className='bg-white/10 backdrop-blur-sm rounded-lg p-2 text-center'>
                <Shield className='w-6 h-6 mx-auto text-secondary mb-1' />
                <p className='text-xs'>100% Seguro</p>
              </div>
              <div className='bg-white/10 backdrop-blur-sm rounded-lg p-2 text-center'>
                <Award className='w-6 h-6 mx-auto text-secondary mb-1' />
                <p className='text-xs'>Premium</p>
              </div>
              <div className='bg-white/10 backdrop-blur-sm rounded-lg p-2 text-center'>
                <Clock className='w-6 h-6 mx-auto text-secondary mb-1' />
                <p className='text-xs'>Pontual</p>
              </div>
              <div className='bg-white/10 backdrop-blur-sm rounded-lg p-2 text-center'>
                <CreditCard className='w-6 h-6 mx-auto text-secondary mb-1' />
                <p className='text-xs'>PIX</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className='border-t border-white/20'>
        <div className='container mx-auto px-4 py-4'>
          <div className='flex flex-col md:flex-row justify-between items-center gap-4 text-sm'>
            <p className='text-gray-300 text-center md:text-left'>
              © {currentYear} Elite Driver. Todos os direitos reservados.
            </p>
            <div className='flex gap-6'>
              <Link
                href='/privacidade'
                className='text-gray-300 hover:text-secondary transition-colors'
              >
                Política de Privacidade
              </Link>
              <Link
                href='/termos'
                className='text-gray-300 hover:text-secondary transition-colors'
              >
                Termos de Uso
              </Link>
              <Link
                href='/lgpd'
                className='text-gray-300 hover:text-secondary transition-colors'
              >
                LGPD
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
