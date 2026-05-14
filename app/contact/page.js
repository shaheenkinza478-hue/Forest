'use client';
import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import FloatingLeaves from '@/components/common/FloatingLeaves';
import {
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  Send,
  X,
  Leaf,
  Quote,
  Star,
  Sparkles,
  Clock,
  Users,
  Heart,
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

export default function ContactPage() {
  const { t } = useLanguage();

  // ----- Form state (unchanged) -----
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [successModal, setSuccessModal] = useState(false);

  // ----- Testimonial modal state -----
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const openTestimonialModal = (text, author, imageIndex = 0) => {
    setModalContent({
      image: `https://images.unsplash.com/photo-${['1472396961693-142e6e269027','1502082553048-f009c37129b9','1433086966358-54859d0ed716','1441974231531-c6227db76b6e','1501785888041-af3ef285b470'][imageIndex % 5]}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`,
      title: text,
      type: 'Testimonial',
      desc: `– ${author}`,
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalContent(null);
  };

  // ----- Form handlers (unchanged) -----
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setTimeout(() => {
      setSuccessModal(true);
      setFormData({ name: '', email: '', message: '' });
    }, 800);
  };

  const closeSuccess = () => setSuccessModal(false);

  // ----- Animated counters for Stats (only for 100%) -----
  const [count100, setCount100] = useState(0);
  const statsRef = useRef(null);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    const node = statsRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStartedRef.current) {
          hasStartedRef.current = true;
          let step = 0;
          const totalSteps = 30;
          const interval = setInterval(() => {
            step++;
            const progress = step / totalSteps;
            setCount100(Math.round(100 * progress));
            if (step >= totalSteps) {
              clearInterval(interval);
              setCount100(100);
            }
          }, 40);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // ----- Refs & visibility -----
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
      {/* ==================== HERO ==================== */}
      <section
        className="relative flex items-center justify-center min-h-screen bg-fixed bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `url('./forsettt1.jpg')`, // HD forest
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />
        <FloatingLeaves />
        <div ref={ref1} className={`relative z-10 text-center text-white max-w-4xl px-4 sm:px-6 -mt-20 ${revealClass(vis1)}`}>
        
          <h1 className="text-4xl  md:text-5xl font-extrabold tracking-tight drop-shadow-2xl">
            {t('contact.title') || 'Get in Touch'}
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-green-100 max-w-3xl mx-auto drop-shadow">
            We’d love to hear from you — whether it’s a question, a booking, or a story from the wild.
          </p>
          <div className="mt-8">
            <a
              href="#contact-form"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-10 py-4 text-lg rounded-xl shadow-xl transition-transform hover:scale-105 font-semibold"
            >
              <ArrowRight size={20} /> Send a Message
            </a>
          </div>
        </div>
      </section>

      {/* ==================== REACH US DIRECTLY (glass cards, no modals) ==================== */}
      <section className="py-20 bg-white">
        <div ref={ref2} className={`max-w-7xl mx-auto px-4 sm:px-6 text-center ${revealClass(vis2)}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-green-900 mb-12">
            Reach Us Directly
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: MapPin,
                title: 'Visit Us',
                desc: 'Forest Explorer HQ, Green Valley, Earth',
                extra: 'Open daily 8am – 6pm',
              },
              {
                icon: Phone,
                title: 'Call Us',
                desc: '+1 (555) 123-4567',
                extra: 'Mon‑Fri 9am‑5pm',
              },
              {
                icon: Mail,
                title: 'Email Us',
                desc: 'hello@forestexplorer.com',
                extra: 'We reply within 24 hours',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group relative p-8 rounded-3xl bg-white/70 backdrop-blur-sm border border-green-100 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-green-600 text-white rounded-full p-4 shadow-lg group-hover:bg-green-700 transition-colors">
                  <item.icon size={28} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2 group-hover:text-green-900">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
                <p className="text-sm text-green-600 mt-2 font-medium">{item.extra}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CONTACT FORM (modern) ==================== */}
      <section id="contact-form" className="py-20 bg-green-50">
        <div ref={ref3} className={`max-w-3xl mx-auto px-4 sm:px-6 ${revealClass(vis3)}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-green-900 text-center mb-12 flex items-center justify-center gap-3">
            <Mail className="w-8 h-8 text-green-600" /> Send Us a Message
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-green-100">
            <div className="relative">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="peer w-full px-4 py-4 pt-6 rounded-xl border border-green-200 bg-transparent focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
              />
              <label className="absolute left-4 top-2 text-xs text-green-600 font-medium opacity-70 peer-placeholder-shown:opacity-0 peer-focus:opacity-100 transition-opacity">
                Name
              </label>
            </div>
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder={t('contact.email') || 'Your Email'}
                value={formData.email}
                onChange={handleChange}
                required
                className="peer w-full px-4 py-4 pt-6 rounded-xl border border-green-200 bg-transparent focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
              />
              <label className="absolute left-4 top-2 text-xs text-green-600 font-medium opacity-70 peer-placeholder-shown:opacity-0 peer-focus:opacity-100 transition-opacity">
                Email
              </label>
            </div>
            <div className="relative">
              <textarea
                name="message"
                rows="5"
                placeholder={t('contact.message') || 'Your Message'}
                value={formData.message}
                onChange={handleChange}
                required
                className="peer w-full px-4 py-4 pt-6 rounded-xl border border-green-200 bg-transparent focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all resize-none"
              />
              <label className="absolute left-4 top-2 text-xs text-green-600 font-medium opacity-70 peer-placeholder-shown:opacity-0 peer-focus:opacity-100 transition-opacity">
                Message
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-4 rounded-xl inline-flex items-center justify-center gap-2 shadow-lg transition-colors text-lg"
            >
              <Send size={20} />
              {t('contact.send') || 'Send Message'}
            </button>
          </form>
        </div>
      </section>

      {/* ==================== INTERACTIVE MAP ==================== */}
      <section className="py-20 bg-white">
        <div ref={ref4} className={`max-w-7xl mx-auto px-4 sm:px-6 ${revealClass(vis4)}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-green-900 text-center mb-12 flex items-center justify-center gap-3">
            <MapPin className="w-8 h-8 text-green-700" /> Find Us on the Map
          </h2>
          <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-green-200 h-64 sm:h-96">
            <iframe
              title="Forest Explorer Location"
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-110.61%2C44.42%2C-110.56%2C44.44&amp;layer=mapnik&amp;marker=44.4280%2C-110.5885"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <p className="text-center mt-4 text-sm text-gray-500">
            <a
              href="https://www.openstreetmap.org/?mlat=44.4280&amp;mlon=-110.5885#map=14/44.4280/-110.5885"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-700 hover:underline"
            >
              View larger map
            </a>
          </p>
        </div>
      </section>

      {/* ==================== STATS – with animated number ==================== */}
      <section className="py-16 bg-green-800 text-white">
        <div ref={statsRef} className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '24/7', label: 'Support' },
            { value: '< 2hrs', label: 'Response Time' },
            { value: `${count100}%`, label: 'Real Humans' },
            { value: '∞', label: 'Stories Shared' },
          ].map((stat, i) => (
            <div key={i} className="p-4">
              <div className="text-4xl md:text-5xl font-bold">
                {stat.value}
              </div>
              <div className="mt-2 text-green-200 text-sm uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== TESTIMONIALS ==================== */}
      <section
        className="py-20 bg-fixed bg-cover bg-center relative"
        style={{
          backgroundImage: `url('./forset2.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-green-900/80" />
        <div ref={ref6} className={`relative max-w-5xl mx-auto px-4 sm:px-6 text-center text-white ${revealClass(vis6)}`}>
          <Star className="mx-auto text-yellow-400 w-12 h-12 mb-6" />
          <h2 className="text-3xl sm:text-4xl font-bold mb-12">
            Words from the Community
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { text: 'The team answered all my questions before the trek. So reassuring!', author: 'Nina K.' },
              { text: 'I love that real nature lovers respond to emails – you can feel the passion.', author: 'Omar S.' },
            ].map((q, i) => (
              <div
                key={i}
                onClick={() => openTestimonialModal(q.text, q.author, i + 3)}
                className="bg-white/10 backdrop-blur-md p-8 rounded-2xl text-left hover:bg-white/20 transition-all cursor-pointer group relative border border-transparent hover:border-green-400"
              >
                <Quote className="text-green-300 mb-4 w-8 h-8" />
                <p className="text-lg italic mb-4">{q.text}</p>
                <p className="font-semibold text-green-200">– {q.author}</p>
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-2xl transition-opacity">
                  <ArrowRight className="w-8 h-8 text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FAQ PREVIEW ==================== */}
      <section className="py-20 bg-green-50">
        <div ref={ref7} className={`max-w-4xl mx-auto px-4 sm:px-6 ${revealClass(vis7)}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-green-900 text-center mb-12">
            Quick Questions
          </h2>
          <div className="space-y-4">
            {[
              { q: 'How fast do you reply?', a: 'We aim to respond within a few hours during working days.' },
              { q: 'Can I change my booking?', a: 'Absolutely, just reach out and we’ll adjust it for you.' },
              { q: 'Do you offer group discounts?', a: 'Yes! Contact us for custom group packages.' },
            ].map((item, i) => (
              <details key={i} className="bg-white rounded-xl p-4 shadow group cursor-pointer hover:shadow-md transition-shadow">
                <summary className="font-medium text-green-800 flex justify-between items-center cursor-pointer">
                  {item.q}
                  <ArrowRight className="w-5 h-5 transition-transform group-open:rotate-90" />
                </summary>
                <p className="mt-3 text-gray-600">{item.a}</p>
              </details>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href={ROUTES.FAQ} className="inline-flex items-center gap-2 text-green-700 hover:underline font-medium">
              See all FAQs <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== CTA ==================== */}
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
            Let’s Start a Conversation
          </h2>
          <p className="text-green-100 text-lg mb-8 max-w-xl mx-auto">
            Whether you’re planning a visit, a workshop, or just want to share a forest story — drop us a line.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-white text-green-800 hover:bg-green-100 px-8 py-4 rounded-xl font-medium inline-flex items-center gap-2 shadow-lg transition-colors"
            >
              Go to Form <ArrowRight size={18} />
            </a>
            <Link href={ROUTES.CHAT}>
              <button className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-xl font-medium inline-flex items-center gap-2 transition-colors">
                Ask the Spirit <ArrowRight size={18} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      {successModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-md w-full">
            <div className="text-5xl mb-4">🌿</div>
            <h2 className="text-2xl font-bold text-green-800 mb-2">Message Sent!</h2>
            <p className="text-gray-600 mb-6">Thank you for reaching out. We’ll get back to you soon.</p>
            <button
              onClick={closeSuccess}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Testimonial Modal */}
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
              <span className="inline-block text-xs font-medium uppercase tracking-wider text-green-700 bg-green-100 px-3 py-1 rounded-full mb-3">
                {modalContent.type}
              </span>
              <h3 className="text-2xl font-bold text-gray-800">{modalContent.title}</h3>
              <p className="mt-2 text-gray-600 whitespace-pre-line">{modalContent.desc}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}