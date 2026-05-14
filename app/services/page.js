'use client';
import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import FloatingLeaves from '@/components/common/FloatingLeaves';
import {
  ArrowRight,
  Leaf,
  Shield,
  Award,
  Heart,
  Star,
  Footprints,
  Backpack,
  TreePine,
  Quote,
  Sparkles,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';

// ---------- Scroll reveal hook ----------
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

// ---------- SERVICE IMAGES ----------
const SERVICE_IMAGES = [
  './forset5.jpg',
  './forset6.jpg',
  './forset7.jpg',
  'https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1502082553048-f009c37129b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
];

export default function ServicesPage() {
  const { t } = useLanguage();
  const services = Array.isArray(t('services.items')) ? t('services.items') : [];

  // ---------- Modal State ----------
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const openServiceModal = (svc, idx) => {
    setModalContent({
      image: SERVICE_IMAGES[idx % SERVICE_IMAGES.length],
      icon: idx === 0 ? Footprints : idx === 1 ? Backpack : TreePine,
      title: svc.title,
      type: 'Service',
      desc: svc.desc,
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalContent(null);
  };

  // ---------- Refs ----------
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

  // ---------- Animated counters ----------
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const statsRef = useRef(null);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    const node = statsRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStartedRef.current) {
          hasStartedRef.current = true;
          const targets = [100, 50, 1000, 0];
          let step = 0;
          const totalSteps = 40;
          const interval = setInterval(() => {
            step++;
            const progress = step / totalSteps;
            const newCounts = targets.map((target) => Math.min(Math.round(target * progress), target));
            setCounts(newCounts);
            if (step >= totalSteps) {
              clearInterval(interval);
              setCounts(targets);
            }
          }, 40);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const displayValues = counts.map((v, i) => {
    if (i === 3) return '24/7';
    if (i === 2) return v >= 1000 ? '1k+' : v + '+';
    return v + (i === 0 ? '%' : '+');
  });

  return (
    <div className="bg-white text-gray-800">
      {/* ==================== HERO (split, centered content) ==================== */}
      <section
        className="relative flex items-center justify-center min-h-screen bg-fixed bg-cover bg-center overflow-hidden"
        style={{
           backgroundImage: `url('./forsett2.jpg')`, 
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60" />
        <FloatingLeaves />
        <div ref={ref1} className={`relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-12 ${revealClass(vis1)}`}>
          <div className="text-center lg:text-left lg:w-1/2">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-2xl text-white">
              {t('services.title') || 'Our Services'}
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-green-100 max-w-xl drop-shadow">
              Expertly crafted adventures, workshops, and conservation missions to connect you deeply with nature.
            </p>
            <div className="mt-8">
              <Link href={ROUTES.CONTACT}>
                <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-medium inline-flex items-center gap-2 shadow-lg transition-colors">
                  Get Started <ArrowRight size={18} />
                </button>
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2 grid grid-cols-2 gap-4">
            {services.slice(0, 4).map((svc, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-white flex flex-col items-center text-center hover:bg-white/20 transition-colors cursor-default">
                <div className="text-green-300 mb-2">
                  {i === 0 ? <Footprints size={28} /> : i === 1 ? <Backpack size={28} /> : i === 2 ? <TreePine size={28} /> : <Leaf size={28} />}
                </div>
                <h3 className="font-semibold text-sm">{svc.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== WHAT WE OFFER – no image icons, enhanced hover ==================== */}
      <section className="py-20 bg-white">
        <div ref={ref2} className={`max-w-7xl mx-auto px-4 sm:px-6 text-center ${revealClass(vis2)}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-green-900 mb-4">
            What We Offer
          </h2>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            Choose from our carefully curated experiences. Click any card to learn more.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((svc, i) => (
              <div
                key={i}
                onClick={() => openServiceModal(svc, i)}
                className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-green-100 hover:border-green-400 cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={SERVICE_IMAGES[i % SERVICE_IMAGES.length]}
                    alt={svc.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
                  {/* Image Icon Removed */}
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-gray-800 group-hover:text-green-900 mb-2">{svc.title}</h3>
                  <p className="text-gray-600">{svc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== WHY JOURNEY WITH US – improved cards ==================== */}
      <section
        className="py-20 bg-fixed bg-cover bg-center relative"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-green-900/80" />
        <div ref={ref3} className={`relative max-w-7xl mx-auto px-4 sm:px-6 text-center text-white ${revealClass(vis3)}`}>
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 flex items-center justify-center gap-3">
            <Sparkles className="w-8 h-8 text-yellow-400" /> Why Journey With Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: 'Safety First', desc: 'Certified guides and top-notch equipment for worry-free exploration.' },
              { icon: Award, title: 'Expert Naturalists', desc: 'Learn from passionate scientists who know the forest inside out.' },
              { icon: Heart, title: 'Eco‑Conscious', desc: 'We minimize impact and give back through conservation projects.' },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-md p-8 rounded-2xl text-left hover:bg-white/20 transition-colors group border border-transparent hover:border-green-400"
              >
                <item.icon className="text-green-300 w-12 h-12 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-green-100">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== HOW IT WORKS – refined timeline ==================== */}
      <section className="py-20 bg-green-50">
        <div ref={ref4} className={`max-w-5xl mx-auto px-4 sm:px-6 ${revealClass(vis4)}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-green-900 text-center mb-12 flex items-center justify-center gap-3">
            <Sparkles className="w-8 h-8 text-green-600" /> Your Adventure Path
          </h2>
          <div className="relative">
            <div className="hidden md:block absolute left-8 top-0 bottom-0 w-0.5 bg-green-300" />
            <div className="space-y-12">
              {[
                { step: '1', title: 'Choose Your Experience', desc: 'Browse our tours, workshops, or custom expeditions.' },
                { step: '2', title: 'Book Instantly', desc: 'Secure your spot with a simple online reservation.' },
                { step: '3', title: 'Embark & Explore', desc: 'Meet your guide, step into the wild, and let the forest tell its story.' },
              ].map((item, i) => (
                <div key={i} className="flex flex-col md:flex-row items-start gap-6 pl-0 md:pl-12 relative">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-600 text-white font-bold text-xl shadow-lg z-10 shrink-0 group-hover:bg-green-700 transition-colors">
                    {item.step}
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-md w-full md:w-auto flex-1 hover:shadow-lg transition-shadow border border-transparent hover:border-green-300">
                    <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                    <p className="mt-1 text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== STATS – ANIMATED COUNTERS ==================== */}
      <section className="py-16 bg-green-800 text-white">
        <div ref={statsRef} className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {['Satisfaction', 'Tours/Year', 'Happy Explorers', 'Support'].map((label, i) => (
            <div key={i} className="p-4">
              <div className="text-5xl md:text-6xl font-bold">
                {displayValues[i]}
              </div>
              <div className="mt-2 text-green-200 text-sm uppercase tracking-wider">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== TESTIMONIALS – bigger, better cards ==================== */}
      <section className="py-20 bg-white">
        <div ref={ref6} className={`max-w-7xl mx-auto px-4 sm:px-6 text-center ${revealClass(vis6)}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-green-900 mb-12 flex items-center justify-center gap-3">
            <Star className="w-8 h-8 text-yellow-500" /> What Explorers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { text: 'The guided tour was life‑changing. I saw an owl for the first time!', author: 'Emily R.', role: 'Explorer' },
              { text: 'Their conservation workshop inspired me to start a local tree‑planting group.', author: 'James L.', role: 'Conservationist' },
            ].map((q, i) => (
              <div
                key={i}
                className="bg-green-50 p-8 sm:p-10 rounded-2xl shadow-md hover:shadow-lg transition-all text-left group border border-transparent hover:border-green-400"
              >
                <div className="flex items-start gap-5">
                  <Star className="text-yellow-500 w-10 h-10 shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                  <div>
                    <Quote className="text-green-300 w-8 h-8 mb-3" />
                    <p className="text-gray-700 italic text-lg leading-relaxed">{q.text}</p>
                    <div className="mt-5 border-t border-green-200 pt-4">
                      <p className="font-semibold text-green-800 text-lg">{q.author}</p>
                      <p className="text-sm text-green-600 mt-1">{q.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FAQ PREVIEW – accordion ==================== */}
      <section className="py-20 bg-green-50">
        <div ref={ref7} className={`max-w-4xl mx-auto px-4 sm:px-6 ${revealClass(vis7)}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-green-900 text-center mb-12">
            Quick Answers
          </h2>
          <div className="space-y-4">
            {[
              { q: 'Do I need experience?', a: 'No, our tours suit all levels, from beginners to seasoned hikers.' },
              { q: 'What should I bring?', a: 'Comfortable shoes, a water bottle, and a curious spirit!' },
              { q: 'Are the trips eco‑friendly?', a: 'Absolutely – we follow Leave No Trace principles.' },
            ].map((item, i) => (
              <details key={i} className="bg-white rounded-xl p-5 shadow group cursor-pointer hover:shadow-md transition-shadow">
                <summary className="font-medium text-green-800 flex justify-between items-center cursor-pointer">
                  {item.q}
                  <ArrowRight className="w-5 h-5 transition-transform group-open:rotate-90" />
                </summary>
                <p className="mt-3 text-gray-600">{item.a}</p>
              </details>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href={ROUTES.FAQ} className="inline-flex items-center gap-2 text-green-700 hover:underline font-medium">
              View all FAQs <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== CTA – extra polish ==================== */}
      <section
        className="py-20 bg-cover bg-center relative"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-green-900/70" />
        <div ref={ref8} className={`relative max-w-4xl mx-auto text-center text-white px-4 ${revealClass(vis8)}`}>
          <Leaf className="mx-auto w-14 h-14 mb-5 text-green-200 animate-float" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-green-100 text-lg mb-10 max-w-xl mx-auto">
            Book a tour, join a workshop, or get in touch to craft your perfect nature experience.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={ROUTES.CONTACT}>
              <button className="bg-white text-green-800 hover:bg-green-100 px-8 py-4 rounded-xl font-medium inline-flex items-center gap-2 shadow-lg transition-colors">
                Contact Us <ArrowRight size={18} />
              </button>
            </Link>
            <Link href={ROUTES.CHAT}>
              <button className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-xl font-medium inline-flex items-center gap-2 transition-colors">
                Ask the Spirit <ArrowRight size={18} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== MODAL ==================== */}
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
              {modalContent.icon && (
                <div className="flex items-center gap-3 mb-4">
                  <modalContent.icon className="text-green-700 w-8 h-8" />
                  <span className="text-xs font-medium uppercase tracking-wider text-green-700 bg-green-100 px-3 py-1 rounded-full">
                    {modalContent.type}
                  </span>
                </div>
              )}
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{modalContent.title}</h3>
              <p className="text-gray-600">{modalContent.desc}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}