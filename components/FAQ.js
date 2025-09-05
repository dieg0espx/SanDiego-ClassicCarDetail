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
      className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 overflow-hidden h-fit mb-4"
    >
      {/* Question Button */}
      <button
        onClick={() => toggleItem(item.id)}
        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-700 transition-colors focus:outline-none"
        aria-expanded={openItems.has(item.id)}
      >
        <span className="text-lg font-semibold text-white pr-4">
          {item.question}
        </span>
        <div className="flex-shrink-0">
          <svg
            className={`w-5 h-5 text-red-600 transform transition-transform duration-200 ${
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
      </button>

      {/* Answer Content */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          openItems.has(item.id) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-4">
          <p className="text-gray-300 leading-relaxed">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  )

  return (
    <section className="py-[100px] bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Get answers to common questions about our mobile car detailing services
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-4">
            {leftColumnItems.map(renderFAQItem)}
          </div>
          
          {/* Right Column */}
          <div className="space-y-4">
            {rightColumnItems.map(renderFAQItem)}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-300 mb-6">
            Still have questions? We're here to help!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a
              href="tel:(760) 518-8451"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg flex items-center font-semibold transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 011.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Call (760) 518-8451
            </a>
            <a
              href="#quote"
              className="bg-gray-800 hover:bg-gray-700 text-white border border-gray-600 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Request Quote
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
