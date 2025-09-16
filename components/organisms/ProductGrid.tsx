import { useState } from 'react';

import { AnimatedElement } from '@/components/atoms/AnimatedElement';
import { ProductCard } from '@/components/molecules/ProductCard';
import { ProductFilter } from '@/components/molecules/ProductFilter';

interface Product {
  id: string
  title: string
  link: string
  image_url: string
}

interface UserSelection {
  id: string
  product_id: string
  user_email: string
  user_name: string
  created_at: string
}

interface ProductGridProps {
  products: Product[]
  userSelections: UserSelection[]
  userEmail: string
  onAddToWishlist: (productId: string) => void
  onRemoveFromWishlist: (productId: string) => void
}

export function ProductGrid({ 
  products, 
  userSelections, 
  userEmail, 
  onAddToWishlist, 
  onRemoveFromWishlist 
}: ProductGridProps) {
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);

  const getUserForProduct = (productId: string) => {
    return userSelections.find((item) => item.product_id === productId)
  }

  const isProductReservedByUser = (productId: string) => {
    const reservation = getUserForProduct(productId)
    return reservation?.user_email === userEmail
  }

  const isProductReserved = (productId: string) => {
    return getUserForProduct(productId) !== undefined
  }

  // Filtrar productos según el estado del filtro
  const filteredProducts = showOnlyAvailable 
    ? products.filter(product => !isProductReserved(product.id))
    : products;

  const availableCount = products.filter(product => !isProductReserved(product.id)).length;
  const totalCount = products.length;

  const handleToggleFilter = () => {
    setShowOnlyAvailable(!showOnlyAvailable);
  };

  return (
    <>
      <AnimatedElement animation="fadeInUp" delay={100}>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-700 mb-2">Lista de Regalos</h2>
          <p className="text-gray-600">
            Gracias por acompañarnos en esta etapa tan especial. Si deseas sorprender a nuestra pequeña Emily 🎀🐣
            con un detalle, aquí te dejamos algunas ideas que nos serán de gran ayuda para su llegada.
          </p>
          <br />
          <i className="text-gray-600">Reserva haciendo clic en "Reservar regalo"</i>
        </div>
      </AnimatedElement>

      <AnimatedElement animation="fadeInUp" delay={150}>
        <ProductFilter
          showOnlyAvailable={showOnlyAvailable}
          onToggleFilter={handleToggleFilter}
          availableCount={availableCount}
          totalCount={totalCount}
        />
      </AnimatedElement>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3">
          {filteredProducts.map((product, index) => {
            const reservation = getUserForProduct(product.id)
            const isReservedByUser = isProductReservedByUser(product.id)
            const isReserved = isProductReserved(product.id)

            const animation = index % 3 === 0 ? 'fadeInLeft' : index % 3 === 1 ? 'fadeInUp' : 'fadeInRight';
            const delay = (index % 4) * 100;

            return (
              <AnimatedElement key={product.id} animation={animation} delay={delay}>
                <ProductCard
                  product={product}
                  reservation={reservation}
                  isReservedByUser={isReservedByUser}
                  isReserved={isReserved}
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
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              ¡Todos los regalos han sido reservados!
            </h3>
            <p className="text-gray-600">
              Gracias por tu generosidad. Todos los regalos de la lista ya han sido reservados.
            </p>
          </div>
        </AnimatedElement>
      )}
      
      <AnimatedElement animation="fadeInUp" delay={200}>
        <p className="text-gray-600 mt-6 px-6 py-4 rounded-md bg-pink-100 text-center text-lg shadow-sm shadow-pink-200">
          Si pensaste en otro regalito para Emily 🐣🎀 que no esté en la lista (y que no sea mecedora, bañera o biberones ) 🐥✨, no te preocupes, todo será recibido con mucho amor 💕🫶. 
          <br/> Los pañales desde la talla P en adelante y la ropita a partir de 3M siempre serán de gran ayuda ☺️💕.
        </p>
      </AnimatedElement>
    </>
  )
}
