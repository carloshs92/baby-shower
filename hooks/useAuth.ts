import { useEffect, useState } from 'react';

interface AuthState {
  userEmail: string
  userName: string
  isLoggedIn: boolean
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    userEmail: "",
    userName: "",
    isLoggedIn: false
  })

  useEffect(() => {
    const savedEmail = localStorage.getItem("babyShower_userEmail")
    const savedName = localStorage.getItem("babyShower_userName")

    if (savedEmail && savedName) {
      setAuthState({
        userEmail: savedEmail,
        userName: savedName,
        isLoggedIn: true
      })
    }
  }, [])

  const login = (email: string, name: string) => {
    localStorage.setItem("babyShower_userEmail", email)
    localStorage.setItem("babyShower_userName", name)
    setAuthState({
      userEmail: email,
      userName: name,
      isLoggedIn: true
    })
  }

  const logout = () => {
    localStorage.removeItem("babyShower_userEmail")
    localStorage.removeItem("babyShower_userName")
    setAuthState({
      userEmail: "",
      userName: "",
      isLoggedIn: false
    })
  }

  return {
    ...authState,
    login,
    logout
  }
}
