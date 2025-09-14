import { Crown } from 'lucide-react';

export function ReservationBadge() {
  return (
    <div className="absolute top-2 right-2 bg-white rounded-sm p-2">
      <Crown className="h-6 w-6 text-yellow-500 drop-shadow-lg" />
    </div>
  )
}
