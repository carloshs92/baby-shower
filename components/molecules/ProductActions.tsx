import { Crown, ExternalLink, UserMinus, UserPlus } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface ProductActionsProps {
  isReservedByUser: boolean
  isReserved: boolean
  productId: string
  productLink: string
  onAddToWishlist: (productId: string) => void
  onRemoveFromWishlist: (productId: string) => void
}

export function ProductActions({
  isReservedByUser,
  isReserved,
  productId,
  productLink,
  onAddToWishlist,
  onRemoveFromWishlist
}: ProductActionsProps) {
  return (
    <div className="flex flex-col gap-2">
      {isReservedByUser ? (
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onRemoveFromWishlist(productId)}
          className="w-full"
        >
          <UserMinus className="h-4 w-4 mr-2" />
          Cancelar Reserva
        </Button>
      ) : !isReserved ? (
        <Button
          onClick={() => onAddToWishlist(productId)}
          size="sm"
          className="w-full text-white font-semibold shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
          style={{
            backgroundColor: "#7c3aed",
            border: "none",
            color: "white",
          }}
          data-product-id={productId}
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Reservar regalo
        </Button>
      ) : (
        <Button disabled size="sm" className="w-full bg-gray-300 text-gray-500 cursor-not-allowed">
          <Crown className="h-4 w-4 mr-2" />
          Ya Reservado
        </Button>
      )}

      <Button
        variant="outline"
        size="sm"
        asChild
        className="w-full border-blue-200 hover:bg-blue-50 bg-transparent hover:text-black"
      >
        <a href={productLink} target="_blank" rel="noopener noreferrer">
          <ExternalLink className="h-4 w-4 mr-2" />
          Ver regalo
        </a>
      </Button>
    </div>
  )
}
