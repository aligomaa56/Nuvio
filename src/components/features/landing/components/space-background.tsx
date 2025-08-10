'use client';

import { useState, useEffect } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkle: number;
  speed: number;
}

export default function SpaceBackground() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const newStars: Star[] = [];
    for (let i = 0; i < 100; i++) {
      newStars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        twinkle: Math.random() * 100,
        speed: Math.random() * 0.1 + 0.05,
      });
    }
    setStars(newStars);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setStars((prev) =>
        prev.map((star) => ({
          ...star,
          x: (star.x + star.speed + 100) % 100,
          y: star.y,
        }))
      );
    }, 16);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hidden md:block">
      <div className="fixed inset-0 pointer-events-none z-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute w-1 h-1 bg-foreground rounded-full animate-pulse"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animationDelay: `${star.twinkle}ms`,
              animationDuration: '3s',
            }}
          />
        ))}
      </div>
    </div>
  );
}
