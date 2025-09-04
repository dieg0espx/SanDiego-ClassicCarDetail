import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'

export const metadata = {
  title: 'San Diego Classic Car Detail - Mobile Detailing',
  description: 'Professional mobile detailing services in San Diego',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
