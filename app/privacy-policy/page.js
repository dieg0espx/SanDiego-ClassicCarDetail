'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-gray-900 to-black py-20 border-b border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Privacy <span className="text-gold">Policy</span>
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <motion.div
          className="space-y-8 sm:space-y-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Introduction */}
          <section>
            <p className="text-gray-300 leading-relaxed">
              Welcome, and thank you for choosing San Diego Classic Auto Detail. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website and mobile detailing services.
            </p>
          </section>

          {/* Consent */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gold">Consent</h2>
            <p className="text-gray-300 leading-relaxed">
              By using our website, you consent to this Privacy Policy and agree to its terms.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gold">Information We Collect</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              We may collect personal information such as:
            </p>
            <ul className="space-y-2 text-gray-300">
              {[
                'Name, email address, and phone number',
                'Service address and location information for mobile detailing appointments',
                'Vehicle information (make, model, year, condition)',
                'Appointment and booking details',
                'Payment information (processed securely through third-party payment processors)',
                'Any other details you choose to provide when you contact us or submit forms on our site'
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-gold rounded-full mr-3 flex-shrink-0 mt-2"></div>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* How We Use Your Information */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gold">How We Use Your Information</h2>
            <ul className="space-y-2 text-gray-300">
              {[
                'Provide, operate, and maintain our website and detailing services',
                'Schedule and coordinate mobile detailing appointments at your location',
                'Communicate with you about our services, including by call, email, and text',
                'Send booking confirmations, reminders, and service updates',
                'Process payments and send receipts',
                'Respond to your inquiries and provide customer support',
                'Send promotional offers and loyalty club benefits (if you have opted in)',
                'Improve and personalize your experience',
                'Detect, prevent, and address fraud or security issues'
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-gold rounded-full mr-3 flex-shrink-0 mt-2"></div>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 p-4 bg-gold/10 border border-gold/30 rounded-lg">
              <p className="text-gray-300 leading-relaxed">
                <strong className="text-gold">Important:</strong> Your data will not be sold or shared with third parties for promotional or marketing purposes.
              </p>
            </div>
          </section>

          {/* Log Files */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gold">Log Files</h2>
            <p className="text-gray-300 leading-relaxed">
              Like many websites, we use log files for analytics and site administration. This may include IP addresses, browser type, Internet Service Provider (ISP), date/time stamp, referring/exit pages, and click counts. This information is not linked to personally identifiable information.
            </p>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gold">Cookies</h2>
            <p className="text-gray-300 leading-relaxed">
              We use cookies to remember preferences, maintain your session, and improve your experience on our website. You can control cookies through your browser settings. Note that disabling cookies may affect the functionality of certain features.
            </p>
          </section>

          {/* Payment Security */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gold">Payment Security</h2>
            <p className="text-gray-300 leading-relaxed">
              Payment information is processed securely through trusted third-party payment processors. We do not store complete credit card information on our servers. All payment transactions are encrypted and handled in compliance with industry security standards.
            </p>
          </section>

          {/* Email Communications */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gold">Email Communications</h2>
            <p className="text-gray-300 leading-relaxed">
              If you join our loyalty club or opt in to receive promotional emails, we will send you:
            </p>
            <ul className="mt-4 space-y-2 text-gray-300">
              {[
                'Special offers and seasonal promotions',
                'Member-only discounts',
                'Updates about new services and packages',
                'Holiday deals and priority booking opportunities'
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-gold rounded-full mr-3 flex-shrink-0 mt-2"></div>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-gray-300 leading-relaxed mt-4">
              You can unsubscribe from promotional emails at any time by clicking the unsubscribe link in any email or by contacting us directly.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gold">Your Rights</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Depending on your location, you may have rights to:
            </p>
            <ul className="space-y-2 text-gray-300">
              {[
                'Access your personal data',
                'Correct inaccurate or incomplete data',
                'Delete your personal data',
                'Restrict or object to processing of your data',
                'Request data portability',
                'Opt out of promotional communications'
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-gold rounded-full mr-3 flex-shrink-0 mt-2"></div>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-gray-300 leading-relaxed mt-4">
              To exercise these rights, please contact us using the information provided below.
            </p>
          </section>

          {/* Children's Information */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gold">Children's Information</h2>
            <p className="text-gray-300 leading-relaxed">
              We do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal data, please contact us so we can remove it.
            </p>
          </section>

          {/* Changes to This Policy */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gold">Changes to This Policy</h2>
            <p className="text-gray-300 leading-relaxed">
              We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date and are effective when posted. We encourage you to review this policy periodically.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gold">Contact Us</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              For questions about this Privacy Policy, to exercise your rights, or to discuss how we handle your information, please contact us:
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gold rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <a href="mailto:SDclassicautodetail@outlook.com" className="text-gold hover:text-white transition-colors">
                    SDclassicautodetail@outlook.com
                  </a>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gold rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 011.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Phone</p>
                  <a href="tel:7605188451" className="text-gold hover:text-white transition-colors">
                    (760) 518-8451
                  </a>
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
            <div className="mt-6 pt-6 border-t border-gray-800">
              <p className="text-gray-400 text-sm">
                See also our <Link href="/terms-of-service" className="text-gold hover:text-white transition-colors underline">Terms of Service</Link>
              </p>
            </div>
          </section>

          {/* Back to Home */}
          <div className="text-center pt-8">
            <Link
              href="/"
              className="inline-flex items-center text-gold hover:text-white transition-colors group"
            >
              <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
