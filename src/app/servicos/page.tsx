'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import Image from 'next/image';
import {
  Plane,
  Calendar,
  MapPin,
  Shield,
  Clock,
  Award,
  Car,
  Users,
  Briefcase,
  Star,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  CreditCard,
  Phone,
  Wifi,
  Coffee,
  Heart,
  Baby,
  UserCheck,
  Navigation,
} from 'lucide-react';

// Componente de Carousel Premium
const ImageCarousel = ({ images, serviceId }: { images: string[]; serviceId: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) return images.length - 1;
      if (nextIndex >= images.length) return 0;
      return nextIndex;
    });
  };

  // Auto-play
  useState(() => {
    const interval = setInterval(() => {
      paginate(1);
    }, 5000); // Troca a cada 5 segundos

    return () => clearInterval(interval);
  });

  return (
  <div className='relative h-[350px] overflow-hidden bg-gray-900'>
      {/* Imagens do Carousel */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial='enter'
          animate='center'
          exit='exit'
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag='x'
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className='absolute inset-0'
        >
          <Image
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            fill
            className='object-cover'
            priority={currentIndex === 0}
          />

          {/* Overlay gradiente para melhor legibilidade */}
          <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent' />
        </motion.div>
      </AnimatePresence>

      {/* Botões de Navegação */}
      <button
        onClick={() => paginate(-1)}
        className='absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white backdrop-blur-sm p-2 rounded-full transition-all duration-300 hover:scale-110 shadow-lg group'
        aria-label='Imagem anterior'
      >
        <ChevronLeft className='w-5 h-5 text-primary group-hover:scale-110 transition-transform' />
      </button>

      <button
        onClick={() => paginate(1)}
        className='absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white backdrop-blur-sm p-2 rounded-full transition-all duration-300 hover:scale-110 shadow-lg group'
        aria-label='Próxima imagem'
      >
        <ChevronRight className='w-5 h-5 text-primary group-hover:scale-110 transition-transform' />
      </button>

      {/* Indicadores de Posição (Dots) */}
      <div className='absolute bottom-4 left-0 right-0 z-10 flex justify-center gap-2'>
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`
              h-2 rounded-full transition-all duration-300
              ${
                currentIndex === index
                  ? 'w-8 bg-secondary shadow-lg'
                  : 'w-2 bg-white/50 hover:bg-white/80'
              }
            `}
            aria-label={`Ir para imagem ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className='absolute top-0 left-0 right-0 h-1 bg-white/20 z-10'>
        <motion.div
          className='h-full bg-secondary'
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 5, ease: 'linear' }}
          key={currentIndex}
        />
      </div>
    </div>
  );
};

const services = [
  {
    id: 'transfer',
    title: 'SEOO Transfer',
    subtitle: 'Seu embarque começa antes do destino',
    description: 'Transfers para aeroportos, hotéis e reuniões com pontualidade e conforto absoluto.',
    carouselImages: ['/carousel-1.jpg', '/carousel-12.jpg'],
    icon: Plane,
    features: [
      'Monitoramento de voo em tempo real',
      'Recepção personalizada no desembarque',
      'Auxílio com bagagem',
      'Água e snacks de cortesia',
      'Wi-Fi no veículo',
      'Motoristas 100% mulheres',
    ],
    price: 'A partir de R$ 180',
    popular: false,
  },
  {
    id: 'corporate',
    title: 'SEOO Corporate',
    subtitle: 'Mobilidade à altura da sua empresa',
    description: 'Atendimento exclusivo para executivas e equipes com sofisticação, discrição e eficiência.',
    carouselImages: ['/carousel-3.jpg', '/carousel-4.jpg'],
    icon: Briefcase,
    features: [
      'Motorista exclusiva feminina',
      'Sigilo e discrição absolutos',
      'Relatórios de viagem',
      'Faturamento corporativo',
      'Disponibilidade 24/7',
      'SUVs híbridos premium',
    ],
    price: 'Sob consulta',
    popular: false,
  },
  {
    id: 'experience',
    title: 'SEOO Experience',
    subtitle: 'A mobilidade dos grandes encontros',
    description: 'Logística completa para feiras comerciais, eventos corporativos e sociais com organização e hospitalidade em cada detalhe.',
    carouselImages: ['/carousel-5.jpg', '/carousel-6.jpg'],
    icon: Sparkles,
    features: [
      'Coordenação completa de transporte',
      'Múltiplos veículos disponíveis',
      'Motoristas uniformizadas',
      'Hospitalidade premium',
      'Roteiro flexível',
      'Suporte dedicado',
    ],
    price: 'Por evento',
    popular: false,
  },
  {
    id: 'exclusive',
    title: 'SEOO Exclusive',
    subtitle: 'Sua motorista exclusiva, todos os dias',
    description: 'Contrato mensal que une confiança, rotina e máxima discrição com SUVs de alto padrão.',
    carouselImages: ['/carousel-7.jpg', '/carousel-2.jpg'],
    icon: UserCheck,
    features: [
      'Motorista dedicada',
      'Horário comercial ou 24h',
      'Quilometragem incluída',
      'Veículo exclusivo',
      'Gestão de manutenção',
      'Economia de até 30%',
    ],
    price: 'Planos mensais',
    popular: false,
  },
  {
    id: 'dayuse',
    title: 'SEOO Day Use',
    subtitle: 'Exclusividade quando você precisar',
    description: 'Motorista por um dia, com cuidado e atenção personalizada para compromissos, eventos ou lazer.',
    carouselImages: ['/carousel-8.jpg', '/carousel-13.jpg'],
    icon: Calendar,
    features: [
      'Período de 4 a 12 horas',
      'Motorista dedicada',
      'Roteiro personalizado',
      'Múltiplas paradas',
      'Espera incluída',
      'Total flexibilidade',
    ],
    price: 'A partir de R$ 450',
    popular: false,
  },
  {
    id: 'travel',
    title: 'SEOO Travel',
    subtitle: 'Conforto que vai além da sua cidade',
    description: 'Viagens intermunicipais com SUVs premium, tecnologia de bordo e total privacidade.',
    carouselImages: ['/carousel-18.jpg', '/carousel-14.jpg'],
    icon: MapPin,
    features: [
      'Rotas planejadas',
      'Paradas programadas',
      'Refeições inclusas',
      'Seguro viagem',
      'GPS tracking',
      'Suporte 24h',
    ],
    price: 'Por quilômetro',
    popular: false,
  },
  {
    id: 'care',
    title: 'SEOO Care',
    subtitle: 'Mobilidade acessível, com cuidado em cada detalhe',
    description: 'Atendimento porta a porta para maiores de 65 anos ou com necessidades específicas, unindo conforto, cuidado e tranquilidade.',
    carouselImages: ['/carousel-16.jpg', '/carousel-17.jpg'],
    icon: Heart,
    features: [
      'Apoio no embarque/desembarque',
      'Manuseio de dispositivos de locomoção',
      'Acompanhamento até o destino',
      'Motoristas treinadas em cuidados especiais',
      'Veículos adaptados disponíveis',
      'Paciência e acolhimento',
    ],
    price: 'Valores especiais',
    popular: false,
  },
  {
    id: 'children',
    title: 'SEOO Children & Teens',
    subtitle: 'Segurança que acompanha cada fase',
    description: 'Mobilidade para crianças e adolescentes com motoristas treinadas que também são mães, garantindo cuidado e tranquilidade total às famílias.',
    carouselImages: ['/carousel-11.jpg', '/carousel-10.jpg'],
    icon: Baby,
    features: [
      'Motoristas mães experientes',
      'Cadeirinhas disponíveis',
      'Comunicação com os pais',
      'Trajeto escolar',
      'Atividades extracurriculares',
      'Máxima segurança',
    ],
    price: 'Pacotes mensais',
    popular: false,
  },
];

const diferenciais = [
  {
    icon: Users,
    title: 'Detalhes',
    description: 'Condução realizada exclusivamente por motoristas mulheres, cuidadosamente selecionadas e altamente capacitadas.',
  },
  {
    icon: Clock,
    title: 'Confiança',
    description: 'Disponíveis 24 horas. Compromisso absoluto com pontualidade, eficiência de horários e trajetos inteligentes.',
  },
  {
    icon: Shield,
    title: 'Segurança',
    description: 'Veículos equipados com tecnologia de bordo avançada, rastreamento e vidros com alta resistência.',
  },
  {
    icon: Car,
    title: 'Conforto',
    description: 'SUVs de alto padrão, com design sofisticado e amplo espaço interno. Conectividade e serviço a bordo.',
  },
  {
    icon: Heart,
    title: 'Eco-Friendly',
    description: 'Frota 100% híbrida, silenciosa e limpa, promovendo uma mobilidade urbana mais sustentável e consciente.',
  },
];

export default function ServicesPage() {
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref3, inView3] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className='min-h-screen bg-gray-50 pt-20'>
      {/* Hero Section */}
      <section className='relative py-20 bg-gradient-to-br from-primary via-primary-600 to-primary-800 text-white overflow-hidden'>
        <div className='absolute inset-0 opacity-10'>
          <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-repeat" />
        </div>

        <div className='container mx-auto px-4 relative z-10'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='max-w-3xl mx-auto text-center'
          >
            <h1 className='text-5xl font-bold mb-6'>Nossos Serviços SEOO</h1>
            <p className='text-xl text-gray-200 mb-4'>
              A mobilidade que vai além do destino
            </p>
            <p className='text-lg text-gray-300 mb-8'>
              É a liberdade de se mover com segurança, conforto e praticidade. 
              Serviços exclusivos pensados para mulheres, com motoristas 100% femininas.
            </p>
            <div className='flex flex-wrap justify-center gap-4'>
              <div className='flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2'>
                <Heart className='w-5 h-5 text-secondary' />
                <span>100% Motoristas Mulheres</span>
              </div>
              <div className='flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2'>
                <Shield className='w-5 h-5 text-secondary' />
                <span>Segurança Total</span>
              </div>
              <div className='flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2'>
                <Award className='w-5 h-5 text-secondary' />
                <span>Serviço Premium</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section ref={ref1} className='py-20'>
        <div className='container mx-auto px-4'>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView1 ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className='text-center mb-12'
          >
            <h2 className='text-4xl font-bold text-primary mb-4'>
              Escolha o serviço ideal para você
            </h2>
            <p className='text-gray-600 max-w-2xl mx-auto'>
              Soluções completas de mobilidade executiva adaptadas às necessidades 
              femininas, com o cuidado e atenção que você merece.
            </p>
          </motion.div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView1 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className='bg-white rounded-2xl shadow-lg hover:shadow-premium transition-all duration-300 overflow-hidden group'
              >
                {/* Carousel de Imagens */}
                <div className='relative'>
                  <ImageCarousel 
                    images={service.carouselImages} 
                    serviceId={service.id}
                  />

                  {/* Badge Popular */}
                  {service.popular && (
                    <motion.div
                      initial={{ scale: 0, rotate: -12 }}
                      animate={{ scale: 1, rotate: -12 }}
                      transition={{ delay: 0.5, type: 'spring' }}
                      className='absolute top-4 right-4 bg-secondary text-primary px-3 py-1 rounded-full text-sm font-semibold z-10 shadow-lg'
                    >
                      ⭐ Popular
                    </motion.div>
                  )}

                  {/* Ícone do Serviço */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className='absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-full p-3 z-10 shadow-xl'
                  >
                    <service.icon className='w-6 h-6 text-primary' />
                  </motion.div>
                </div>

                {/* Content */}
                <div className='p-6'>
                  <h3 className='text-xl font-bold text-primary mb-1'>
                    {service.title}
                  </h3>
                  <p className='text-sm text-secondary font-medium mb-3'>
                    {service.subtitle}
                  </p>
                  <p className='text-gray-600 mb-4'>{service.description}</p>

                  {/* Features */}
                  <ul className='space-y-2 mb-4'>
                    {service.features.slice(0, 3).map((feature, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={inView1 ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: index * 0.1 + idx * 0.1 }}
                        className='flex items-center gap-2 text-sm text-gray-500'
                      >
                        <CheckCircle className='w-4 h-4 text-secondary flex-shrink-0' />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>

                  {/* Price & CTA */}
                  <div className='flex items-center justify-between pt-4 border-t'>
                    <div>
                      <p className='text-2xl font-bold text-primary'>
                        {service.price}
                      </p>
                    </div>
                    <Link href='/agendamento'>
                      <motion.button
                        whileHover={{ scale: 1.05, x: 5 }}
                        whileTap={{ scale: 0.95 }}
                        className='bg-gradient-to-r from-primary to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-5 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 shadow-lg hover:shadow-xl transition-all'
                      >
                        Solicitar
                        <ChevronRight className='w-4 h-4' />
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Diferenciais Section */}
      <section ref={ref2} className='py-20 bg-white'>
        <div className='container mx-auto px-4'>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView2 ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className='text-center mb-12'
          >
            <h2 className='text-4xl font-bold text-primary mb-4'>
              Projetado para mulheres que exigem excelência
            </h2>
            <p className='text-gray-600 max-w-2xl mx-auto'>
              Cada detalhe foi pensado para proporcionar uma experiência única 
              de mobilidade, com o cuidado e respeito que você merece.
            </p>
          </motion.div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6'>
            {diferenciais.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView2 ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className='bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all'
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className='bg-gradient-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4'
                >
                  <item.icon className='w-8 h-8 text-white' />
                </motion.div>
                <h3 className='text-lg font-semibold text-primary mb-2'>
                  {item.title}
                </h3>
                <p className='text-sm text-gray-600'>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Included Services */}
      <section
        ref={ref3}
        className='py-20 bg-gradient-to-br from-gray-50 to-white'
      >
        <div className='container mx-auto px-4'>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView3 ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className='text-center mb-12'
          >
            <h2 className='text-4xl font-bold text-primary mb-4'>
              Serviços Inclusos em Todas as Viagens
            </h2>
            <p className='text-gray-600 max-w-2xl mx-auto'>
              Benefícios exclusivos sem custo adicional para tornar 
              sua experiência ainda mais especial
            </p>
          </motion.div>

          <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
            {[
              {
                icon: Wifi,
                title: 'Wi-Fi',
                description: 'Internet de alta velocidade',
              },
              {
                icon: Coffee,
                title: 'Bebidas',
                description: 'Água e café premium',
              },
              {
                icon: Phone,
                title: 'Carregadores',
                description: 'USB e Type-C',
              },
              {
                icon: Shield,
                title: 'Seguro',
                description: 'Cobertura completa',
              },
              { 
                icon: Navigation, 
                title: 'GPS', 
                description: 'Navegação precisa' 
              },
              {
                icon: Heart,
                title: 'Acolhimento',
                description: 'Atendimento feminino',
              },
              {
                icon: CreditCard,
                title: 'Pagamento',
                description: 'PIX e cartões',
              },
              {
                icon: Star,
                title: 'Premium',
                description: 'Serviço 5 estrelas',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView3 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ y: -5, scale: 1.05 }}
                className='text-center'
              >
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                  className='bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3 shadow-md hover:shadow-lg transition-shadow'
                >
                  <item.icon className='w-8 h-8 text-primary' />
                </motion.div>
                <h4 className='font-semibold text-gray-800 mb-1'>
                  {item.title}
                </h4>
                <p className='text-xs text-gray-500'>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-20 bg-primary text-white'>
        <div className='container mx-auto px-4 text-center'>
          <h2 className='text-4xl font-bold mb-4'>
            Chegue bem. Do seu jeito
          </h2>
          <p className='text-xl text-gray-200 mb-8 max-w-2xl mx-auto'>
            Experimente a mobilidade executiva pensada exclusivamente para mulheres. 
            Com a SEOO, cada trajeto é uma experiência de conforto, segurança e respeito.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Link href='/agendamento'>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className='bg-secondary hover:bg-secondary-600 text-primary font-bold px-10 py-4 rounded-full shadow-xl inline-flex items-center gap-2 transition-all'
              >
                <Calendar className='w-5 h-5' />
                Agendar Agora
              </motion.button>
            </Link>
            <a href='https://wa.me/5511945164043'>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className='bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-bold px-10 py-4 rounded-full border border-white/30 inline-flex items-center gap-2 transition-all'
              >
                <Phone className='w-5 h-5' />
                Falar pelo WhatsApp
              </motion.button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}