'use client';
import { Leaf } from 'lucide-react';

export default function ForestLoader({ fullScreen = false, message = 'The Forest Awaits You...' }) {
  const containerClasses = fullScreen
    ? 'fixed inset-0 z-[200] bg-white flex items-center justify-center'
    : 'flex items-center justify-center py-20';

  return (
    <div className={containerClasses}>
      <div className="text-center">
        <div className="relative mx-auto mb-6 w-16 h-16 flex items-center justify-center">
          <Leaf size={48} className="text-green-600 animate-spin-slow" style={{ animationDuration: '3s' }} />
        </div>
        <p className="text-xl font-semibold text-green-800 tracking-wide">{message}</p>
        <div className="mt-3 flex justify-center gap-1">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  );
}