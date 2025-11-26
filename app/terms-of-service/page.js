'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function TermsOfService() {
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
              Terms of <span className="text-gold">Service</span>
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
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gold">Agreement to Terms</h2>
            <p className="text-gray-300 leading-relaxed">
              By accessing this website and using the services of San Diego Classic Auto Detail, you agree to be bound by these Terms of Service and agree that you are responsible for compliance with any applicable local laws. If you disagree with any of these terms, you are prohibited from accessing this site or using our services. The materials on this website are protected by copyright and trademark law.
            </p>
          </section>

          {/* Use License */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gold">Use License</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Permission is granted to temporarily download one copy of the materials on San Diego Classic Auto Detail's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="space-y-2 text-gray-300 mb-4">
              {[
                'Modify or copy the materials',
                'Use the materials for any commercial purpose or for any public display',
                'Attempt to reverse engineer any software contained on this website',
                'Remove any copyright or other proprietary notations from the materials',
                'Transfer the materials to another person or "mirror" the materials on any other server'
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-gold rounded-full mr-3 flex-shrink-0 mt-2"></div>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-gray-300 leading-relaxed">
              San Diego Classic Auto Detail may terminate this license upon violations of any of these restrictions. Upon termination, your viewing right will also be terminated and you must destroy any downloaded materials in your possession whether in printed or electronic format.
            </p>
          </section>

          {/* Service Terms */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gold">Detailing Service Terms</h2>
            <div className="space-y-4 text-gray-300">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Booking and Appointments</h3>
                <ul className="space-y-2">
                  {[
                    'All appointments must be booked in advance through our website, phone, or email',
                    'A confirmation will be sent once your booking is processed',
                    'Cancellations must be made at least 24 hours in advance for a full refund',
                    'Late cancellations (less than 24 hours) or no-shows may be subject to a cancellation fee',
                    'We reserve the right to reschedule appointments due to weather conditions or equipment issues'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-gold rounded-full mr-3 flex-shrink-0 mt-2"></div>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Service Location Requirements</h3>
                <p className="leading-relaxed mb-2">
                  For mobile detailing services, you agree to provide:
                </p>
                <ul className="space-y-2">
                  {[
                    'Access to water and electricity at the service location',
                    'A safe and accessible work area for our technicians',
                    'Accurate vehicle information (make, model, year, condition)',
                    'Clear communication about any special concerns or requests'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-gold rounded-full mr-3 flex-shrink-0 mt-2"></div>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Vehicle Condition</h3>
                <ul className="space-y-2">
                  {[
                    'You are responsible for removing all valuables from your vehicle before service',
                    'San Diego Classic Auto Detail is not responsible for pre-existing damage to your vehicle',
                    'Any damage discovered during inspection will be documented and communicated to you',
                    'We reserve the right to refuse service if the vehicle condition poses safety concerns',
                    'Additional fees may apply for excessively soiled vehicles beyond the quoted service level'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-gold rounded-full mr-3 flex-shrink-0 mt-2"></div>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Payment Terms */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gold">Payment Terms</h2>
            <ul className="space-y-2 text-gray-300">
              {[
                'Payment is due upon completion of services unless other arrangements have been made',
                'We accept credit cards, debit cards, and other payment methods as specified',
                'All prices are quoted in US Dollars',
                'Prices may vary based on vehicle size, condition, and specific service requirements',
                'Package deals and loyalty club discounts will be applied as applicable',
                'Deposits may be required for certain services or packages'
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-gold rounded-full mr-3 flex-shrink-0 mt-2"></div>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Disclaimer */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gold">Disclaimer</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              All materials and services on this website are provided "as is." San Diego Classic Auto Detail makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties. Further, San Diego Classic Auto Detail does not make any representations concerning the accuracy or reliability of the use of the materials on its website or otherwise relating to such materials or any sites linked to this website.
            </p>
            <p className="text-gray-300 leading-relaxed">
              While we take great care in providing quality detailing services, results may vary based on vehicle condition, age of the vehicle, type of materials, and pre-existing damage. We are not responsible for any deterioration of pre-existing damage or wear and tear on older vehicles.
            </p>
          </section>

          {/* Limitations of Liability */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gold">Limitations of Liability</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              In no event shall San Diego Classic Auto Detail or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on the website or services provided, even if San Diego Classic Auto Detail or an authorized representative has been notified of the possibility of such damage.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Some jurisdictions do not allow limitations on implied warranties or limitations of liability for incidental damages; these limitations may not apply to you. Our maximum liability for any claims related to our services shall not exceed the amount paid for the specific service in question.
            </p>
          </section>

          {/* Service Guarantee */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gold">Service Guarantee</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              We stand behind the quality of our work. If you are not satisfied with our service, please contact us within 48 hours of service completion. We will review your concerns and work to resolve any issues to your satisfaction.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Our guarantee does not cover issues arising from normal vehicle use after service, environmental factors, or conditions outside our control.
            </p>
          </section>

          {/* Revisions and Errata */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gold">Revisions and Errata</h2>
            <p className="text-gray-300 leading-relaxed">
              The materials appearing on this website may include technical, typographical, or photographic errors. San Diego Classic Auto Detail does not warrant that any of the materials on its website are accurate, complete, or current. San Diego Classic Auto Detail may make changes to the materials contained on its website at any time without notice. San Diego Classic Auto Detail does not make any commitment to update the materials.
            </p>
          </section>

          {/* Links */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gold">Links to Third-Party Sites</h2>
            <p className="text-gray-300 leading-relaxed">
              San Diego Classic Auto Detail has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by San Diego Classic Auto Detail. Use of any such linked website is at the user's own risk.
            </p>
          </section>

          {/* Modifications */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gold">Terms of Service Modifications</h2>
            <p className="text-gray-300 leading-relaxed">
              San Diego Classic Auto Detail may revise these Terms of Service for its website at any time without prior notice. By using this website and our services, you agree to be bound by the then-current version of these Terms of Service. We encourage you to review these terms periodically for any changes.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gold">Governing Law</h2>
            <p className="text-gray-300 leading-relaxed">
              Any claim related to this website or services provided by San Diego Classic Auto Detail shall be governed by the laws of the State of California and the United States without regard to its conflict of law provisions. Any disputes shall be resolved in the appropriate courts located in San Diego County, California.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gold">Contact Us</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              For questions about these Terms of Service or our detailing services, please contact us:
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
                See also our <Link href="/privacy-policy" className="text-gold hover:text-white transition-colors underline">Privacy Policy</Link>
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
