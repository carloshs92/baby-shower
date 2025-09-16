import { Crown, ExternalLink, UserMinus, UserPlus } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface ProductActionsProps {
  readonly isReservedByUser: boolean
  readonly isFullyReserved: boolean
  readonly productId: string
  readonly productLink: string
  readonly onAddToWishlist: (productId: string) => void
  readonly onRemoveFromWishlist: (productId: string) => void
}

export function ProductActions({
  isReservedByUser,
  isFullyReserved,
  productId,
  productLink,
  onAddToWishlist,
  onRemoveFromWishlist
}: ProductActionsProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {isReservedByUser ? (
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onRemoveFromWishlist(productId)}
          className="w-full text-xs h-8"
        >
          <UserMinus className="h-3 w-3 mr-1" />
          Elegir otro regalo
        </Button>
      ) : !isFullyReserved ? (
        <Button
          onClick={() => onAddToWishlist(productId)}
          size="sm"
          className="w-full text-white font-semibold shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 text-xs h-8"
          style={{
            backgroundColor: "#7c3aed",
            border: "none",
            color: "white",
          }}
          data-product-id={productId}
        >
          <UserPlus className="h-3 w-3 mr-1" />
          Elegir para Emily
        </Button>
      ) : (
        <Button disabled size="sm" className="w-full bg-gray-300 text-gray-500 cursor-not-allowed text-xs h-8">
          <Crown className="h-3 w-3 mr-1" />
          Ya elegido
        </Button>
      )}

      <Button
        variant="outline"
        size="sm"
        asChild
        className="w-full border-blue-200 hover:bg-blue-50 bg-transparent hover:text-black text-xs h-8"
      >
        <a href={productLink} target="_blank" rel="noopener noreferrer">
          <ExternalLink className="h-3 w-3 mr-1" />
          Ver regalo
        </a>
      </Button>
    </div>
  )
}
