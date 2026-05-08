'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';
import LanguageSwitcher from '@/components/common/LanguageSwitcher';
import {
  Menu, X, Home, Compass, MessageCircle, Info, Briefcase,
  Phone, HelpCircle, Shield, FileText
} from 'lucide-react';
import { ROUTES } from '@/constants/routes';

const navLinks = [
  { href: ROUTES.HOME, icon: Home, key: 'home' },
  { href: ROUTES.EXPLORE, icon: Compass, key: 'explore' },
  { href: ROUTES.ABOUT, icon: Info, key: 'about' },
  { href: ROUTES.SERVICES, icon: Briefcase, key: 'services' },
  { href: ROUTES.CHAT, icon: MessageCircle, key: 'chat' },
  { href: ROUTES.CONTACT, icon: Phone, key: 'contact' },
  { href: ROUTES.FAQ, icon: HelpCircle, key: 'faq' },
  { href: ROUTES.PRIVACY, icon: Shield, key: 'privacy' },
  { href: ROUTES.TERMS, icon: FileText, key: 'terms' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  // مینو کھلنے پر باڈی اسکرول بند کریں
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-40 w-full bg-green-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* لوگو */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <span className="text-2xl">🌳</span>
            <span className="hidden sm:inline">Forest Explorer</span>
          </Link>

          {/* دائیں جانب: لینگویج سوئچر + ہیمبرگر (صرف یہ دونوں) */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <button
              onClick={() => setIsOpen(prev => !prev)}
              className="p-2 rounded-md hover:bg-green-600 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* سائیڈ ڈراور (تمام صفحات) */}
      <div
        className={`fixed inset-0 z-[100] transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* بیک ڈراپ */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />

        {/* ڈراور پینل */}
        <div
          className={`absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-green-800 text-white shadow-2xl transform transition-transform duration-300 ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b border-green-700">
            <span className="font-bold text-xl">Explore Pages</span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-md hover:bg-green-700 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* تمام لنکس (آئیکن + نام) */}
          <nav className="flex flex-col p-4 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium hover:bg-green-700 transition-colors"
              >
                <link.icon size={20} />
                {t(`nav.${link.key}`)}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}