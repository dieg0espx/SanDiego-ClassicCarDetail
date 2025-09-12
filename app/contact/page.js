import ContactForm from '../../components/ContactForm'
import ContactInfo from '../../components/ContactInfo'

export const metadata = {
  title: 'Contact Us - San Diego Classic Auto Detail',
  description: 'Get in touch with San Diego Classic Auto Detail for professional mobile detailing services. Call (760) 518-8451 or visit us in Vista, CA 92081',
}

export default function Contact() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-black text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6">
              Contact Us
            </h1>
            <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-300 max-w-3xl mx-auto px-4">
              Ready to give your classic auto the attention it deserves? Get in touch with our expert team today.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 items-start">
            {/* Contact Information - Left Column */}
            <div className="lg:col-span-1 flex flex-col h-full">
              <ContactInfo />
            </div>

            {/* Contact Form - Right Column */}
            <div className="lg:col-span-2 flex flex-col h-full">
              <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-12 flex flex-col h-full">
                <div className="mb-6 sm:mb-8">
                  <h3 className="text-2xl sm:text-3xl font-bold text-black mb-3 sm:mb-4">Send us a Message</h3>
                  <p className="text-base sm:text-lg text-gray-600">
                    Fill out the form below and we'll get back to you within 24 hours with a personalized quote.
                  </p>
                </div>
                
                <div className="flex-1">
                  <ContactForm />
                </div>
                
                {/* Fleet Services Notice */}
                <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-blue-900 mb-2">Fleet Services Available</h4>
                      <p className="text-blue-800">
                        We provide specialized fleet detailing services for businesses with multiple vehicles. 
                        Contact us for custom pricing and scheduling that fits your business needs.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">Visit Our Location</h2>
            <p className="text-lg text-gray-600">We're conveniently located in Vista, serving Oceanside, Carlsbad, and surrounding areas throughout San Diego County</p>
          </div>
          
          <div className="bg-gray-200 rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3347.123456789!2d-117.1234567!3d33.1234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDA3JzI0LjQiTiAxMTfCsDA3JzI0LjQiVw!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="San Diego Classic Auto Detail Location"
            ></iframe>
          </div>
        </div>
      </section>
    </main>
  )
}
