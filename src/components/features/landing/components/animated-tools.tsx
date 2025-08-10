'use client';

import { useState, useEffect } from 'react';
import { FloatingTool } from '../data/types';
import { createFloatingTool, calculateOpacity } from '../utils/animation-utils';

export default function AnimatedTools() {
  const [floatingTools, setFloatingTools] = useState<FloatingTool[]>([]);

  useEffect(() => {
    const initialTools: FloatingTool[] = [];
    for (let i = 0; i < 3; i++) {
      initialTools.push(createFloatingTool(i, i * 100));
    }
    setFloatingTools(initialTools);

    const animationInterval = setInterval(() => {
      setFloatingTools((prevTools) => {
        const updatedTools = prevTools.map((tool) => ({
          ...tool,
          x: tool.x + tool.speed,
          y: tool.y + Math.sin(Date.now() * 0.002 + tool.id) * 0.5,
          rotation: tool.rotation + 0.5,
        }));

        const visibleTools = updatedTools.filter((tool) => tool.x < 400);

        if (visibleTools.length < 3 && Math.random() < 0.05) {
          visibleTools.push(createFloatingTool(Date.now()));
        }

        return visibleTools;
      });
    }, 16);

    return () => clearInterval(animationInterval);
  }, []);

  return (
    <div className="relative w-100 h-12 rounded-full overflow-hidden mx-auto">
      {floatingTools.map(({ id, tool, x, y, scale, rotation }) => {
        const Icon = tool.icon;
        const opacity = calculateOpacity(x);

        return (
          <div
            key={id}
            className="absolute transition-opacity duration-300"
            style={{
              left: `${x}px`,
              top: `${y}px`,
              transform: `scale(${scale}) rotate(${rotation}deg)`,
              opacity: opacity,
            }}
          >
            <Icon className={`w-8 h-8 ${tool.color} drop-shadow-xl`} />
          </div>
        );
      })}
    </div>
  );
}
