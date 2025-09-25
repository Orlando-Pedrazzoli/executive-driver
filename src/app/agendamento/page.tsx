'use client';

import { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import {
  MapPin,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  Building,
  Car,
  CreditCard,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  Users,
  Luggage,
  Baby,
  Dog,
  Info,
  Star,
  Accessibility,
  MessageCircle,
  Navigation,
  DollarSign,
  Shield,
  Plane,
  Briefcase,
  Camera,
  FileText,
} from 'lucide-react';
import Link from 'next/link';

// Validation schema com Zod
const bookingSchema = z.object({
  // Step 1 - Informações Pessoais
  fullName: z.string().min(3, 'Nome completo obrigatório'),
  email: z.string().email('Email inválido'),
  phone: z
    .string()
    .regex(/^\(\d{2}\)\s9\d{4}-\d{4}$/, 'Formato: (11) 99999-9999'),
  cpf: z
    .string()
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido')
    .optional()
    .or(z.literal('')),
  isCompany: z.boolean(),
  companyName: z.string().optional().or(z.literal('')),
  cnpj: z
    .string()
    .regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, 'CNPJ inválido')
    .optional()
    .or(z.literal('')),

  // Step 2 - Detalhes da Viagem
  serviceType: z.enum(['airport', 'executive', 'event', 'tourism', 'contract']),
  pickupAddress: z.string().min(5, 'Endereço de embarque obrigatório'),
  pickupCoordinates: z.object({ lat: z.number(), lng: z.number() }).optional(),
  destinationAddress: z.string().min(5, 'Endereço de destino obrigatório'),
  destinationCoordinates: z
    .object({ lat: z.number(), lng: z.number() })
    .optional(),
  tripDate: z.date(),
  tripTime: z.string(),
  returnTrip: z.boolean(),
  returnDate: z.date().optional(),
  returnTime: z.string().optional(),

  // Step 3 - Necessidades Especiais
  passengers: z.number().min(1).max(4),
  vehicleType: z.enum(['executive', 'luxury', 'suv']),
  specialNeeds: z.object({
    wheelchair: z.boolean(),
    extraLuggage: z.boolean(),
    petFriendly: z.boolean(),
    childSeat: z.boolean(),
  }),
  observations: z.string().optional(),

  // Step 4 - Pagamento
  paymentMethod: z.enum(['pix', 'card', 'invoice']),
  acceptTerms: z
    .boolean()
    .refine(val => val === true, 'Você deve aceitar os termos'),
});

type BookingFormData = z.infer<typeof bookingSchema>;

