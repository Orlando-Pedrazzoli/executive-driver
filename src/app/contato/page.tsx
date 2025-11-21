'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  MessageSquare,
  User,
  Building,
  Calendar,
  Instagram,
  Globe,
  Smartphone,
} from 'lucide-react';

export default function ContatoPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simular envio (você pode integrar com API aqui)
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });

      // Reset success message após 5 segundos
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Telefone / WhatsApp',
      content: '+55 (11) 94516-4043',
      link: 'https://wa.me/5511945164043',
      description: 'Atendimento 24/7',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: Mail,
      title: 'E-mail',
      content: 'reservas@seomob.com.br',
      link: 'mailto:reservas@seomob.com.br',
      description: 'Resposta em até 24h',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: MapPin,
      title: 'Endereço',
      content: 'Rua Coronel José Eusébio, 95',
      subContent: 'Higienópolis - São Paulo/SP',
      description: 'CEP 01239-030',
      color: 'from-red-500 to-red-600',
    },
    {
      icon: Clock,
      title: 'Horário de Atendimento',
      content: 'Segunda a Domingo',
      subContent: '24 horas por dia',
      description: 'Serviço disponível a qualquer momento',
      color: 'from-purple-500 to-purple-600',
    },
  ];

  const socialLinks = [
    {
      icon: Instagram,
      name: 'Instagram',
      handle: '@seoo.mob',
      link: 'https://instagram.com/seoo.mob',
      color: 'hover:text-pink-600',
    },
    {
      icon: Globe,
      name: 'Website',
      handle: 'www.seoomob.com.br',
      link: 'https://www.seoomob.com.br',
      color: 'hover:text-blue-600',
    },
  ];

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
            transition={{ duration: 0.6 }}
            className='max-w-3xl mx-auto text-center'
          >
            <div className='flex justify-center mb-6'>
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, type: 'spring' }}
                className='bg-white/10 backdrop-blur-sm rounded-full p-4 shadow-2xl border border-white/20'
              >
                <MessageSquare className='w-12 h-12' />
              </motion.div>
            </div>
            <h1 className='text-5xl font-bold mb-6 drop-shadow-lg'>
              Entre em Contato
            </h1>
            <p className='text-xl text-gray-200 mb-4 drop-shadow-md'>
              Estamos prontas para atendê-la
            </p>
            <p className='text-lg text-gray-300 max-w-2xl mx-auto drop-shadow-md'>
              Tem dúvidas sobre nossos serviços? Precisa de um orçamento personalizado?
              Nossa equipe está disponível 24/7 para ajudá-la.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className='py-16 -mt-10 relative z-10'>
        <div className='container mx-auto px-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className='bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300'
              >
                <div className={`bg-gradient-to-br ${info.color} rounded-full w-14 h-14 flex items-center justify-center mb-4 shadow-lg`}>
                  <info.icon className='w-7 h-7 text-white' />
                </div>
                <h3 className='text-lg font-semibold text-gray-800 mb-2'>
                  {info.title}
                </h3>
                {info.link ? (
                  <a
                    href={info.link}
                    className='text-primary font-medium hover:text-primary-600 transition-colors'
                    target={info.link.startsWith('http') ? '_blank' : undefined}
                    rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {info.content}
                  </a>
                ) : (
                  <p className='text-primary font-medium'>{info.content}</p>
                )}
                {info.subContent && (
                  <p className='text-gray-600 text-sm mt-1'>{info.subContent}</p>
                )}
                <p className='text-gray-500 text-xs mt-2'>{info.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content - Form + Info */}
      <section className='py-16'>
        <div className='container mx-auto px-4'>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            {/* Contact Form */}
            <div className='lg:col-span-2'>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className='bg-white rounded-2xl p-8 shadow-lg'
              >
                <h2 className='text-3xl font-bold text-primary mb-6'>
                  Envie sua Mensagem
                </h2>
                <p className='text-gray-600 mb-8'>
                  Preencha o formulário abaixo e entraremos em contato em breve.
                  Todos os campos são obrigatórios.
                </p>

                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='bg-green-50 border-l-4 border-green-500 rounded-r-xl p-4 mb-6 flex items-center gap-3'
                  >
                    <CheckCircle className='w-6 h-6 text-green-600' />
                    <div>
                      <p className='font-semibold text-green-800'>
                        Mensagem enviada com sucesso!
                      </p>
                      <p className='text-sm text-green-700'>
                        Entraremos em contato em breve.
                      </p>
                    </div>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className='space-y-6'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div>
                      <label
                        htmlFor='name'
                        className='block text-sm font-medium text-gray-700 mb-2'
                      >
                        <User className='w-4 h-4 inline mr-2' />
                        Nome Completo *
                      </label>
                      <input
                        type='text'
                        id='name'
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all'
                        placeholder='Seu nome'
                      />
                    </div>

                    <div>
                      <label
                        htmlFor='phone'
                        className='block text-sm font-medium text-gray-700 mb-2'
                      >
                        <Smartphone className='w-4 h-4 inline mr-2' />
                        Telefone / WhatsApp *
                      </label>
                      <input
                        type='tel'
                        id='phone'
                        name='phone'
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all'
                        placeholder='(11) 99999-9999'
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor='email'
                      className='block text-sm font-medium text-gray-700 mb-2'
                    >
                      <Mail className='w-4 h-4 inline mr-2' />
                      E-mail *
                    </label>
                    <input
                      type='email'
                      id='email'
                      name='email'
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all'
                      placeholder='seuemail@exemplo.com'
                    />
                  </div>

                  <div>
                    <label
                      htmlFor='subject'
                      className='block text-sm font-medium text-gray-700 mb-2'
                    >
                      <Building className='w-4 h-4 inline mr-2' />
                      Assunto *
                    </label>
                    <select
                      id='subject'
                      name='subject'
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all'
                    >
                      <option value=''>Selecione um assunto</option>
                      <option value='orcamento'>Solicitar Orçamento</option>
                      <option value='agendamento'>Fazer Agendamento</option>
                      <option value='duvidas'>Dúvidas sobre Serviços</option>
                      <option value='corporativo'>Contrato Corporativo</option>
                      <option value='reclamacao'>Reclamação</option>
                      <option value='elogio'>Elogio</option>
                      <option value='outro'>Outro</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor='message'
                      className='block text-sm font-medium text-gray-700 mb-2'
                    >
                      <MessageSquare className='w-4 h-4 inline mr-2' />
                      Mensagem *
                    </label>
                    <textarea
                      id='message'
                      name='message'
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none'
                      placeholder='Conte-nos como podemos ajudá-la...'
                    />
                  </div>

                  <motion.button
                    type='submit'
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      w-full bg-gradient-to-r from-primary to-primary-600 text-white font-semibold 
                      px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300
                      flex items-center justify-center gap-2
                      ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}
                    `}
                  >
                    {isSubmitting ? (
                      <>
                        <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin' />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className='w-5 h-5' />
                        Enviar Mensagem
                      </>
                    )}
                  </motion.button>

                  <p className='text-xs text-gray-500 text-center'>
                    Ao enviar este formulário, você concorda com nossa{' '}
                    <a href='/compliance' className='text-primary hover:underline'>
                      Política de Privacidade
                    </a>
                  </p>
                </form>
              </motion.div>
            </div>

            {/* Sidebar Info */}
            <div className='space-y-6'>
              {/* Quick Contact */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className='bg-gradient-to-br from-primary to-primary-600 rounded-2xl p-6 text-white shadow-lg'
              >
                <h3 className='text-2xl font-bold mb-4'>Contato Rápido</h3>
                <p className='text-white/90 mb-6'>
                  Prefere falar diretamente conosco? Use um dos canais abaixo:
                </p>

                <div className='space-y-4'>
                  <a
                    href='https://wa.me/5511945164043'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all'
                  >
                    <div className='bg-white/20 rounded-full p-2'>
                      <Phone className='w-5 h-5' />
                    </div>
                    <div>
                      <p className='font-semibold'>WhatsApp</p>
                      <p className='text-sm text-white/80'>(11) 94516-4043</p>
                    </div>
                  </a>

                  <a
                    href='tel:5511945164043'
                    className='flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all'
                  >
                    <div className='bg-white/20 rounded-full p-2'>
                      <Smartphone className='w-5 h-5' />
                    </div>
                    <div>
                      <p className='font-semibold'>Ligação</p>
                      <p className='text-sm text-white/80'>(11) 94516-4043</p>
                    </div>
                  </a>

                  <a
                    href='mailto:reservas@seomob.com.br'
                    className='flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all'
                  >
                    <div className='bg-white/20 rounded-full p-2'>
                      <Mail className='w-5 h-5' />
                    </div>
                    <div>
                      <p className='font-semibold'>E-mail</p>
                      <p className='text-sm text-white/80 break-all'>
                        reservas@seomob.com.br
                      </p>
                    </div>
                  </a>
                </div>
              </motion.div>

              {/* Social Media */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className='bg-white rounded-2xl p-6 shadow-lg'
              >
                <h3 className='text-xl font-bold text-primary mb-4'>
                  Redes Sociais
                </h3>
                <p className='text-gray-600 mb-4 text-sm'>
                  Siga-nos nas redes sociais e fique por dentro das novidades:
                </p>

                <div className='space-y-3'>
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.link}
                      target='_blank'
                      rel='noopener noreferrer'
                      className={`flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:border-primary transition-all ${social.color}`}
                    >
                      <social.icon className='w-5 h-5' />
                      <div>
                        <p className='font-medium text-gray-800'>{social.name}</p>
                        <p className='text-sm text-gray-600'>{social.handle}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </motion.div>

              {/* Business Hours */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className='bg-white rounded-2xl p-6 shadow-lg'
              >
                <h3 className='text-xl font-bold text-primary mb-4 flex items-center gap-2'>
                  <Clock className='w-6 h-6' />
                  Disponibilidade
                </h3>
                <div className='space-y-3'>
                  <div className='flex justify-between items-center pb-2 border-b'>
                    <span className='text-gray-700'>Segunda - Domingo</span>
                    <span className='font-semibold text-primary'>24h</span>
                  </div>
                  <p className='text-sm text-gray-600 flex items-center gap-2'>
                    <CheckCircle className='w-4 h-4 text-green-500' />
                    Serviço disponível todos os dias
                  </p>
                  <p className='text-sm text-gray-600 flex items-center gap-2'>
                    <CheckCircle className='w-4 h-4 text-green-500' />
                    Atendimento 24 horas
                  </p>
                  <p className='text-sm text-gray-600 flex items-center gap-2'>
                    <CheckCircle className='w-4 h-4 text-green-500' />
                    Resposta rápida via WhatsApp
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className='py-16 bg-white'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-12'>
            <h2 className='text-4xl font-bold text-primary mb-4'>
              Nossa Localização
            </h2>
            <p className='text-gray-600 max-w-2xl mx-auto'>
              Estamos localizadas no coração de São Paulo, em Higienópolis.
              Venha nos visitar!
            </p>
          </div>

          <div className='rounded-2xl overflow-hidden shadow-xl'>
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.8662049899896!2d-46.66126492378065!3d-23.54321196180583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce582c4d1e8c6d%3A0x3c3c3c3c3c3c3c3c!2sR.%20Cel.%20José%20Eusébio%2C%2095%20-%20Higienópolis%2C%20São%20Paulo%20-%20SP%2C%2001239-030!5e0!3m2!1spt-BR!2sbr!4v1234567890123!5m2!1spt-BR!2sbr'
              width='100%'
              height='450'
              style={{ border: 0 }}
              allowFullScreen
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
              className='w-full'
            />
          </div>

          <div className='mt-8 bg-gray-50 rounded-2xl p-6'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 text-center'>
              <div>
                <MapPin className='w-8 h-8 text-primary mx-auto mb-2' />
                <h4 className='font-semibold text-gray-800 mb-1'>Endereço</h4>
                <p className='text-sm text-gray-600'>
                  Rua Coronel José Eusébio, 95<br />
                  Higienópolis - São Paulo/SP
                </p>
              </div>
              <div>
                <Building className='w-8 h-8 text-primary mx-auto mb-2' />
                <h4 className='font-semibold text-gray-800 mb-1'>Bairro</h4>
                <p className='text-sm text-gray-600'>
                  Higienópolis<br />
                  Região nobre de São Paulo
                </p>
              </div>
              <div>
                <Calendar className='w-8 h-8 text-primary mx-auto mb-2' />
                <h4 className='font-semibold text-gray-800 mb-1'>CEP</h4>
                <p className='text-sm text-gray-600'>
                  01239-030<br />
                  São Paulo - SP
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Quick Links */}
      <section className='py-16 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold text-primary mb-4'>
              Perguntas Frequentes
            </h2>
            <p className='text-gray-600'>
              Antes de entrar em contato, veja se sua dúvida já foi respondida:
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto'>
            <a
              href='/servicos'
              className='bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all border-l-4 border-primary'
            >
              <h4 className='font-semibold text-gray-800 mb-2'>
                Quais serviços vocês oferecem?
              </h4>
              <p className='text-sm text-gray-600'>
                Conheça todos os nossos serviços de mobilidade executiva.
              </p>
            </a>

            <a
              href='/agendamento'
              className='bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all border-l-4 border-secondary'
            >
              <h4 className='font-semibold text-gray-800 mb-2'>
                Como fazer um agendamento?
              </h4>
              <p className='text-sm text-gray-600'>
                Agende seu serviço de forma rápida e simples.
              </p>
            </a>

            <a
              href='/compliance'
              className='bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all border-l-4 border-green-500'
            >
              <h4 className='font-semibold text-gray-800 mb-2'>
                Política de cancelamento
              </h4>
              <p className='text-sm text-gray-600'>
                Veja os prazos e condições de cancelamento.
              </p>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}