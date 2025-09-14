import { AnimatedElement } from '@/components/atoms/AnimatedElement';

export function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-pink-100 shadow-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center gap-1">
          <AnimatedElement animation="fadeInLeft" delay={0}>
            <img
              src="/baby-duck-icon.png"
              alt="Patito bebé"
              className="h-20 w-20 object-contain animate-bounce"
              style={{
                animation: "float 3s ease-in-out infinite",
                animationDelay: "0s",
              }}
            />
          </AnimatedElement>
          <AnimatedElement animation="fadeInUp" delay={200}>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent text-center">
                Lista de regalos de Emily
              </h1>
            </div>
          </AnimatedElement>
          <AnimatedElement animation="fadeInRight" delay={400}>
            <img
              src="/baby-duck-egg.png"
              alt="Patito con huevo"
              className="h-20 w-20 object-contain"
              style={{
                animation: "float 3s ease-in-out infinite",
                animationDelay: "1.5s",
              }}
            />
          </AnimatedElement>
        </div>
      </div>
    </header>
  )
}
