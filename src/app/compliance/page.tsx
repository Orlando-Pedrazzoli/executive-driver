'use client';

import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Shield,
  FileText,
  Lock,
  Heart,
  Scale,
  AlertCircle,
  CheckCircle2,
  Leaf,
  Users,
  Phone,
  Mail,
  MapPin,
  Building2,
  Award,
  UserCheck,
  Eye,
  BookOpen,
  Car,
  Globe,
} from 'lucide-react';

const complianceSections = [
  {
    id: 'corporate',
    icon: Building2,
    title: 'Informações Corporativas',
    color: 'from-primary to-primary-600',
    description: 'Conheça nossa estrutura empresarial e missão',
  },
  {
    id: 'lgpd',
    icon: Lock,
    title: 'LGPD e Privacidade',
    color: 'from-blue-500 to-blue-600',
    description: 'Como protegemos seus dados pessoais',
  },
  {
    id: 'terms',
    icon: FileText,
    title: 'Termos de Uso',
    color: 'from-purple-500 to-purple-600',
    description: 'Regras e condições de utilização',
  },
  {
    id: 'cancellation',
    icon: AlertCircle,
    title: 'Política de Cancelamento',
    color: 'from-orange-500 to-orange-600',
    description: 'Prazos e condições de cancelamento',
  },
  {
    id: 'conduct',
    icon: UserCheck,
    title: 'Código de Conduta',
    color: 'from-pink-500 to-pink-600',
    description: 'Nossos valores e princípios éticos',
  },
  {
    id: 'safety',
    icon: Shield,
    title: 'Compromissos de Segurança',
    color: 'from-red-500 to-red-600',
    description: 'Medidas de proteção e segurança',
  },
  {
    id: 'sustainability',
    icon: Leaf,
    title: 'Sustentabilidade',
    color: 'from-green-500 to-green-600',
    description: 'Nosso compromisso com o meio ambiente',
  },
  {
    id: 'contact',
    icon: Phone,
    title: 'Canal de Ouvidoria',
    color: 'from-secondary to-secondary-600',
    description: 'Fale conosco e tire suas dúvidas',
  },
];

