'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Sitemap() {
  const sections = [
    {
      title: 'Main Pages',
      links: [
        { name: 'Home', href: '/' },
        { name: 'About Us', href: '/#about' },
        { name: 'Services', href: '/services' },
        { name: 'Contact', href: '/#contact' },
      ]
    },
    {
      title: 'Services',
      links: [
        { name: 'Basic Detail', href: '/services#basic' },
        { name: 'Premium Detail', href: '/services#premium' },
        { name: 'Ultimate Detail', href: '/services#ultimate' },
        { name: 'Engine Bay Detailing', href: '/services#engine' },
        { name: 'Headlight Restoration', href: '/services#headlight' },
        { name: 'Pet Hair Removal', href: '/services#pet' },
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '/privacy-policy' },
        { name: 'Terms of Service', href: '/terms-of-service' },
      ]
    },
    {
      title: 'Quick Links',
      links: [
        { name: 'Book Now', href: '/services' },
        { name: 'Loyalty Club', href: '/#loyalty' },
        { name: 'Why Choose Us', href: '/#why-choose-us' },
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-black via-gray-900 to-black py-16 sm:py-20 lg:py-24 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Site <span className="text-gold">Map</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
              Navigate through all pages and sections of San Diego Classic Auto Detail
            </p>
          </motion.div>
        </div>
      </div>

      {/* Sitemap Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-6 border border-gray-800 hover:border-gold/50 transition-colors"
            >
              <h2 className="text-2xl font-bold text-gold mb-6 pb-3 border-b border-gray-800">
                {section.title}
              </h2>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-gold transition-colors flex items-center group"
                    >
                      <svg
                        className="w-4 h-4 mr-2 text-gold opacity-0 group-hover:opacity-100 transition-opacity"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 bg-gradient-to-br from-gray-900 to-black rounded-xl p-8 border border-gray-800"
        >
          <h2 className="text-2xl font-bold text-gold mb-6">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start">
              <div className="w-10 h-10 bg-gold rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-400">Phone</p>
                <p className="text-white">(760) 518-8451</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-10 h-10 bg-gold rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-400">Email</p>
                <p className="text-white">SDclassicautodetail@outlook.com</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-10 h-10 bg-gold rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-400">Address</p>
                <p className="text-white">Vista, CA 92081</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 text-center"
        >
          <Link
            href="/"
            className="inline-flex items-center text-gold hover:text-white transition-colors group"
          >
            <svg
              className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
