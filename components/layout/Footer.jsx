'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';
import { ROUTES } from '@/constants/routes';
import { Leaf, Globe, Heart, ChevronUp } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();
  const [showScroll, setShowScroll] = useState(false);

  // اسکرول پوزیشن دیکھ کر بٹن دکھانے / چھپانے کا فیصلہ
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-green-800 text-white mt-auto relative">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <Link href="/" className="text-2xl font-bold flex items-center gap-2">
            <Leaf size={28} /> Forest Explorer
          </Link>
          <p className="mt-2 text-sm text-green-200">
            {t('hero.subtitle')}
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-green-200 mb-3">{t('footer.explore')}</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href={ROUTES.EXPLORE} className="hover:text-green-100">{t('nav.explore')}</Link></li>
            <li><Link href={ROUTES.CHAT} className="hover:text-green-100">{t('nav.chat')}</Link></li>
            <li><Link href={ROUTES.ABOUT} className="hover:text-green-100">{t('nav.about')}</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-green-200 mb-3">{t('footer.follow')}</h3>
          <div className="flex gap-4 mt-2">
            <a href="#" className="hover:text-green-100"><Globe size={20} /></a>
            <a href="#" className="hover:text-green-100"><Heart size={20} /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-green-700 py-4 text-center text-sm text-green-200">
        &copy; {new Date().getFullYear()} Forest Explorer. {t('footer.rights')}
      </div>

      {/* اسکرول ٹو ٹاپ بٹن */}
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Scroll to top"
        >
          <ChevronUp size={24} />
        </button>
      )}
    </footer>
  );
}