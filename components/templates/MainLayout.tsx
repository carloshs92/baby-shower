import { ReactNode } from 'react';

import { Footer } from '@/components/organisms/Footer';
import { Header } from '@/components/organisms/Header';

interface MainLayoutProps {
  children: ReactNode
  showUserBar?: boolean
  userBar?: ReactNode
}

export function MainLayout({ children, showUserBar = false, userBar }: MainLayoutProps) {
  const gridTemplateRows = showUserBar 
    ? "min-content 120px auto max-content"
    : "120px auto max-content";     

  return (
    <div
      className="min-h-screen relative"
      style={{ 
        background: "linear-gradient(135deg, #fef7ff 0%, #e0f2fe 50%, #fef3c7 100%)",
        display: "grid",
        gridTemplateRows
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