export default function CompliancePage() {
  const [imageError, setImageError] = useState(false);
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.1 });

  // Função para scroll suave
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100; // Offset para compensar a navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 pt-16 sm:pt-20'>
      {/* Hero Section */}
      <section className='relative py-16 sm:py-20 md:py-24 text-white overflow-hidden min-h-[400px] sm:min-h-[500px] flex items-center'>
        <div className='absolute inset-0'>
          {!imageError ? (
            <>
              <Image
                src='https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop'
                alt='Compliance e Governança SEOO'
                fill
                className='object-cover object-center'
                priority
                onError={() => setImageError(true)}
                quality={80}
                sizes='100vw'
              />
              <div className='absolute inset-0 bg-gradient-to-br from-primary/55 via-primary/75 to-primary-600/85' />
            </>
          ) : (
            <div className='absolute inset-0'>
              <div className='absolute inset-0 bg-gradient-to-br from-primary via-primary-600 to-primary-700' />
              <div className='absolute inset-0 opacity-5'>
                <svg width='100%' height='100%'>
                  <defs>
                    <pattern id='grid' width='40' height='40' patternUnits='userSpaceOnUse'>
                      <circle cx='20' cy='20' r='1' fill='white' />
                    </pattern>
                  </defs>
                  <rect width='100%' height='100%' fill='url(#grid)' />
                </svg>
              </div>
              <div className='absolute top-10 right-10 w-32 h-32 bg-white/5 rounded-full blur-3xl' />
              <div className='absolute bottom-10 left-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl' />
            </div>
          )}
        </div>

        <div className='container mx-auto px-4 sm:px-6 relative z-10'>
          <div className='max-w-4xl mx-auto text-center'>
            <div className='flex justify-center mb-4 sm:mb-6'>
              <div className='bg-white/10 backdrop-blur-sm rounded-full p-3 sm:p-4 shadow-2xl border border-white/20 hover:scale-110 transition-transform duration-300'>
                <Scale className='w-10 h-10 sm:w-12 sm:h-12' />
              </div>
            </div>

            <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-6 drop-shadow-lg px-4 leading-tight'>
              Compliance & Governança
            </h1>

            <p className='text-lg sm:text-xl md:text-2xl text-gray-100 mb-3 sm:mb-4 drop-shadow-md px-4 font-semibold'>
              Transparência, Ética e Responsabilidade
            </p>

           

            <div className='flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mt-6 sm:mt-8 px-4'>
              <div className='bg-white/10 backdrop-blur-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 flex items-center gap-2 border border-white/20 hover:bg-white/20 transition-all'>
                <Shield className='w-3 h-3 sm:w-4 sm:h-4' />
                <span className='text-xs sm:text-sm font-medium'>ISO Compliance</span>
              </div>
              <div className='bg-white/10 backdrop-blur-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 flex items-center gap-2 border border-white/20 hover:bg-white/20 transition-all'>
                <Lock className='w-3 h-3 sm:w-4 sm:h-4' />
                <span className='text-xs sm:text-sm font-medium'>LGPD Certified</span>
              </div>
              <div className='bg-white/10 backdrop-blur-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 flex items-center gap-2 border border-white/20 hover:bg-white/20 transition-all'>
                <CheckCircle2 className='w-3 h-3 sm:w-4 sm:h-4' />
                <span className='text-xs sm:text-sm font-medium'>Verified</span>
              </div>
            </div>
          </div>
        </div>

        <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block'>
          <div className='w-6 h-10 border-2 border-white/30 rounded-full flex justify-center'>
            <div className='w-1 h-3 bg-white/50 rounded-full mt-2'></div>
          </div>
        </div>
      </section>

      {/* Navegação de Seções - MELHORADA */}
      <section ref={ref1} className='py-12 sm:py-16 bg-white'>
        <div className='container mx-auto px-4 sm:px-6'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView1 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className='text-center mb-8 sm:mb-12'
          >
            <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-3 sm:mb-4'>
              Nossos Pilares de Compliance
            </h2>
            <p className='text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4'>
              Acesse informações detalhadas sobre cada área do nosso programa de compliance
            </p>
          </motion.div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6'>
            {complianceSections.map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.button
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView1 ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => scrollToSection(section.id)}
                  className='group relative bg-white rounded-2xl p-5 sm:p-6 shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-transparent text-left w-full cursor-pointer'
                >
                  {/* Gradiente no hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${section.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
                  
                  <div className='relative'>
                    {/* Ícone */}
                    <div className={`bg-gradient-to-br ${section.color} rounded-full w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className='w-6 h-6 sm:w-7 sm:h-7 text-white' />
                    </div>

                    {/* Título */}
                    <h3 className='text-base sm:text-lg font-bold text-primary mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-primary-600 transition-all'>
                      {section.title}
                    </h3>

                    {/* Descrição */}
                    <p className='text-xs sm:text-sm text-gray-600 mb-3'>
                      {section.description}
                    </p>

                    {/* Link com animação */}
                    <div className='inline-flex items-center text-xs sm:text-sm font-medium text-gray-600 group-hover:text-primary transition-colors'>
                      Saiba mais
                      <svg
                        className='w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M9 5l7 7-7 7'
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Indicador visual de que é clicável */}
                  <div className='absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity'>
                    <div className='w-2 h-2 bg-primary rounded-full animate-pulse' />
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section ref={ref2} className='py-12'>
        <div className='container mx-auto px-4'>
          <div className='max-w-4xl mx-auto space-y-16'>
            {/* Informações Corporativas */}
            <div
              id='corporate'
              className='bg-white rounded-2xl p-8 shadow-lg'
            >
              <div className='flex items-center gap-3 mb-6'>
                <Building2 className='w-8 h-8 text-primary' />
                <h2 className='text-3xl font-bold text-primary'>
                  Informações Corporativas
                </h2>
              </div>

              <div className='space-y-6'>
                <div className='border-l-4 border-primary pl-6 py-2'>
                  <h3 className='font-semibold text-gray-800 mb-2'>
                    Razão Social
                  </h3>
                  <p className='text-gray-600'>Somas Group Ltda</p>
                </div>

                <div className='border-l-4 border-primary pl-6 py-2'>
                  <h3 className='font-semibold text-gray-800 mb-2'>CNPJ</h3>
                  <p className='text-gray-600'>28.705.153/0001-53</p>
                </div>

                <div className='border-l-4 border-primary pl-6 py-2'>
                  <h3 className='font-semibold text-gray-800 mb-2'>
                    Sede Fiscal
                  </h3>
                  <p className='text-gray-600'>
                    Rua Coronel José Eusébio, nº 95
                    <br />
                    Higienópolis - São Paulo/SP
                    <br />
                    CEP 01239-030
                  </p>
                </div>

                <div className='bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 mt-6'>
                  <h3 className='font-semibold text-gray-800 mb-4 flex items-center gap-2'>
                    <Award className='w-5 h-5 text-secondary' />
                    Nossa Missão
                  </h3>
                  <p className='text-gray-600 leading-relaxed'>
                    Transformar a mobilidade feminina em uma experiência mais
                    segura e inclusiva. Somos um movimento feito por mulheres e
                    para mulheres, fortalecendo a segurança, a liberdade e a
                    independência feminina através de um serviço de transporte
                    executivo de alto padrão.
                  </p>
                </div>
              </div>
            </div>

            {/* LGPD */}
            <div
              id='lgpd'
              className='bg-white rounded-2xl p-8 shadow-lg'
            >
              <div className='flex items-center gap-3 mb-6'>
                <Lock className='w-8 h-8 text-blue-600' />
                <h2 className='text-3xl font-bold text-primary'>
                  LGPD e Privacidade de Dados
                </h2>
              </div>

              <div className='space-y-6'>
                <p className='text-gray-600 leading-relaxed'>
                  A SEOO está comprometida com a proteção e privacidade dos
                  dados pessoais de suas clientes, em total conformidade com a
                  Lei Geral de Proteção de Dados (Lei nº 13.709/2018).
                </p>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='bg-blue-50 rounded-xl p-4'>
                    <h4 className='font-semibold text-gray-800 mb-2 flex items-center gap-2'>
                      <CheckCircle2 className='w-5 h-5 text-blue-600' />
                      Coleta de Dados
                    </h4>
                    <p className='text-sm text-gray-600'>
                      Coletamos apenas dados essenciais para prestação do
                      serviço: nome, telefone, e-mail e endereços de
                      embarque/desembarque.
                    </p>
                  </div>

                  <div className='bg-blue-50 rounded-xl p-4'>
                    <h4 className='font-semibold text-gray-800 mb-2 flex items-center gap-2'>
                      <CheckCircle2 className='w-5 h-5 text-blue-600' />
                      Uso dos Dados
                    </h4>
                    <p className='text-sm text-gray-600'>
                      Utilizamos seus dados exclusivamente para execução dos
                      serviços contratados e comunicações relacionadas.
                    </p>
                  </div>

                  <div className='bg-blue-50 rounded-xl p-4'>
                    <h4 className='font-semibold text-gray-800 mb-2 flex items-center gap-2'>
                      <CheckCircle2 className='w-5 h-5 text-blue-600' />
                      Segurança
                    </h4>
                    <p className='text-sm text-gray-600'>
                      Empregamos medidas técnicas e organizacionais para
                      proteger seus dados contra acesso não autorizado.
                    </p>
                  </div>

                  <div className='bg-blue-50 rounded-xl p-4'>
                    <h4 className='font-semibold text-gray-800 mb-2 flex items-center gap-2'>
                      <CheckCircle2 className='w-5 h-5 text-blue-600' />
                      Seus Direitos
                    </h4>
                    <p className='text-sm text-gray-600'>
                      Você pode solicitar acesso, correção ou exclusão dos seus
                      dados a qualquer momento.
                    </p>
                  </div>
                </div>

                <div className='bg-blue-50 border-l-4 border-blue-600 rounded-r-xl p-6'>
                  <h4 className='font-semibold text-gray-800 mb-2 flex items-center gap-2'>
                    <Eye className='w-5 h-5 text-blue-600' />
                    Compartilhamento de Dados
                  </h4>
                  <p className='text-gray-600 text-sm'>
                    Não compartilhamos, vendemos ou alugamos seus dados
                    pessoais para terceiros. Dados podem ser compartilhados
                    apenas quando exigido por lei ou com seu consentimento
                    expresso.
                  </p>
                </div>
              </div>
            </div>

            {/* Termos de Uso */}
            <div
              id='terms'
              className='bg-white rounded-2xl p-8 shadow-lg'
            >
              <div className='flex items-center gap-3 mb-6'>
                <FileText className='w-8 h-8 text-purple-600' />
                <h2 className='text-3xl font-bold text-primary'>
                  Termos e Condições de Uso
                </h2>
              </div>

              <div className='space-y-6'>
                <div className='border-l-4 border-purple-600 pl-6 py-2'>
                  <h3 className='font-semibold text-gray-800 mb-2'>
                    1. Aceitação dos Termos
                  </h3>
                  <p className='text-gray-600 text-sm leading-relaxed'>
                    Ao utilizar os serviços da SEOO Mobilidade Executiva, você
                    concorda com todos os termos e condições aqui estabelecidos.
                    O uso contínuo dos serviços constitui aceitação de
                    quaisquer modificações aos termos.
                  </p>
                </div>

                <div className='border-l-4 border-purple-600 pl-6 py-2'>
                  <h3 className='font-semibold text-gray-800 mb-2'>
                    2. Serviços Oferecidos
                  </h3>
                  <p className='text-gray-600 text-sm leading-relaxed'>
                    A SEOO oferece serviços de transporte executivo com
                    motoristas profissionais. Os serviços incluem transfers,
                    transporte corporativo, day use, serviços exclusivos e
                    especializados para diferentes necessidades.
                  </p>
                </div>

                <div className='border-l-4 border-purple-600 pl-6 py-2'>
                  <h3 className='font-semibold text-gray-800 mb-2'>
                    3. Reservas e Agendamentos
                  </h3>
                  <p className='text-gray-600 text-sm leading-relaxed'>
                    As reservas podem ser feitas através do site, WhatsApp ou
                    telefone. Recomendamos agendamento com pelo menos 24 horas
                    de antecedência. Reservas de última hora estão sujeitas à
                    disponibilidade.
                  </p>
                </div>

                <div className='border-l-4 border-purple-600 pl-6 py-2'>
                  <h3 className='font-semibold text-gray-800 mb-2'>
                    4. Pagamento
                  </h3>
                  <p className='text-gray-600 text-sm leading-relaxed'>
                    Aceitamos pagamento via PIX, cartão de crédito e débito. Para
                    serviços corporativos, oferecemos faturamento mensal.
                    Pagamento deve ser efetuado conforme acordado na reserva.
                  </p>
                </div>

                <div className='border-l-4 border-purple-600 pl-6 py-2'>
                  <h3 className='font-semibold text-gray-800 mb-2'>
                    5. Responsabilidades do Cliente
                  </h3>
                  <ul className='text-gray-600 text-sm space-y-2 mt-2'>
                    <li className='flex items-start gap-2'>
                      <CheckCircle2 className='w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0' />
                      <span>
                        Fornecer informações precisas no momento da reserva
                      </span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <CheckCircle2 className='w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0' />
                      <span>
                        Estar pronto no horário agendado para embarque
                      </span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <CheckCircle2 className='w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0' />
                      <span>
                        Tratar motoristas e veículos com respeito e cuidado
                      </span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <CheckCircle2 className='w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0' />
                      <span>
                        Comunicar alterações ou cancelamentos com antecedência
                      </span>
                    </li>
                  </ul>
                </div>

                <div className='border-l-4 border-purple-600 pl-6 py-2'>
                  <h3 className='font-semibold text-gray-800 mb-2'>
                    6. Limitação de Responsabilidade
                  </h3>
                  <p className='text-gray-600 text-sm leading-relaxed'>
                    A SEOO não se responsabiliza por atrasos causados por
                    condições de trânsito, eventos climáticos ou casos fortuitos
                    e força maior. Mantemos seguro de responsabilidade civil
                    para todos os veículos.
                  </p>
                </div>
              </div>
            </div>

            {/* Política de Cancelamento */}
            <div
              id='cancellation'
              className='bg-white rounded-2xl p-8 shadow-lg'
            >
              <div className='flex items-center gap-3 mb-6'>
                <AlertCircle className='w-8 h-8 text-orange-600' />
                <h2 className='text-3xl font-bold text-primary'>
                  Política de Cancelamento e Reembolso
                </h2>
              </div>

              <div className='space-y-6'>
                <div className='bg-gradient-to-br from-orange-50 to-white rounded-xl p-6'>
                  <h3 className='font-semibold text-gray-800 mb-4'>
                    Prazos de Cancelamento
                  </h3>

                  <div className='space-y-4'>
                    <div className='flex items-start gap-4'>
                      <div className='bg-green-100 rounded-full p-2 flex-shrink-0'>
                        <CheckCircle2 className='w-5 h-5 text-green-600' />
                      </div>
                      <div>
                        <p className='font-medium text-gray-800'>
                          Mais de 24 horas de antecedência
                        </p>
                        <p className='text-sm text-gray-600'>
                          Cancelamento gratuito com reembolso total
                        </p>
                      </div>
                    </div>

                    <div className='flex items-start gap-4'>
                      <div className='bg-orange-100 rounded-full p-2 flex-shrink-0'>
                        <AlertCircle className='w-5 h-5 text-orange-600' />
                      </div>
                      <div>
                        <p className='font-medium text-gray-800'>
                          Entre 12 e 24 horas
                        </p>
                        <p className='text-sm text-gray-600'>
                          Taxa de cancelamento de 50% do valor do serviço
                        </p>
                      </div>
                    </div>

                    <div className='flex items-start gap-4'>
                      <div className='bg-red-100 rounded-full p-2 flex-shrink-0'>
                        <AlertCircle className='w-5 h-5 text-red-600' />
                      </div>
                      <div>
                        <p className='font-medium text-gray-800'>
                          Menos de 12 horas
                        </p>
                        <p className='text-sm text-gray-600'>
                          Sem direito a reembolso (cobrança de 100%)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='border-l-4 border-orange-600 pl-6 py-2'>
                  <h3 className='font-semibold text-gray-800 mb-2'>
                    Casos Excepcionais
                  </h3>
                  <p className='text-gray-600 text-sm leading-relaxed'>
                    Em casos de emergências médicas comprovadas, acidentes ou
                    situações de força maior, analisaremos individualmente a
                    possibilidade de cancelamento sem custos ou remarcação do
                    serviço.
                  </p>
                </div>

                <div className='border-l-4 border-orange-600 pl-6 py-2'>
                  <h3 className='font-semibold text-gray-800 mb-2'>
                    No-show (Não Comparecimento)
                  </h3>
                  <p className='text-gray-600 text-sm leading-relaxed'>
                    Em caso de não comparecimento sem aviso prévio, o valor
                    total do serviço será cobrado. A motorista aguardará por até
                    15 minutos no local de embarque.
                  </p>
                </div>

                <div className='border-l-4 border-orange-600 pl-6 py-2'>
                  <h3 className='font-semibold text-gray-800 mb-2'>
                    Reembolsos
                  </h3>
                  <p className='text-gray-600 text-sm leading-relaxed'>
                    Reembolsos aprovados serão processados em até 7 dias úteis,
                    retornando na mesma forma de pagamento utilizada na compra.
                  </p>
                </div>
              </div>
            </div>

            {/* Código de Conduta */}
            <div
              id='conduct'
              className='bg-white rounded-2xl p-8 shadow-lg'
            >
              <div className='flex items-center gap-3 mb-6'>
                <UserCheck className='w-8 h-8 text-pink-600' />
                <h2 className='text-3xl font-bold text-primary'>
                  Código de Conduta e Ética
                </h2>
              </div>

              <div className='space-y-6'>
                <p className='text-gray-600 leading-relaxed'>
                  Na SEOO, cultivamos uma cultura de respeito, integridade e
                  profissionalismo. Nosso código de conduta guia todas as
                  nossas ações e interações.
                </p>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='bg-pink-50 rounded-xl p-6'>
                    <h4 className='font-semibold text-gray-800 mb-3 flex items-center gap-2'>
                      <Heart className='w-5 h-5 text-pink-600' />
                      Respeito e Dignidade
                    </h4>
                    <p className='text-sm text-gray-600 leading-relaxed'>
                      Tratamos todas as pessoas com respeito, dignidade e
                      cortesia, independente de origem, religião, orientação
                      sexual ou identidade de gênero.
                    </p>
                  </div>

                  <div className='bg-pink-50 rounded-xl p-6'>
                    <h4 className='font-semibold text-gray-800 mb-3 flex items-center gap-2'>
                      <Shield className='w-5 h-5 text-pink-600' />
                      Segurança em Primeiro Lugar
                    </h4>
                    <p className='text-sm text-gray-600 leading-relaxed'>
                      A segurança de nossas clientes e motoristas é prioridade
                      absoluta. Mantemos rigorosos padrões de manutenção e
                      treinamento.
                    </p>
                  </div>

                  <div className='bg-pink-50 rounded-xl p-6'>
                    <h4 className='font-semibold text-gray-800 mb-3 flex items-center gap-2'>
                      <Lock className='w-5 h-5 text-pink-600' />
                      Confidencialidade
                    </h4>
                    <p className='text-sm text-gray-600 leading-relaxed'>
                      Respeitamos a privacidade de todas as clientes. Informações
                      pessoais e detalhes de viagens são tratados com máxima
                      confidencialidade.
                    </p>
                  </div>

                  <div className='bg-pink-50 rounded-xl p-6'>
                    <h4 className='font-semibold text-gray-800 mb-3 flex items-center gap-2'>
                      <Award className='w-5 h-5 text-pink-600' />
                      Excelência no Serviço
                    </h4>
                    <p className='text-sm text-gray-600 leading-relaxed'>
                      Buscamos constantemente a excelência, oferecendo serviços
                      de alta qualidade que superam expectativas.
                    </p>
                  </div>
                </div>

                <div className='bg-gradient-to-br from-pink-50 to-white rounded-xl p-6'>
                  <h3 className='font-semibold text-gray-800 mb-4'>
                    Compromisso com a Diversidade e Inclusão
                  </h3>
                  <p className='text-gray-600 text-sm leading-relaxed mb-4'>
                    A SEOO é um movimento feito por mulheres e para mulheres.
                    Promovemos um ambiente inclusivo, acolhedor e empoderador,
                    onde todas as mulheres se sintam seguras e respeitadas.
                  </p>
                  <ul className='space-y-2 text-sm text-gray-600'>
                    <li className='flex items-start gap-2'>
                      <CheckCircle2 className='w-4 h-4 text-pink-600 mt-0.5 flex-shrink-0' />
                      <span>
                        100% das nossas motoristas são mulheres cuidadosamente
                        selecionadas e treinadas
                      </span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <CheckCircle2 className='w-4 h-4 text-pink-600 mt-0.5 flex-shrink-0' />
                      <span>
                        Criamos um ambiente seguro e confortável para mulheres
                        de todas as idades
                      </span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <CheckCircle2 className='w-4 h-4 text-pink-600 mt-0.5 flex-shrink-0' />
                      <span>
                        Oferecemos serviços especializados para necessidades
                        específicas (idosas, crianças, PCDs)
                      </span>
                    </li>
                  </ul>
                </div>

                <div className='border-l-4 border-pink-600 pl-6 py-2'>
                  <h3 className='font-semibold text-gray-800 mb-2'>
                    Política de Tolerância Zero
                  </h3>
                  <p className='text-gray-600 text-sm leading-relaxed'>
                    Não toleramos qualquer forma de assédio, discriminação,
                    violência ou comportamento inadequado. Qualquer violação
                    resultará em medidas imediatas, incluindo rescisão de
                    contrato e medidas legais cabíveis.
                  </p>
                </div>
              </div>
            </div>

            {/* Compromissos de Segurança */}
            <div
              id='safety'
              className='bg-white rounded-2xl p-8 shadow-lg'
            >
              <div className='flex items-center gap-3 mb-6'>
                <Shield className='w-8 h-8 text-red-600' />
                <h2 className='text-3xl font-bold text-primary'>
                  Compromissos de Segurança
                </h2>
              </div>

              <div className='space-y-6'>
                <p className='text-gray-600 leading-relaxed'>
                  A segurança é o alicerce de tudo o que fazemos na SEOO.
                  Implementamos múltiplas camadas de proteção para garantir
                  viagens tranquilas e seguras.
                </p>

                <div className='bg-gradient-to-br from-red-50 to-white rounded-xl p-6'>
                  <h3 className='font-semibold text-gray-800 mb-4 flex items-center gap-2'>
                    <Car className='w-5 h-5 text-red-600' />
                    Frota e Veículos
                  </h3>
                  <ul className='space-y-3 text-sm text-gray-600'>
                    <li className='flex items-start gap-2'>
                      <CheckCircle2 className='w-4 h-4 text-red-600 mt-0.5 flex-shrink-0' />
                      <span>
                        SUVs de alto padrão com tecnologia de bordo avançada
                      </span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <CheckCircle2 className='w-4 h-4 text-red-600 mt-0.5 flex-shrink-0' />
                      <span>
                        Manutenção preventiva rigorosa e inspeções regulares
                      </span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <CheckCircle2 className='w-4 h-4 text-red-600 mt-0.5 flex-shrink-0' />
                      <span>
                        Rastreamento GPS em tempo real de todos os veículos
                      </span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <CheckCircle2 className='w-4 h-4 text-red-600 mt-0.5 flex-shrink-0' />
                      <span>Vidros de alta resistência para maior proteção</span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <CheckCircle2 className='w-4 h-4 text-red-600 mt-0.5 flex-shrink-0' />
                      <span>
                        Sistema de airbags completo e equipamentos de segurança
                      </span>
                    </li>
                  </ul>
                </div>

                <div className='bg-gradient-to-br from-red-50 to-white rounded-xl p-6'>
                  <h3 className='font-semibold text-gray-800 mb-4 flex items-center gap-2'>
                    <Users className='w-5 h-5 text-red-600' />
                    Motoristas
                  </h3>
                  <ul className='space-y-3 text-sm text-gray-600'>
                    <li className='flex items-start gap-2'>
                      <CheckCircle2 className='w-4 h-4 text-red-600 mt-0.5 flex-shrink-0' />
                      <span>
                        Processo seletivo rigoroso com verificação de
                        antecedentes
                      </span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <CheckCircle2 className='w-4 h-4 text-red-600 mt-0.5 flex-shrink-0' />
                      <span>
                        Treinamento especializado em direção defensiva e
                        segurança
                      </span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <CheckCircle2 className='w-4 h-4 text-red-600 mt-0.5 flex-shrink-0' />
                      <span>
                        Capacitação em primeiros socorros e atendimento
                        emergencial
                      </span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <CheckCircle2 className='w-4 h-4 text-red-600 mt-0.5 flex-shrink-0' />
                      <span>Avaliações periódicas de desempenho e conduta</span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <CheckCircle2 className='w-4 h-4 text-red-600 mt-0.5 flex-shrink-0' />
                      <span>
                        CNH válida e experiência comprovada em transporte
                        executivo
                      </span>
                    </li>
                  </ul>
                </div>

                <div className='bg-gradient-to-br from-red-50 to-white rounded-xl p-6'>
                  <h3 className='font-semibold text-gray-800 mb-4 flex items-center gap-2'>
                    <Shield className='w-5 h-5 text-red-600' />
                    Seguros e Proteção
                  </h3>
                  <ul className='space-y-3 text-sm text-gray-600'>
                    <li className='flex items-start gap-2'>
                      <CheckCircle2 className='w-4 h-4 text-red-600 mt-0.5 flex-shrink-0' />
                      <span>Seguro de responsabilidade civil com ampla cobertura</span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <CheckCircle2 className='w-4 h-4 text-red-600 mt-0.5 flex-shrink-0' />
                      <span>Seguro de acidentes pessoais para passageiros</span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <CheckCircle2 className='w-4 h-4 text-red-600 mt-0.5 flex-shrink-0' />
                      <span>Cobertura total dos veículos contra danos e roubo</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Sustentabilidade */}
            <div
              id='sustainability'
              className='bg-white rounded-2xl p-8 shadow-lg'
            >
              <div className='flex items-center gap-3 mb-6'>
                <Leaf className='w-8 h-8 text-green-600' />
                <h2 className='text-3xl font-bold text-primary'>
                  Compromisso com a Sustentabilidade
                </h2>
              </div>

              <div className='space-y-6'>
                <p className='text-gray-600 leading-relaxed'>
                  Acreditamos que mobilidade de qualidade também deve ser
                  ambientalmente responsável. Por isso, investimos em tecnologia
                  limpa e práticas sustentáveis.
                </p>

                <div className='bg-gradient-to-br from-green-50 to-white rounded-xl p-6'>
                  <h3 className='font-semibold text-gray-800 mb-4 flex items-center gap-2'>
                    <Leaf className='w-6 h-6 text-green-600' />
                    Frota 100% Híbrida
                  </h3>
                  <p className='text-gray-600 text-sm leading-relaxed mb-4'>
                    Toda nossa frota é composta por veículos SUVs híbridos de
                    última geração, que combinam desempenho, conforto e
                    responsabilidade ambiental.
                  </p>
                  <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-4'>
                    <div className='text-center p-4 bg-white rounded-lg'>
                      <p className='text-3xl font-bold text-green-600 mb-1'>
                        40%
                      </p>
                      <p className='text-sm text-gray-600'>
                        Menos emissões de CO₂
                      </p>
                    </div>
                    <div className='text-center p-4 bg-white rounded-lg'>
                      <p className='text-3xl font-bold text-green-600 mb-1'>
                        60%
                      </p>
                      <p className='text-sm text-gray-600'>
                        Menos ruído urbano
                      </p>
                    </div>
                    <div className='text-center p-4 bg-white rounded-lg'>
                      <p className='text-3xl font-bold text-green-600 mb-1'>
                        30%
                      </p>
                      <p className='text-sm text-gray-600'>
                        Economia de combustível
                      </p>
                    </div>
                  </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='border-l-4 border-green-600 pl-6 py-2'>
                    <h4 className='font-semibold text-gray-800 mb-2'>
                      Redução de Carbono
                    </h4>
                    <p className='text-sm text-gray-600'>
                      Contribuímos ativamente para a redução da pegada de
                      carbono em São Paulo, promovendo uma mobilidade urbana
                      mais limpa e consciente.
                    </p>
                  </div>

                  <div className='border-l-4 border-green-600 pl-6 py-2'>
                    <h4 className='font-semibold text-gray-800 mb-2'>
                      Eficiência Energética
                    </h4>
                    <p className='text-sm text-gray-600'>
                      Veículos híbridos com tecnologia de regeneração de
                      energia, maximizando eficiência e minimizando desperdício.
                    </p>
                  </div>

                  <div className='border-l-4 border-green-600 pl-6 py-2'>
                    <h4 className='font-semibold text-gray-800 mb-2'>
                      Manutenção Sustentável
                    </h4>
                    <p className='text-sm text-gray-600'>
                      Parceria com oficinas certificadas que utilizam produtos
                      ecológicos e práticas de descarte responsável.
                    </p>
                  </div>

                  <div className='border-l-4 border-green-600 pl-6 py-2'>
                    <h4 className='font-semibold text-gray-800 mb-2'>
                      Educação Ambiental
                    </h4>
                    <p className='text-sm text-gray-600'>
                      Treinamento contínuo das motoristas em práticas de
                      direção econômica e ambientalmente responsável.
                    </p>
                  </div>
                </div>

                <div className='bg-green-50 border-l-4 border-green-600 rounded-r-xl p-6'>
                  <h4 className='font-semibold text-gray-800 mb-2'>
                    Compromisso com o Futuro
                  </h4>
                  <p className='text-gray-600 text-sm leading-relaxed'>
                    Estamos comprometidas em evoluir constantemente nossas
                    práticas sustentáveis, explorando novas tecnologias e
                    parcerias que nos permitam oferecer uma mobilidade cada vez
                    mais limpa, eficiente e responsável.
                  </p>
                </div>
              </div>
            </div>

            {/* Canal de Ouvidoria */}
            <div
              id='contact'
              className='bg-white rounded-2xl p-8 shadow-lg'
            >
              <div className='flex items-center gap-3 mb-6'>
                <Phone className='w-8 h-8 text-secondary' />
                <h2 className='text-3xl font-bold text-primary'>
                  Canal de Ouvidoria e Contato
                </h2>
              </div>

              <div className='space-y-6'>
                <p className='text-gray-600 leading-relaxed'>
                  Valorizamos a sua opinião e estamos sempre disponíveis para
                  ouvir sugestões, reclamações, elogios ou esclarecimentos.
                  Nosso canal de ouvidoria garante que sua voz seja ouvida.
                </p>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div className='bg-gradient-to-br from-secondary/10 to-white rounded-xl p-6 border border-secondary/20'>
                    <div className='flex items-center gap-3 mb-4'>
                      <div className='bg-secondary rounded-full p-3'>
                        <Phone className='w-5 h-5 text-white' />
                      </div>
                      <div>
                        <h4 className='font-semibold text-gray-800'>
                          Telefone / WhatsApp
                        </h4>
                        <p className='text-sm text-gray-600'>
                          Atendimento 24/7
                        </p>
                      </div>
                    </div>
                    <a
                      href='tel:5511945164043'
                      className='text-primary font-semibold hover:text-primary-600 transition-colors'
                    >
                      +55 (11) 94516-4043
                    </a>
                  </div>

                  <div className='bg-gradient-to-br from-secondary/10 to-white rounded-xl p-6 border border-secondary/20'>
                    <div className='flex items-center gap-3 mb-4'>
                      <div className='bg-secondary rounded-full p-3'>
                        <Mail className='w-5 h-5 text-white' />
                      </div>
                      <div>
                        <h4 className='font-semibold text-gray-800'>E-mail</h4>
                        <p className='text-sm text-gray-600'>
                          Resposta em até 24h
                        </p>
                      </div>
                    </div>
                    <a
                      href='mailto:reservas@seomob.com.br'
                      className='text-primary font-semibold hover:text-primary-600 transition-colors break-all'
                    >
                      reservas@seomob.com.br
                    </a>
                  </div>

                  <div className='bg-gradient-to-br from-secondary/10 to-white rounded-xl p-6 border border-secondary/20'>
                    <div className='flex items-center gap-3 mb-4'>
                      <div className='bg-secondary rounded-full p-3'>
                        <MapPin className='w-5 h-5 text-white' />
                      </div>
                      <div>
                        <h4 className='font-semibold text-gray-800'>
                          Endereço
                        </h4>
                        <p className='text-sm text-gray-600'>Sede fiscal</p>
                      </div>
                    </div>
                    <p className='text-gray-700 text-sm'>
                      Rua Coronel José Eusébio, nº 95
                      <br />
                      Higienópolis - São Paulo/SP
                      <br />
                      CEP 01239-030
                    </p>
                  </div>

                  <div className='bg-gradient-to-br from-secondary/10 to-white rounded-xl p-6 border border-secondary/20'>
                    <div className='flex items-center gap-3 mb-4'>
                      <div className='bg-secondary rounded-full p-3'>
                        <Globe className='w-5 h-5 text-white' />
                      </div>
                      <div>
                        <h4 className='font-semibold text-gray-800'>
                          Website
                        </h4>
                        <p className='text-sm text-gray-600'>Portal oficial</p>
                      </div>
                    </div>
                    <a
                      href='https://www.seoomob.com.br'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-primary font-semibold hover:text-primary-600 transition-colors'
                    >
                      www.seoomob.com.br
                    </a>
                  </div>
                </div>

                <div className='bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 mt-6'>
                  <h4 className='font-semibold text-gray-800 mb-4 flex items-center gap-2'>
                    <BookOpen className='w-5 h-5 text-primary' />
                    Como Fazer uma Denúncia ou Reclamação
                  </h4>
                  <ul className='space-y-3 text-sm text-gray-600'>
                    <li className='flex items-start gap-2'>
                      <span className='font-semibold text-primary'>1.</span>
                      <span>
                        Entre em contato através dos canais acima
                        (preferencialmente e-mail para registro formal)
                      </span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <span className='font-semibold text-primary'>2.</span>
                      <span>
                        Descreva detalhadamente a situação, incluindo data,
                        horário e pessoas envolvidas
                      </span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <span className='font-semibold text-primary'>3.</span>
                      <span>
                        Você receberá um número de protocolo para acompanhamento
                      </span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <span className='font-semibold text-primary'>4.</span>
                      <span>
                        Analisaremos a situação e retornaremos em até 7 dias
                        úteis
                      </span>
                    </li>
                  </ul>
                </div>

                <div className='bg-primary/5 border-l-4 border-primary rounded-r-xl p-6'>
                  <p className='text-sm text-gray-700 leading-relaxed'>
                    <strong>Garantia de Anonimato:</strong> Se preferir, sua
                    identidade será mantida em sigilo. Todas as denúncias e
                    reclamações são tratadas com confidencialidade e seriedade.
                    Não toleramos represálias contra quem reporta problemas de
                    boa-fé.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}