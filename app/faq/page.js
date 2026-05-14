'use client';
import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import FloatingLeaves from '@/components/common/FloatingLeaves';
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
  Compass,
  Search,
  ChevronUp,
} from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';

// ***** SCROLL REVEAL HOOK *****
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

export default function FAQPage() {
  const { t } = useLanguage();
  const faqItems = Array.isArray(t('faq.questions')) ? t('faq.questions') : [];

  // ========== EXTRA DEFAULT QUESTIONS (English) ==========
  const extraQuestions = [
    { q: 'How can I join a guided tour?', a: 'Simply book online or contact us. Most tours run daily and are suitable for all ages.' },
    { q: 'What should I bring for a forest walk?', a: 'Comfortable shoes, water, insect repellent, and a camera to capture the magic.' },
    { q: 'Are the trails wheelchair accessible?', a: 'Many of our trails are paved or boardwalk-style. Contact us for detailed accessibility info.' },
    { q: 'Can I bring my dog?', a: 'Leashed dogs are welcome on designated trails. Please clean up after your pet.' },
    { q: 'Is there an entrance fee?', a: 'Entry to the forest is free. Some special guided tours have a small fee.' },
    { q: 'What is the best time of year to visit?', a: 'Every season has its charm – spring for blossoms, autumn for color, and summer for full greenery.' },
  ];

  // Combine without duplicates
  const allBrowseQuestions = [
    ...faqItems,
    ...extraQuestions.filter(eq => !faqItems.some(tq => tq.q === eq.q))
  ];

  // ========== SEARCH STATE ==========
  const [searchTerm, setSearchTerm] = useState('');
  const filteredQuestions = allBrowseQuestions.filter(item =>
    item.q.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ========== MODAL STATE (text only) ==========
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const openQuestionModal = (question, answer) => {
    setModalContent({ title: question, desc: answer });
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setModalContent(null);
  };

  // ========== REVEAL REFS ==========
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

  // ========== ANIMATED COUNTERS ==========
  const [questionCount, setQuestionCount] = useState(0);
  const [clarityCount, setClarityCount] = useState(0);
  const statsRef = useRef(null);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    const node = statsRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStartedRef.current) {
          hasStartedRef.current = true;
          const totalSteps = 40;
          let step = 0;
          const targetQ = allBrowseQuestions.length;
          const targetC = 100;
          const interval = setInterval(() => {
            step++;
            const progress = step / totalSteps;
            setQuestionCount(Math.round(targetQ * progress));
            setClarityCount(Math.round(targetC * progress));
            if (step >= totalSteps) {
              clearInterval(interval);
              setQuestionCount(targetQ);
              setClarityCount(targetC);
            }
          }, 40);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [allBrowseQuestions.length]);

  // ========== BACK‑TO‑TOP VISIBILITY ==========
  const [showBackToTop, setShowBackToTop] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-white text-gray-800">
      {/* 1. HERO – NO SEARCH BAR */}
      <section
        className="relative flex items-center justify-center min-h-screen bg-fixed bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `url('./forsett3.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />
        <FloatingLeaves />
        <div
          ref={ref1}
          className={`relative z-10 text-center text-white max-w-4xl px-4 sm:px-6 -mt-20 ${revealClass(vis1)}`}
        >
           <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-2xl">
            {t('faq.title') || 'Frequently Asked Questions'}
          </h1>
          <p className="mt-4 text-base sm:text-lg md:text-xl text-green-100 max-w-3xl mx-auto drop-shadow">
            Everything you’ve ever wondered about the forest — answered.
          </p>
        </div>
      </section>

      {/* 2. BROWSE QUESTIONS – with search & more questions */}
      <section className="py-20 bg-white">
        <div ref={ref2} className={`max-w-5xl mx-auto px-4 sm:px-6 ${revealClass(vis2)}`}>
          <div className="text-center mb-8">
            <Sparkles className="mx-auto text-green-600 w-10 h-10 mb-4" />
            <h2 className="text-3xl sm:text-4xl font-bold text-green-900 mb-4">
              Browse Questions
            </h2>
            <p className="text-lg text-gray-600 max-w-xl mx-auto mb-0">
              Click any question to see a detailed answer.
            </p>
          </div>

          {/* Search + Reset + Results count */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-green-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-green-200 bg-green-50/50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-green-400 hover:text-green-600 transition-colors"
                >
                  <X size={18} />
                </button>
              )}
            </div>
            {searchTerm && (
              <p className="mt-2 text-sm text-green-700">
                Showing {filteredQuestions.length} of {allBrowseQuestions.length} questions
              </p>
            )}
          </div>

          {/* Questions grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredQuestions.map((item, i) => (
              <div
                key={i}
                onClick={() => openQuestionModal(item.q, item.a)}
                className="group flex items-start gap-4 bg-green-50 hover:bg-white border border-transparent hover:border-green-400 p-5 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 active:scale-[0.98]"
              >
                <div className="p-2 rounded-full bg-green-100 group-hover:bg-green-200 transition-colors shrink-0">
                  <HelpCircle className="w-5 h-5 text-green-700" />
                </div>
                <p className="font-medium text-gray-800 group-hover:text-green-900 pt-0.5">
                  {item.q}
                </p>
              </div>
            ))}
          </div>
          {filteredQuestions.length === 0 && (
            <div className="text-center mt-8">
              <p className="text-gray-500 mb-2">🚫 No questions match your search.</p>
              <button
                onClick={() => setSearchTerm('')}
                className="text-green-700 hover:underline text-sm"
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 3. STATS – animated counters */}
      <section className="py-16 bg-green-800 text-white">
        <div ref={statsRef} className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="p-4">
            <div className="text-4xl md:text-5xl font-bold">{questionCount}</div>
            <div className="mt-2 text-green-200 text-sm uppercase tracking-wider">Questions</div>
          </div>
          <div className="p-4">
            <div className="text-4xl md:text-5xl font-bold">{clarityCount}%</div>
            <div className="mt-2 text-green-200 text-sm uppercase tracking-wider">Clarity</div>
          </div>
          <div className="p-4">
            <div className="text-4xl md:text-5xl font-bold">24/7</div>
            <div className="mt-2 text-green-200 text-sm uppercase tracking-wider">Support</div>
          </div>
          <div className="p-4">
            <div className="text-4xl md:text-5xl font-bold">∞</div>
            <div className="mt-2 text-green-200 text-sm uppercase tracking-wider">Curiosity</div>
          </div>
        </div>
      </section>

      {/* 4. CATEGORIES – glass cards */}
      <section className="py-20 bg-white">
        <div ref={ref4} className={`max-w-7xl mx-auto px-4 sm:px-6 text-center ${revealClass(vis4)}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-green-900 mb-12 flex items-center justify-center gap-3">
            <Shield className="w-8 h-8 text-green-600" /> What People Ask About
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Leaf, title: 'Forest & Wildlife', desc: 'Learn about animals, birds, and plants of the wild.' },
              { icon: Shield, title: 'Safety & Rules', desc: 'How to explore without disturbing the natural balance.' },
              { icon: Compass, title: 'Tours & Activities', desc: 'Everything you need before stepping onto the trail.' },
            ].map((item, i) => (
              <div
                key={i}
                className="group relative bg-white/70 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-green-100 hover:border-green-400 transform hover:-translate-y-1"
              >
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-green-600 text-white rounded-full p-4 shadow-lg group-hover:bg-green-700 transition-colors">
                  <item.icon size={28} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2 group-hover:text-green-900">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
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

      {/* 7. STILL HAVE A QUESTION? */}
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
          <Leaf className="mx-auto w-12 h-12 mb-4 text-green-200 animate-float" />
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

      {/* TEXT‑ONLY MODAL (with subtle green overlay) */}
      {modalOpen && modalContent && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="relative max-w-lg w-full bg-white rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Green overlay at top */}
            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-green-200/40 to-transparent pointer-events-none" />
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-white/80 rounded-full p-2 shadow hover:bg-white transition"
            >
              <X size={24} className="text-green-800" />
            </button>
            <div className="pt-14 pb-4 flex justify-center">
              <HelpCircle size={48} className="text-green-700" />
            </div>
            <div className="p-6 sm:p-8 text-center">
              <span className="inline-block text-xs font-medium uppercase tracking-wider text-green-700 bg-green-100 px-3 py-1 rounded-full mb-3">
                Answer
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 leading-snug">
                {modalContent.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-left max-h-96 overflow-y-auto">
                {modalContent.desc}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* BACK‑TO‑TOP BUTTON */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Scroll to top"
        >
          <ChevronUp size={24} />
        </button>
      )}
    </div>
  );
}