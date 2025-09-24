import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { AuthProvider } from '../contexts/AuthContext'
import { CartProvider } from '../contexts/CartContext'

export const metadata = {
  title: 'San Diego Classic Auto Detail - Mobile Detailing',
  description: 'Professional mobile detailing services in San Diego',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" />
      </head>
      <body className="min-h-screen bg-gray-50 overflow-x-hidden">
        <AuthProvider>
          <CartProvider>
            <Header />
            {children}
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
