import { Heart, Mail } from 'lucide-react';
import { useState } from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface LoginFormProps {
  onSubmit: (email: string, name: string) => void
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  const [userEmail, setUserEmail] = useState("")
  const [userName, setUserName] = useState("")

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit(userEmail, userName)
  }

  return (
    <Card className="max-w-md mx-auto my-1 bg-white/90 backdrop-blur-sm border-purple-100 shadow-lg">
      <CardHeader className="text-center">
        <div className="bg-gradient-to-br from-yellow-200 to-pink-200 p-3 rounded-full w-fit mx-auto mb-4">
          <Mail className="h-6 w-6 text-purple-600" />
        </div>
        <CardTitle className="text-purple-700">Únete a la Lista</CardTitle>
        <CardDescription>Ingresa tu correo y nombre para reservar</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
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
              name='name'
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
  )
}
