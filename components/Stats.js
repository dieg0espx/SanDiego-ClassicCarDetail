'use client'

import { useEffect, useRef, useState } from 'react'
import CountUp from 'react-countup'
import { motion } from 'framer-motion'

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
            <motion.div 
              key={index}
              className="p-4 sm:p-6 lg:p-8 text-center"
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
            >
              <motion.div 
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gold mb-2 sm:mb-3"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.3 + (index * 0.1),
                  type: "spring",
                  stiffness: 200
                }}
                viewport={{ once: true }}
              >
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
              </motion.div>
              <motion.div 
                className="text-gray-600 font-medium text-sm sm:text-base lg:text-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.5 + (index * 0.1)
                }}
                viewport={{ once: true }}
              >
                {stat.label}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
