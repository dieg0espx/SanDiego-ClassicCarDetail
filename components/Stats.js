'use client'

import { useEffect, useRef, useState } from 'react'
import CountUp from 'react-countup'

export default function Stats() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const stats = [
    {
      end: 10,
      suffix: '+',
      label: 'Years Experience'
    },
    {
      end: 500,
      suffix: '+',
      label: 'Happy Customers'
    },
    {
      end: 1000,
      suffix: '+',
      label: 'Vehicles Detailed'
    },
    {
      end: 100,
      suffix: '%',
      label: 'Satisfaction Rate'
    }
  ]

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="p-4 sm:p-6 lg:p-8 text-center"
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-red-600 mb-2 sm:mb-3">
                {isVisible ? (
                  <CountUp
                    end={stat.end}
                    suffix={stat.suffix}
                    duration={2.5}
                    delay={index * 0.2}
                    separator=","
                  />
                ) : (
                  `0${stat.suffix}`
                )}
              </div>
              <div className="text-gray-600 font-medium text-sm sm:text-base lg:text-lg">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
