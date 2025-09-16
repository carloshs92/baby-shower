import type { Metadata } from 'next'
import './globals.css';

import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';

import { Toaster } from '@/components/ui/toaster';
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  title: 'Lista de Regalos de Emily 🐣🎀 | Baby Shower',
  description: 'Emily es nuestra princesa pequeña 🐣🎀, y esta es nuestra lista de regalos 🎁. Ayúdanos a preparar todo lo que necesita para su llegada.',
  authors: [{ name: 'Familia de Emily' }],
  creator: 'Familia de Emily',
  publisher: 'Baby Shower Emily',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://baby-shower-emily.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Lista de Regalos de Emily 🐣🎀 | Baby Shower',
    description: 'Emily es nuestra princesa pequeña 🐣🎀, y esta es nuestra lista de regalos 🎁. Ayúdanos a preparar todo lo que necesita para su llegada.',
    url: 'https://baby-shower-emily.vercel.app',
    siteName: 'Baby Shower Emily',
    images: [
      {
        url: '/family-ducks-rainbow.png',
        width: 1200,
        height: 630,
        alt: 'Emily - Nuestra princesa pequeña 🐣🎀',
      },
    ],
    locale: 'es_PE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lista de Regalos de Emily 🐣🎀 | Baby Shower',
    description: 'Emily es nuestra princesa pequeña 🐣🎀, y esta es nuestra lista de regalos 🎁. Ayúdanos a preparar todo lo que necesita para su llegada.',
    images: ['/family-ducks-rainbow.png'],
    creator: '@baby_shower_emily',

  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
        <meta name="theme-color" content="#7c3aed" />
        <meta name="msapplication-TileColor" content="#7c3aed" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Baby Shower Emily" />
        
        {/* Favicon */}
        <link rel="icon" href="/baby-duck-icon.png" />
        <link rel="apple-touch-icon" href="/baby-duck-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* WhatsApp específico */}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        
        {/* Schema.org para mejor SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Event",
              "name": "Baby Shower de Emily",
              "description": "Lista de regalos para el baby shower de Emily, nuestra princesa pequeña",
              "startDate": "2024-12-01",
              "eventStatus": "https://schema.org/EventScheduled",
              "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
              "location": {
                "@type": "VirtualLocation",
                "url": "https://baby-shower-emily.vercel.app"
              },
              "organizer": {
                "@type": "Person",
                "name": "Familia de Emily"
              },
              "image": "https://baby-shower-emily.vercel.app/family-ducks-rainbow.png"
            })
          }}
        />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
