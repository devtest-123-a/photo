
import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

const HeartBackground: React.FC = () => {
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; size: number; animation: string; opacity: number; rotate: number; color: string }>>([]);

  useEffect(() => {
    // Create initial hearts with more variety
    const initialHearts = Array.from({ length: 20 }, (_, index) => ({
      id: index,
      x: Math.random() * 100, // Random horizontal position (0-100%)
      size: Math.random() * 14 + 6, // Random size between 6px and 20px
      animation: `heart-float-${Math.floor(Math.random() * 5) + 1}`,
      opacity: Math.random() * 0.25 + 0.05, // Less opacity between 0.05 and 0.3
      rotate: Math.random() * 45 - 22.5, // Random rotation between -22.5 and 22.5 degrees
      color: Math.random() > 0.7 ? 'romantic-300' : 'romantic-200', // Different shades of pink
    }));
    
    setHearts(initialHearts);
    
    // Add new hearts occasionally
    const interval = setInterval(() => {
      setHearts(prev => {
        // Remove some old hearts to prevent too many elements
        if (prev.length > 30) {
          return [
            ...prev.slice(10),
            {
              id: Date.now(),
              x: Math.random() * 100,
              size: Math.random() * 14 + 6,
              animation: `heart-float-${Math.floor(Math.random() * 5) + 1}`,
              opacity: Math.random() * 0.25 + 0.05,
              rotate: Math.random() * 45 - 22.5,
              color: Math.random() > 0.7 ? 'romantic-300' : 'romantic-200',
            }
          ];
        }
        
        return [
          ...prev,
          {
            id: Date.now(),
            x: Math.random() * 100,
            size: Math.random() * 14 + 6,
            animation: `heart-float-${Math.floor(Math.random() * 5) + 1}`,
            opacity: Math.random() * 0.25 + 0.05,
            rotate: Math.random() * 45 - 22.5,
            color: Math.random() > 0.7 ? 'romantic-300' : 'romantic-200',
          }
        ];
      });
    }, 2000); // Add a new heart every 2 seconds
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="heart-bg">
      {hearts.map(heart => (
        <div
          key={heart.id}
          className={`absolute animate-${heart.animation}`}
          style={{
            left: `${heart.x}%`,
            bottom: '-20px',
            opacity: heart.opacity,
            transform: `translateX(${Math.sin(Date.now() / 3000 + heart.id) * 15}px) rotate(${heart.rotate}deg)`, // Gentle movement with rotation
            transition: 'transform 0.5s ease-in-out',
          }}
        >
          <Heart 
            size={heart.size} 
            className={`text-${heart.color} fill-${heart.color}`} 
          />
        </div>
      ))}
    </div>
  );
};

export default HeartBackground;
