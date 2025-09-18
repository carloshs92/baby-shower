import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Lista de usuarios autorizados que pueden ver nombres completos
const AUTHORIZED_USERS = [
  'schadyacastillo@gmail.com',
  'carlos.hs.92@gmail.com'
]

// Función para verificar si un usuario está autorizado
export function isAuthorizedUser(userEmail: string): boolean {
  return AUTHORIZED_USERS.includes(userEmail.toLowerCase())
}

// Función para ofuscar nombres, mostrando solo la primera letra de cada palabra
export function obfuscateName(name: string, currentUserEmail: string, reservationUserEmail: string): string {
  // Si el usuario actual está autorizado o es el mismo usuario, mostrar nombre completo
  if (isAuthorizedUser(currentUserEmail) || currentUserEmail === reservationUserEmail) {
    return name
  }
  
  // Ofuscar el nombre, mostrando solo la primera letra de cada palabra
  return name
    .split(' ')
    .map(word => {
      if (word.length === 0) return word
      return word.charAt(0) + '*'.repeat(word.length - 1)
    })
    .join(' ')
}
