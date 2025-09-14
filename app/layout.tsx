import type { Metadata } from 'next'
import './globals.css';

import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';

import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  title: 'Lista de Regalos de Emily',
  description: 'Emily es nuestra princesa pequeña 🐣🎀, y esta es nuestra lista de regalos 🎁',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
