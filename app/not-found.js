'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, Leaf, Sparkles, Mail, Send } from 'lucide-react';
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

export default function ComingSoonPage() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // ایک خیالی لانچ کی تاریخ (مثلاً 30 دن بعد)
  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30); // 30 دن بعد
    targetDate.setHours(23, 59, 59, 0);

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const [ref1, vis1] = useScrollReveal();
  const [ref2, vis2] = useScrollReveal();
  const [ref3, vis3] = useScrollReveal();

  const revealClass = (visible) =>
    `transition-all duration-1000 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
    }`;

  return (
    <div className="bg-white text-gray-800">
      {/* 1. HERO – چھوٹی ہیڈنگ */}
      <section
        className="relative flex items-center justify-center min-h-screen bg-fixed bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        <div ref={ref1} className={`relative z-10 text-center text-white max-w-5xl px-4 sm:px-6 -mt-20 ${revealClass(vis1)}`}>
           <Sparkles className="mx-auto mb-6 w-16 h-16 sm:w-20 sm:h-20 text-green-300 drop-shadow-lg" />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-2xl">
            Something Wild is Coming
          </h1>
          <p className="mt-4 text-base sm:text-lg md:text-xl text-green-100 max-w-3xl mx-auto drop-shadow">
            We are planting new seeds. A magical forest experience will bloom here soon.
          </p>
        </div>
      </section>

      {/* 2. COUNTDOWN – الٹی گنتی */}
      <section className="py-16 bg-white">
        <div ref={ref2} className={`max-w-4xl mx-auto px-4 sm:px-6 text-center ${revealClass(vis2)}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-green-900 mb-12">
            The Forest Awakens In
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds },
            ].map((item, i) => (
              <div key={i} className="bg-green-50 rounded-2xl p-6 shadow-md">
                <div className="text-4xl sm:text-5xl font-bold text-green-800">{item.value}</div>
                <div className="mt-2 text-green-600 text-sm uppercase tracking-wider">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. STAY IN TOUCH – نیوزلیٹر یا لنکس */}
      <section className="py-20 bg-green-50">
        <div ref={ref3} className={`max-w-3xl mx-auto text-center px-4 ${revealClass(vis3)}`}>
          <Clock className="mx-auto text-green-700 w-12 h-12 mb-6" />
          <h2 className="text-3xl sm:text-4xl font-bold text-green-900 mb-6">
            Don&rsquo;t Miss the First Leaves
          </h2>
          <p className="text-lg text-gray-700 mb-10 max-w-2xl mx-auto">
            Be the first to know when our new forest adventure begins. Leave your email and we’ll send a bird call when it’s ready.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-xl border border-green-200 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
            />
            <button
              type="submit"
              onClick={(e) => e.preventDefault()}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium inline-flex items-center justify-center gap-2 transition-colors"
            >
              <Send size={18} /> Notify Me
            </button>
          </form>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href={ROUTES.HOME} className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-medium inline-flex items-center gap-2 shadow-lg transition-colors">
              <Leaf size={18} /> Return Home
            </Link>
            <Link href={ROUTES.HOME} className="bg-white hover:bg-white text-green-600 px-8 py-4 rounded-xl font-medium inline-flex items-center gap-2 shadow-lg transition-colors">
              <Leaf size={18} /> Explore Existing Forest
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}