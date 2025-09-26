'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Star,
  Shield,
  Clock,
  Award,
  Users,
  Car,
  MapPin,
  Calendar,
  ChevronRight,
  Quote,
  CheckCircle,
  Phone,
  CreditCard,
  Briefcase,
  Plane,
  Building,
} from 'lucide-react';

export default function HomePage() {
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref3, inView3] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className='min-h-screen'>
      {/* Hero Section - USANDO IMAGEM LOCAL */}
      <section className='relative min-h-screen flex items-center justify-center overflow-hidden'>
        {/* Background Image with Overlay */}
        <div className='absolute inset-0 z-0'>
          <div className='absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70 z-10' />
          <Image
            src='/hero-seo.png'
            alt='Elite Driver - Mobilidade Executiva'
            fill
            className='object-cover'
            priority
            quality={100}
          />
        </div>

        {/* Hero Content - PADDING AJUSTADO PARA MOBILE */}
        <div className='container mx-auto px-4 relative z-20 pt-32 pb-20 md:pt-24 md:pb-16'>
          <div className='max-w-3xl'>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className='space-y-6'
            >
              <div className='inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2'>
                <Shield className='w-5 h-5 text-secondary' />
                <span className='text-white text-sm font-medium'>
                  Segurança e Conforto Garantidos
                </span>
              </div>

              <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight'>
                Motorista Executiva
                <span className='block text-secondary mt-2'>Premium</span>
              </h1>

              <p className='text-lg sm:text-xl text-gray-200 leading-relaxed'>
                Transforme suas viagens em experiências excepcionais. Serviço
                personalizado de transporte executivo com pontualidade,
                discrição e o mais alto padrão de qualidade.
              </p>

              <div className='flex flex-col sm:flex-row gap-4 pt-4'>
                <Link href='/agendamento'>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className='bg-secondary hover:bg-secondary-600 text-primary font-semibold px-8 py-4 rounded-full shadow-xl flex items-center justify-center gap-2 w-full sm:w-auto'
                  >
                    <Calendar className='w-5 h-5' />
                    Agendar Agora
                  </motion.button>
                </Link>

                <Link href='/servicos'>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className='bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-full border border-white/30 flex items-center justify-center gap-2 w-full sm:w-auto'
                  >
                    <Briefcase className='w-5 h-5' />
                    Nossos Serviços
                  </motion.button>
                </Link>
              </div>

              {/* Quick Stats - MELHOR ESPAÇAMENTO MOBILE */}
              <div className='grid grid-cols-3 gap-4 sm:gap-6 pt-8 pb-4'>
                <div className='text-center'>
                  <p className='text-2xl sm:text-3xl font-bold text-secondary'>
                    500+
                  </p>
                  <p className='text-xs sm:text-sm text-gray-300'>
                    Clientes Satisfeitos
                  </p>
                </div>
                <div className='text-center'>
                  <p className='text-2xl sm:text-3xl font-bold text-secondary'>
                    4.9★
                  </p>
                  <p className='text-xs sm:text-sm text-gray-300'>
                    Avaliação Média
                  </p>
                </div>
                <div className='text-center'>
                  <p className='text-2xl sm:text-3xl font-bold text-secondary'>
                    24/7
                  </p>
                  <p className='text-xs sm:text-sm text-gray-300'>
                    Disponibilidade
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator - OCULTO NO MOBILE */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className='hidden md:block absolute bottom-8 left-1/2 transform -translate-x-1/2'
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className='w-6 h-10 border-2 border-white/50 rounded-full flex justify-center'
          >
            <div className='w-1 h-3 bg-white/50 rounded-full mt-2' />
          </motion.div>
        </motion.div>
      </section>

      {/* Services Preview Section - PADDING AJUSTADO */}
      <section ref={ref1} className='py-16 sm:py-20 bg-white'>
        <div className='container mx-auto px-4'>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView1 ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className='text-center mb-12'
          >
            <h2 className='text-3xl sm:text-4xl font-bold text-primary mb-4'>
              Serviços Exclusivos
            </h2>
            <p className='text-gray-600 max-w-2xl mx-auto'>
              Soluções completas de transporte executivo adaptadas às suas
              necessidades
            </p>
          </motion.div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {[
              {
                icon: Plane,
                title: 'Transfer Aeroporto',
                description:
                  'Transporte VIP para todos os aeroportos com pontualidade garantida',
                features: [
                  'Monitoramento de voo',
                  'Recepção personalizada',
                  'Auxílio com bagagem',
                ],
              },
              {
                icon: Building,
                title: 'Corporativo',
                description: 'Serviço exclusivo para executivos e empresas',
                features: [
                  'Motorista fixo',
                  'Relatórios mensais',
                  'Faturamento empresarial',
                ],
              },
              {
                icon: Calendar,
                title: 'Eventos Especiais',
                description:
                  'Transporte premium para eventos e ocasiões especiais',
                features: [
                  'Decoração personalizada',
                  'Roteiro flexível',
                  'Champagne de cortesia',
                ],
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView1 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className='bg-gray-50 rounded-2xl p-6 hover:shadow-premium transition-all duration-300 group'
              >
                <div className='bg-gradient-primary rounded-full w-14 h-14 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform'>
                  <service.icon className='w-7 h-7 text-secondary' />
                </div>
                <h3 className='text-xl font-semibold text-primary mb-2'>
                  {service.title}
                </h3>
                <p className='text-gray-600 mb-4'>{service.description}</p>
                <ul className='space-y-2'>
                  {service.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className='flex items-center gap-2 text-sm text-gray-500'
                    >
                      <CheckCircle className='w-4 h-4 text-secondary' />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <div className='text-center mt-10'>
            <Link href='/servicos'>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className='bg-primary hover:bg-primary-600 text-white font-semibold px-8 py-3 rounded-full inline-flex items-center gap-2'
              >
                Ver Todos os Serviços
                <ChevronRight className='w-5 h-5' />
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews Section - PADDING AJUSTADO */}
      <section
        ref={ref2}
        className='py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-white'
      >
        <div className='container mx-auto px-4'>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView2 ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className='text-center mb-12'
          >
            <h2 className='text-3xl sm:text-4xl font-bold text-primary mb-4'>
              O Que Nossos Clientes Dizem
            </h2>
            <p className='text-gray-600 max-w-2xl mx-auto'>
              A satisfação dos nossos clientes é nossa maior conquista
            </p>
          </motion.div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {[
              {
                name: 'Carlos Eduardo Silva',
                role: 'CEO, TechCorp Brasil',
                image:
                  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200',
                rating: 5,
                comment:
                  'Serviço impecável! A pontualidade e profissionalismo são incomparáveis. Recomendo para todos os executivos que precisam de um transporte confiável.',
              },
              {
                name: 'Ana Paula Mendes',
                role: 'Diretora de Marketing',
                image:
                  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200',
                rating: 5,
                comment:
                  'Uso o serviço há 2 anos para minhas viagens corporativas. Sempre pontual, veículo impecável e a motorista é extremamente profissional.',
              },
              {
                name: 'Roberto Almeida',
                role: 'Empresário',
                image:
                  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200',
                rating: 5,
                comment:
                  'Excelente para transfers de aeroporto. A motorista monitora os voos e está sempre esperando, mesmo quando há atrasos. Serviço premium de verdade!',
              },
            ].map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView2 ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className='bg-white rounded-2xl p-6 shadow-lg hover:shadow-premium transition-all duration-300'
              >
                <div className='flex items-center gap-4 mb-4'>
                  <Image
                    src={review.image}
                    alt={review.name}
                    width={60}
                    height={60}
                    className='rounded-full object-cover'
                  />
                  <div>
                    <h4 className='font-semibold text-primary'>
                      {review.name}
                    </h4>
                    <p className='text-sm text-gray-500'>{review.role}</p>
                  </div>
                </div>

                <div className='flex gap-1 mb-3'>
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className='w-5 h-5 fill-yellow-400 text-yellow-400'
                    />
                  ))}
                </div>

                <Quote className='w-8 h-8 text-secondary/20 mb-2' />
                <p className='text-gray-600 italic leading-relaxed'>
                  {review.comment}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section - PADDING AJUSTADO */}
      <section ref={ref3} className='py-16 sm:py-20 bg-primary text-white'>
        <div className='container mx-auto px-4'>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView3 ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className='text-center mb-12'
          >
            <h2 className='text-3xl sm:text-4xl font-bold mb-4'>
              Por Que Escolher a Seo ?
            </h2>
            <p className='text-gray-300 max-w-2xl mx-auto'>
              Comprometimento com excelência em cada detalhe da sua viagem
            </p>
          </motion.div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
            {[
              {
                icon: Shield,
                title: 'Segurança Total',
                description:
                  'Veículos revisados, seguro completo e motorista treinada',
              },
              {
                icon: Clock,
                title: 'Pontualidade',
                description:
                  'Sempre no horário, com planejamento de rotas inteligente',
              },
              {
                icon: Award,
                title: 'Serviço Premium',
                description: 'Atendimento personalizado e veículos de luxo',
              },
              {
                icon: CreditCard,
                title: 'Pagamento Flexível',
                description: 'PIX, cartões e faturamento empresarial',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView3 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className='text-center'
              >
                <div className='bg-white/10 backdrop-blur-sm rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4'>
                  <feature.icon className='w-10 h-10 text-secondary' />
                </div>
                <h3 className='text-xl font-semibold mb-2'>{feature.title}</h3>
                <p className='text-gray-300'>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - PADDING AJUSTADO */}
      <section className='py-16 sm:py-20 bg-gradient-to-r from-secondary to-secondary-600'>
        <div className='container mx-auto px-4 text-center'>
          <h2 className='text-3xl sm:text-4xl font-bold text-primary mb-4'>
            Pronto para uma Experiência Premium?
          </h2>
          <p className='text-primary/80 text-lg sm:text-xl mb-8 max-w-2xl mx-auto'>
            Agende sua viagem agora e descubra o verdadeiro significado de
            transporte executivo
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Link href='/agendamento'>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='bg-primary hover:bg-primary-700 text-white font-semibold px-8 sm:px-10 py-4 rounded-full shadow-xl inline-flex items-center gap-2 w-full sm:w-auto justify-center'
              >
                <Calendar className='w-5 h-5' />
                Fazer Agendamento
              </motion.button>
            </Link>
            <a href='tel:+5511999999999'>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='bg-white hover:bg-gray-50 text-primary font-semibold px-8 sm:px-10 py-4 rounded-full shadow-xl inline-flex items-center gap-2 w-full sm:w-auto justify-center'
              >
                <Phone className='w-5 h-5' />
                Ligar Agora
              </motion.button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
