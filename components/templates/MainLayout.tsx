import { ReactNode } from 'react';

import { Footer } from '@/components/organisms/Footer';
import { Header } from '@/components/organisms/Header';

interface MainLayoutProps {
  children: ReactNode
  showUserBar?: boolean
  userBar?: ReactNode
}

export function MainLayout({ children, showUserBar = false, userBar }: MainLayoutProps) {
  return (
    <div
      className="min-h-screen relative"
      style={{ 
        background: "linear-gradient(135deg, #fef7ff 0%, #e0f2fe 50%, #fef3c7 100%)",
        display: "grid",
        gridTemplateRows: "120px auto max-content"
      }}
    >
      {showUserBar && userBar}
      <Header />
      <main className="container mx-auto px-4 py-4">
        {children}
      </main>
      <Footer />
    </div>
  )
}
