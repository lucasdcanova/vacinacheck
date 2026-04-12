import { Cabin } from 'next/font/google'
import './globals.css'
import Script from 'next/script'

const cabin = Cabin({
  subsets: ['latin'],
  variable: '--font-cabin',
  display: 'swap',
})

// Viewport configuration (Next.js 15+)
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0072a2' },
    { media: '(prefers-color-scheme: dark)', color: '#15335e' },
  ],
}

export const metadata = {
  title: 'Saúde Livre Vacinas - Clínica de Vacinação em Florianópolis Centro',
  description: 'Clínica de vacinação em Florianópolis Centro. Vacinas para bebês, crianças, gestantes, adultos e idosos. Atendimento humanizado e agendamento fácil pelo WhatsApp. Saúde Livre Vacinas.',
  keywords: 'clínica de vacinação florianópolis, vacinas florianópolis centro, vacinação infantil florianópolis, vacina dengue florianópolis, vacina gripe florianópolis, saúde livre vacinas, carteirinha de vacinação, vacina bebê florianópolis, vacina gestante florianópolis, imunização florianópolis',
  authors: [{ name: 'Saúde Livre Vacinas' }],
  generator: 'Next.js',
  applicationName: 'Saúde Livre Vacinas',
  referrer: 'origin-when-cross-origin',
  creator: 'Saúde Livre Florianópolis',
  publisher: 'Saúde Livre Vacinas',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://saudelivrefloripa.com.br'),

  // Canonical
  alternates: {
    canonical: 'https://saudelivrefloripa.com.br',
  },

  // PWA Manifest
  manifest: '/manifest.json',

  // iOS/Safari specific
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Saúde Livre Vacinas',
    startupImage: [
      {
        url: '/splash/splash-2048x2732.png',
        media: '(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      },
      {
        url: '/splash/splash-1668x2388.png',
        media: '(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      },
      {
        url: '/splash/splash-1536x2048.png',
        media: '(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      },
      {
        url: '/splash/splash-1242x2688.png',
        media: '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
      },
      {
        url: '/splash/splash-1125x2436.png',
        media: '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
      },
      {
        url: '/splash/splash-828x1792.png',
        media: '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      },
      {
        url: '/splash/splash-1242x2208.png',
        media: '(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
      },
      {
        url: '/splash/splash-750x1334.png',
        media: '(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      },
      {
        url: '/splash/splash-640x1136.png',
        media: '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      },
    ],
  },

  // Icons
  icons: {
    icon: [
      { url: '/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/icons/safari-pinned-tab.svg', color: '#0072a2' },
    ],
  },

  // Open Graph
  openGraph: {
    title: 'Saúde Livre Vacinas - Clínica de Vacinação em Florianópolis Centro',
    description: 'Clínica de vacinação em Florianópolis Centro. Vacinas para todas as idades com atendimento humanizado. Agende pelo WhatsApp.',
    url: 'https://saudelivrefloripa.com.br',
    siteName: 'Saúde Livre Vacinas',
    locale: 'pt_BR',
    type: 'website',
  },

  // Twitter
  twitter: {
    card: 'summary_large_image',
    title: 'Saúde Livre Vacinas - Clínica de Vacinação em Florianópolis',
    description: 'Clínica de vacinação em Florianópolis Centro. Vacinas para todas as idades com atendimento humanizado.',
  },

  // Robots
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
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['MedicalClinic', 'LocalBusiness'],
  '@id': 'https://saudelivrefloripa.com.br/#clinica',
  name: 'Saúde Livre Vacinas - Florianópolis Centro',
  alternateName: 'Saúde Livre Clínica de Vacinação',
  description: 'Clínica de vacinação em Florianópolis Centro com calendário vacinal completo. Vacinas para bebês, crianças, gestantes, adultos e idosos. Atendimento humanizado.',
  url: 'https://saudelivrefloripa.com.br',
  telephone: '+5548991895758',
  email: 'contato@saudelivrefloripa.com.br',
  image: 'https://saudelivrefloripa.com.br/hero-logo.png',
  logo: 'https://saudelivrefloripa.com.br/hero-logo.png',
  priceRange: '$$',
  currenciesAccepted: 'BRL',
  paymentAccepted: 'Dinheiro, Cartão de Crédito, Cartão de Débito, PIX',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Alameda Governador Heriberto Hulse, 123',
    addressLocality: 'Florianópolis',
    addressRegion: 'SC',
    postalCode: '88015-620',
    addressCountry: 'BR',
    areaServed: {
      '@type': 'City',
      name: 'Florianópolis',
    },
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -27.5954,
    longitude: -48.5480,
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:00',
    closes: '18:00',
  },
  medicalSpecialty: 'http://schema.org/Immunology',
  availableService: [
    { '@type': 'MedicalProcedure', name: 'Vacinação Infantil' },
    { '@type': 'MedicalProcedure', name: 'Vacinação para Adultos' },
    { '@type': 'MedicalProcedure', name: 'Vacinação para Gestantes' },
    { '@type': 'MedicalProcedure', name: 'Vacinação Ocupacional' },
    { '@type': 'MedicalProcedure', name: 'Vacinação para Viajantes' },
    { '@type': 'MedicalProcedure', name: 'Teste do Pezinho' },
    { '@type': 'MedicalProcedure', name: 'Soroterapia' },
  ],
  sameAs: [
    'https://www.instagram.com/saudelivre.com.br',
    'https://www.facebook.com/saudelivre.com.br',
  ],
  hasMap: 'https://www.google.com/maps/search/?api=1&query=Alameda+Gov.+Heriberto+Hulse,+123,+Centro,+Florianópolis',
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Quais vacinas estão disponíveis na Saúde Livre Florianópolis?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oferecemos o calendário vacinal completo da rede privada: vacinas para bebês, crianças, adolescentes, adultos, gestantes e idosos. Inclui vacinas contra dengue, gripe, HPV, meningite, febre amarela, herpes zóster e muito mais.',
      },
    },
    {
      '@type': 'Question',
      name: 'É necessário agendar a vacinação?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'O agendamento não é obrigatório, mas recomendamos para garantir atendimento imediato. Agende facilmente pelo WhatsApp: (48) 99189-5758.',
      },
    },
    {
      '@type': 'Question',
      name: 'Qual o horário de funcionamento da clínica?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Funcionamos de segunda a sexta-feira, das 08h às 18h. Estamos localizados na Alameda Gov. Heriberto Hulse, 123 - Centro, Florianópolis/SC.',
      },
    },
    {
      '@type': 'Question',
      name: 'A clínica atende crianças e bebês?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim! Temos ambiente acolhedor e lúdico para crianças, equipe especializada em vacinação pediátrica e técnicas de alívio da dor. Atendemos desde recém-nascidos.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quais formas de pagamento são aceitas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Aceitamos dinheiro, cartões de crédito e débito, e PIX.',
      },
    },
  ],
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={cabin.variable} suppressHydrationWarning>
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />

        {/* Additional iOS optimizations */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Saúde Livre Vacinas" />
        <meta name="mobile-web-app-capable" content="yes" />

        {/* Geo meta tags for local SEO */}
        <meta name="geo.region" content="BR-SC" />
        <meta name="geo.placename" content="Florianópolis" />
        <meta name="geo.position" content="-27.5954;-48.5480" />
        <meta name="ICBM" content="-27.5954, -48.5480" />

        {/* Disable auto-detection */}
        <meta name="format-detection" content="telephone=no" />

        {/* Microsoft tiles */}
        <meta name="msapplication-TileColor" content="#0072a2" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="//wa.me" />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MQQ7M24R"
height="0" width="0" style={{display:'none',visibility:'hidden'}}></iframe></noscript>

        {children}

        {/* Google Tag Manager - loaded after interactive */}
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MQQ7M24R');`}
        </Script>

        {/* Service Worker Registration */}
        <Script id="sw-register" strategy="afterInteractive">
          {`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js')
                  .then(function(registration) {
                    console.log('SW registered: ', registration.scope);
                  })
                  .catch(function(error) {
                    console.log('SW registration failed: ', error);
                  });
              });
            }
          `}
        </Script>

        {/* iOS viewport height fix */}
        <Script id="ios-vh-fix" strategy="afterInteractive">
          {`
            function setVH() {
              let vh = window.innerHeight * 0.01;
              document.documentElement.style.setProperty('--vh', vh + 'px');
            }
            setVH();
            window.addEventListener('resize', setVH);
            window.addEventListener('orientationchange', function() {
              setTimeout(setVH, 100);
            });
          `}
        </Script>
      </body>
    </html>
  )
}
