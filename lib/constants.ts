export interface Product {
  id: string
  title: string
  link: string
  image_url: string
}

export const HARDCODED_PRODUCTS: Product[] = [
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
