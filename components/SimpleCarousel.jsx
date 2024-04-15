import React, { useState, useEffect, useRef } from 'react';
import './styles/SimpleCarousel.css'; // Create a CSS file for styling

const SimpleCarousel = () => {
  const images = [
    '/images/logo.png',
    '/images/logo.png',
    '/images/logo.png',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [startX, setStartX] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(intervalId);
  }, []);

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (startX !== null) {
      const deltaX = e.touches[0].clientX - startX;
      if (deltaX > 50) {
        // Swipe right
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
      } else if (deltaX < -50) {
        // Swipe left
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }
    }
  };

  const handleTouchEnd = () => {
    setStartX(null);
  };

  return (
    <div
      className="simple-carousel"
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {images.map((image, index) => (
        <div
          key={index}
          className={`carousel-slide ${index === currentIndex ? 'active' : ''}`}
          style={{
            backgroundImage: `url(${image})`,
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        />
      ))}
    </div>
  );
};

export default SimpleCarousel;
