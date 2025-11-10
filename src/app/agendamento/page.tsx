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
  Heart,
  Sparkles,
  UserCheck,
} from 'lucide-react';
import Link from 'next/link';

// Validation schema com Zod
// Validation schema com Zod - CORRIGIDO
const bookingSchema = z.object({
  // Step 1 - Informações Pessoais
  fullName: z.string().min(3, 'Nome completo obrigatório'),
  email: z.string().email('Email inválido'),
  phone: z
    .string()
    .regex(/^\(\d{2}\)\s9\d{4}-\d{4}$/, 'Formato: (11) 99999-9999'),
  cpf: z
    .string()
    .optional()
    .transform(val => val === '' ? undefined : val)
    .pipe(
      z.union([
        z.undefined(),
        z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido')
      ])
    ),
  isCompany: z.boolean(),
  companyName: z.string().optional().transform(val => val === '' ? undefined : val),
  cnpj: z
    .string()
    .optional()
    .transform(val => val === '' ? undefined : val)
    .pipe(
      z.union([
        z.undefined(),
        z.string().regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, 'CNPJ inválido')
      ])
    ),

  // Step 2 - Detalhes da Viagem
  serviceType: z.enum(['transfer', 'corporate', 'experience', 'exclusive', 'dayuse', 'travel', 'care', 'children']),
  pickupAddress: z.string().min(5, 'Endereço de embarque obrigatório'),
  pickupCoordinates: z.object({ lat: z.number(), lng: z.number() }).optional(),
  destinationAddress: z.string().min(5, 'Endereço de destino obrigatório'),
  destinationCoordinates: z
    .object({ lat: z.number(), lng: z.number() })
    .optional(),
  tripDate: z.string().min(1, 'Data obrigatória'),
  tripTime: z.string().min(1, 'Horário obrigatório'),
  returnTrip: z.boolean(),
  returnDate: z.string().optional().transform(val => val === '' ? undefined : val),
  returnTime: z.string().optional().transform(val => val === '' ? undefined : val),

  // Step 3 - Necessidades Especiais
  passengers: z.number().min(1).max(7),
  vehicleType: z.enum(['executive', 'luxury', 'suv']),
  specialNeeds: z.object({
    wheelchair: z.boolean(),
    extraLuggage: z.boolean(),
    petFriendly: z.boolean(),
    childSeat: z.boolean(),
    womanDriver: z.boolean(),
  }),
  observations: z.string().optional().transform(val => val === '' ? undefined : val),

  // Step 4 - Pagamento
  paymentMethod: z.enum(['pix', 'card', 'invoice']),
  acceptTerms: z
    .boolean()
    .refine(val => val === true, 'Você deve aceitar os termos'),
}).superRefine((data, ctx) => {
  // Validação condicional para viagem de volta
  if (data.returnTrip) {
    if (!data.returnDate || data.returnDate === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Data de volta obrigatória",
        path: ["returnDate"]
      });
    }
    if (!data.returnTime || data.returnTime === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Horário de volta obrigatório",
        path: ["returnTime"]
      });
    }
  }
  
  // Validação condicional para empresa
  if (data.isCompany) {
    if (!data.companyName || data.companyName === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Nome da empresa obrigatório",
        path: ["companyName"]
      });
    }
    if (!data.cnpj || data.cnpj === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "CNPJ obrigatório",
        path: ["cnpj"]
      });
    }
  }
});

type BookingFormData = z.infer<typeof bookingSchema>;

const STEPS = [
  { id: 1, name: 'Dados Pessoais', icon: User },
  { id: 2, name: 'Detalhes da Viagem', icon: Navigation },
  { id: 3, name: 'Necessidades Especiais', icon: Star },
  { id: 4, name: 'Confirmação', icon: CheckCircle },
];

