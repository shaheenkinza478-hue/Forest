'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';
import LanguageSwitcher from '@/components/common/LanguageSwitcher';
import {
  Menu, X, Home, Compass, MessageCircle, Info, Briefcase,
  Phone, HelpCircle, Shield, FileText, TreePine
} from 'lucide-react';
import { ROUTES } from '@/constants/routes';

const navLinks = [
  { href: ROUTES.HOME, icon: Home, key: 'home' },
  { href: ROUTES.EXPLORE, icon: Compass, key: 'explore' },
  { href: ROUTES.ABOUT, icon: Info, key: 'about' },
  { href: ROUTES.SERVICES, icon: Briefcase, key: 'services' },
  { href: ROUTES.CONTACT, icon: Phone, key: 'contact' },
  { href: ROUTES.FAQ, icon: HelpCircle, key: 'faq' },
  { href: ROUTES.LEGAL, icon: Shield, key: 'legal' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  const [linkStates, setLinkStates] = useState([]);
  const typingTimeoutRef = useRef(null);
  const loopPauseTimeoutRef = useRef(null);

  const getLinkText = (key) => t(`nav.${key}`);

  const clearTypingTimeouts = () => {
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    if (loopPauseTimeoutRef.current) clearTimeout(loopPauseTimeoutRef.current);
  };

  const resetTyping = () => {
    const texts = navLinks.map(link => getLinkText(link.key));
    setLinkStates(texts.map(() => ({ visible: false, typedText: '' })));
  };

  const startTypingLoop = () => {
    let currentIndex = 0;
    let charIndex = 0;
    const texts = navLinks.map(link => getLinkText(link.key));

    setLinkStates(texts.map(() => ({ visible: false, typedText: '' })));

    const typeNext = () => {
      if (currentIndex >= texts.length) {
        loopPauseTimeoutRef.current = setTimeout(() => {
          resetTyping();
          currentIndex = 0;
          charIndex = 0;
          typeNext();
        }, 1000);
        return;
      }

      const fullText = texts[currentIndex];

      if (charIndex === 0) {
        setLinkStates(prev => {
          const newStates = [...prev];
          newStates[currentIndex] = { visible: true, typedText: '' };
          return newStates;
        });
        typingTimeoutRef.current = setTimeout(() => {
          charIndex = 1;
          setLinkStates(prev => {
            const newStates = [...prev];
            newStates[currentIndex] = { visible: true, typedText: fullText.substring(0, 1) };
            return newStates;
          });
          typingTimeoutRef.current = setTimeout(typeNext, 50);
        }, 100);
        return;
      }

      if (charIndex < fullText.length) {
        setLinkStates(prev => {
          const newStates = [...prev];
          newStates[currentIndex] = { visible: true, typedText: fullText.substring(0, charIndex + 1) };
          return newStates;
        });
        charIndex++;
        typingTimeoutRef.current = setTimeout(typeNext, 50);
      } else {
        currentIndex++;
        charIndex = 0;
        typingTimeoutRef.current = setTimeout(typeNext, 100);
      }
    };

    typeNext();
  };

  useEffect(() => {
    if (!isOpen) {
      clearTypingTimeouts();
      resetTyping();
      return;
    }
    startTypingLoop();
    return () => clearTypingTimeouts();
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-40 w-full bg-green-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - with professional TreePine icon */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl hover:opacity-80 transition-opacity cursor-pointer"
          >
            <TreePine size={24} className="text-green-200" />
            <span className="hidden sm:inline">Forest Explorer</span>
          </Link>

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

      {/* Drawer */}
      <div
        className={`fixed inset-0 z-[100] transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />

        <div
          className={`absolute top-0 right-0 w-80 max-w-[85vw] h-screen bg-green-800 text-white shadow-2xl transform transition-transform duration-300 ${isOpen ? 'translate-y-0' : '-translate-y-full'
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

          <nav className="flex flex-col p-4 gap-2 overflow-y-auto h-[calc(100vh-70px)]">
            {navLinks.map((link, index) => {
              const state = linkStates[index] || { visible: false, typedText: '' };
              const fullText = getLinkText(link.key);
              const isActiveTyping = state.visible && state.typedText.length < fullText.length;

              return (
                <Link
                  key={link.key}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium hover:bg-green-700 transition-colors ${!state.visible ? 'opacity-0' : 'opacity-100'
                    }`}
                >
                  <link.icon size={20} className="flex-shrink-0" />
                  <span className="font-mono">
                    {state.typedText}
                    {isActiveTyping && (
                      <span className="inline-block w-[2px] h-5 bg-green-300 ml-0.5 animate-pulse" />
                    )}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}