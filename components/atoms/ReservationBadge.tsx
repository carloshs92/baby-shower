import { Crown } from 'lucide-react';

export function ReservationBadge() {
  return (
    <div className="absolute top-1 right-1 bg-white rounded-sm p-1">
      <Crown className="h-4 w-4 text-yellow-500 drop-shadow-lg" />
    </div>
  )
}
