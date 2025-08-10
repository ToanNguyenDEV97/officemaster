
import React, { useState, useEffect, useCallback } from 'react';
import { slides } from '../data/content';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = () => {
    setCurrentSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 5000);
    return () => clearInterval(slideInterval);
  }, [nextSlide]);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden group pt-[40%] sm:pt-[35%] md:pt-[30%] lg:pt-[26%] xl:pt-[22%]">
      <div className="absolute inset-0 w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className="absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out"
            style={{ opacity: index === currentSlide ? 1 : 0 }}
            aria-hidden={index !== currentSlide}
          >
            <img src={slide.imageUrl} alt={slide.alt} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 via-slate-900/30 to-transparent"></div>
            <div className="absolute inset-0 flex flex-col justify-center items-start text-white p-6 sm:p-8 md:p-12 lg:px-24 xl:px-32">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 shadow-lg max-w-md md:max-w-xl lg:max-w-2xl">{slide.title}</h2>
                <p className="text-sm sm:text-base md:text-lg mb-6 shadow-md max-w-sm md:max-w-md lg:max-w-lg">{slide.description}</p>
                <a 
                    href={slide.buttonLink} 
                    className="bg-indigo-600 text-white px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base md:text-lg rounded-full font-semibold hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105"
                >
                    {slide.buttonText}
                </a>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/70 rounded-full text-slate-800 hover:bg-white transition-all shadow-md opacity-50 group-hover:opacity-100"
        aria-label="Previous slide"
      >
        <FaChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/70 rounded-full text-slate-800 hover:bg-white transition-all shadow-md opacity-50 group-hover:opacity-100"
        aria-label="Next slide"
      >
        <FaChevronRight className="h-6 w-6" />
      </button>
      
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all duration-300 ${index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/70'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
