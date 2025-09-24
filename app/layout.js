import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { AuthProvider } from '../contexts/AuthContext'
import { CartProvider } from '../contexts/CartContext'

export const metadata = {
  title: 'San Diego Classic Auto Detail',
  description: 'Professional classic car detailing services in San Diego. Premium car wash, paint protection, and restoration for classic cars, luxury vehicles, and daily drivers.',
  keywords: 'mobile detailing, car wash, auto detail, San Diego, classic cars, luxury cars, ceramic coating, paint protection',
  authors: [{ name: 'San Diego Classic Auto Detail' }],
  creator: 'San Diego Classic Auto Detail',
  publisher: 'San Diego Classic Auto Detail',
  
  // OpenGraph metadata for social media sharing (WhatsApp, iMessage, Facebook, etc.)
  openGraph: {
    title: 'San Diego Classic Auto Detail',
    description: 'Professional classic car detailing services in San Diego. Premium car wash, paint protection, and restoration for classic cars, luxury vehicles, and daily drivers.',
    url: 'https://sandiegoclassiccardetail.com',
    siteName: 'San Diego Classic Auto Detail',
    images: [
      {
        url: '/openGraph.png',
        width: 1200,
        height: 630,
        alt: 'San Diego Classic Auto Detail - Professional Mobile Detailing Services',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  
  // Twitter Card metadata
  twitter: {
    card: 'summary_large_image',
    title: 'San Diego Classic Auto Detail',
    description: 'Professional classic car detailing services in San Diego. Premium car wash, paint protection, and restoration for classic cars, luxury vehicles, and daily drivers.',
    images: ['/openGraph.png'],
    creator: '@sandiegoclassiccardetail',
  },
  
  // Additional metadata for better SEO and social sharing
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Verification and contact info
  verification: {
    google: 'your-google-verification-code', // Replace with actual verification code
  },
  
  // Additional meta tags for better compatibility
  alternates: {
    canonical: 'https://sandiegoclassiccardetail.com',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <head>
        {/* Favicon and App Icons */}
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="/favicon-192x192.png" sizes="192x192" type="image/png" />
        <link rel="icon" href="/favicon-512x512.png" sizes="512x512" type="image/png" />
        
        {/* Apple Touch Icon */}
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Web App Manifest */}
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Theme Color for Mobile Browsers */}
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        
        {/* Bootstrap Icons */}
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" />
      </head>
      <body className="min-h-screen overflow-x-hidden -mt-4">
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
