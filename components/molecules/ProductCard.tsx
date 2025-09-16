import { ProductImage } from '@/components/atoms/ProductImage';
import { ReservationBadge } from '@/components/atoms/ReservationBadge';
import { ProductActions } from '@/components/molecules/ProductActions';
import { ReservationInfo } from '@/components/molecules/ReservationInfo';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

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

interface ProductCardProps {
  readonly product: Product
  readonly reservations?: UserSelection[]
  readonly isReservedByUser: boolean
  readonly isReserved: boolean
  readonly isFullyReserved: boolean
  readonly availableQuantity: number
  readonly onAddToWishlist: (productId: string) => void
  readonly onRemoveFromWishlist: (productId: string) => void
}

export function ProductCard({
  product,
  reservations = [],
  isReservedByUser,
  isReserved,
  isFullyReserved,
  availableQuantity,
  onAddToWishlist,
  onRemoveFromWishlist
}: ProductCardProps) {
  return (
    <Card
      className={cn(
        "overflow-hidden pt-0 transition-all duration-300 bg-white/90 backdrop-blur-sm",
        isReserved ? "border-yellow-200 shadow-yellow-100" : "border-purple-100 hover:border-purple-200"
      )}
    >
      <div className="relative overflow-hidden">
        <ProductImage src={product.image_url} alt={product.title} className="h-32" />
        {isReserved && <ReservationBadge reservations={reservations} totalQuantity={product.quantity} />}
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-sm leading-tight text-gray-700">{product.title}</CardTitle>
      </CardHeader>

      <CardContent className="pt-0">
        {reservations.length > 0 && (
          <ReservationInfo 
            reservations={reservations} 
            totalQuantity={product.quantity}
            availableQuantity={availableQuantity}
          />
        )}

        <ProductActions
          isReservedByUser={isReservedByUser}
          isFullyReserved={isFullyReserved}
          productId={product.id}
          productLink={product.link}
          onAddToWishlist={onAddToWishlist}
          onRemoveFromWishlist={onRemoveFromWishlist}
        />
      </CardContent>
    </Card>
  )
}
