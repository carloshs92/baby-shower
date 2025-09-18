import { Baby, Gift, Heart, ShoppingBag } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle
} from '@/components/ui/dialog';

interface WelcomeModalProps {
  readonly isOpen: boolean
  readonly onClose: () => void
}

export function WelcomeModal({ isOpen, onClose }: WelcomeModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold text-purple-700 flex items-center justify-center gap-2">
            ✨ Recuerda ✨
          </DialogTitle>
          <DialogDescription className="text-gray-700 text-base leading-relaxed pt-4">
            <div className="space-y-4">
              <p className="flex items-start gap-2">
                <Gift className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <span>
                  Al hacer clic en el botón <strong>"Elegir para Emily 🎁"</strong> solo estarás reservando el regalo para que nadie más lo repita 💝.
                </span>
              </p>
              
              <p className="flex items-start gap-2">
                <ShoppingBag className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <span>
                  El obsequio podrás adquirirlo por tu cuenta, ya sea en el link de referencia o en la tienda de tu preferencia 🛍️, y entregarlo con mucho cariño el día del Baby Shower de Emily 🐣🎀💕.
                </span>
              </p>
              
              <p className="flex items-start gap-2">
                <Heart className="h-5 w-5 text-pink-600 mt-0.5 flex-shrink-0" />
                <span>
                  ¡Gracias por tu cariño y por acompañarnos en este momento tan especial! 💕🫶
                </span>
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>
        
        <DialogFooter className="justify-center pt-6">
          <Button
            onClick={onClose}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-2 rounded-lg shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 mx-auto"
          >
            <Baby className="h-4 w-4 mr-2" />
            Entendido
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
