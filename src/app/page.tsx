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
  Heart,
  Sparkles,
  Baby,
  UserCheck,
} from 'lucide-react';

export default function HomePage() {
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref3, inView3] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className='min-h-screen'>
      {/* Hero Section */}
      <section className='relative min-h-screen flex items-center justify-center overflow-hidden'>
        {/* Background Image with Overlay */}
        <div className='absolute inset-0 z-0'>
          <div className='absolute inset-0 bg-gradient-to-r from-primary/50 to-primary/0 z-10' />
         <Image
  src='https://images.pexels.com/photos/7222948/pexels-photo-7222948.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2'
  alt='SEOO - Mobilidade Executiva para Mulheres'
  fill
  className='object-cover object-[75%_30%]' // Mudança aqui - valor menor em Y
  priority
  quality={100}
/>
        </div>

        {/* Hero Content */}
{/* Hero Content */}
<div className='container mx-auto px-4 relative z-20 pt-48 pb-12 md:pt-52 md:pb-16'>
  {/* Mudou de pt-32 pb-20 md:pt-24 md:pb-16 para pt-48 pb-12 md:pt-52 md:pb-16 */}
  <div className='max-w-2xl'>
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className='space-y-6'
    >
              <div className='inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2'>
                <Heart className='w-5 h-5 text-secondary' />
                <span className='text-white text-sm font-medium'>
                  A escolha preferida das mulheres
                </span>
              </div>

              <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight'>
                Essencial para
                <span className='block text-secondary mt-2'>quem move</span>
              </h1>

              <p className='text-lg sm:text-xl text-gray-200 leading-relaxed max-w-md lg:max-w-lg'>
  Mobilidade executiva pensada exclusivamente para mulheres, 
  com motoristas 100% femininas. Conforto, segurança e tranquilidade 
  em cada trajeto.
