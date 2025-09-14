import { useEffect, useState } from 'react';

import { useToast } from '@/hooks/use-toast';

interface UserSelection {
  id: string
  product_id: string
  user_email: string
  user_name: string
  created_at: string
}

export function useWishlist() {
  const [userSelections, setUserSelections] = useState<UserSelection[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  const loadUserSelections = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/user-selections")
      if (response.ok) {
        const data = await response.json()
        setUserSelections(data)
      }
    } catch (error) {
      console.error("Error loading user selections:", error)
      toast({
        title: "Error",
        description: "No se pudieron cargar las reservas",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const addToWishlist = async (productId: string, userEmail: string, userName: string) => {
    try {
      const button = document.querySelector(`[data-product-id="${productId}"]`) as HTMLElement
      if (button) {
        button.classList.add("animate-pulse", "scale-95")
        setTimeout(() => {
          button.classList.remove("animate-pulse", "scale-95")
        }, 300)
      }

      const response = await fetch("/api/user-selections", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id: productId,
          user_email: userEmail,
          user_name: userName,
        }),
      })

      if (response.status === 409) {
        const errorData = await response.json()
        toast({
          title: "Regalo no disponible",
          description: errorData.error,
          variant: "destructive",
        })
        return
      }

      if (!response.ok) {
        throw new Error("Failed to add to wishlist")
      }

      await loadUserSelections()

      toast({
        title: "¡Reservado!",
        description: "Regalo reservado exitosamente",
      })
    } catch (error) {
      console.error("Error adding to wishlist:", error)
      toast({
        title: "Error",
        description: "No se pudo reservar el regalo",
        variant: "destructive",
      })
    }
  }

  const removeFromWishlist = async (productId: string, userEmail: string) => {
    try {
      const response = await fetch(`/api/user-selections?product_id=${productId}&user_email=${userEmail}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to remove from wishlist")
      }

      await loadUserSelections()

      toast({
        title: "Reserva Cancelada",
        description: "Regalo cancelado de tu lista",
      })
    } catch (error) {
      console.error("Error removing from wishlist:", error)
      toast({
        title: "Error",
        description: "No se pudo cancelar la reserva",
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    loadUserSelections()
  }, [])

  return {
    userSelections,
    loading,
    addToWishlist,
    removeFromWishlist,
    loadUserSelections
  }
}
