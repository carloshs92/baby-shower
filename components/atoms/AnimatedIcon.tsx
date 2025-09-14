import { LucideIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

interface AnimatedIconProps {
  icon: LucideIcon
  className?: string
  animation?: "bounce" | "pulse" | "float"
  delay?: string
}

export function AnimatedIcon({ 
  icon: Icon, 
  className, 
  animation = "bounce",
  delay = "0s" 
}: AnimatedIconProps) {
  const animationClasses = {
    bounce: "animate-bounce",
    pulse: "animate-pulse", 
    float: "animate-float"
  }

  return (
    <Icon 
      className={cn(
        animationClasses[animation],
        className
      )}
      style={{ animationDelay: delay }}
    />
  )
}
