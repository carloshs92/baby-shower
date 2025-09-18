import { useState } from 'react';

import { AnimatedElement } from '@/components/atoms/AnimatedElement';
import { ProductCard } from '@/components/molecules/ProductCard';
import { ProductFilter } from '@/components/molecules/ProductFilter';
import { WelcomeModal } from '@/components/molecules/WelcomeModal';

interface Product {
  id: string
  title: string
  link: string
  image_url: string
  quantity: number
}

interface UserSelection {
  id: string
  product_id: string
  user_email: string
  user_name: string
  created_at: string
}

interface ProductGridProps {
  readonly products: Product[]
  readonly userSelections: UserSelection[]
  readonly userEmail: string
  readonly onAddToWishlist: (productId: string) => void
  readonly onRemoveFromWishlist: (productId: string) => void
}

export function ProductGrid({ 
  products, 
  userSelections, 
  userEmail, 
  onAddToWishlist, 
  onRemoveFromWishlist 
}: ProductGridProps) {
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);
  const [showOnlyUserSelections, setShowOnlyUserSelections] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);

  const getUsersForProduct = (productId: string) => {
    return userSelections.filter((item) => item.product_id === productId)
  }

  const isProductReservedByUser = (productId: string) => {
    const reservations = getUsersForProduct(productId)
    return reservations.some(reservation => reservation.user_email === userEmail)
  }

  const isProductReserved = (productId: string) => {
    const reservations = getUsersForProduct(productId)
    return reservations.length > 0
  }

  const isProductFullyReserved = (productId: string) => {
    const product = products.find(p => p.id === productId)
    const reservations = getUsersForProduct(productId)
    return product ? reservations.length >= product.quantity : false
  }

  const getAvailableQuantity = (productId: string) => {
    const product = products.find(p => p.id === productId)
    const reservations = getUsersForProduct(productId)
    return product ? product.quantity - reservations.length : 0
  }

  // Filtrar productos según el estado del filtro
  const filteredProducts = showOnlyAvailable 
    ? products.filter(product => !isProductFullyReserved(product.id))
    : showOnlyUserSelections
    ? products.filter(product => isProductReservedByUser(product.id))
    : products;

  const availableCount = products.filter(product => !isProductFullyReserved(product.id)).length;
  const userSelectionsCount = products.filter(product => isProductReservedByUser(product.id)).length;
  const totalCount = products.length;

  const handleToggleFilter = () => {
    if (showOnlyAvailable) {
      // Si está activo, desactivarlo (mostrar todos)
      setShowOnlyAvailable(false);
    } else {
      // Si no está activo, activarlo y desactivar el otro filtro
      setShowOnlyAvailable(true);
      setShowOnlyUserSelections(false);
    }
  };

  const handleToggleUserSelections = () => {
    if (showOnlyUserSelections) {
      // Si está activo, desactivarlo (mostrar todos)
      setShowOnlyUserSelections(false);
    } else {
      // Si no está activo, activarlo y desactivar el otro filtro
      setShowOnlyUserSelections(true);
      setShowOnlyAvailable(false);
    }
  };

  const handleCloseWelcomeModal = () => {
    setShowWelcomeModal(false);
  };

  const handleShowAvailable = () => {
    setShowOnlyAvailable(true);
    setShowOnlyUserSelections(false);
  };

  return (
    <>
      <AnimatedElement animation="fadeInUp" delay={100}>
        <div className="text-center mb-8">
          <p className="text-gray-600">
            Gracias por acompañarnos en esta etapa tan especial. Si deseas sorprender a nuestra pequeña Emily 🎀🐣
            con un detalle, aquí te dejamos algunas ideas que nos serán de gran ayuda para su llegada.
          </p>
          <br />
          <i className="text-gray-600 font-bold text-lg">Elige un regalo haciendo clic en "Elegir para Emily"</i>
        </div>
      </AnimatedElement>

      <AnimatedElement animation="fadeInUp" delay={150}>
        <ProductFilter
          showOnlyAvailable={showOnlyAvailable}
          showOnlyUserSelections={showOnlyUserSelections}
          onToggleFilter={handleToggleFilter}
          onToggleUserSelections={handleToggleUserSelections}
          availableCount={availableCount}
          userSelectionsCount={userSelectionsCount}
          totalCount={totalCount}
        />
      </AnimatedElement>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3">
          {filteredProducts.map((product, index) => {
            const reservations = getUsersForProduct(product.id)
            const isReservedByUser = isProductReservedByUser(product.id)
            const isReserved = isProductReserved(product.id)
            const isFullyReserved = isProductFullyReserved(product.id)
            const availableQuantity = getAvailableQuantity(product.id)

            const animation = index % 3 === 0 ? 'fadeInLeft' : index % 3 === 1 ? 'fadeInUp' : 'fadeInRight';
            const delay = (index % 4) * 100;

            return (
              <AnimatedElement key={product.id} animation={animation} delay={delay}>
                <ProductCard
                  product={product}
                  reservations={reservations}
                  isReservedByUser={isReservedByUser}
                  isReserved={isReserved}
                  isFullyReserved={isFullyReserved}
                  availableQuantity={availableQuantity}
                  currentUserEmail={userEmail}
                  onAddToWishlist={onAddToWishlist}
                  onRemoveFromWishlist={onRemoveFromWishlist}
                />
              </AnimatedElement>
            )
          })}
        </div>
      ) : (
        <AnimatedElement animation="fadeInUp" delay={100}>
          <div className="text-center py-12">
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🎁</span>
            </div>
            {showOnlyUserSelections ? (
              <>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  ¡Aún no has elegido ningún regalo!
                </h3>
                <p className="text-gray-600 mb-4">
                  Explora nuestra lista de regalos y elige algo especial para Emily.
                </p>
                <button
                  onClick={handleShowAvailable}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
                >
                  Ver regalos disponibles
                </button>
              </>
            ) : (
              <>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  ¡Todos los regalos han sido elegidos!
                </h3>
                <p className="text-gray-600">
                  Gracias por tu generosidad. Todos los regalos de la lista ya han sido elegidos para Emily.
                </p>
              </>
            )}
          </div>
        </AnimatedElement>
      )}
      
      <AnimatedElement animation="fadeInUp" delay={200}>
        <p className="text-gray-600 mt-6 px-6 py-4 rounded-md bg-pink-100 text-center text-lg shadow-sm shadow-pink-200">
          Si pensaste en otro regalito para Emily 🐣🎀 que no esté en la lista (y que no sea mecedora, bañera o biberones ) 🐥✨, no te preocupes, todo será recibido con mucho amor 💕🫶. 
          <br/> Los pañales desde la talla P en adelante y la ropita a partir de 3M siempre serán de gran ayuda ☺️💕.
        </p>
      </AnimatedElement>

      {/* Modal de bienvenida */}
      <WelcomeModal 
        isOpen={showWelcomeModal} 
        onClose={handleCloseWelcomeModal} 
      />
    </>
  )
}
