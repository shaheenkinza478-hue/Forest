'use client';
import { useLanguage } from '@/hooks/useLanguage';
import { Globe } from 'lucide-react';
import { useState } from 'react';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'ur', label: 'اردو' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'fr', label: 'Français' },
  { code: 'zh', label: '中文' },
];

export default function LanguageSwitcher() {
  const { lang, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-forest-100 dark:hover:bg-forest-900 transition-colors"
        aria-label="Change language"
      >
        <Globe size={20} />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 glass rounded-lg shadow-lg overflow-hidden z-50">
          {languages.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                changeLanguage(l.code);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-forest-100 dark:hover:bg-forest-700 transition-colors ${
                lang === l.code ? 'font-bold text-forest-700 dark:text-forest-300' : ''
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}