const STEPS = [
  { id: 1, name: 'Dados Pessoais', icon: User },
  { id: 2, name: 'Detalhes da Viagem', icon: Navigation },
  { id: 3, name: 'Necessidades Especiais', icon: Star },
  { id: 4, name: 'Confirmação', icon: CheckCircle },
];

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isCalculating, setIsCalculating] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  const [savedFormData, setSavedFormData] =
    useState<Partial<BookingFormData> | null>(null);

  const methods = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    mode: 'onChange',
    defaultValues: {
      isCompany: false,
      returnTrip: false,
      passengers: 1,
      vehicleType: 'executive',
      serviceType: 'airport',
      specialNeeds: {
        wheelchair: false,
        extraLuggage: false,
        petFriendly: false,
        childSeat: false,
      },
      paymentMethod: 'pix',
      acceptTerms: false,
    },
  });

  const { watch, setValue } = methods;

  // Load saved form data from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('bookingFormData');
    if (saved) {
      const data = JSON.parse(saved);
      setSavedFormData(data);
      Object.keys(data).forEach(key => {
        setValue(key as any, data[key]);
      });
    }
  }, [setValue]);

  // Auto-save form data
  useEffect(() => {
    const subscription = watch(data => {
      localStorage.setItem('bookingFormData', JSON.stringify(data));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  // Format phone number
  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return value;
  };

  // Format CPF
  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return value;
  };

  // Format CNPJ
  const formatCNPJ = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 14) {
      return numbers.replace(
        /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
        '$1.$2.$3/$4-$5'
      );
    }
    return value;
  };

  // Calculate estimated price
  const calculatePrice = () => {
    setIsCalculating(true);
    // Simulated calculation - replace with real API call
    setTimeout(() => {
      const basePrice = 150;
      const vehicleMultiplier = {
        executive: 1,
        luxury: 1.5,
        suv: 1.3,
      };
      const serviceMultiplier = {
        airport: 1.2,
        executive: 1,
        event: 1.3,
        tourism: 1.5,
        contract: 0.9,
      };

      const data = methods.getValues();
      const price =
        basePrice *
        vehicleMultiplier[data.vehicleType] *
        serviceMultiplier[data.serviceType] *
        (data.returnTrip ? 1.8 : 1);

      setEstimatedPrice(price);
      setIsCalculating(false);
    }, 1500);
  };

  // Submit form
  const onSubmit = async (data: BookingFormData) => {
    try {
      // Format message for WhatsApp
      const message = `
🚗 *NOVA RESERVA - Elite Driver*

*DADOS DO CLIENTE*
👤 Nome: ${data.fullName}
📧 Email: ${data.email}
📱 Telefone: ${data.phone}
${
  data.isCompany ? `🏢 Empresa: ${data.companyName}\n📄 CNPJ: ${data.cnpj}` : ''
}

*DETALHES DA VIAGEM*
📍 Embarque: ${data.pickupAddress}
📍 Destino: ${data.destinationAddress}
📅 Data: ${data.tripDate.toLocaleDateString('pt-BR')}
🕐 Horário: ${data.tripTime}
${
  data.returnTrip
    ? `🔄 Volta: ${data.returnDate?.toLocaleDateString('pt-BR')} às ${
        data.returnTime
      }`
    : ''
}

*INFORMAÇÕES ADICIONAIS*
👥 Passageiros: ${data.passengers}
🚙 Veículo: ${
        data.vehicleType === 'executive'
          ? 'Executivo'
          : data.vehicleType === 'luxury'
          ? 'Luxo'
          : 'SUV'
      }
${data.specialNeeds.wheelchair ? '♿ Acessível para cadeirante\n' : ''}
${data.specialNeeds.extraLuggage ? '🧳 Bagagem extra\n' : ''}
${data.specialNeeds.petFriendly ? '🐕 Pet friendly\n' : ''}
${data.specialNeeds.childSeat ? '👶 Cadeirinha infantil\n' : ''}
${data.observations ? `📝 Observações: ${data.observations}\n` : ''}

*PAGAMENTO*
💳 Forma: ${
        data.paymentMethod === 'pix'
          ? 'PIX'
          : data.paymentMethod === 'card'
          ? 'Cartão'
          : 'Faturamento'
      }
💰 Valor estimado: R$ ${estimatedPrice?.toFixed(2)}
      `.trim();

      // Send to WhatsApp
      const whatsappNumber = '351912164220'; // Replace with real number
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

      // Clear saved form data
      localStorage.removeItem('bookingFormData');

      // Open WhatsApp
      window.open(whatsappUrl, '_blank');

      toast.success('Reserva enviada! Aguarde nosso contato.');

      // Reset form
      methods.reset();
      setCurrentStep(1);
    } catch (error) {
      toast.error('Erro ao enviar reserva. Tente novamente.');
    }
  };

  const nextStep = async () => {
    const fields = getFieldsForStep(currentStep);
    const isValid = await methods.trigger(fields as any);

    if (isValid) {
      if (currentStep === 2) {
        calculatePrice();
      }
      setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const getFieldsForStep = (step: number) => {
    switch (step) {
      case 1:
        // Only validate required fields and conditional fields if company is selected
        const step1Fields = ['fullName', 'email', 'phone'];
        if (watch('isCompany')) {
          step1Fields.push('companyName', 'cnpj');
        }
        return step1Fields;
      case 2:
        const step2Fields = [
          'serviceType',
          'pickupAddress',
          'destinationAddress',
          'tripDate',
          'tripTime',
        ];
        if (watch('returnTrip')) {
          step2Fields.push('returnDate', 'returnTime');
        }
        return step2Fields;
      case 3:
        return ['passengers', 'vehicleType'];
      case 4:
        return ['paymentMethod', 'acceptTerms'];
      default:
        return [];
    }
  };

  const isCompany = watch('isCompany');
  const returnTrip = watch('returnTrip');

  return (
    <div className='min-h-screen bg-gray-50 pt-20'>
      <div className='container mx-auto px-4 py-12'>
        {/* Header */}
        <div className='text-center mb-12'>
          <h1 className='text-4xl font-bold text-primary mb-4'>
            Agendar Viagem
          </h1>
          <p className='text-gray-600 max-w-2xl mx-auto'>
            Complete o formulário abaixo para solicitar seu transporte
            executivo. Retornaremos em minutos com a confirmação.
          </p>
        </div>

        {/* Progress Steps */}
        <div className='max-w-4xl mx-auto mb-12'>
          <div className='flex items-center justify-between relative'>
            <div className='absolute left-0 right-0 top-1/2 h-1 bg-gray-200 -translate-y-1/2' />
            <div
              className='absolute left-0 top-1/2 h-1 bg-primary -translate-y-1/2 transition-all duration-500'
              style={{
                width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%`,
              }}
            />

            {STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.id}
                  className='relative z-10 flex flex-col items-center cursor-pointer'
                  onClick={() =>
                    currentStep > step.id && setCurrentStep(step.id)
                  }
                >
                  <div
                    className={`
                      w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300
                      ${
                        currentStep >= step.id
                          ? 'bg-primary text-white shadow-lg scale-110'
                          : 'bg-gray-200 text-gray-500'
                      }
                    `}
                  >
                    {currentStep > step.id ? (
                      <CheckCircle className='w-6 h-6' />
                    ) : (
                      <Icon className='w-6 h-6' />
                    )}
                  </div>
                  <span
                    className={`
                    mt-2 text-xs font-medium hidden sm:block
                    ${currentStep >= step.id ? 'text-primary' : 'text-gray-500'}
                  `}
                  >
                    {step.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Content */}
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className='max-w-4xl mx-auto'
          >
            <div className='bg-white rounded-2xl shadow-premium p-8'>
              <AnimatePresence mode='wait'>
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <motion.div
                    key='step1'
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className='space-y-6'
                  >
                    <h2 className='text-2xl font-semibold text-primary mb-6'>
                      Informações Pessoais
                    </h2>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                          Nome Completo *
                        </label>
                        <input
                          {...methods.register('fullName')}
                          className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary'
                          placeholder='João Silva'
                        />
                        {methods.formState.errors.fullName && (
                          <p className='text-red-500 text-sm mt-1'>
                            {methods.formState.errors.fullName.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                          Email *
                        </label>
                        <input
                          {...methods.register('email')}
                          type='email'
                          className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary'
                          placeholder='joao@empresa.com'
                        />
                        {methods.formState.errors.email && (
                          <p className='text-red-500 text-sm mt-1'>
                            {methods.formState.errors.email.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                          Telefone *
                        </label>
                        <input
                          {...methods.register('phone')}
                          onChange={e => {
                            const formatted = formatPhone(e.target.value);
                            setValue('phone', formatted);
                          }}
                          className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary'
                          placeholder='(11) 99999-9999'
                        />
                        {methods.formState.errors.phone && (
                          <p className='text-red-500 text-sm mt-1'>
                            {methods.formState.errors.phone.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                          CPF
                        </label>
                        <input
                          {...methods.register('cpf')}
                          onChange={e => {
                            const formatted = formatCPF(e.target.value);
                            setValue('cpf', formatted);
                          }}
                          className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary'
                          placeholder='123.456.789-00'
                        />
                        {methods.formState.errors.cpf && (
                          <p className='text-red-500 text-sm mt-1'>
                            {methods.formState.errors.cpf.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Company Section */}
                    <div className='border-t pt-6'>
                      <label className='flex items-center gap-3 cursor-pointer'>
                        <input
                          type='checkbox'
                          {...methods.register('isCompany')}
                          className='w-5 h-5 text-primary rounded focus:ring-primary'
                        />
                        <span className='text-gray-700 font-medium'>
                          Viagem corporativa / Preciso de nota fiscal
                        </span>
                      </label>

                      {isCompany && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-4'
                        >
                          <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                              Nome da Empresa
                            </label>
                            <input
                              {...methods.register('companyName')}
                              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary'
                              placeholder='Empresa LTDA'
                            />
                          </div>

                          <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                              CNPJ
                            </label>
                            <input
                              {...methods.register('cnpj')}
                              onChange={e => {
                                const formatted = formatCNPJ(e.target.value);
                                setValue('cnpj', formatted);
                              }}
                              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary'
                              placeholder='00.000.000/0001-00'
                            />
                            {methods.formState.errors.cnpj && (
                              <p className='text-red-500 text-sm mt-1'>
                                {methods.formState.errors.cnpj.message}
                              </p>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Trip Details */}
                {currentStep === 2 && (
                  <motion.div
                    key='step2'
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className='space-y-6'
                  >
                    <h2 className='text-2xl font-semibold text-primary mb-6'>
                      Detalhes da Viagem
                    </h2>

                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-3'>
                        Tipo de Serviço *
                      </label>
                      <div className='grid grid-cols-2 md:grid-cols-3 gap-3'>
                        {[
                          {
                            value: 'airport',
                            label: 'Transfer Aeroporto',
                            icon: Plane,
                          },
                          {
                            value: 'executive',
                            label: 'Executivo',
                            icon: Briefcase,
                          },
                          { value: 'event', label: 'Eventos', icon: Star },
                          { value: 'tourism', label: 'Turismo', icon: Camera },
                          {
                            value: 'contract',
                            label: 'Contrato',
                            icon: FileText,
                          },
                        ].map(service => (
                          <label
                            key={service.value}
                            className={`
                              flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-all
                              ${
                                watch('serviceType') === service.value
                                  ? 'border-primary bg-primary/5 text-primary'
                                  : 'border-gray-300 hover:border-gray-400'
                              }
                            `}
                          >
                            <input
                              type='radio'
                              value={service.value}
                              {...methods.register('serviceType')}
                              className='hidden'
                            />
                            <service.icon className='w-5 h-5' />
                            <span className='text-sm font-medium'>
                              {service.label}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className='space-y-4'>
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                          <MapPin className='w-4 h-4 inline mr-1' />
                          Local de Embarque *
                        </label>
                        <input
                          {...methods.register('pickupAddress')}
                          className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary'
                          placeholder='Endereço completo ou aeroporto'
                        />
                        {methods.formState.errors.pickupAddress && (
                          <p className='text-red-500 text-sm mt-1'>
                            {methods.formState.errors.pickupAddress.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                          <Navigation className='w-4 h-4 inline mr-1' />
                          Destino *
                        </label>
                        <input
                          {...methods.register('destinationAddress')}
                          className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary'
                          placeholder='Endereço de destino'
                        />
                        {methods.formState.errors.destinationAddress && (
                          <p className='text-red-500 text-sm mt-1'>
                            {
                              methods.formState.errors.destinationAddress
                                .message
                            }
                          </p>
                        )}
                      </div>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                          <Calendar className='w-4 h-4 inline mr-1' />
                          Data da Viagem *
                        </label>
                        <input
                          type='date'
                          {...methods.register('tripDate', {
                            valueAsDate: true,
                          })}
                          min={new Date().toISOString().split('T')[0]}
                          className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary'
                        />
                        {methods.formState.errors.tripDate && (
                          <p className='text-red-500 text-sm mt-1'>
                            {methods.formState.errors.tripDate.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                          <Clock className='w-4 h-4 inline mr-1' />
                          Horário *
                        </label>
                        <input
                          type='time'
                          {...methods.register('tripTime')}
                          className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary'
                        />
                        {methods.formState.errors.tripTime && (
                          <p className='text-red-500 text-sm mt-1'>
                            {methods.formState.errors.tripTime.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Return Trip */}
                    <div>
                      <label className='flex items-center gap-3 cursor-pointer'>
                        <input
                          type='checkbox'
                          {...methods.register('returnTrip')}
                          className='w-5 h-5 text-primary rounded focus:ring-primary'
                        />
                        <span className='text-gray-700 font-medium'>
                          Preciso de viagem de volta
                        </span>
                      </label>

                      {returnTrip && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-4'
                        >
                          <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                              Data da Volta
                            </label>
                            <input
                              type='date'
                              {...methods.register('returnDate', {
                                valueAsDate: true,
                              })}
                              min={
                                watch('tripDate')?.toISOString().split('T')[0]
                              }
                              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary'
                            />
                          </div>

                          <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                              Horário da Volta
                            </label>
                            <input
                              type='time'
                              {...methods.register('returnTime')}
                              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary'
                            />
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Special Needs */}
                {currentStep === 3 && (
                  <motion.div
                    key='step3'
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className='space-y-6'
                  >
                    <h2 className='text-2xl font-semibold text-primary mb-6'>
                      Necessidades Especiais
                    </h2>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                          <Users className='w-4 h-4 inline mr-1' />
                          Número de Passageiros *
                        </label>
                        <select
                          {...methods.register('passengers', {
                            valueAsNumber: true,
                          })}
                          className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary'
                        >
                          {[1, 2, 3, 4].map(num => (
                            <option key={num} value={num}>
                              {num} {num === 1 ? 'passageiro' : 'passageiros'}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                          <Car className='w-4 h-4 inline mr-1' />
                          Tipo de Veículo *
                        </label>
                        <select
                          {...methods.register('vehicleType')}
                          className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary'
                        >
                          <option value='executive'>
                            Executivo - Sedan Premium
                          </option>
                          <option value='luxury'>Luxo - Mercedes/BMW</option>
                          <option value='suv'>SUV - Maior Conforto</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-3'>
                        Necessidades Especiais
                      </label>
                      <div className='space-y-3'>
                        <label className='flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer'>
                          <input
                            type='checkbox'
                            {...methods.register('specialNeeds.wheelchair')}
                            className='w-5 h-5 text-primary rounded focus:ring-primary'
                          />
                          <Accessibility className='w-5 h-5 text-gray-600' />
                          <div>
                            <p className='font-medium text-gray-700'>
                              Acessibilidade para Cadeirante
                            </p>
                            <p className='text-sm text-gray-500'>
                              Veículo adaptado com rampa ou elevador
                            </p>
                          </div>
                        </label>

                        <label className='flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer'>
                          <input
                            type='checkbox'
                            {...methods.register('specialNeeds.extraLuggage')}
                            className='w-5 h-5 text-primary rounded focus:ring-primary'
                          />
                          <Luggage className='w-5 h-5 text-gray-600' />
                          <div>
                            <p className='font-medium text-gray-700'>
                              Bagagem Extra
                            </p>
                            <p className='text-sm text-gray-500'>
                              Mais de 2 malas grandes ou equipamentos
                            </p>
                          </div>
                        </label>

                        <label className='flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer'>
                          <input
                            type='checkbox'
                            {...methods.register('specialNeeds.petFriendly')}
                            className='w-5 h-5 text-primary rounded focus:ring-primary'
                          />
                          <Dog className='w-5 h-5 text-gray-600' />
                          <div>
                            <p className='font-medium text-gray-700'>
                              Pet Friendly
                            </p>
                            <p className='text-sm text-gray-500'>
                              Transporte de animais de estimação
                            </p>
                          </div>
                        </label>

                        <label className='flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer'>
                          <input
                            type='checkbox'
                            {...methods.register('specialNeeds.childSeat')}
                            className='w-5 h-5 text-primary rounded focus:ring-primary'
                          />
                          <Baby className='w-5 h-5 text-gray-600' />
                          <div>
                            <p className='font-medium text-gray-700'>
                              Cadeirinha Infantil
                            </p>
                            <p className='text-sm text-gray-500'>
                              Cadeirinha para bebê ou criança
                            </p>
                          </div>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        <Info className='w-4 h-4 inline mr-1' />
                        Observações Adicionais
                      </label>
                      <textarea
                        {...methods.register('observations')}
                        rows={4}
                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary'
                        placeholder='Informações importantes sobre a viagem, preferências especiais, etc.'
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Payment & Confirmation */}
                {currentStep === 4 && (
                  <motion.div
                    key='step4'
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className='space-y-6'
                  >
                    <h2 className='text-2xl font-semibold text-primary mb-6'>
                      Confirmação e Pagamento
                    </h2>

                    {/* Trip Summary */}
                    <div className='bg-gray-50 rounded-xl p-6 space-y-4'>
                      <h3 className='font-semibold text-lg text-primary'>
                        Resumo da Viagem
                      </h3>

                      <div className='space-y-3 text-sm'>
                        <div className='flex justify-between'>
                          <span className='text-gray-600'>Passageiro:</span>
                          <span className='font-medium'>
                            {watch('fullName')}
                          </span>
                        </div>
                        <div className='flex justify-between'>
                          <span className='text-gray-600'>Embarque:</span>
                          <span className='font-medium'>
                            {watch('pickupAddress')}
                          </span>
                        </div>
                        <div className='flex justify-between'>
                          <span className='text-gray-600'>Destino:</span>
                          <span className='font-medium'>
                            {watch('destinationAddress')}
                          </span>
                        </div>
                        <div className='flex justify-between'>
                          <span className='text-gray-600'>Data:</span>
                          <span className='font-medium'>
                            {watch('tripDate')?.toLocaleDateString('pt-BR')} às{' '}
                            {watch('tripTime')}
                          </span>
                        </div>
                        <div className='flex justify-between'>
                          <span className='text-gray-600'>Veículo:</span>
                          <span className='font-medium'>
                            {watch('vehicleType') === 'executive'
                              ? 'Executivo'
                              : watch('vehicleType') === 'luxury'
                              ? 'Luxo'
                              : 'SUV'}
                          </span>
                        </div>
                      </div>

                      <div className='border-t pt-4'>
                        <div className='flex justify-between items-center'>
                          <span className='text-lg font-semibold text-primary'>
                            Valor Estimado:
                          </span>
                          <div className='text-right'>
                            {isCalculating ? (
                              <div className='flex items-center gap-2'>
                                <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-primary' />
                                <span className='text-sm text-gray-500'>
                                  Calculando...
                                </span>
                              </div>
                            ) : (
                              <>
                                <p className='text-2xl font-bold text-primary'>
                                  R$ {estimatedPrice?.toFixed(2)}
                                </p>
                                <p className='text-xs text-gray-500'>
                                  *Valor sujeito a confirmação
                                </p>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-3'>
                        Forma de Pagamento
                      </label>
                      <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
                        <label
                          className={`
                          flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all
                          ${
                            watch('paymentMethod') === 'pix'
                              ? 'border-primary bg-primary/5'
                              : 'border-gray-300 hover:border-gray-400'
                          }
                        `}
                        >
                          <input
                            type='radio'
                            value='pix'
                            {...methods.register('paymentMethod')}
                            className='hidden'
                          />
                          <div className='bg-green-500 text-white rounded-full p-2'>
                            <DollarSign className='w-5 h-5' />
                          </div>
                          <div>
                            <p className='font-medium'>PIX</p>
                            <p className='text-xs text-gray-500'>Instantâneo</p>
                          </div>
                        </label>

                        <label
                          className={`
                          flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all
                          ${
                            watch('paymentMethod') === 'card'
                              ? 'border-primary bg-primary/5'
                              : 'border-gray-300 hover:border-gray-400'
                          }
                        `}
                        >
                          <input
                            type='radio'
                            value='card'
                            {...methods.register('paymentMethod')}
                            className='hidden'
                          />
                          <div className='bg-blue-500 text-white rounded-full p-2'>
                            <CreditCard className='w-5 h-5' />
                          </div>
                          <div>
                            <p className='font-medium'>Cartão</p>
                            <p className='text-xs text-gray-500'>
                              Crédito/Débito
                            </p>
                          </div>
                        </label>

                        <label
                          className={`
                          flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all
                          ${
                            watch('paymentMethod') === 'invoice'
                              ? 'border-primary bg-primary/5'
                              : 'border-gray-300 hover:border-gray-400'
                          }
                        `}
                        >
                          <input
                            type='radio'
                            value='invoice'
                            {...methods.register('paymentMethod')}
                            className='hidden'
                          />
                          <div className='bg-gray-500 text-white rounded-full p-2'>
                            <Building className='w-5 h-5' />
                          </div>
                          <div>
                            <p className='font-medium'>Faturamento</p>
                            <p className='text-xs text-gray-500'>Empresarial</p>
                          </div>
                        </label>
                      </div>
                    </div>

                    {/* Terms */}
                    <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-4'>
                      <label className='flex items-start gap-3 cursor-pointer'>
                        <input
                          type='checkbox'
                          {...methods.register('acceptTerms')}
                          className='w-5 h-5 text-primary rounded focus:ring-primary mt-0.5'
                        />
                        <div className='text-sm'>
                          <p className='text-gray-700'>
                            Li e aceito os{' '}
                            <Link
                              href='/termos'
                              className='text-primary underline'
                            >
                              Termos de Uso
                            </Link>{' '}
                            e a{' '}
                            <Link
                              href='/privacidade'
                              className='text-primary underline ml-1'
                            >
                              Política de Privacidade
                            </Link>
                            .
                          </p>
                          <p className='text-gray-600 mt-1'>
                            Ao confirmar, você autoriza o envio dos seus dados
                            via WhatsApp para finalização da reserva.
                          </p>
                        </div>
                      </label>
                      {methods.formState.errors.acceptTerms && (
                        <p className='text-red-500 text-sm mt-2 ml-8'>
                          {methods.formState.errors.acceptTerms.message}
                        </p>
                      )}
                    </div>

                    {/* Security Badge */}
                    <div className='flex items-center justify-center gap-4 text-sm text-gray-500'>
                      <div className='flex items-center gap-2'>
                        <Shield className='w-5 h-5' />
                        <span>100% Seguro</span>
                      </div>
                      <div className='flex items-center gap-2'>
                        <MessageCircle className='w-5 h-5' />
                        <span>Via WhatsApp</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className='flex justify-between mt-8 pt-6 border-t'>
                <button
                  type='button'
                  onClick={prevStep}
                  className={`
                    flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all
                    ${
                      currentStep === 1
                        ? 'invisible'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }
                  `}
                >
                  <ChevronLeft className='w-5 h-5' />
                  Voltar
                </button>

                {currentStep < STEPS.length ? (
                  <button
                    type='button'
                    onClick={nextStep}
                    className='flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-600 text-white rounded-full font-medium transition-all'
                  >
                    Próximo
                    <ChevronRight className='w-5 h-5' />
                  </button>
                ) : (
                  <button
                    type='submit'
                    disabled={!watch('acceptTerms')}
                    className={`
                      flex items-center gap-2 px-8 py-3 rounded-full font-medium transition-all
                      ${
                        watch('acceptTerms')
                          ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }
                    `}
                  >
                    <MessageCircle className='w-5 h-5' />
                    Enviar via WhatsApp
                  </button>
                )}
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
