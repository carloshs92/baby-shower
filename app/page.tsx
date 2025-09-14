"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Heart, Baby, Gift, ExternalLink, Mail, UserPlus, UserMinus, Crown } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const HARDCODED_PRODUCTS = [
  {
    id: "crib",
    title: "Cuna Convertible de Madera",
    link: "https://example.com/crib",
    image_url: "/wooden-convertible-baby-crib.jpg",
  },
  {
    id: "stroller",
    title: "Sistema de Cochecito 3 en 1",
    link: "https://example.com/stroller",
    image_url: "/3-in-1-baby-stroller-system.jpg",
  },
  {
    id: "monitor",
    title: "Monitor de Video para Bebé",
    link: "https://example.com/monitor",
    image_url: "/baby-video-monitor-with-camera.jpg",
  },
  {
    id: "clothes",
    title: "Set de Ropa para Recién Nacido",
    link: "https://example.com/clothes",
    image_url: "/baby-clothes-set-newborn.jpg",
  },
  {
    id: "bathtub",
    title: "Bañera para Bebé con Soporte",
    link: "https://example.com/bathtub",
    image_url: "/baby-bathtub-with-stand.jpg",
  },
  {
    id: "toys",
    title: "Juguetes Sensoriales Educativos",
    link: "https://example.com/toys",
    image_url: "/baby-sensory-toys-educational.jpg",
  },
  {
    id: "changing-table",
    title: "Mesa de Cambio con Almacenamiento",
    link: "https://example.com/changing-table",
    image_url: "/baby-changing-table-with-storage.jpg",
  },
  {
    id: "humidifier",
    title: "Humidificador con Luz Nocturna",
    link: "https://example.com/humidifier",
    image_url: "/baby-room-humidifier-with-night-light.jpg",
  },
]

interface UserSelection {
  id: string
  product_id: string
  user_email: string
  user_name: string
  created_at: string
}

