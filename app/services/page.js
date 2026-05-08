'use client';
import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import FloatingLeaves from '@/components/common/FloatingLeaves';
import {
  ArrowRight,
  Leaf,
  Shield,
  Award,
  Clock,
  Heart,
  Star,
  CheckCircle,
  Footprints,
  Backpack,
  TreePine,
  Quote,
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

export default function ServicesPage() {
  const { t } = useLanguage();
  const services = Array.isArray(t('services.items')) ? t('services.items') : [];

  // All cards are display + hover only, so no modal state needed.

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
          backgroundImage: `url('https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />
        <FloatingLeaves />
        <div ref={ref1} className={`relative z-10 text-center text-white max-w-5xl px-4 sm:px-6 -mt-20 ${revealClass(vis1)}`}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-2xl">
            {t('services.title') || 'Our Services'}
          </h1>
          <p className="mt-4 text-base sm:text-lg md:text-xl text-green-100 max-w-3xl mx-auto drop-shadow">
            Expertly crafted adventures, workshops, and conservation missions to connect you deeply with nature.
          </p>
        </div>
      </section>

      {/* 2. CORE SERVICES – smooth green hover, no click */}
      <section className="py-20 bg-white">
        <div ref={ref2} className={`max-w-7xl mx-auto px-4 sm:px-6 text-center ${revealClass(vis2)}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-green-900 mb-12">
            What We Offer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((svc, i) => (
              <div
                key={i}
                className="group p-8 rounded-2xl bg-green-50 hover:bg-green-200 border border-transparent hover:border-green-400 shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="text-green-700 mb-4 flex justify-center">
                  {i === 0 ? <Footprints size={40} /> : i === 1 ? <Backpack size={40} /> : <TreePine size={40} />}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-green-900">{svc.title}</h3>
                <p className="mt-2 text-gray-600 group-hover:text-gray-800">{svc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. WHY JOURNEY WITH US – smooth green hover */}
      <section className="py-20 bg-green-50">
        <div ref={ref3} className={`max-w-7xl mx-auto px-4 sm:px-6 text-center ${revealClass(vis3)}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-green-900 mb-12">
            Why Journey With Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: 'Safety First', desc: 'Certified guides and top-notch equipment for worry-free exploration.' },
              { icon: Award, title: 'Expert Naturalists', desc: 'Learn from passionate scientists who know the forest inside out.' },
              { icon: Heart, title: 'Eco‑Conscious', desc: 'We minimize impact and give back through conservation projects.' },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg border border-transparent hover:border-green-400 hover:bg-green-100 transition-all duration-300 group"
              >
                <item.icon className="mx-auto text-green-700 w-12 h-12 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-green-900">{item.title}</h3>
                <p className="mt-2 text-gray-600 group-hover:text-gray-800">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS – unchanged */}
      <section className="py-20 bg-white">
        <div ref={ref4} className={`max-w-4xl mx-auto px-4 sm:px-6 ${revealClass(vis4)}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-green-900 text-center mb-12">
            Your Adventure Path
          </h2>
          <div className="space-y-8">
            {[
              { step: '1', title: 'Choose Your Experience', desc: 'Browse our tours, workshops, or custom expeditions.' },
              { step: '2', title: 'Book Instantly', desc: 'Secure your spot with a simple online reservation.' },
              { step: '3', title: 'Embark & Explore', desc: 'Meet your guide, step into the wild, and let the forest tell its story.' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-5">
                <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl shrink-0 shadow-lg">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                  <p className="mt-1 text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. STATS – unchanged */}
      <section className="py-16 bg-green-800 text-white">
        <div ref={ref5} className={`max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center ${revealClass(vis5)}`}>
          {[
            { number: '100%', label: 'Satisfaction' },
            { number: '50+', label: 'Tours/Year' },
            { number: '1k+', label: 'Happy Explorers' },
            { number: '24/7', label: 'Support' },
          ].map((stat, i) => (
            <div key={i} className="p-4">
              <div className="text-4xl md:text-5xl font-bold">{stat.number}</div>
              <div className="mt-2 text-green-200 text-sm uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. TESTIMONIALS – hover only, no click */}
      <section
        className="py-20 bg-fixed bg-cover bg-center relative"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-green-900/80" />
        <div ref={ref6} className={`relative max-w-5xl mx-auto px-4 sm:px-6 text-center text-white ${revealClass(vis6)}`}>
          <Star className="mx-auto text-yellow-400 w-12 h-12 mb-6" />
          <h2 className="text-3xl sm:text-4xl font-bold mb-12">
            What Explorers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { text: 'The guided tour was life‑changing. I saw an owl for the first time!', author: 'Emily R.' },
              { text: 'Their conservation workshop inspired me to start a local tree‑planting group.', author: 'James L.' },
            ].map((q, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-md p-8 rounded-2xl text-left hover:bg-white/20 transition-all duration-300 group border border-transparent hover:border-green-400"
              >
                <Quote className="text-green-300 mb-4 w-8 h-8" />
                <p className="text-lg italic mb-4">{q.text}</p>
                <p className="font-semibold text-green-200">– {q.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FAQ PREVIEW – unchanged */}
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
              <details key={i} className="bg-white rounded-xl p-4 shadow group cursor-pointer">
                <summary className="font-medium text-green-800 flex justify-between items-center">
                  {item.q}
                  <ArrowRight className="w-5 h-5 transition-transform group-open:rotate-90" />
                </summary>
                <p className="mt-3 text-gray-600">{item.a}</p>
              </details>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href={ROUTES.FAQ} className="inline-flex items-center gap-2 text-green-700 hover:underline font-medium">
              View all FAQs <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. CTA – unchanged */}
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
            Ready to Begin Your Journey?
          </h2>
          <p className="text-green-100 text-lg mb-8 max-w-xl mx-auto">
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
    </div>
  );
}