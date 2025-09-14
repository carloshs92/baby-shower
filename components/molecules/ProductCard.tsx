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
}

interface UserSelection {
  id: string
  product_id: string
  user_email: string
  user_name: string
  created_at: string
}

interface ProductCardProps {
  product: Product
  reservation?: UserSelection
  isReservedByUser: boolean
  isReserved: boolean
  onAddToWishlist: (productId: string) => void
  onRemoveFromWishlist: (productId: string) => void
}

export function ProductCard({
  product,
  reservation,
  isReservedByUser,
  isReserved,
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
        <ProductImage src={product.image_url} alt={product.title} />
        {isReserved && <ReservationBadge />}
      </div>

      <CardHeader className="pb-3">
        <CardTitle className="text-lg leading-tight text-gray-700">{product.title}</CardTitle>
      </CardHeader>

      <CardContent className="pt-0">
        {reservation && <ReservationInfo userName={reservation.user_name} />}

        <ProductActions
          isReservedByUser={isReservedByUser}
          isReserved={isReserved}
          productId={product.id}
          productLink={product.link}
          onAddToWishlist={onAddToWishlist}
          onRemoveFromWishlist={onRemoveFromWishlist}
        />
      </CardContent>
    </Card>
  )
}