export default function BabyShowerWishlist() {
  const [userEmail, setUserEmail] = useState("")
  const [userName, setUserName] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userSelections, setUserSelections] = useState<UserSelection[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    localStorage.setItem("babyShower_userEmail", userEmail)
    localStorage.setItem("babyShower_userName", userName)
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    localStorage.removeItem("babyShower_userEmail")
    localStorage.removeItem("babyShower_userName")
    setIsLoggedIn(false)
  }

  useEffect(() => {
    const savedEmail = localStorage.getItem("babyShower_userEmail")
    const savedName = localStorage.getItem("babyShower_userName")

    if (savedEmail && savedName) {
      setUserEmail(savedEmail)
      setUserName(savedName)
      setIsLoggedIn(true)
    }

    loadUserSelections()
  }, [])

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

  const addToWishlist = async (productId: string) => {
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

      // Reload data to get updated state
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

  const removeFromWishlist = async (productId: string) => {
    try {
      const response = await fetch(`/api/user-selections?product_id=${productId}&user_email=${userEmail}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to remove from wishlist")
      }

      // Reload data to get updated state
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

  const getUserForProduct = (productId: string) => {
    return userSelections.find((item) => item.product_id === productId)
  }

  const isProductReservedByUser = (productId: string) => {
    const reservation = getUserForProduct(productId)
    return reservation?.user_email === userEmail
  }

  const isProductReserved = (productId: string) => {
    return getUserForProduct(productId) !== undefined
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Baby className="h-12 w-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">Cargando reservas...</p>
        </div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen relative"
      style={{ background: "linear-gradient(135deg, #fef7ff 0%, #e0f2fe 50%, #fef3c7 100%)" }}
    >
      {isLoggedIn && (
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
                onClick={handleLogout}
                className="text-purple-700 hover:bg-pink-400 hover:text-white text-xs px-3 py-1 h-auto transition-colors duration-200"
              >
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-pink-100 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center gap-1">
            <img
              src="/baby-duck-icon.png"
              alt="Patito bebé"
              className="h-20 w-20 object-contain animate-bounce"
              style={{
                animation: "float 3s ease-in-out infinite",
                animationDelay: "0s",
              }}
            />
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent text-center">
                Lista de regalos de Emily
              </h1>
            </div>
            <img
              src="/baby-duck-egg.png"
              alt="Patito con huevo"
              className="h-20 w-20 object-contain"
              style={{
                animation: "float 3s ease-in-out infinite",
                animationDelay: "1.5s",
              }}
            />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Login Form */}
        {!isLoggedIn && (
          <Card className="max-w-md mx-auto mb-8 bg-white/90 backdrop-blur-sm border-purple-100 shadow-lg">
            <CardHeader className="text-center">
              <div className="bg-gradient-to-br from-yellow-200 to-pink-200 p-3 rounded-full w-fit mx-auto mb-4">
                <Mail className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle className="text-purple-700">Únete a la Lista</CardTitle>
              <CardDescription>Ingresa tu correo y nombre para reservar</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="email" className="text-gray-700 pb-2">
                    Correo Electrónico
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="tu@correo.com"
                    className="border-purple-200 focus:border-purple-400"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="name" className="text-gray-700 pb-2">
                    Tu Nombre
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Tu nombre completo"
                    className="border-purple-200 focus:border-purple-400"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 rounded-md font-semibold text-white shadow-lg transition-all duration-200 hover:shadow-xl flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: "#7c3aed",
                    border: "none",
                    color: "white",
                  }}
                >
                  <Heart className="h-4 w-4" />
                  Unirme a la Lista
                </button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Products Grid */}
        {isLoggedIn && (
          <>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-700 mb-2">Lista de Regalos</h2>
              <p className="text-gray-600">
                Gracias por acompañarnos en esta etapa tan especial. Si deseas sorprender a nuestra pequeña Emily 🎀🐣
                con un detalle, aquí te dejamos algunas ideas que nos serán de gran ayuda para su llegada.
              </p>
              <br />
              <i className="text-gray-600">Reserva haciendo clic en "Reservar regalo"</i>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {HARDCODED_PRODUCTS.map((product) => {
                const reservation = getUserForProduct(product.id)
                const isReservedByUser = isProductReservedByUser(product.id)
                const isReserved = isProductReserved(product.id)

                return (
                  <Card
                    key={product.id}
                    className={`overflow-hidden pt-0 transition-all duration-300 bg-white/90 backdrop-blur-sm ${
                      isReserved ? "border-yellow-200 shadow-yellow-100" : "border-purple-100 hover:border-purple-200"
                    }`}
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={product.image_url || "/placeholder.svg"}
                        alt={product.title}
                        className="w-full h-48 object-cover"
                      />
                      {isReserved && (
                        <div className="absolute top-2 right-2 bg-white rounded-sm p-2">
                          <Crown className="h-6 w-6 text-yellow-500 drop-shadow-lg" />
                        </div>
                      )}
                    </div>

                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg leading-tight text-gray-700">{product.title}</CardTitle>
                    </CardHeader>

                    <CardContent className="pt-0">
                      {reservation && (
                        <div className="mb-4 p-3 bg-gradient-to-r from-yellow-50 to-yellow-50 rounded-lg border border-yellow-200">
                          <p className="text-xs text-yellow-600 mb-1">Reservado por:</p>
                          <p className="text-lg font-bold text-yellow-700">{reservation.user_name}</p>
                        </div>
                      )}

                      <div className="flex flex-col gap-2">
                        {/* Add/Remove buttons */}
                        {isReservedByUser ? (
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => removeFromWishlist(product.id)}
                            className="w-full"
                          >
                            <UserMinus className="h-4 w-4 mr-2" />
                            Cancelar Reserva
                          </Button>
                        ) : !isReserved ? (
                          <Button
                            onClick={() => addToWishlist(product.id)}
                            size="sm"
                            className="w-full text-white font-semibold shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
                            style={{
                              backgroundColor: "#7c3aed",
                              border: "none",
                              color: "white",
                            }}
                            data-product-id={product.id}
                          >
                            <UserPlus className="h-4 w-4 mr-2" />
                            Reservar regalo
                          </Button>
                        ) : (
                          <Button disabled size="sm" className="w-full bg-gray-300 text-gray-500 cursor-not-allowed">
                            <Crown className="h-4 w-4 mr-2" />
                            Ya Reservado
                          </Button>
                        )}

                        {/* External link */}
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="w-full border-blue-200 hover:bg-blue-50 bg-transparent hover:text-black"
                        >
                          <a href={product.link} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Ver regalo
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
            <p className="text-gray-600 mt-6 p-4 rounded-md bg-pink-100 text-center text-lg shadow-sm shadow-pink-200">
              Si pensaste en otro regalito para Emily 🐣🎀 que no esté en la lista (y que no sea mecedora o bañera)
              🐥✨, no te preocupes, todo será recibido con mucho amor 💕🫶. Y si son pañales desde la talla P en
              adelante, ¡serán de gran ayuda! 💕🍼💛
            </p>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-pink-100 mt-16">
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Gift className="h-5 w-5 text-purple-600" />
            <span className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
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
              className="h-48 w-auto object-contain relative -top-10"
            />
          </div>
        </div>
      </footer>
    </div>
  )
}
