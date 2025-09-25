import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface BookingData {
  fullName?: string
  email?: string
  phone?: string
  cpf?: string
  isCompany?: boolean
  companyName?: string
  cnpj?: string
  serviceType?: 'airport' | 'executive' | 'event' | 'tourism' | 'contract'
  pickupAddress?: string
  pickupCoordinates?: { lat: number; lng: number }
  destinationAddress?: string
  destinationCoordinates?: { lat: number; lng: number }
  tripDate?: Date
  tripTime?: string
  returnTrip?: boolean
  returnDate?: Date
  returnTime?: string
  passengers?: number
  vehicleType?: 'executive' | 'luxury' | 'suv'
  specialNeeds?: {
    wheelchair: boolean
    extraLuggage: boolean
    petFriendly: boolean
    childSeat: boolean
  }
  observations?: string
  paymentMethod?: 'pix' | 'card' | 'invoice'
  estimatedPrice?: number
}

interface AppState {
  // Booking data
  bookingData: BookingData
  setBookingData: (data: Partial<BookingData>) => void
  clearBookingData: () => void
  
  // UI state
  isMobileMenuOpen: boolean
  toggleMobileMenu: () => void
  setMobileMenu: (isOpen: boolean) => void
  
  // Loading states
  isCalculatingPrice: boolean
  setCalculatingPrice: (isCalculating: boolean) => void
  
  // Form step
  currentFormStep: number
  setFormStep: (step: number) => void
  nextFormStep: () => void
  prevFormStep: () => void
  
  // Notifications
  notifications: Array<{
    id: string
    type: 'success' | 'error' | 'info' | 'warning'
    message: string
    timestamp: number
  }>
  addNotification: (notification: {
    type: 'success' | 'error' | 'info' | 'warning'
    message: string
  }) => void
  removeNotification: (id: string) => void
  clearNotifications: () => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Booking data
      bookingData: {},
      setBookingData: (data) => set((state) => ({
        bookingData: { ...state.bookingData, ...data }
      })),
      clearBookingData: () => set({ bookingData: {} }),
      
      // UI state
      isMobileMenuOpen: false,
      toggleMobileMenu: () => set((state) => ({
        isMobileMenuOpen: !state.isMobileMenuOpen
      })),
      setMobileMenu: (isOpen) => set({ isMobileMenuOpen: isOpen }),
      
      // Loading states
      isCalculatingPrice: false,
      setCalculatingPrice: (isCalculating) => set({ isCalculatingPrice: isCalculating }),
      
      // Form step
      currentFormStep: 1,
      setFormStep: (step) => set({ currentFormStep: step }),
      nextFormStep: () => set((state) => ({
        currentFormStep: Math.min(state.currentFormStep + 1, 4)
      })),
      prevFormStep: () => set((state) => ({
        currentFormStep: Math.max(state.currentFormStep - 1, 1)
      })),
      
      // Notifications
      notifications: [],
      addNotification: (notification) => {
        const id = Math.random().toString(36).substring(7)
        const timestamp = Date.now()
        
        set((state) => ({
          notifications: [
            ...state.notifications,
            { id, ...notification, timestamp }
          ]
        }))
        
        // Auto remove after 5 seconds
        setTimeout(() => {
          get().removeNotification(id)
        }, 5000)
      },
      removeNotification: (id) => set((state) => ({
        notifications: state.notifications.filter(n => n.id !== id)
      })),
      clearNotifications: () => set({ notifications: [] }),
    }),
    {
      name: 'elite-driver-storage',
      partialize: (state) => ({
        bookingData: state.bookingData,
      }),
    }
  )
)

// Hooks for specific parts of the store
export const useBookingData = () => useAppStore((state) => state.bookingData)
export const useSetBookingData = () => useAppStore((state) => state.setBookingData)
export const useClearBookingData = () => useAppStore((state) => state.clearBookingData)

export const useFormStep = () => useAppStore((state) => state.currentFormStep)
export const useSetFormStep = () => useAppStore((state) => state.setFormStep)
export const useNextFormStep = () => useAppStore((state) => state.nextFormStep)
export const usePrevFormStep = () => useAppStore((state) => state.prevFormStep)

export const useNotifications = () => useAppStore((state) => state.notifications)
export const useAddNotification = () => useAppStore((state) => state.addNotification)
export const useRemoveNotification = () => useAppStore((state) => state.removeNotification)
