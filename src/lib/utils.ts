import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format Brazilian phone number
export function formatPhone(value: string): string {
  const numbers = value.replace(/\D/g, '')
  if (numbers.length <= 11) {
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  }
  return value
}

// Format CPF
export function formatCPF(value: string): string {
  const numbers = value.replace(/\D/g, '')
  if (numbers.length <= 11) {
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  }
  return value
}

// Validate CPF
export function validateCPF(cpf: string): boolean {
  cpf = cpf.replace(/\D/g, '')
  
  if (cpf.length !== 11) return false
  if (/^(\d)\1{10}$/.test(cpf)) return false
  
  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i)
  }
  let digit = 11 - (sum % 11)
  if (digit >= 10) digit = 0
  if (digit !== parseInt(cpf.charAt(9))) return false
  
  sum = 0
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i)
  }
  digit = 11 - (sum % 11)
  if (digit >= 10) digit = 0
  if (digit !== parseInt(cpf.charAt(10))) return false
  
  return true
}

// Format CNPJ
export function formatCNPJ(value: string): string {
  const numbers = value.replace(/\D/g, '')
  if (numbers.length <= 14) {
    return numbers.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
  }
  return value
}

// Validate CNPJ
export function validateCNPJ(cnpj: string): boolean {
  cnpj = cnpj.replace(/\D/g, '')
  
  if (cnpj.length !== 14) return false
  if (/^(\d)\1{13}$/.test(cnpj)) return false
  
  let length = cnpj.length - 2
  let numbers = cnpj.substring(0, length)
  const digits = cnpj.substring(length)
  let sum = 0
  let pos = length - 7
  
  for (let i = length; i >= 1; i--) {
    sum += parseInt(numbers.charAt(length - i)) * pos--
    if (pos < 2) pos = 9
  }
  
  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11)
  if (result !== parseInt(digits.charAt(0))) return false
  
  length++
  numbers = cnpj.substring(0, length)
  sum = 0
  pos = length - 7
  
  for (let i = length; i >= 1; i--) {
    sum += parseInt(numbers.charAt(length - i)) * pos--
    if (pos < 2) pos = 9
  }
  
  result = sum % 11 < 2 ? 0 : 11 - (sum % 11)
  if (result !== parseInt(digits.charAt(1))) return false
  
  return true
}

// Format currency to Brazilian Real
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

// Format date to Brazilian format
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR').format(date)
}

// Calculate price based on distance and vehicle type
export function calculatePrice(
  distance: number, // in km
  vehicleType: 'executive' | 'luxury' | 'suv',
  serviceType: 'airport' | 'executive' | 'event' | 'tourism' | 'contract',
  isRoundTrip: boolean = false
): number {
  const basePrice = 100
  const pricePerKm = 4.5
  
  const vehicleMultiplier = {
    executive: 1,
    luxury: 1.5,
    suv: 1.3,
  }
  
  const serviceMultiplier = {
    airport: 1.2,
    executive: 1,
    event: 1.3,
    tourism: 1.5,
    contract: 0.9,
  }
  
  let price = (basePrice + (distance * pricePerKm)) * 
    vehicleMultiplier[vehicleType] * 
    serviceMultiplier[serviceType]
    
  if (isRoundTrip) {
    price *= 1.8 // 10% discount for round trips
  }
  
  return Math.round(price * 100) / 100
}

// CEP validation and formatting
export function formatCEP(value: string): string {
  const numbers = value.replace(/\D/g, '')
  if (numbers.length <= 8) {
    return numbers.replace(/(\d{5})(\d{3})/, '$1-$2')
  }
  return value
}

// Fetch address from CEP
export async function fetchAddressFromCEP(cep: string): Promise<{
  street: string
  neighborhood: string
  city: string
  state: string
} | null> {
  try {
    const cleanCEP = cep.replace(/\D/g, '')
    const response = await fetch(`https://viacep.com.br/ws/${cleanCEP}/json/`)
    const data = await response.json()
    
    if (data.erro) return null
    
    return {
      street: data.logradouro,
      neighborhood: data.bairro,
      city: data.localidade,
      state: data.uf
    }
  } catch (error) {
    console.error('Error fetching address:', error)
    return null
  }
}

// Generate WhatsApp message URL
export function generateWhatsAppUrl(
  phoneNumber: string,
  message: string
): string {
  const cleanNumber = phoneNumber.replace(/\D/g, '')
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${cleanNumber}?text=${encodedMessage}`
}

// Check if is business hours (8 AM to 10 PM)
export function isBusinessHours(): boolean {
  const now = new Date()
  const hours = now.getHours()
  return hours >= 8 && hours < 22
}

// Get greeting based on time of day
export function getGreeting(): string {
  const hour = new Date().getHours()
  
  if (hour < 12) return 'Bom dia'
  if (hour < 18) return 'Boa tarde'
  return 'Boa noite'
}

// Debounce function
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    
    timeout = setTimeout(() => {
      func(...args)
    }, wait)
  }
}

// Throttle function
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let lastTime = 0
  
  return (...args: Parameters<T>) => {
    const now = Date.now()
    
    if (now - lastTime >= wait) {
      lastTime = now
      func(...args)
    }
  }
}

// Local storage helpers with error handling
export const storage = {
  get: <T>(key: string, defaultValue: T): T => {
    if (typeof window === 'undefined') return defaultValue
    
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return defaultValue
    }
  },
  
  set: <T>(key: string, value: T): void => {
    if (typeof window === 'undefined') return
    
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  },
  
  remove: (key: string): void => {
    if (typeof window === 'undefined') return
    
    try {
      window.localStorage.removeItem(key)
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error)
    }
  }
}
