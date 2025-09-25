'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Award, Shield, Clock, Users, Star, Heart, Car, 
  CheckCircle, Calendar, MapPin, Briefcase, Quote
} from 'lucide-react'

const stats = [
  { number: '10+', label: 'Anos de Experiência' },
  { number: '500+', label: 'Clientes Satisfeitos' },
  { number: '50k+', label: 'Km Percorridos' },
  { number: '4.9★', label: 'Avaliação Média' },
]

const values = [
  {
    icon: Shield,
    title: 'Segurança',
    description: 'Direção defensiva e veículos sempre revisados para sua proteção'
  },
  {
    icon: Clock,
    title: 'Pontualidade',
    description: 'Compromisso com horários e planejamento inteligente de rotas'
  },
  {
    icon: Heart,
    title: 'Dedicação',
    description: 'Atendimento personalizado e atenção aos detalhes'
  },
  {
    icon: Star,
    title: 'Excelência',
    description: 'Busca constante pela perfeição em cada viagem'
  }
]

const certifications = [
  'Curso de Direção Defensiva - SENAI',
  'Certificação em Primeiros Socorros',
  'Treinamento em Atendimento VIP',
  'Curso de Relações Interpessoais',
  'Habilitação Categoria B - 15 anos',
  'Curso de Mecânica Básica'
]

const testimonials = [
  {
    text: "Maria é mais que uma motorista, é uma profissional completa. Sempre pontual, educada e extremamente cuidadosa no trânsito. Recomendo de olhos fechados!",
    author: "Ana Carolina Silva",
    role: "Empresária",
    rating: 5
  },
  {
    text: "Uso os serviços há 3 anos para minhas viagens corporativas. A confiabilidade e profissionalismo são incomparáveis. É como ter uma assistente pessoal ao volante.",
    author: "Roberto Mendes",
    role: "Diretor Executivo",
    rating: 5
  },
  {
    text: "Excelente profissional! Sempre atenciosa, o carro sempre impecável e a direção suave. Minha escolha número 1 para transfers de aeroporto.",
    author: "Juliana Costa",
    role: "Consultora Internacional",
    rating: 5
  }
]

export default function AboutPage() {
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [ref3, inView3] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [ref4, inView4] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary via-primary-600 to-primary-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-repeat" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl font-bold text-white mb-6">
                Sobre Mim
              </h1>
              <h2 className="text-3xl text-secondary mb-4">
                Maria Fernanda Silva
              </h2>
              <p className="text-xl text-gray-200 mb-6 leading-relaxed">
                Olá! Sou Maria Fernanda, sua motorista executiva de confiança. 
                Com mais de 10 anos de experiência no transporte premium, 
                meu compromisso é transformar cada viagem em uma experiência 
                segura, confortável e memorável.
              </p>
              <p className="text-lg text-gray-300 mb-8">
                Especializada em atendimento corporativo e transfers aeroportuários, 
                ofereço um serviço personalizado que vai além do transporte – 
                é sobre cuidar de cada detalhe para que você possa focar no que 
                realmente importa.
              </p>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <p className="text-3xl font-bold text-secondary">{stat.number}</p>
                    <p className="text-sm text-gray-300">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070"
                  alt="Maria Fernanda - Motorista Executiva"
                  width={500}
                  height={600}
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-secondary rounded-full p-3">
                      <Car className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-white">
                      <p className="font-semibold">Motorista Profissional</p>
                      <p className="text-sm text-gray-300">Certificada e Experiente</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-secondary/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-secondary/20 rounded-full blur-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section ref={ref1} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView1 ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-primary mb-4">
              Meus Valores
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Princípios que guiam cada viagem e definem a excelência do meu serviço
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView1 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 text-center hover:shadow-premium transition-all duration-300"
              >
                <div className="bg-gradient-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section ref={ref2} className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView2 ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-primary mb-4">
              Minha Trajetória
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Uma jornada de dedicação e aperfeiçoamento constante
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300" />
              
              {/* Timeline items */}
              {[
                {
                  year: '2014',
                  title: 'Início da Carreira',
                  description: 'Comecei como motorista particular, descobrindo minha paixão por proporcionar experiências excepcionais.'
                },
                {
                  year: '2016',
                  title: 'Especialização Executiva',
                  description: 'Foquei no segmento executivo, atendendo empresários e executivos com necessidades específicas.'
                },
                {
                  year: '2018',
                  title: 'Expansão dos Serviços',
                  description: 'Ampliei para transfers aeroportuários e eventos especiais, sempre mantendo o padrão premium.'
                },
                {
                  year: '2020',
                  title: 'Certificações e Treinamentos',
                  description: 'Investi em cursos de direção defensiva, primeiros socorros e atendimento VIP.'
                },
                {
                  year: '2024',
                  title: 'Elite Driver',
                  description: 'Consolidei minha marca pessoal como referência em transporte executivo de luxo.'
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView2 ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative flex items-start mb-8"
                >
                  <div className="bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center font-bold z-10">
                    {item.year}
                  </div>
                  <div className="ml-8 bg-white rounded-xl p-6 shadow-md flex-1">
                    <h3 className="text-xl font-semibold text-primary mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section ref={ref3} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView3 ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-primary mb-4">
              Certificações e Qualificações
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Investimento contínuo em conhecimento para oferecer o melhor serviço
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView3 ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-white rounded-lg p-4 flex items-center gap-3 shadow-sm hover:shadow-md transition-all"
              >
                <div className="bg-secondary/10 rounded-full p-2">
                  <Award className="w-5 h-5 text-secondary" />
                </div>
                <span className="text-gray-700 font-medium">{cert}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section ref={ref4} className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView4 ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-primary mb-4">
              O Que Dizem Sobre Mim
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Depoimentos de clientes que confiam no meu trabalho
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView4 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg relative"
              >
                <Quote className="absolute top-4 right-4 w-8 h-8 text-secondary/20" />
                
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <p className="text-gray-600 mb-6 italic">
                  "{testimonial.text}"
                </p>
                
                <div className="border-t pt-4">
                  <p className="font-semibold text-primary">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-gray-500">
                    {testimonial.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Vamos Viajar Juntos?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Experimente a diferença de um serviço verdadeiramente premium. 
            Agende sua primeira viagem e descubra por que tantos clientes 
            confiam em mim para suas necessidades de transporte.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/agendamento">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-secondary hover:bg-secondary-600 text-primary font-bold px-10 py-4 rounded-full shadow-xl inline-flex items-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                Agendar Primeira Viagem
              </motion.button>
            </Link>
            <Link href="/servicos">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-bold px-10 py-4 rounded-full border border-white/30 inline-flex items-center gap-2"
              >
                <Briefcase className="w-5 h-5" />
                Conhecer Serviços
              </motion.button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