</p>

              <h2 className='text-2xl sm:text-3xl font-semibold text-white'>
                Mobilidade do seu jeito, no seu tempo.
              </h2>

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
                    <Car className='w-5 h-5' />
                    Nossos Serviços
                  </motion.button>
                </Link>
              </div>

              {/* Tagline especial */}
              <p className='text-lg text-secondary font-medium italic pt-4'>
                "O caminho é único porque é SEOO"
              </p>

              {/* Quick Stats */}
              <div className='grid grid-cols-3 gap-4 sm:gap-6 pt-8 pb-4'>
                <div className='text-center'>
                  <p className='text-2xl sm:text-3xl font-bold text-secondary'>
                    100%
                  </p>
                  <p className='text-xs sm:text-sm text-gray-300'>
                    Motoristas Mulheres
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
                <div className='text-center'>
                  <p className='text-2xl sm:text-3xl font-bold text-secondary'>
                    5.0★
                  </p>
                  <p className='text-xs sm:text-sm text-gray-300'>
                    Avaliação
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sobre Section */}
      <section ref={ref1} className='py-16 sm:py-20 bg-white'>
        <div className='container mx-auto px-4'>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView1 ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className='max-w-4xl mx-auto text-center'
          >
            <h2 className='text-3xl sm:text-4xl font-bold text-primary mb-8'>
              Cada caminho é único porque é SEOO
            </h2>
            
            <div className='text-lg text-gray-600 space-y-4 text-left'>
              <p>
                E quando o movimento é feminino, ele ganha força, cuidado e significado.
              </p>
              <p>
                Acreditamos que mobilidade vai além de um destino. É sobre criar experiências 
                onde cada mulher se sinta <strong>segura, respeitada e no controle</strong>.
              </p>
              <p>
                É a executiva que segue firme em sua jornada,<br />
                a mãe que busca praticidade com os filhos,<br />
                a mulher que valoriza seu tempo e sua tranquilidade.
              </p>
              <p className='text-primary font-semibold pt-4'>
                Tudo isso alinhado ao compromisso com um futuro mais seguro, 
                sustentável e inclusivo.
              </p>
              <p className='italic text-secondary'>
                Nossa missão é acolher, respeitar e transformar cada trajeto em algo pessoal — 
                porque mobilidade só faz sentido quando é sua.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section ref={ref2} className='py-16 sm:py-20 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView2 ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className='text-center mb-12'
          >
            <h2 className='text-3xl sm:text-4xl font-bold text-primary mb-4'>
              Escolha o serviço SEOO
            </h2>
            <p className='text-gray-600 max-w-2xl mx-auto'>
              A mobilidade que vai além do destino. É a liberdade de se mover com 
              segurança, conforto e praticidade.
            </p>
          </motion.div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {[
              {
                icon: Plane,
                title: 'SEOO Transfer',
                subtitle: 'Seu embarque começa antes do destino',
                description: 'Transfers para aeroportos, hotéis e reuniões com pontualidade e conforto absoluto.',
              },
              {
                icon: Building,
                title: 'SEOO Corporate',
                subtitle: 'Mobilidade à altura da sua empresa',
                description: 'Atendimento exclusivo para executivas e equipes com sofisticação e discrição.',
              },
              {
                icon: Sparkles,
                title: 'SEOO Experience',
                subtitle: 'A mobilidade dos grandes encontros',
                description: 'Logística completa para feiras e eventos corporativos com hospitalidade.',
              },
              {
                icon: UserCheck,
                title: 'SEOO Exclusive',
                subtitle: 'Sua motorista exclusiva, todos os dias',
                description: 'Contrato mensal que une confiança, rotina e máxima discrição.',
              },
              {
                icon: Calendar,
                title: 'SEOO Day Use',
                subtitle: 'Exclusividade quando você precisar',
                description: 'Motorista por um dia, com cuidado e atenção personalizada.',
              },
              {
                icon: MapPin,
                title: 'SEOO Travel',
                subtitle: 'Conforto que vai além da sua cidade',
                description: 'Viagens intermunicipais com SUVs premium e total privacidade.',
              },
              {
                icon: Heart,
                title: 'SEOO Care',
                subtitle: 'Mobilidade acessível e cuidadosa',
                description: 'Atendimento porta a porta para maiores de 65 anos ou com necessidades específicas.',
              },
              {
                icon: Baby,
                title: 'SEOO Children & Teens',
                subtitle: 'Segurança que acompanha cada fase',
                description: 'Mobilidade para crianças e adolescentes com motoristas treinadas que também são mães.',
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView2 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className='bg-white rounded-2xl p-6 hover:shadow-premium transition-all duration-300 group'
              >
                <div className='bg-gradient-primary rounded-full w-14 h-14 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform'>
                  <service.icon className='w-7 h-7 text-white' />
                </div>
                <h3 className='text-lg font-bold text-primary mb-1'>
                  {service.title}
                </h3>
                <p className='text-sm text-secondary font-medium mb-2'>
                  {service.subtitle}
                </p>
                <p className='text-gray-600 text-sm'>{service.description}</p>
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

      {/* Diferenciais Section */}
      <section ref={ref3} className='py-16 sm:py-20 bg-primary text-white'>
        <div className='container mx-auto px-4'>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView3 ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className='text-center mb-12'
          >
            <h2 className='text-3xl sm:text-4xl font-bold mb-4'>
              Projetado para mulheres que exigem excelência
            </h2>
            <p className='text-gray-300 max-w-2xl mx-auto'>
              Detalhes que fazem toda a diferença em cada viagem
            </p>
          </motion.div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6'>
            {[
              {
                icon: Users,
                title: 'Detalhes',
                description: 'Condução exclusiva por motoristas mulheres, cuidadosamente selecionadas e capacitadas',
              },
              {
                icon: Clock,
                title: 'Confiança',
                description: 'Disponíveis 24 horas com pontualidade e trajetos inteligentes',
              },
              {
                icon: Shield,
                title: 'Segurança',
                description: 'Veículos com tecnologia avançada, rastreamento e vidros de alta resistência',
              },
              {
                icon: Car,
                title: 'Conforto',
                description: 'SUVs de alto padrão com amplo espaço interno e conectividade',
              },
              {
                icon: Heart,
                title: 'Eco-Friendly',
                description: 'Frota 100% híbrida, silenciosa e limpa para mobilidade sustentável',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView3 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className='text-center'
              >
                <div className='bg-white/10 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4'>
                  <feature.icon className='w-8 h-8 text-secondary' />
                </div>
                <h3 className='text-lg font-semibold mb-2'>{feature.title}</h3>
                <p className='text-gray-300 text-sm'>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-16 sm:py-20 bg-gradient-to-r from-secondary to-secondary-600'>
        <div className='container mx-auto px-4 text-center'>
          <h2 className='text-3xl sm:text-4xl font-bold text-primary mb-4'>
            SEOO. Do seu Jeito, no seu tempo.
          </h2>
          <p className='text-primary/80 text-lg sm:text-xl mb-8 max-w-2xl mx-auto'>
            Experimente a mobilidade executiva pensada exclusivamente para mulheres. 
            Agende sua viagem e descubra a diferença.
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
            <a href='https://wa.me/5511945164043'>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='bg-white hover:bg-gray-50 text-primary font-semibold px-8 sm:px-10 py-4 rounded-full shadow-xl inline-flex items-center gap-2 w-full sm:w-auto justify-center'
              >
                <Phone className='w-5 h-5' />
                WhatsApp
              </motion.button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}