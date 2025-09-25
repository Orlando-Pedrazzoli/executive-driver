'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Plane, Building, Calendar, MapPin, Shield, Clock, Award, 
  Car, Users, Briefcase, Star, CheckCircle, ChevronRight,
  Sparkles, Globe, CreditCard, Phone, Wifi, Coffee
} from 'lucide-react'

const services = [
  {
    id: 'airport',
    title: 'Transfer Aeroporto VIP',
    description: 'Transporte premium para todos os aeroportos com conforto e pontualidade',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074',
    icon: Plane,
    features: [
      'Monitoramento de voo em tempo real',
      'Recepção personalizada no desembarque',
      'Auxílio com bagagem',
      'Água e snacks de cortesia',
      'Wi-Fi no veículo',
      'Carregadores USB/Type-C'
    ],
    price: 'A partir de R$ 180',
    popular: true
  },
  {
    id: 'executive',
    title: 'Motorista Executivo',
    description: 'Serviço personalizado para executivos e empresários',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070',
    icon: Briefcase,
    features: [
      'Motorista fixa por período',
      'Sigilo e discrição absolutos',
      'Relatórios de viagem',
      'Faturamento corporativo',
      'Disponibilidade 24/7',
      'Veículo executivo premium'
    ],
    price: 'Sob consulta',
    popular: false
  },
  {
    id: 'events',
    title: 'Eventos Especiais',
    description: 'Transporte elegante para casamentos, formaturas e eventos corporativos',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070',
    icon: Sparkles,
    features: [
      'Decoração personalizada',
      'Champagne de boas-vindas',
      'Tapete vermelho',
      'Música ambiente',
      'Roteiro flexível',
      'Fotógrafo disponível'
    ],
    price: 'A partir de R$ 350',
    popular: false
  },
  {
    id: 'tourism',
    title: 'City Tour & Turismo',
    description: 'Explore a cidade com conforto e um guia especializado',
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070',
    icon: Globe,
    features: [
      'Roteiros personalizados',
      'Guia turístico opcional',
      'Paradas para fotos',
      'Dicas de restaurantes',
      'Ingressos facilitados',
      'Período de 4 a 8 horas'
    ],
    price: 'A partir de R$ 450',
    popular: false
  },
  {
    id: 'contract',
    title: 'Contrato Mensal',
    description: 'Motorista dedicada para suas necessidades diárias',
    image: 'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?q=80&w=2070',
    icon: Calendar,
    features: [
      'Motorista exclusiva',
      'Horário comercial ou 24h',
      'Quilometragem incluída',
      'Substituição em férias',
      'Gestão de manutenção',
      'Economia de até 30%'
    ],
    price: 'Planos mensais',
    popular: true
  },
  {
    id: 'intercity',
    title: 'Viagens Intermunicipais',
    description: 'Transporte confortável entre cidades com segurança',
    image: 'https://images.unsplash.com/photo-1494783367193-149034c05e8f?q=80&w=2070',
    icon: MapPin,
    features: [
      'Rotas planejadas',
      'Paradas programadas',
      'Refeições inclusas',
      'Seguro viagem',
      'GPS tracking',
      'Suporte 24h'
    ],
    price: 'Por quilômetro',
    popular: false
  }
]

const vehicleFleet = [
  {
    category: 'Executivo',
    vehicles: ['Toyota Corolla', 'Honda Civic', 'Nissan Sentra'],
    features: ['4 passageiros', 'Ar condicionado', 'Porta-malas grande'],
    image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=2072'
  },
  {
    category: 'Luxo',
    vehicles: ['Mercedes C-Class', 'BMW Série 3', 'Audi A4'],
    features: ['4 passageiros', 'Interior premium', 'Sistema de som Bose'],
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=2070'
  },
  {
    category: 'SUV Premium',
    vehicles: ['Toyota SW4', 'Chevrolet Trailblazer', 'VW Tiguan'],
    features: ['7 passageiros', 'Espaço extra', 'Tração 4x4'],
    image: 'https://images.unsplash.com/photo-1519641766308-9330af4854bb?q=80&w=2071'
  }
]

export default function ServicesPage() {
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [ref3, inView3] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary via-primary-600 to-primary-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-repeat" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-5xl font-bold mb-6">
              Nossos Serviços
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Soluções completas de transporte executivo para todas as suas necessidades.
              Escolha o serviço ideal para sua viagem.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Shield className="w-5 h-5 text-secondary" />
                <span>100% Seguro</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Clock className="w-5 h-5 text-secondary" />
                <span>Pontualidade</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Award className="w-5 h-5 text-secondary" />
                <span>Premium</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section ref={ref1} className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView1 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-premium transition-all duration-300 overflow-hidden group"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  
                  {service.popular && (
                    <div className="absolute top-4 right-4 bg-secondary text-primary px-3 py-1 rounded-full text-sm font-semibold">
                      Popular
                    </div>
                  )}
                  
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-full p-3">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-primary mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-4">
                    {service.features.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-500">
                        <CheckCircle className="w-4 h-4 text-secondary flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <p className="text-2xl font-bold text-primary">
                        {service.price}
                      </p>
                    </div>
                    <Link href="/agendamento">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-primary hover:bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1"
                      >
                        Solicitar
                        <ChevronRight className="w-4 h-4" />
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vehicle Fleet */}
      <section ref={ref2} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView2 ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-primary mb-4">
              Nossa Frota
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Veículos novos, sempre revisados e higienizados para sua segurança e conforto
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {vehicleFleet.map((fleet, index) => (
              <motion.div
                key={fleet.category}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView2 ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg transition-all"
              >
                <div className="relative h-48">
                  <Image
                    src={fleet.image}
                    alt={fleet.category}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-primary mb-3">
                    {fleet.category}
                  </h3>
                  <div className="space-y-2 mb-4">
                    {fleet.vehicles.map((vehicle, idx) => (
                      <p key={idx} className="text-gray-600 text-sm">
                        • {vehicle}
                      </p>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {fleet.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="bg-white text-gray-600 px-3 py-1 rounded-full text-xs"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section ref={ref3} className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView3 ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-primary mb-4">
              Serviços Inclusos
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Todos os nossos serviços incluem benefícios exclusivos sem custo adicional
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Wifi, title: 'Wi-Fi', description: 'Internet de alta velocidade' },
              { icon: Coffee, title: 'Bebidas', description: 'Água e café premium' },
              { icon: Phone, title: 'Carregadores', description: 'USB e Type-C' },
              { icon: Shield, title: 'Seguro', description: 'Cobertura completa' },
              { icon: Car, title: 'GPS', description: 'Navegação precisa' },
              { icon: Users, title: 'Suporte 24h', description: 'Assistência total' },
              { icon: CreditCard, title: 'Pagamento', description: 'PIX e cartões' },
              { icon: Star, title: 'Premium', description: 'Serviço 5 estrelas' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView3 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="text-center"
              >
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3 shadow-md">
                  <item.icon className="w-8 h-8 text-primary" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-1">{item.title}</h4>
                <p className="text-xs text-gray-500">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Pronto para Viajar com Conforto?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Escolha o serviço ideal para sua necessidade e viaje com a tranquilidade 
            que você merece
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/agendamento">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-secondary hover:bg-secondary-600 text-primary font-bold px-10 py-4 rounded-full shadow-xl inline-flex items-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                Agendar Agora
              </motion.button>
            </Link>
            <a href="tel:+5511999999999">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-bold px-10 py-4 rounded-full border border-white/30 inline-flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Falar Conosco
              </motion.button>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
