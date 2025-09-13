'use client'
import { useState } from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

export default function AuthModal({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true)

  if (!isOpen) return null

  return (
    <>
      {isLogin ? (
        <LoginForm
          onClose={onClose}
          onSwitchToRegister={() => setIsLogin(false)}
        />
      ) : (
        <RegisterForm
          onClose={onClose}
          onSwitchToLogin={() => setIsLogin(true)}
        />
      )}
    </>
  )
}
