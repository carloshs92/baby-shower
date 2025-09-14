import { ProductCard } from '@/components/molecules/ProductCard';

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

  return (
    <>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-700 mb-2">Lista de Regalos</h2>
        <p className="text-gray-600">
          Gracias por acompañarnos en esta etapa tan especial. Si deseas sorprender a nuestra pequeña Emily 🎀🐣
          con un detalle, aquí te dejamos algunas ideas que nos serán de gran ayuda para su llegada.
        </p>
        <br />
        <i className="text-gray-600">Reserva haciendo clic en "Reservar regalo"</i>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => {
          const reservation = getUserForProduct(product.id)
          const isReservedByUser = isProductReservedByUser(product.id)
          const isReserved = isProductReserved(product.id)

          return (
            <ProductCard
              key={product.id}
              product={product}
              reservation={reservation}
              isReservedByUser={isReservedByUser}
              isReserved={isReserved}
              onAddToWishlist={onAddToWishlist}
              onRemoveFromWishlist={onRemoveFromWishlist}
            />
          )
        })}
      </div>
      
      <p className="text-gray-600 mt-6 p-4 rounded-md bg-pink-100 text-center text-lg shadow-sm shadow-pink-200">
        Si pensaste en otro regalito para Emily 🐣🎀 que no esté en la lista (y que no sea mecedora o bañera)
        🐥✨, no te preocupes, todo será recibido con mucho amor 💕🫶. Y si son pañales desde la talla P en
        adelante, ¡serán de gran ayuda! 💕🍼💛
      </p>
    </>
  )
}
