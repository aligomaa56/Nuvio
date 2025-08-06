'use client';

import { useState, useEffect, useRef } from 'react';
import {
  BookOpen,
  Edit3,
  Eraser,
  PenTool,
  FileText,
  Bookmark,
} from 'lucide-react';

const tools = [
  { icon: BookOpen, name: 'Notebook', color: 'text-blue-300' },
  { icon: Edit3, name: 'Pen', color: 'text-green-300' },
  { icon: PenTool, name: 'Pencil', color: 'text-yellow-300' },
  { icon: Eraser, name: 'Eraser', color: 'text-pink-300' },
  { icon: FileText, name: 'Page', color: 'text-purple-300' },
  { icon: Bookmark, name: 'Bookmark', color: 'text-orange-300' },
];

interface FloatingTool {
  id: number;
  tool: (typeof tools)[0];
  x: number;
  y: number;
  speed: number;
  scale: number;
  rotation: number;
}

export function AnimatedTools() {
  const [floatingTools, setFloatingTools] = useState<FloatingTool[]>([]);
  const lastToolIndex = useRef(-1);

  // Simple function to get a different tool than the last one
  const getRandomTool = () => {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * tools.length);
    } while (randomIndex === lastToolIndex.current && tools.length > 1);
    
    lastToolIndex.current = randomIndex;
    return tools[randomIndex];
  };

  useEffect(() => {
    // Initialize with 3 tools
    const initialTools: FloatingTool[] = [];
    for (let i = 0; i < 3; i++) {
      initialTools.push({
        id: i,
        tool: getRandomTool(),
        x: -50 - i * 100,
        y: Math.random() * 20 + 10,
        speed: Math.random() * 0.8 + 0.5,
        scale: Math.random() * 0.3 + 0.8,
        rotation: Math.random() * 360,
      });
    }
    setFloatingTools(initialTools);

    // Optimized animation loop
    const animationInterval = setInterval(() => {
      setFloatingTools((prevTools) => {
        const updatedTools = prevTools.map((tool) => ({
          ...tool,
          x: tool.x + tool.speed,
          y: tool.y + Math.sin(Date.now() * 0.002 + tool.id) * 0.5,
          rotation: tool.rotation + 0.5,
        }));

        // Remove off-screen tools and add new ones
        const visibleTools = updatedTools.filter((tool) => tool.x < 400);

        if (visibleTools.length < 3 && Math.random() < 0.05) {
          visibleTools.push({
            id: Date.now(),
            tool: getRandomTool(),
            x: -50,
            y: Math.random() * 20 + 10,
            speed: Math.random() * 0.8 + 0.5,
            scale: Math.random() * 0.3 + 0.8,
            rotation: Math.random() * 360,
          });
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
        const opacity = x < 50 ? Math.max(0.3, x / 50) : x > 300 ? Math.max(0.3, (400 - x) / 100) : 0.8;

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
