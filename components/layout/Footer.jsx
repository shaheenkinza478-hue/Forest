'use client';
import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';
import { ROUTES } from '@/constants/routes';
import { Leaf, Globe, Heart, ChevronUp } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();

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

      <div className="border-t border-green-700 py-4 flex justify-center items-center px-4 text-sm text-green-200">
        <div>
          &copy; {new Date().getFullYear()} Forest Explorer. {t('footer.rights')}
        </div>
        {/* Scroll to Top button – footer ke right side par fixed */}
        <button
          onClick={scrollToTop}
          className="bg-green-600 ml-20 hover:bg-green-800 text-white p-2 rounded-full shadow transition-all duration-300 hover:scale-110"
          aria-label="Scroll to top"
        >
          <ChevronUp size={20} />
        </button>
      </div>
    </footer>
  );
}