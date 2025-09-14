import { Gift } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white/80 backdrop-blur-sm border-t border-pink-100 mt-16">
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Gift className="h-5 w-5 text-purple-600" />
          <span className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Baby Shower de Emily
          </span>
        </div>
        <p className="text-gray-600 text-md">
          Sus papitos Carlos & Schadya agradecemos de corazón cada muestra de cariño a nuestra amada princesita
          🐣🎀🫶💕, los queremos mucho ☺️
        </p>
        <div className="flex justify-center">
          <img
            src="/family-ducks-rainbow.png"
            alt="Familia de patitos con arcoíris"
            className="h-60 w-auto object-contain relative -top-8"
          />
        </div>
      </div>
    </footer>
  )
}
