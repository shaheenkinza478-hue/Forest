'use client';
import { useState, useEffect, useRef } from 'react';
 import { useLanguage } from '@/hooks/useLanguage';
import {
  ArrowRight,
  Shield,
  Lock,
  Eye,
  FileText,
  Users,
  Award,
  Heart,
  X,
  Leaf,
  Quote,
  Star,
} from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';

// اسکرول ریویل ہک
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

// 🌿 گرتے پتوں کا بیک‌گراؤنڈ کمپوننٹ
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

const FOREST_IMAGES = [
  'https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1502082553048-f009c37129b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
];

export default function PrivacyPage() {
  const { t } = useLanguage();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const openModal = (title, desc, type = 'Privacy', imageIndex = 0) => {
    setModalContent({
      image: FOREST_IMAGES[imageIndex % FOREST_IMAGES.length],
      title,
      type,
      desc,
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalContent(null);
  };

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
      {/* 1. HERO — گرتے پتوں کے ساتھ */}
      <section
        className="relative flex items-center justify-center min-h-screen bg-fixed bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `url('./forset5.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />
        {/* 🌿 گرتے پتے */}
        <FloatingLeaves />
        <div ref={ref1} className={`relative z-10 text-center text-white max-w-5xl px-4 sm:px-6 -mt-20 ${revealClass(vis1)}`}>
           <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-2xl">
            {t('privacy.title') || 'Privacy Policy'}
          </h1>
          <p className="mt-4 text-base sm:text-lg md:text-xl text-green-100 max-w-3xl mx-auto drop-shadow">
            Your trust is rooted in our transparency. Learn how we protect your data.
          </p>
        </div>
      </section>

      {/* 2. OUR COMMITMENT – کلک کرنے پر موڈل */}
      <section className="py-20 bg-white">
        <div ref={ref2} className={`max-w-7xl mx-auto px-4 sm:px-6 text-center ${revealClass(vis2)}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-green-900 mb-12">
            Our Commitment to Privacy
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'No Hidden Agendas',
                desc: 'We never sell, rent, or share your personal information without consent.',
              },
              {
                icon: Lock,
                title: 'Data Protection',
                desc: 'Your information is encrypted and stored securely using industry standards.',
              },
              {
                icon: Eye,
                title: 'Full Transparency',
                desc: 'You can request a copy of your data anytime, or ask us to delete it.',
              },
            ].map((item, i) => (
              <div
                key={i}
                onClick={() => openModal(item.title, item.desc, 'Commitment', i)}
                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer relative border border-green-100"
              >
                <item.icon className="mx-auto text-green-700 w-12 h-12 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                <p className="mt-2 text-gray-600">{item.desc}</p>
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-2xl transition-opacity">
                  <ArrowRight className="w-8 h-8 text-green-800" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. WHAT WE COLLECT – کلک کرنے پر موڈل */}
      <section className="py-20 bg-green-50">
        <div ref={ref3} className={`max-w-4xl mx-auto px-4 sm:px-6 ${revealClass(vis3)}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-green-900 text-center mb-12">
            Information We Collect
          </h2>
          <div className="space-y-6">
            {[
              {
                title: 'Personal Details',
                shortDesc: 'Your name and email when you contact us or book a tour.',
                longDesc: 'When you send a message or make a booking, we collect your name and email address solely to respond to your request. We never use this information for marketing unless you explicitly agree. You can ask us to delete this data at any time.',
              },
              {
                title: 'Browsing Data',
                shortDesc: 'Anonymous analytics about how you use our site to improve it.',
                longDesc: 'We collect anonymous browsing data — pages visited, time spent, and device type — through privacy‑focused analytics. This helps us understand what content is most useful and improve your experience without identifying you personally.',
              },
              {
                title: 'Cookies',
                shortDesc: 'Small files that remember your preferences (you can disable them).',
                longDesc: 'Our website uses minimal cookies to save your language preference and theme choice (light/dark). These cookies do not track you across other sites. You can disable cookies in your browser settings, though some features may not work as intended.',
              },
            ].map((item, i) => (
              <div
                key={i}
                onClick={() => openModal(item.title, item.longDesc, 'Collected Data', i + 2)}
                className="flex gap-4 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer group relative border border-green-100"
              >
                <div className="shrink-0">
                  <FileText className="text-green-600 w-6 h-6 group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 group-hover:text-green-700">{item.title}</h3>
                  <p className="text-gray-600 mt-1">{item.shortDesc}</p>
                </div>
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-xl transition-opacity">
                  <ArrowRight className="w-8 h-8 text-green-800 drop-shadow-lg" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. HOW WE USE IT */}
      <section className="py-20 bg-white">
        <div ref={ref4} className={`max-w-4xl mx-auto px-4 sm:px-6 ${revealClass(vis4)}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-green-900 text-center mb-12">
            How We Use Your Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              'To respond to your inquiries and bookings.',
              'To send occasional updates about forest events (only if you opt in).',
              'To improve our website experience.',
              'To comply with legal obligations.',
            ].map((text, i) => (
              <div key={i} className="flex items-start gap-3 bg-green-50 p-4 rounded-xl">
                <ArrowRight className="w-5 h-5 text-green-600 mt-1 shrink-0" />
                <p className="text-gray-700">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SECURITY & TRUST – اعداد و شمار */}
      <section className="py-16 bg-green-800 text-white">
        <div ref={ref5} className={`max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center ${revealClass(vis5)}`}>
          {[
            { number: '100%', label: 'Encrypted' },
            { number: '0', label: 'Data Sold' },
            { number: '24/7', label: 'Monitoring' },
            { number: '∞', label: 'Trust' },
          ].map((stat, i) => (
            <div key={i} className="p-4">
              <div className="text-4xl md:text-5xl font-bold">{stat.number}</div>
              <div className="mt-2 text-green-200 text-sm uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
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
          <Star className="mx-auto text-yellow-400 w-12 h-12 mb-6" />
          <p className="text-2xl md:text-4xl italic font-light leading-relaxed">
            “I feel safe knowing my data is treated with the same care as the forest itself.”
          </p>
          <p className="mt-6 text-green-200 font-medium">— Elena W.</p>
        </div>
      </section>

      {/* 7. CONTACT FOR QUESTIONS */}
      <section className="py-20 bg-green-50">
        <div ref={ref7} className={`max-w-3xl mx-auto text-center px-4 ${revealClass(vis7)}`}>
          <Users className="mx-auto text-green-700 w-12 h-12 mb-4" />
          <h2 className="text-3xl sm:text-4xl font-bold text-green-900 mb-6">
            Questions About Your Data?
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Reach out to us – we’re happy to clarify anything about our privacy practices.
          </p>
          <Link href={ROUTES.CONTACT}>
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-medium inline-flex items-center gap-2 shadow-lg transition-colors">
              Contact Us <ArrowRight size={18} />
            </button>
          </Link>
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
            Your Privacy, Our Priority
          </h2>
          <p className="text-green-100 text-lg mb-8 max-w-xl mx-auto">
            Enjoy the forest knowing we guard your information like a hidden glade.
          </p>
          <Link
            href={ROUTES.EXPLORE}
            className="inline-flex items-center gap-2 bg-white text-green-800 hover:bg-green-100 px-10 py-4 text-xl rounded-xl shadow-lg transition-colors"
          >
            Explore Freely <ArrowRight size={22} />
          </Link>
        </div>
      </section>

      {/* موڈل */}
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

      {/* 🌿 گرتے پتوں کی CSS */}
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