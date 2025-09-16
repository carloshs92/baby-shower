import { cn } from '@/lib/utils';

interface ProductImageProps {
  src: string
  alt: string
  className?: string
}

export function ProductImage({ src, alt, className }: ProductImageProps) {
  return (
    <img
      src={src || "/placeholder.svg"}
      alt={alt}
      
      className={cn("w-full h-48 object-cover", className)}
    />
  )
}
