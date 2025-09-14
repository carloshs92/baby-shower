import { ReactNode } from 'react';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

interface AnimatedElementProps {
  children: ReactNode;
  animation?: 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'fadeIn' | 'scaleIn';
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
}

export function AnimatedElement({
  children,
  animation = 'fadeInUp',
  delay = 0,
  duration = 600,
  className,
  threshold = 0.1
}: AnimatedElementProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold });

  const animationClasses = {
    fadeInUp: 'translate-y-8 opacity-0',
    fadeInLeft: '-translate-x-8 opacity-0',
    fadeInRight: 'translate-x-8 opacity-0',
    fadeIn: 'opacity-0',
    scaleIn: 'scale-95 opacity-0'
  };

  const visibleClasses = {
    fadeInUp: 'translate-y-0 opacity-100',
    fadeInLeft: 'translate-x-0 opacity-100',
    fadeInRight: 'translate-x-0 opacity-100',
    fadeIn: 'opacity-100',
    scaleIn: 'scale-100 opacity-100'
  };

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all ease-out',
        isVisible ? visibleClasses[animation] : animationClasses[animation],
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
}
