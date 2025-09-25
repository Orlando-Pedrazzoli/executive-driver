import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import '@/styles/globals.css'
import { Toaster } from 'react-hot-toast'
import WhatsAppButton from '@/components/WhatsAppButton'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900']
})

export const metadata: Metadata = {
  title: 'Elite Driver | Motorista Executiva Premium no Brasil',
  description: 'Serviço de motorista executiva de luxo. Transfers para aeroportos, viagens corporativas e eventos com conforto e segurança.',
  keywords: 'motorista executiva, driver executivo, transfer aeroporto, motorista particular, transporte executivo, São Paulo',
  authors: [{ name: 'Elite Driver' }],
  openGraph: {
    title: 'Elite Driver | Motorista Executiva Premium',
    description: 'Serviço de motorista executiva de luxo no Brasil',
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Elite Driver',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Elite Driver | Motorista Executiva Premium',
    description: 'Serviço de motorista executiva de luxo no Brasil',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#004862' },
    { media: '(prefers-color-scheme: dark)', color: '#001c22' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={poppins.className}>
      <body className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#004862',
              color: '#fff',
              fontFamily: 'Poppins',
            },
            success: {
              iconTheme: {
                primary: '#c0b09b',
                secondary: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  )
}
