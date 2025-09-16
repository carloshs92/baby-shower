interface UserSelection {
  id: string
  product_id: string
  user_email: string
  user_name: string
  created_at: string
}

interface ReservationInfoProps {
  readonly reservations: UserSelection[]
  readonly totalQuantity: number
  readonly availableQuantity: number
}

export function ReservationInfo({ reservations, totalQuantity, availableQuantity }: ReservationInfoProps) {
  const reservedCount = reservations.length;
  const isFullyReserved = reservedCount >= totalQuantity;
  
  return (
    <div className="mb-2 p-2 bg-gradient-to-r from-yellow-50 to-yellow-50 rounded-lg border border-yellow-200">
      <div className="flex justify-between items-center mb-1">
        <p className="text-xs text-yellow-600">
          {isFullyReserved ? 'Elegido para Emily' : `Elegido (${reservedCount}/${totalQuantity})`}
        </p>
        {availableQuantity > 0 && (
          <p className="text-xs text-green-600 font-medium">
            {availableQuantity} disponible{availableQuantity > 1 ? 's' : ''}
          </p>
        )}
      </div>
      
      {reservations.length > 0 && (
        <div className="space-y-1">
          {reservations.map((reservation, index) => (
            <p key={reservation.id} className="text-sm font-bold text-yellow-700">
              {reservation.user_name}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}
