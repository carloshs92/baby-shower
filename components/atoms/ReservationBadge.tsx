import { Crown } from 'lucide-react';

interface UserSelection {
  id: string
  product_id: string
  user_email: string
  user_name: string
  created_at: string
}

interface ReservationBadgeProps {
  readonly reservations?: UserSelection[]
  readonly totalQuantity?: number
}

export function ReservationBadge({ reservations = [], totalQuantity = 1 }: ReservationBadgeProps) {
  const reservedCount = reservations.length;
  
  return (
    <div className="absolute top-1 right-1 bg-white rounded-sm p-1 shadow-sm">
      <div className="flex items-center gap-1">
        <Crown className="h-4 w-4 text-yellow-500 drop-shadow-lg" />
        {totalQuantity > 1 && (
          <span className="text-xs font-semibold text-gray-700">
            {reservedCount}/{totalQuantity}
          </span>
        )}
      </div>
    </div>
  )
}
