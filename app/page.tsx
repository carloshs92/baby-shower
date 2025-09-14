"use client"

import { LoadingSpinner } from '@/components/atoms/LoadingSpinner';
import { LoginForm } from '@/components/molecules/LoginForm';
import { UserBar } from '@/components/molecules/UserBar';
import { ProductGrid } from '@/components/organisms/ProductGrid';
import { MainLayout } from '@/components/templates/MainLayout';
import { useAuth } from '@/hooks/useAuth';
import { useWishlist } from '@/hooks/useWishlist';
import { HARDCODED_PRODUCTS } from '@/lib/constants';

export default function BabyShowerWishlist() {
  const { userEmail, userName, isLoggedIn, login, logout } = useAuth()
  const { userSelections, loading, addToWishlist, removeFromWishlist } = useWishlist()

  const handleLogin = (email: string, name: string) => {
    login(email, name)
  }

  const handleAddToWishlist = (productId: string) => {
    addToWishlist(productId, userEmail, userName)
  }

  const handleRemoveFromWishlist = (productId: string) => {
    removeFromWishlist(productId, userEmail)
  }

  if (loading) {
    return <LoadingSpinner message="Cargando reservas..." />
  }

  return (
    <MainLayout
      showUserBar={isLoggedIn}
      userBar={<UserBar userName={userName} onLogout={logout} />}
    >
      {!isLoggedIn ? (
        <LoginForm onSubmit={handleLogin} />
      ) : (
        <ProductGrid
          products={HARDCODED_PRODUCTS}
          userSelections={userSelections}
          userEmail={userEmail}
          onAddToWishlist={handleAddToWishlist}
          onRemoveFromWishlist={handleRemoveFromWishlist}
        />
      )}
    </MainLayout>
  )
}
