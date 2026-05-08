'use client';
import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import FloatingLeaves from '@/components/common/FloatingLeaves';
import {
  ArrowRight,
  Leaf,
  Heart,
  Globe,
  Shield,
  Award,
  Users,
  Clock,
  Quote,
  Mountain,
  Sun,
  Network,
} from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';

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

export default function AboutPage() {
  const { t } = useLanguage();

  const [ref1, vis1] = useScrollReveal();
  const [ref2, vis2] = useScrollReveal();
  const [ref3, vis3] = useScrollReveal();
  const [ref4, vis4] = useScrollReveal();
  const [ref5, vis5] = useScrollReveal();
  const [ref6, vis6] = useScrollReveal();
  const [ref7, vis7] = useScrollReveal();
  const [ref8, vis8] = useScrollReveal();
  const [ref9, vis9] = useScrollReveal();

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
          backgroundImage: `url('./forest3.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />
        <FloatingLeaves />
        <div ref={ref1} className={`relative z-10 text-center text-white max-w-5xl px-4 sm:px-6 -mt-20 ${revealClass(vis1)}`}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-2xl">
            {t('about.title') || 'About the Forest Explorer'}
          </h1>
          <p className="mt-4 text-base sm:text-lg md:text-xl text-green-100 max-w-3xl mx-auto drop-shadow">
            A community rooted in nature, dedicated to sharing the forest&apos;s beauty and wisdom.
          </p>
        </div>
      </section>

      {/* 2. OUR MISSION – smooth green hover */}
      <section className="py-20 bg-white">
        <div ref={ref2} className={`max-w-7xl mx-auto px-4 sm:px-6 text-center ${revealClass(vis2)}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-green-900 mb-12">
            Our Mission
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Leaf, title: 'Conservation', desc: 'Protecting ancient woodlands and the life they shelter.' },
              { icon: Heart, title: 'Education', desc: 'Teaching the next generation to listen to the forest.' },
              { icon: Globe, title: 'Connection', desc: 'Bringing people from all corners into the wild.' },
            ].map((item, i) => (
              <div
                key={i}
                className="group p-8 rounded-2xl bg-green-50 hover:bg-green-200 border border-transparent hover:border-green-400 shadow-md hover:shadow-xl transition-all duration-300"
              >
                <item.icon className="mx-auto text-green-700 w-12 h-12 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-green-900">{item.title}</h3>
                <p className="text-gray-600 group-hover:text-gray-800">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. WHAT WE DO – smooth green hover */}
      <section
        className="py-20 bg-fixed bg-cover bg-center relative"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-white/85" />
        <div ref={ref3} className={`relative max-w-7xl mx-auto px-4 sm:px-6 ${revealClass(vis3)}`}>
          <div className="text-center mb-12">
            <Shield className="mx-auto text-green-600 w-10 h-10 mb-4" />
            <h2 className="text-3xl sm:text-4xl font-bold text-green-900">
              What We Do
            </h2>
            <p className="text-lg text-gray-700 mt-3 max-w-2xl mx-auto">
              Our initiatives grow like forest roots—deep, widespread, and life-giving.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Mountain, title: 'Trail Restoration', desc: 'Rebuilding paths that let you explore without harming nature.' },
              { icon: Sun, title: 'Wildlife Monitoring', desc: 'Using camera traps and citizen science to track forest health.' },
              { icon: Network, title: 'Tree Planting', desc: 'Thousands of saplings planted each year to regrow lost forests.' },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl border border-transparent hover:border-green-400 hover:bg-green-50 transition-all duration-300 group"
              >
                <div className="text-green-600 mb-4 flex justify-center">
                  <item.icon size={40} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-green-700">{item.title}</h3>
                <p className="mt-2 text-gray-600 group-hover:text-gray-800">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. OUR VALUES – smooth green hover */}
      <section className="py-20 bg-green-50">
        <div ref={ref4} className={`max-w-7xl mx-auto px-4 sm:px-6 text-center ${revealClass(vis4)}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-green-900 mb-12">
            Our Values
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: 'Respect', desc: 'We tread lightly and honor every living creature.' },
              { icon: Award, title: 'Integrity', desc: 'Science and honesty guide every decision.' },
              { icon: Users, title: 'Community', desc: 'Together we can protect what we love.' },
              { icon: Clock, title: 'Patience', desc: 'Nature moves at its own pace, and so do we.' },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg border border-transparent hover:border-green-400 hover:bg-green-100 transition-all duration-300 group"
              >
                <item.icon className="mx-auto text-green-700 w-10 h-10 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-green-900">{item.title}</h3>
                <p className="mt-2 text-gray-600 text-sm group-hover:text-gray-800">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. STATS */}
      <section className="py-16 bg-green-800 text-white">
        <div ref={ref5} className={`max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center ${revealClass(vis5)}`}>
          {[
            { number: '25K+', label: 'Trees Planted' },
            { number: '60+', label: 'Guided Tours' },
            { number: '15', label: 'Countries' },
            { number: '100%', label: 'Passion' },
          ].map((stat, i) => (
            <div key={i} className="p-4">
              <div className="text-4xl md:text-5xl font-bold">{stat.number}</div>
              <div className="mt-2 text-green-200 text-sm uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. MEET THE TEAM – smooth green hover on card */}
      <section className="py-20 bg-white">
        <div ref={ref6} className={`max-w-7xl mx-auto px-4 sm:px-6 text-center ${revealClass(vis6)}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-green-900 mb-12">
            Meet the Guardians
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Elena Woods', role: 'Founder', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
              { name: 'Marcus Fern', role: 'Head Ranger', img: ' ./Marcus Fern.jpg' },
              { name: 'Aria Moss', role: 'Educator', img: ' ./Aria Moss.jpg' },
              { name: 'Leo Stone', role: 'Conservationist', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
            ].map((person, i) => (
              <div
                key={i}
                className="bg-green-50 rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-transparent hover:border-green-400 transition-all duration-300 group"
              >
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={person.img}
                    alt={person.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-green-900/0 group-hover:bg-green-900/20 transition-colors duration-300" />
                </div>
                <div className="p-4 group-hover:bg-green-100 transition-colors duration-300">
                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-green-900">{person.name}</h3>
                  <p className="text-green-700 text-sm">{person.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. TIMELINE */}
      <section
        className="py-20 bg-fixed bg-cover bg-center relative"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-green-900/80" />
        <div ref={ref7} className={`relative max-w-3xl mx-auto px-4 text-white ${revealClass(vis7)}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Our Journey</h2>
          <div className="space-y-8">
            {[
              { year: '2018', event: 'First seed planted – a community of 5 nature lovers.' },
              { year: '2019', event: 'Forest walks and first educational workshops began.' },
              { year: '2021', event: 'Partnerships with global conservation groups formed.' },
              { year: '2023', event: '100,000 trees planted and a growing digital sanctuary.' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="bg-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg shadow-lg shrink-0">
                  {item.year}
                </div>
                <p className="text-green-100 text-lg">{item.event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. QUOTE */}
      <section className="py-20 bg-white">
        <div ref={ref8} className={`max-w-3xl mx-auto text-center px-4 ${revealClass(vis8)}`}>
          <Quote className="mx-auto text-green-300 w-12 h-12 mb-6" />
          <p className="text-2xl md:text-4xl font-serif italic text-green-800 leading-relaxed">
            “The clearest way into the Universe is through a forest wilderness.”
          </p>
          <p className="mt-6 text-green-600 font-medium">— John Muir</p>
        </div>
      </section>

      {/* 9. CTA */}
      <section
        className="py-20 bg-cover bg-center relative"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-green-900/70" />
        <div ref={ref9} className={`relative max-w-4xl mx-auto text-center text-white px-4 ${revealClass(vis9)}`}>
          <Leaf className="mx-auto w-12 h-12 mb-4 text-green-200" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Become a Part of the Forest
          </h2>
          <p className="text-green-100 text-lg mb-8 max-w-xl mx-auto">
            Join our community, plant a tree, or simply listen to the whispers of the wild.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={ROUTES.CONTACT}>
              <button className="bg-white text-green-800 hover:bg-green-100 px-8 py-4 rounded-xl font-medium inline-flex items-center gap-2 shadow-lg transition-colors">
                Get in Touch <ArrowRight size={18} />
              </button>
            </Link>
            <Link href={ROUTES.EXPLORE}>
              <button className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-xl font-medium inline-flex items-center gap-2 transition-colors">
                Explore the Wild <ArrowRight size={18} />
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}