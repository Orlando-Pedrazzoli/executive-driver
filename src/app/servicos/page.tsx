'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import Image from 'next/image';
import {
  Plane,
  Building,
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
  Sparkles,
  Globe,
  CreditCard,
  Phone,
  Wifi,
  Coffee,
  Heart,
  Baby,
  UserCheck,
  Accessibility,
  DollarSign,
  Navigation,
} from 'lucide-react';

const services = [
  {
    id: 'transfer',
    title: 'SEOO Transfer',
    subtitle: 'Seu embarque começa antes do destino',
    description: 'Transfers para aeroportos, hotéis e reuniões com pontualidade e conforto absoluto.',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074',
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
    popular: true,
  },
  {
    id: 'corporate',
    title: 'SEOO Corporate',
    subtitle: 'Mobilidade à altura da sua empresa',
    description: 'Atendimento exclusivo para executivas e equipes com sofisticação, discrição e eficiência.',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070',
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
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070',
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
    image: 'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?q=80&w=2070',
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
    popular: true,
  },
  {
    id: 'dayuse',
    title: 'SEOO Day Use',
    subtitle: 'Exclusividade quando você precisar',
    description: 'Motorista por um dia, com cuidado e atenção personalizada para compromissos, eventos ou lazer.',
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070',
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
    image: 'https://images.unsplash.com/photo-1494783367193-149034c05e8f?q=80&w=2070',
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
    image: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?q=80&w=2070',
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
    image: 'https://images.unsplash.com/photo-1476234251651-f353703a034d?q=80&w=2070',
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
    popular: true,
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
                {/* Image */}
                <div className='relative h-48 overflow-hidden'>
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className='object-cover group-hover:scale-110 transition-transform duration-500'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent' />

                  {service.popular && (
                    <div className='absolute top-4 right-4 bg-secondary text-primary px-3 py-1 rounded-full text-sm font-semibold'>
                      Popular
                    </div>
                  )}

                  <div className='absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-full p-3'>
                    <service.icon className='w-6 h-6 text-primary' />
                  </div>
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
                      <li
                        key={idx}
                        className='flex items-center gap-2 text-sm text-gray-500'
                      >
                        <CheckCircle className='w-4 h-4 text-secondary flex-shrink-0' />
                        {feature}
                      </li>
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
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className='bg-primary hover:bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1'
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
                className='bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all'
              >
                <div className='bg-gradient-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4'>
                  <item.icon className='w-8 h-8 text-white' />
                </div>
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
                className='text-center'
              >
                <div className='bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3 shadow-md'>
                  <item.icon className='w-8 h-8 text-primary' />
                </div>
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
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='bg-secondary hover:bg-secondary-600 text-primary font-bold px-10 py-4 rounded-full shadow-xl inline-flex items-center gap-2'
              >
                <Calendar className='w-5 h-5' />
                Agendar Agora
              </motion.button>
            </Link>
            <a href='https://wa.me/5511945164043'>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-bold px-10 py-4 rounded-full border border-white/30 inline-flex items-center gap-2'
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