'use client';
import { useState, useEffect } from 'react';

function generateLeaves(count = 12) {
  return Array.from({ length: count }, () => ({
    left: Math.random() * 100,
    top: -(Math.random() * 20),
    delay: Math.random() * 5,
    duration: 10 + Math.random() * 15,
    size: 12 + Math.random() * 16,
  }));
}

export default function FloatingLeaves() {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    setLeaves(generateLeaves());
  }, []);

  if (leaves.length === 0) return null;  // سرور پر کچھ رینڈر نہیں ہوگا

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {leaves.map((leaf, i) => (
        <span
          key={i}
          className="absolute text-green-300 opacity-20 animate-leaf-fall"
          style={{
            left: `${leaf.left}%`,
            top: `${leaf.top}px`,
            animationDelay: `${leaf.delay}s`,
            animationDuration: `${leaf.duration}s`,
            fontSize: `${leaf.size}px`,
          }}
        >
          🍃
        </span>
      ))}
    </div>
  );
}