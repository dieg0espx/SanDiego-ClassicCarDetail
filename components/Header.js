import Image from 'next/image'

export default function Header() {
  return (
    <>
      {/* Top Information Bar */}
      <div className="bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-2 text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>Vista, CA 92081</span>
              </div>
              <div className="flex items-center">
                <span>For Fleet Services Call:</span>
                <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 011.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span>(760) 518-8451</span>
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span>Open 7 Days a Week</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <header className="bg-gray-900 text-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Image
                src="/logo.png"
                alt="San Diego Classic Car Detail"
                width={200}
                height={60}
                className="h-16 w-auto"
              />
            </div>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="/" className="hover:text-gray-300 transition-colors">Home</a>
              <a href="/services" className="hover:text-gray-300 transition-colors">Services</a>
              <a href="/packages" className="hover:text-gray-300 transition-colors">Packages</a>
              <a href="/contact" className="hover:text-gray-300 transition-colors">Contact</a>
            </nav>

            {/* Call-to-Action Buttons */}
            <div className="flex items-center space-x-4">
              <a href="#quote" className="bg-white hover:bg-gray-100 text-red-600 font-bold px-6 py-2 rounded-lg transition-colors">
                REQUEST QUOTE
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
