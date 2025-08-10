import {
  BookOpen,
  Edit3,
  PenTool,
  Eraser,
  FileText,
  Bookmark,
} from 'lucide-react';

export const tools = [
  { icon: BookOpen, name: 'Notebook', color: 'text-blue-300' },
  { icon: Edit3, name: 'Pen', color: 'text-green-300' },
  { icon: PenTool, name: 'Pencil', color: 'text-yellow-300' },
  { icon: Eraser, name: 'Eraser', color: 'text-pink-300' },
  { icon: FileText, name: 'Page', color: 'text-purple-300' },
  { icon: Bookmark, name: 'Bookmark', color: 'text-orange-300' },
];

let lastToolIndex = -1;

export const getRandomTool = () => {
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * tools.length);
  } while (randomIndex === lastToolIndex && tools.length > 1);

  lastToolIndex = randomIndex;
  return tools[randomIndex];
};

export const createFloatingTool = (id: number, xOffset = 0) => ({
  id,
  tool: getRandomTool(),
  x: -50 - xOffset,
  y: Math.random() * 20 + 10,
  speed: Math.random() * 0.8 + 0.5,
  scale: Math.random() * 0.3 + 0.8,
  rotation: Math.random() * 360,
});

export const calculateOpacity = (x: number) => {
  if (x < 50) return Math.max(0.3, x / 50);
  if (x > 300) return Math.max(0.3, (400 - x) / 100);
  return 0.8;
};
