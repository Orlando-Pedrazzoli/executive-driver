import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import '@/styles/globals.css';
import { Toaster } from 'react-hot-toast';
import WhatsAppButton from '@/components/WhatsAppButton';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
// Importe o componente de debug (remova após funcionar)
// import FaviconDebug from '@/components/FaviconDebug';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

// Tente usar apenas o caminho direto sem array
export const metadata: Metadata = {
  title: 'Seo | Mobilidade Executiva Premium',
  description:
    'Serviço de motorista executiva de luxo. Transfers para aeroportos, viagens corporativas e eventos com conforto e segurança.',
  keywords:
    'motorista executiva, driver executivo, transfer aeroporto, motorista particular, transporte executivo, mobilidade executiva, São Paulo, Brasil',
  authors: [{ name: 'Seo Mobilidade Executiva' }],
  creator: 'Seo Mobilidade Executiva',
  publisher: 'Seo Mobilidade Executiva',

  // CONFIGURAÇÃO SIMPLIFICADA DO FAVICON
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },

  // Manifest para PWA
  manifest: '/site.webmanifest',

  // Open Graph para redes sociais
  openGraph: {
    title: 'Seo | Mobilidade Executiva Premium',
    description:
      'Serviço de motorista executiva de luxo. Transfers premium e transporte corporativo.',
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Seo Mobilidade Executiva',
    url: 'https://seomobilidadeexecutiva.com.br',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Seo - Mobilidade Executiva',
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'Seo | Mobilidade Executiva Premium',
    description: 'Serviço de motorista executiva de luxo no Brasil',
    creator: '@seomobilidade',
    images: ['/twitter-image.png'],
  },

  // Configurações de SEO
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

  // Verificação de propriedade
  verification: {
    google: '',
    other: {
      'msvalidate.01': '',
    },
  },

  // Configurações adicionais
  alternates: {
    canonical: 'https://seomobilidadeexecutiva.com.br',
  },

  // Categoria
  category: 'transportation',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='pt-BR' className={poppins.className}>
      <head>
        {/* MÉTODO 1: Tags HTML diretas com cache busting */}
        <link rel='icon' type='image/x-icon' href='/favicon.ico?v=2' />
        <link rel='shortcut icon' type='image/x-icon' href='/favicon.ico?v=2' />

        {/* MÉTODO 2: Favicon alternativo em PNG (caso o .ico não funcione) */}
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />

        {/* MÉTODO 3: Favicon inline base64 (último recurso) */}
        {/* Se nada funcionar, converta seu favicon para base64 e cole aqui:
        <link rel='icon' type='image/x-icon' href='data:image/x-icon;base64,COLE_O_BASE64_AQUI' />
        */}

        {/* Apple Touch Icon */}
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon.png'
        />

        {/* Preconnect para fontes */}
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='anonymous'
        />

        {/* Meta tags adicionais */}
        <meta name='application-name' content='Seo Mobilidade Executiva' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='default' />
        <meta name='apple-mobile-web-app-title' content='Seo Mobilidade' />
        <meta name='format-detection' content='telephone=yes' />
        <meta name='mobile-web-app-capable' content='yes' />
        <meta name='theme-color' content='#004862' />

        {/* Structured Data para SEO */}
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'Seo Mobilidade Executiva',
              description:
                'Serviço de motorista executiva premium e mobilidade executiva',
              image: '/logo-preto-seo.png',
              telephone: '+5511999999999',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'São Paulo',
                addressRegion: 'SP',
                addressCountry: 'BR',
              },
              openingHoursSpecification: {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: [
                  'Monday',
                  'Tuesday',
                  'Wednesday',
                  'Thursday',
                  'Friday',
                  'Saturday',
                  'Sunday',
                ],
                opens: '00:00',
                closes: '23:59',
              },
              priceRange: '$$$',
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.9',
                reviewCount: '500',
              },
            }),
          }}
        />
      </head>
      <body className='min-h-screen bg-gray-50 antialiased'>
        {/* Adicione temporariamente para debug (remova depois) */}
        {/* <FaviconDebug /> */}

        <Navbar />
        <main className='flex-1'>{children}</main>
        <Footer />
        <WhatsAppButton />
        <Toaster
          position='top-right'
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
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
