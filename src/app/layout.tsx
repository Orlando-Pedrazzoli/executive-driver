import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import '@/styles/globals.css';
import { Toaster } from 'react-hot-toast';
import WhatsAppButton from '@/components/WhatsAppButton';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'SEOO | Mobilidade Executiva para Mulheres',
  description:
    'Mobilidade executiva pensada exclusivamente para mulheres, com motoristas 100% femininas. Conforto, segurança e tranquilidade a cada trajeto.',
  keywords:
    'SEOO, mobilidade executiva, motorista mulher, driver feminina, transfer aeroporto, transporte executivo mulheres, motorista particular mulher, São Paulo, Brasil',
  authors: [{ name: 'SEOO Mobilidade Executiva' }],
  creator: 'SEOO Mobilidade Executiva',
  publisher: 'Somas Group Ltda',

  // Favicon
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },

  // Manifest para PWA
  manifest: '/site.webmanifest',

  // Open Graph para redes sociais
  openGraph: {
    title: 'SEOO | Mobilidade Executiva para Mulheres',
    description:
      'Mobilidade pensada para mulheres. Motoristas 100% femininas, SUVs híbridos premium. Segurança, conforto e respeito.',
    type: 'website',
    locale: 'pt_BR',
    siteName: 'SEOO Mobilidade Executiva',
    url: 'https://seoomob.com.br',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SEOO - Mobilidade Executiva',
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'SEOO | Mobilidade Executiva para Mulheres',
    description: 'Mobilidade pensada exclusivamente para mulheres. 100% motoristas femininas.',
    creator: '@seoo.mob',
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
    canonical: 'https://seoomob.com.br',
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
        {/* Tags HTML diretas com cache busting */}
        <link rel='icon' type='image/x-icon' href='/favicon.ico?v=2' />
        <link rel='shortcut icon' type='image/x-icon' href='/favicon.ico?v=2' />

        {/* Favicon alternativo em PNG */}
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
        <meta name='application-name' content='SEOO Mobilidade Executiva' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='default' />
        <meta name='apple-mobile-web-app-title' content='SEOO' />
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
              name: 'SEOO Mobilidade Executiva',
              description:
                'Mobilidade executiva pensada exclusivamente para mulheres, com motoristas 100% femininas',
              image: '/logo-seoo.png',
              telephone: '+5511945164043',
              email: 'reservas@seomob.com.br',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Rua Coronel José Eusébio, 95',
                addressLocality: 'Higienópolis',
                addressRegion: 'SP',
                postalCode: '01239-030',
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
                ratingValue: '5.0',
                reviewCount: '500',
              },
              sameAs: [
                'https://instagram.com/seoo.mob',
                'https://facebook.com/seoomobilidade',
                'https://linkedin.com/company/seoo-mobilidade-executiva',
              ],
            }),
          }}
        />
      </head>
      <body className='min-h-screen bg-gray-50 antialiased'>
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