// Serviços SEOO atualizados
const SEOO_SERVICES = [
  {
    value: 'transfer',
    label: 'SEOO Transfer',
    subtitle: 'Aeroportos e hotéis',
    icon: Plane,
    description: 'Transfers com pontualidade e conforto absoluto'
  },
  {
    value: 'corporate',
    label: 'SEOO Corporate',
    subtitle: 'Executivo',
    icon: Briefcase,
    description: 'Atendimento exclusivo para executivas e empresas'
  },
  {
    value: 'experience',
    label: 'SEOO Experience',
    subtitle: 'Eventos',
    icon: Sparkles,
    description: 'Logística completa para eventos e feiras'
  },
  {
    value: 'exclusive',
    label: 'SEOO Exclusive',
    subtitle: 'Motorista fixa',
    icon: UserCheck,
    description: 'Contrato mensal com motorista exclusiva'
  },
  {
    value: 'dayuse',
    label: 'SEOO Day Use',
    subtitle: 'Por período',
    icon: Calendar,
    description: 'Motorista dedicada por período determinado'
  },
  {
    value: 'travel',
    label: 'SEOO Travel',
    subtitle: 'Viagens',
    icon: MapPin,
    description: 'Viagens intermunicipais com total conforto'
  },
  {
    value: 'care',
    label: 'SEOO Care',
    subtitle: 'Cuidados especiais',
    icon: Heart,
    description: 'Atendimento para necessidades específicas'
  },
  {
    value: 'children',
    label: 'SEOO Children & Teens',
    subtitle: 'Crianças',
    icon: Baby,
    description: 'Transporte seguro com motoristas que são mães'
  },
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
      fullName: '',
      email: '',
      phone: '',
      cpf: '',
      isCompany: false,
      companyName: '',
      cnpj: '',
      returnTrip: false,
      passengers: 1,
      vehicleType: 'suv',
      serviceType: 'transfer',
      specialNeeds: {
        wheelchair: false,
        extraLuggage: false,
        petFriendly: false,
        childSeat: false,
        womanDriver: true, // Por padrão, já que é 100% motoristas mulheres
      },
      paymentMethod: 'pix',
      acceptTerms: false,
      tripDate: '',
      tripTime: '',
      returnDate: '',
      returnTime: '',
      pickupAddress: '',
      destinationAddress: '',
      observations: '',
    },
  });

  const { watch, setValue, formState } = methods;

  // Debug para verificar erros
  useEffect(() => {
    if (formState.errors && Object.keys(formState.errors).length > 0) {
      console.log('Erros de validação:', formState.errors);
    }
  }, [formState.errors]);

  // Load saved form data from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('seooBookingFormData');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setSavedFormData(data);
        Object.keys(data).forEach(key => {
          setValue(key as any, data[key]);
        });
      } catch (error) {
        console.error('Erro ao carregar dados salvos:', error);
      }
    }
  }, [setValue]);

  // Auto-save form data
  useEffect(() => {
    const subscription = watch(data => {
      localStorage.setItem('seooBookingFormData', JSON.stringify(data));
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
    setTimeout(() => {
      const basePrice = 180;
      const vehicleMultiplier = {
        executive: 1,
        luxury: 1.5,
        suv: 1.3,
      };
      const serviceMultiplier = {
        transfer: 1.2,
        corporate: 1.3,
        experience: 1.5,
        exclusive: 2,
        dayuse: 1.4,
        travel: 1.6,
        care: 1.1,
        children: 1.2,
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

  // Helper function para formatar data para exibição
  const formatDateForDisplay = (dateString: string) => {
    if (!dateString) return '';
    try {
      const [year, month, day] = dateString.split('-');
      return `${day}/${month}/${year}`;
    } catch {
      return dateString;
    }
  };

  // Get service label
  const getServiceLabel = (serviceType: string) => {
    const service = SEOO_SERVICES.find(s => s.value === serviceType);
    return service?.label || serviceType;
  };

  // Submit form - Atualizado para SEOO
  const onSubmit = async (data: BookingFormData) => {
    console.log('Enviando reserva SEOO:', data);

    try {
      // Format message for WhatsApp - SEOO
      const message = `
*NOVA RESERVA - SEOO MOBILIDADE EXECUTIVA*
Mobilidade do seu jeito, no seu tempo

*DADOS DO CLIENTE*
Nome: ${data.fullName}
Email: ${data.email}
Telefone: ${data.phone}
${data.cpf ? `CPF: ${data.cpf}\n` : ''}
${
  data.isCompany ? `Empresa: ${data.companyName}\n CNPJ: ${data.cnpj}` : ''
}

*SERVIÇO SOLICITADO*
Tipo: ${getServiceLabel(data.serviceType)}
Motorista: Feminina

*DETALHES DA VIAGEM*
Embarque: ${data.pickupAddress}
Destino: ${data.destinationAddress}
Data: ${formatDateForDisplay(data.tripDate)}
Horário: ${data.tripTime}
${
  data.returnTrip
    ? `Volta: ${formatDateForDisplay(data.returnDate || '')} às ${
        data.returnTime
      }`
    : ''
}

*INFORMAÇÕES ADICIONAIS*
Passageiros: ${data.passengers}
Veículo: ${
        data.vehicleType === 'executive'
          ? 'Executivo'
          : data.vehicleType === 'luxury'
          ? 'Luxo'
          : 'SUV Híbrido'
      }
${data.specialNeeds.wheelchair ? 'Acessível para cadeirante\n' : ''}
${data.specialNeeds.extraLuggage ? 'Bagagem extra\n' : ''}
${data.specialNeeds.petFriendly ? 'Pet friendly\n' : ''}
${data.specialNeeds.childSeat ? 'Cadeirinha infantil\n' : ''}
${data.observations ? `Observações: ${data.observations}\n` : ''}

*PAGAMENTO*
Forma: ${
        data.paymentMethod === 'pix'
          ? 'PIX'
          : data.paymentMethod === 'card'
          ? 'Cartão'
          : 'Faturamento'
      }
Valor estimado: R$ ${estimatedPrice?.toFixed(2) || 'A calcular'}

Reserva realizada pelo site SEOO
      `.trim();

      console.log('Mensagem formatada:', message);

      // Send to WhatsApp - Número real da SEOO
      const whatsappNumber = '5511945164043';
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

      console.log('URL do WhatsApp SEOO:', whatsappUrl);

      // Clear saved form data
      localStorage.removeItem('seooBookingFormData');

      // Open WhatsApp
      window.open(whatsappUrl, '_blank');

      toast.success('Reserva enviada! Aguarde nosso contato. 💜');

      // Reset form
      methods.reset();
      setCurrentStep(1);
      setEstimatedPrice(null);
    } catch (error) {
      console.error('Erro ao enviar reserva:', error);
      toast.error('Erro ao enviar reserva. Tente novamente.');
    }
  };

  const nextStep = async () => {
    const fields = getFieldsForStep(currentStep);
    const isValid = await methods.trigger(fields as any);

    console.log('Validação do passo', currentStep, ':', isValid);
    console.log('Campos validados:', fields);

    if (!isValid) {
      console.log('Erros encontrados:', methods.formState.errors);
      const firstError = Object.values(methods.formState.errors)[0];
      if (firstError && 'message' in firstError) {
        toast.error(firstError.message as string);
      }
      return;
    }

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
          <div className='inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-4'>
            <Heart className='w-5 h-5 text-secondary' />
            <span className='text-primary font-medium'>100% Motoristas Mulheres</span>
          </div>
          <h1 className='text-4xl font-bold text-primary mb-4'>
            Agendar Viagem SEOO
          </h1>
          <p className='text-gray-600 max-w-2xl mx-auto'>
            Mobilidade executiva pensada para mulheres. Complete o formulário 
            e nossa equipe entrará em contato para confirmar sua reserva.
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
            onSubmit={methods.handleSubmit(onSubmit, errors => {
              console.log('Erros no submit:', errors);
              toast.error('Por favor, verifique os campos obrigatórios');
            })}
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
                          placeholder='Maria Silva'
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
                          placeholder='maria@empresa.com'
                        />
                        {methods.formState.errors.email && (
                          <p className='text-red-500 text-sm mt-1'>
                            {methods.formState.errors.email.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                          Telefone/WhatsApp *
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

                    {/* Info Box SEOO */}
                    <div className='bg-secondary/10 border border-secondary/30 rounded-lg p-4 flex items-start gap-3'>
                      <Heart className='w-5 h-5 text-secondary flex-shrink-0 mt-0.5' />
                      <div>
                        <p className='text-sm text-gray-700 font-medium'>
                          Você está reservando com a SEOO
                        </p>
                        <p className='text-xs text-gray-600 mt-1'>
                          Mobilidade executiva com motoristas 100% femininas. 
                          Segurança, conforto e respeito em cada trajeto.
                        </p>
                      </div>
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
                        Escolha o Serviço SEOO *
                      </label>
                      <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                        {SEOO_SERVICES.map(service => (
                          <label
                            key={service.value}
                            className={`
                              flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-all
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
                            <service.icon className='w-5 h-5 mt-0.5 flex-shrink-0' />
                            <div className='flex-1'>
                              <p className='font-semibold text-sm'>{service.label}</p>
                              <p className='text-xs text-gray-500 mt-0.5'>{service.subtitle}</p>
                            </div>
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
                          {...methods.register('tripDate')}
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
                              {...methods.register('returnDate')}
                              min={watch('tripDate')}
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
                          {[1, 2, 3, 4, 5, 6, 7].map(num => (
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
                          <option value='suv'>SUV Híbrido Premium (Recomendado)</option>
                          <option value='executive'>Executivo - Sedan Premium</option>
                          <option value='luxury'>Luxo - Mercedes/BMW</option>
                        </select>
                      </div>
                    </div>

                    {/* SEOO Special Badge */}
                    <div className='bg-gradient-to-r from-primary to-primary-600 text-white rounded-lg p-4'>
                      <div className='flex items-center gap-3'>
                        <Heart className='w-8 h-8 text-secondary' />
                        <div>
                          <p className='font-semibold'>100% Motoristas Mulheres</p>
                          <p className='text-sm text-gray-200'>
                            Todos os serviços SEOO são realizados exclusivamente 
                            por motoristas femininas capacitadas e experientes.
                          </p>
                        </div>
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
                      <div className='flex items-center justify-between mb-4'>
                        <h3 className='font-semibold text-lg text-primary'>
                          Resumo da Viagem SEOO
                        </h3>
                        <div className='bg-secondary text-primary px-3 py-1 rounded-full text-sm font-medium'>
                          100% Motoristas Mulheres
                        </div>
                      </div>

                      <div className='space-y-3 text-sm'>
                        <div className='flex justify-between'>
                          <span className='text-gray-600'>Passageira:</span>
                          <span className='font-medium'>
                            {watch('fullName')}
                          </span>
                        </div>
                        <div className='flex justify-between'>
                          <span className='text-gray-600'>Serviço:</span>
                          <span className='font-medium'>
                            {getServiceLabel(watch('serviceType'))}
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
                            {formatDateForDisplay(watch('tripDate'))} às{' '}
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
                              : 'SUV Híbrido'}
                          </span>
                        </div>
                        <div className='flex justify-between'>
                          <span className='text-gray-600'>Motorista:</span>
                          <span className='font-medium text-secondary'>
                            100% Feminina
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
                            via WhatsApp para finalização da reserva com a SEOO.
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
                      <div className='flex items-center gap-2'>
                        <Heart className='w-5 h-5 text-secondary' />
                        <span>SEOO</span>
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