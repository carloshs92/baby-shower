import { Button } from '@/components/ui/button';

interface UserBarProps {
  userName: string
  onLogout: () => void
}

export function UserBar({ userName, onLogout }: UserBarProps) {
  return (
    <div className="bg-gradient-to-r from-purple-100/80 to-pink-100/80 backdrop-blur-sm border-b border-purple-200/50">
      <div className="container mx-auto px-4 py-1.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-purple-700">
              Conectad@ como: <span className="font-semibold">{userName}</span>
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onLogout}
            className="text-purple-700 hover:bg-pink-400 hover:text-white text-xs px-3 py-1 h-auto transition-colors duration-200"
          >
            Cerrar Sesión
          </Button>
        </div>
      </div>
    </div>
  )
}
