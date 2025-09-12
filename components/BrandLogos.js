'use client';

import Image from 'next/image';

const BrandLogos = () => {
  const brandImages = [
    '18a56c95cc67e9cd3db848bb93f48b7e.jpg',
    '3525211c1279a1790cb2259d6a8b6624.jpg',
    '66cc4d2c7dff0a001d8a5faa.jpeg',
    'audi-logo-on-transparent-background-free-vector.jpg',
    'images (1).jpeg',
    'images (1).png',
    'images (2).jpeg',
    'images.jpeg',
    'images.png',
    'logo-scuderia-ferrari-logo-scuderia-ferrari-car-color-vector-format-aviable-ai-124366774.webp',
    'SdQmyJhL_400x400.jpg',
    'SQUARE-LOGO.jpg'
  ];

  // Duplicate the array to create seamless infinite scroll
  const duplicatedBrands = [...brandImages, ...brandImages];

  return (
    <section className="py-[150px] bg-white overflow-hidden relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-3 sm:mb-4">
            Trusted by Premium Brands
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            We work with the finest automotive brands to deliver exceptional detailing services
          </p>
        </div>
        
        <div className="relative -mx-2 sm:-mx-4">
          {/* Scrolling container */}
          <div className="flex animate-scroll">
            {duplicatedBrands.map((image, index) => (
              <div
                key={`${image}-${index}`}
                className="flex-shrink-0 mx-4 sm:mx-6 lg:mx-8 flex items-center justify-center"
                style={{ width: '150px', height: '90px' }}
              >
                <div className="relative w-full h-full grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110">
                  <Image
                    src={`/brands/${image}`}
                    alt={`Brand logo ${index + 1}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 150px, 200px"
                  />
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </div>    
      
      {/* Fade overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 lg:w-[200px] bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 lg:w-[200px] bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
      
    
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default BrandLogos;
