'use client';
import { useState, useEffect, useRef } from 'react';
 import { useLanguage } from '@/hooks/useLanguage';
import {
  ArrowRight,
  HelpCircle,
  MessageCircle,
  Leaf,
  Quote,
  Star,
  X,
  Sparkles,
  Shield,
  Award,
  Clock,
  Users,
  Compass,
  FileText,
} from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';

// ========== اسکرول ریویل ہک ==========
function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, isVisible];
}

// ========== گرتے پتے ==========
function FloatingLeaves() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 12 }).map((_, i) => (
        <span
          key={i}
          className="absolute text-green-300 opacity-20 animate-leaf-fall"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-${Math.random() * 20}px`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${10 + Math.random() * 15}s`,
            fontSize: `${12 + Math.random() * 16}px`,
          }}
        >
          🍃
        </span>
      ))}
    </div>
  );
}

// ========== فارسٹ تصاویر (موڈل کے لیے) ==========
const FOREST_IMAGES = [
  'https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1502082553048-f009c37129b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
];

export default function FAQPage() {
  const { t } = useLanguage();

  // سوالات – ترجمہ فائل سے یا فال بیک
  const faqItems = Array.isArray(t('faq.questions')) ? t('faq.questions') : [];

  // موڈل اسٹیٹ
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const openQuestionModal = (question, answer, index) => {
    setModalContent({
      image: FOREST_IMAGES[index % FOREST_IMAGES.length],
      title: question,
      type: 'Answer',
      desc: answer,
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalContent(null);
  };

  // سیکشن ریفز
  const [ref1, vis1] = useScrollReveal();
  const [ref2, vis2] = useScrollReveal();
  const [ref3, vis3] = useScrollReveal();
  const [ref4, vis4] = useScrollReveal();
  const [ref5, vis5] = useScrollReveal();
  const [ref6, vis6] = useScrollReveal();
  const [ref7, vis7] = useScrollReveal();
  const [ref8, vis8] = useScrollReveal();

  const revealClass = (visible) =>
    `transition-all duration-1000 ease-out ${
      visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
    }`;

  return (
    <div className="bg-white text-gray-800">
      {/* 1. HERO */}
      <section
        className="relative flex items-center justify-center min-h-screen bg-fixed bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `url('./forset4.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />
        <FloatingLeaves />
        <div ref={ref1} className={`relative z-10 text-center text-white max-w-5xl px-4 sm:px-6 -mt-20 ${revealClass(vis1)}`}>
           <MessageCircle className="mx-auto mb-6 w-16 h-16 sm:w-20 sm:h-20 text-green-300 drop-shadow-lg" />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-2xl">
            {t('faq.title') || 'Frequently Asked Questions'}
          </h1>
          <p className="mt-4 text-base sm:text-lg md:text-xl text-green-100 max-w-3xl mx-auto drop-shadow">
            Everything you’ve ever wondered about the forest — answered.
          </p>
        </div>
      </section>

      {/* 2. فوری سوالات – گرڈ میں سوالات */}
      <section className="py-20 bg-white">
        <div ref={ref2} className={`max-w-7xl mx-auto px-4 sm:px-6 text-center ${revealClass(vis2)}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-green-900 mb-12">
            Browse Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {faqItems.map((item, i) => (
              <div
                key={i}
                onClick={() => openQuestionModal(item.q, item.a, i)}
                className="bg-green-50 p-4 rounded-xl shadow hover:shadow-md transition-all cursor-pointer group flex items-start gap-3 text-left"
              >
                <HelpCircle className="w-5 h-5 text-green-600 mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                <p className="font-medium text-gray-800 group-hover:text-green-700">
                  {item.q}
                </p>
              </div>
            ))}
          </div>
          {faqItems.length === 0 && (
            <p className="text-gray-500 mt-6">No questions available yet. Check back soon!</p>
          )}
        </div>
      </section>

      {/* 3. اعداد و شمار */}
      <section className="py-16 bg-green-800 text-white">
        <div ref={ref3} className={`max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center ${revealClass(vis3)}`}>
          {[
            { number: `${faqItems.length}`, label: 'Questions' },
            { number: '100%', label: 'Clarity' },
            { number: '24/7', label: 'Support' },
            { number: '∞', label: 'Curiosity' },
          ].map((stat, i) => (
            <div key={i} className="p-4">
              <div className="text-4xl md:text-5xl font-bold">{stat.number}</div>
              <div className="mt-2 text-green-200 text-sm uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. سوالات کی اقسام – آئیکن کارڈز */}
      <section className="py-20 bg-white">
        <div ref={ref4} className={`max-w-7xl mx-auto px-4 sm:px-6 text-center ${revealClass(vis4)}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-green-900 mb-12">
            What People Ask About
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Leaf, title: 'Forest & Wildlife', desc: 'Learn about animals, birds, and plants of the wild.' },
              { icon: Shield, title: 'Safety & Rules', desc: 'How to explore without disturbing the natural balance.' },
              { icon: Compass, title: 'Tours & Activities', desc: 'Everything you need before stepping onto the trail.' },
            ].map((item, i) => (
              <div key={i} className="bg-green-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all">
                <item.icon className="mx-auto text-green-700 w-12 h-12 mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. کیٹیگریڈ سوالات – ایڈوانسڈ */}
      <section className="py-20 bg-green-50">
        <div ref={ref5} className={`max-w-4xl mx-auto px-4 sm:px-6 ${revealClass(vis5)}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-green-900 text-center mb-12">
            Top Questions
          </h2>
          <div className="space-y-4">
            {faqItems.slice(0, 5).map((item, i) => (
              <details key={i} className="bg-white rounded-xl p-4 shadow group cursor-pointer">
                <summary className="font-medium text-green-800 flex justify-between items-center">
                  {item.q}
                  <ArrowRight className="w-5 h-5 transition-transform group-open:rotate-90" />
                </summary>
                <p className="mt-3 text-gray-600">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIAL */}
      <section
        className="py-20 bg-fixed bg-cover bg-center relative"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-green-900/80" />
        <div ref={ref6} className={`relative max-w-4xl mx-auto px-4 sm:px-6 text-center text-white ${revealClass(vis6)}`}>
          <Quote className="mx-auto text-green-300 w-12 h-12 mb-6" />
          <p className="text-2xl md:text-4xl italic font-light leading-relaxed">
            “The FAQ page answered every curiosity — it felt like the forest itself was speaking.”
          </p>
          <p className="mt-6 text-green-200 font-medium">— A Happy Explorer</p>
        </div>
      </section>

      {/* 7. مزید مدد – لنکس */}
      <section className="py-20 bg-white">
        <div ref={ref7} className={`max-w-3xl mx-auto text-center px-4 ${revealClass(vis7)}`}>
          <MessageCircle className="mx-auto text-green-700 w-12 h-12 mb-4" />
          <h2 className="text-3xl sm:text-4xl font-bold text-green-900 mb-6">
            Still Have a Question?
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Our forest spirits (support team) are ready to help. Drop us a message!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={ROUTES.CONTACT}>
              <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-medium inline-flex items-center gap-2 shadow-lg transition-colors">
                Contact Us <ArrowRight size={18} />
              </button>
            </Link>
            <Link href={ROUTES.CHAT}>
              <button className="border-2 border-green-600 text-green-700 hover:bg-green-50 px-8 py-4 rounded-xl font-medium inline-flex items-center gap-2 transition-colors">
                Ask the Spirit <ArrowRight size={18} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* 8. CTA */}
      <section
        className="py-20 bg-cover bg-center relative"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-green-900/70" />
        <div ref={ref8} className={`relative max-w-4xl mx-auto text-center text-white px-4 ${revealClass(vis8)}`}>
          <Leaf className="mx-auto w-12 h-12 mb-4 text-green-200" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Your Adventure Awaits
          </h2>
          <p className="text-green-100 text-lg mb-8 max-w-xl mx-auto">
            All questions cleared? Time to step into the wilderness.
          </p>
          <Link
            href={ROUTES.EXPLORE}
            className="inline-flex items-center gap-2 bg-white text-green-800 hover:bg-green-100 px-10 py-4 text-xl rounded-xl shadow-lg transition-colors"
          >
            Explore Now <ArrowRight size={22} />
          </Link>
        </div>
      </section>

      {/* موڈل (سوال کا تفصیلی جواب + تصویر) */}
      {modalOpen && modalContent && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="relative max-w-3xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-white/80 rounded-full p-2 shadow hover:bg-white transition"
            >
              <X size={24} className="text-green-800" />
            </button>
            <img
              src={modalContent.image}
              alt={modalContent.title}
              className="w-full h-64 sm:h-96 object-cover"
            />
            <div className="p-6">
              <span className="inline-block text-xs font-medium uppercase tracking-wider text-green-700 bg-green-100 px-2 py-1 rounded-full mb-2">
                {modalContent.type}
              </span>
              <h3 className="text-2xl font-bold text-gray-800">{modalContent.title}</h3>
              <p className="mt-2 text-gray-600 whitespace-pre-line">{modalContent.desc}</p>
            </div>
          </div>
        </div>
      )}

      {/* 🌿 اینیمیشن CSS */}
      <style jsx global>{`
        @keyframes leaf-fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.2;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-leaf-fall {
          animation: leaf-fall linear infinite;
        }
      `}</style>
    </div>
  );
}