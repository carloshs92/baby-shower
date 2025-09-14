import { Baby } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string
}

export function LoadingSpinner({ message = "Cargando..." }: LoadingSpinnerProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <Baby className="h-12 w-12 text-primary mx-auto mb-4 animate-pulse" />
        <p className="text-muted-foreground">{message}</p>
      </div>
    </div>
  )
}
