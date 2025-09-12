'use client'

import { useState } from 'react'

// FAQ data object with questions and answers
const faqData = [
  {
    id: 1,
    question: "What services do you offer?",
    answer: "We offer comprehensive mobile car detailing services including exterior wash, wax, interior cleaning, ceramic coating, paint correction, and premium detailing packages. We also provide fleet services for businesses."
  },
  {
    id: 2,
    question: "Do you come to my location?",
    answer: "Yes! We are a mobile detailing service that comes directly to your home, office, or any convenient location within San Diego County. No need to drive anywhere - we bring our professional equipment to you."
  },
  {
    id: 3,
    question: "How long does a typical detail take?",
    answer: "Service times vary depending on the package selected. A basic wash typically takes 1-2 hours, while a full detail with ceramic coating can take 4-6 hours. We'll provide an estimated timeframe when you book your appointment."
  },
  {
    id: 4,
    question: "What is ceramic coating and why should I get it?",
    answer: "Ceramic coating is a liquid polymer that bonds with your vehicle's paint to create a protective layer. It provides superior protection against UV rays, chemical stains, and environmental contaminants while giving your car a glossy, showroom finish that lasts for years."
  },
  {
    id: 5,
    question: "How much do your services cost?",
    answer: "Our pricing varies based on the service package and vehicle size. Basic washes start around $50, while premium detailing packages with ceramic coating range from $200-800. Contact us for a personalized quote based on your specific needs."
  },
  {
    id: 6,
    question: "Do you work on weekends?",
    answer: "Yes! We're open 7 days a week to accommodate your schedule. Whether you need service on a weekday or weekend, we're available to provide professional detailing at your convenience."
  },
  {
    id: 7,
    question: "What payment methods do you accept?",
    answer: "We accept cash, all major credit cards, and digital payment methods. Payment is due upon completion of service. We also offer fleet accounts for business customers with net payment terms."
  },
  {
    id: 8,
    question: "Do you provide a warranty on your work?",
    answer: "Yes! We stand behind our work with a satisfaction guarantee. If you're not completely satisfied with our service, we'll return to make it right at no additional charge. Ceramic coating services come with a manufacturer warranty."
  }
]

export default function FAQ() {
  const [openItems, setOpenItems] = useState(new Set())

  const toggleItem = (id) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id)
    } else {
      newOpenItems.add(id)
    }
    setOpenItems(newOpenItems)
  }

  // Split FAQ data into two columns
  const leftColumnItems = faqData.filter((_, index) => index % 2 === 0)
  const rightColumnItems = faqData.filter((_, index) => index % 2 === 1)

  const renderFAQItem = (item) => (
    <div
      key={item.id}
      className="group bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden h-fit mb-4 sm:mb-6 hover:border-gold hover:shadow-xl transition-all duration-300"
    >
      {/* Question Button */}
      <button
        onClick={() => toggleItem(item.id)}
        className="w-full px-6 sm:px-8 py-4 sm:py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-all duration-300 focus:outline-none group-hover:bg-gray-50"
        aria-expanded={openItems.has(item.id)}
      >
        <span className="text-base sm:text-lg font-bold text-black pr-4 sm:pr-6 group-hover:text-gold transition-colors duration-300">
          {item.question}
        </span>
        <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-gradient-to-br from-gold to-gold rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <svg
              className={`w-4 h-4 text-white transform transition-transform duration-300 ${
                openItems.has(item.id) ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </button>

      {/* Answer Content */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          openItems.has(item.id) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 sm:px-8 pb-4 sm:pb-6 pt-0">
          <div className="border-t border-gray-200 pt-4">
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              {item.answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-gold text-white rounded-full text-sm font-semibold mb-6">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            FAQ & Support
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-4 sm:mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4">
            Get answers to common questions about our mobile car detailing services and find everything you need to know about our premium automotive care.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column */}
          <div className="space-y-4 sm:space-y-6">
            {leftColumnItems.map(renderFAQItem)}
          </div>
          
          {/* Right Column */}
          <div className="space-y-4 sm:space-y-6">
            {rightColumnItems.map(renderFAQItem)}
          </div>
        </div>

      </div>
    </section>
  )
}
