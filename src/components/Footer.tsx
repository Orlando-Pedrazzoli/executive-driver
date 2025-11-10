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
  Heart,
  Instagram,
  Facebook,
  Linkedin,
  Users,
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
                <h3 className='font-bold text-xl'>SEOO</h3>
                <p className='text-xs text-gray-300'>Mobilidade Executiva</p>
              </div>
            </div>
            <p className='text-gray-300 leading-relaxed'>
              Mobilidade pensada para mulheres, com conforto e tranquilidade 
              a cada trajeto. Motoristas 100% femininas garantindo segurança 
              e acolhimento.
            </p>
            <div className='flex flex-col space-y-2 text-sm'>
              <p className='text-gray-300'>Operada por: Somas Group Ltda</p>
              <p className='text-gray-300'>CNPJ: 28.705.153/0001-53</p>
            </div>
            <div className='bg-white/10 backdrop-blur-sm rounded-lg p-3 inline-flex items-center gap-2'>
              <Heart className='w-5 h-5 text-secondary' />
              <p className='text-sm font-medium'>100% Motoristas Mulheres</p>
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
                { href: '/empresa', label: 'Empresa' },
                { href: '/servicos', label: 'Nossos Serviços' },
                { href: '/contato', label: 'Contato' },
                { href: '/compliance', label: 'Compliance' },
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
                'SEOO Transfer',
                'SEOO Corporate',
                'SEOO Experience',
                'SEOO Exclusive',
                'SEOO Day Use',
                'SEOO Travel',
                'SEOO Care',
                'SEOO Children & Teens',
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
                href='tel:+5511945164043'
                className='flex items-center gap-3 text-gray-300 hover:text-secondary transition-colors'
              >
                <Phone className='w-4 h-4' />
                <span>(11) 94516-4043</span>
              </a>

              <a
                href='mailto:reservas@seomob.com.br'
                className='flex items-center gap-3 text-gray-300 hover:text-secondary transition-colors'
              >
                <Mail className='w-4 h-4' />
                <span>reservas@seomob.com.br</span>
              </a>

              <div className='flex items-center gap-3 text-gray-300'>
                <MapPin className='w-4 h-4 flex-shrink-0' />
                <span>Rua Coronel José Eusébio, 95<br />Higienópolis - São Paulo/SP</span>
              </div>
            </div>

            {/* Social Media */}
            <div className='flex gap-3 pt-4'>
              <a
                href='https://instagram.com/seoo.mob'
                target='_blank'
                rel='noopener noreferrer'
                className='bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors'
              >
                <Instagram className='w-5 h-5' />
              </a>
              <a
                href='https://facebook.com/seoomobilidade'
                target='_blank'
                rel='noopener noreferrer'
                className='bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors'
              >
                <Facebook className='w-5 h-5' />
              </a>
              <a
                href='https://linkedin.com/company/seoo-mobilidade'
                target='_blank'
                rel='noopener noreferrer'
                className='bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors'
              >
                <Linkedin className='w-5 h-5' />
              </a>
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
                <p className='text-xs'>24/7</p>
              </div>
              <div className='bg-white/10 backdrop-blur-sm rounded-lg p-2 text-center'>
                <Users className='w-6 h-6 mx-auto text-secondary mb-1' />
                <p className='text-xs'>Mulheres</p>
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
              © {currentYear} SEOO Mobilidade Executiva. Todos os direitos reservados.
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
                LGPD2025
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}