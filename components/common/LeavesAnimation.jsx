'use client';
import { useEffect, useState } from 'react';

const leaves = ['🍃', '🍂', '🍁', '🌿'];

export default function LeavesAnimation() {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    const items = [];
    for (let i = 0; i < 15; i++) {
      items.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 10 + Math.random() * 15,
        size: 16 + Math.random() * 24,
        emoji: leaves[Math.floor(Math.random() * leaves.length)],
      });
    }
    setElements(items);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {elements.map((el) => (
        <span
          key={el.id}
          className="absolute animate-leaf opacity-30"
          style={{
            left: `${el.left}%`,
            top: '-5%',
            animationDelay: `${el.delay}s`,
            animationDuration: `${el.duration}s`,
            fontSize: `${el.size}px`,
          }}
        >
          {el.emoji}
        </span>
      ))}
    </div>
  );
}