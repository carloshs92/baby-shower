interface ReservationInfoProps {
  userName: string
}

export function ReservationInfo({ userName }: ReservationInfoProps) {
  return (
    <div className="mb-2 p-2 bg-gradient-to-r from-yellow-50 to-yellow-50 rounded-lg border border-yellow-200">
      <p className="text-xs text-yellow-600 mb-1">Reservado por:</p>
      <p className="text-sm font-bold text-yellow-700">{userName}</p>
    </div>
  )
}
