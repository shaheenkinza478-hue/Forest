'use client';
import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import Card from '@/components/ui/Card';
import { allItems } from '@/data/forestData';
import FloatingLeaves from '@/components/common/FloatingLeaves';   // ← نئی امپورٹ
import {
  ArrowRight,
  Quote,
  Wind,
  Sun,
  Backpack,
  Ear,
  Leaf,
  Bird,
  Heart,
  Footprints,
  TreePine,
  X,
  Eye,
} from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';

function safeArray(value) {
  return Array.isArray(value) ? value : [];
}

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

function useTypewriter(phrases, typingSpeed = 100, deletingSpeed = 50, pauseTime = 2000) {
  const [displayedText, setDisplayedText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex % phrases.length];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < currentPhrase.length) {
          setDisplayedText(prev => prev + currentPhrase[charIndex]);
          setCharIndex(prev => prev + 1);
        } else {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        if (charIndex > 0) {
          setDisplayedText(prev => prev.slice(0, -1));
          setCharIndex(prev => prev - 1);
        } else {
          setIsDeleting(false);
          setPhraseIndex(prev => prev + 1);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, phraseIndex, phrases, typingSpeed, deletingSpeed, pauseTime]);

  return displayedText;
}

// ❌ مقامی FloatingLeaves ہٹا دیا گیا – اب اوپر سے امپورٹ ہے

export default function HomePage() {
  const { t } = useLanguage();

  const whyCards = safeArray(t('home_sections.why.cards'));
  const testimonialQuotes = safeArray(t('home_sections.testimonials.quotes'));
  const services = safeArray(t('services.items'));
  const kitItems = safeArray(t('home_sections.kit.items'));

  const sampleAnimals = allItems.filter(i => i.type === 'animal').slice(0, 3);
  const sampleBirds = allItems.filter(i => i.type === 'bird').slice(0, 3);
  const samplePlants = allItems.filter(i => i.type === 'plant').slice(0, 3);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const openImage = (url) => setModalContent({ image: url });
  const openCard = (item) => setModalContent({ image: item.image, title: item.name, type: item.type, desc: item.description });
  const closeModal = () => { setModalOpen(false); setModalContent(null); };

  // 🔁 اب جنرک کارڈز کے لئے کوئی تصویر نہیں بھیجی جائے گی
  const openGenericCard = (title, desc, type) => {
    setModalContent({ title, type, desc });
    setModalOpen(true);
  };

  const handleOpenImage = (url) => {
    openImage(url);
    setModalOpen(true);
  };
  const handleOpenCard = (item) => {
    openCard(item);
    setModalOpen(true);
  };

  const heroTitles = [t('home_sections.hero.title') || 'The Forest Beckons'];
  const typedHeroTitle = useTypewriter(heroTitles, 80, 40, 2000);

  const [ref1, vis1] = useScrollReveal();
  const [ref2, vis2] = useScrollReveal();
  const [ref3, vis3] = useScrollReveal();
  const [ref4, vis4] = useScrollReveal();
  const [ref5, vis5] = useScrollReveal();
  const [ref6, vis6] = useScrollReveal();
  const [ref7, vis7] = useScrollReveal();
  const [ref8, vis8] = useScrollReveal();
  const [ref9, vis9] = useScrollReveal();
  const [ref10, vis10] = useScrollReveal();
  const [ref11, vis11] = useScrollReveal();
  const [ref12, vis12] = useScrollReveal();
  const [ref13, vis13] = useScrollReveal();

  const revealClass = (visible) =>
    `transition-all duration-1000 ease-out ${
      visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
    }`;

  return (
    <div className="bg-white">
      {/* 1. HERO – video background */}
<section className="relative flex items-center justify-center min-h-screen overflow-hidden">
  {/* Forest video */}
  <video
    autoPlay
    loop
    muted
    playsInline
    className="absolute  w-full h-full object-cover"
  >
    <source
      src="./bgv.mp4"
      type="video/mp4"
    />
    {/* Fallback image agar video load na ho */}
    <img
      src="./forsetbg.jpg"
      alt="Forest fallback"
      className="absolute inset-0 w-full h-full object-cover"
    />
  </video>

  {/* Dark overlay */}
  <div className="absolute inset-0 bg-black/40" />

  {/* 🌿 گرتے پتے */}
  <FloatingLeaves />

  <div ref={ref1} className={`relative z-10 text-center text-white max-w-4xl px-4 ${revealClass(vis1)}`}>
    <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg min-h-[1.5em]">
      {typedHeroTitle}
      <span className="inline-block w-[3px] h-[0.9em] bg-green-300 ml-1 animate-pulse align-middle" />
    </h1>
    <p className="mt-6 text-lg md:text-xl drop-shadow">
      {t('home_sections.hero.subtitle') || 'Enter a world where nature speaks and adventure awaits.'}
    </p>
    <div className="mt-10">
      <Link href={ROUTES.EXPLORE}>
        <button className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg rounded-xl shadow-2xl transition-transform hover:scale-105">
          {t('home_sections.hero.cta') || 'Start Exploring'} <ArrowRight size={20} />
        </button>
      </Link>
    </div>
  </div>
</section>

      {/* 2. WHY CHOOSE THE WILD */}
      <section className="py-20 bg-gradient-to-b from-green-50 to-white">
        <div ref={ref2} className={`max-w-7xl mx-auto px-4 text-center ${revealClass(vis2)}`}>
          <h2 className="text-4xl font-bold text-green-900 mb-12">
            {t('home_sections.why.title') || 'Why Choose the Wild?'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyCards.map((card, i) => (
              <div
                key={i}
                onClick={() => openGenericCard(card.title, card.desc, 'Why Wild')}
                className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer group relative"
              >
                <div className="text-green-600 mb-4 flex justify-center">
                  {i === 0 ? <Leaf size={48} /> : i === 1 ? <Bird size={48} /> : <Heart size={48} />}
                </div>
                <h3 className="text-2xl font-semibold text-gray-800">{card.title}</h3>
                <p className="mt-4 text-gray-600">{card.desc}</p>
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-2xl transition-opacity">
                  <Eye className="w-8 h-8 text-green-800 drop-shadow-lg" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. MEET THE FOREST ANIMALS */}
      <section
        className="py-20 bg-fixed bg-cover bg-center relative"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-white/80" />
        <div ref={ref3} className={`relative max-w-7xl mx-auto px-4 text-center ${revealClass(vis3)}`}>
          <h2 className="text-4xl font-bold text-green-900 mb-4">
            {t('home_sections.animals.title') || 'Meet the Forest Animals'}
          </h2>
          <p className="text-lg text-gray-700 mb-10">
            {t('home_sections.animals.desc') || 'Get close to the untamed spirits of the woods.'}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {sampleAnimals.map(item => (
              <div
                key={item.id}
                onClick={() => handleOpenCard(item)}
                className="cursor-pointer group relative"
              >
                <Card item={item} />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
                  <div className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg">
                    <Eye className="w-6 h-6 text-green-800" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link href={ROUTES.EXPLORE}>
              <button className="inline-flex items-center gap-2 border-2 border-green-600 text-green-700 hover:bg-green-50 px-6 py-3 rounded-xl font-medium transition-colors">
                {t('hero.cta') || 'Start Exploring'} <ArrowRight size={18} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. SYMPHONY OF BIRDS (جانوروں کی طرح تصویری موڈل) */}
      <section className="py-20 bg-white">
        <div ref={ref4} className={`max-w-7xl mx-auto px-4 text-center ${revealClass(vis4)}`}>
          <h2 className="text-4xl font-bold text-green-900 mb-4">
            {t('home_sections.birds.title') || 'Symphony of Birds'}
          </h2>
          <p className="text-lg text-gray-700 mb-10">
            {t('home_sections.birds.desc') || 'Listen to melodies that only the forest can compose.'}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {sampleBirds.map(item => (
              <div
                key={item.id}
                onClick={() => handleOpenCard(item)}
                className="cursor-pointer group relative"
              >
                <Card item={item} />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
                  <div className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg">
                    <Eye className="w-6 h-6 text-green-800" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. REALM OF PLANTS */}
      <section className="py-20 bg-gradient-to-t from-green-100 to-white">
        <div ref={ref5} className={`max-w-7xl mx-auto px-4 text-center ${revealClass(vis5)}`}>
          <h2 className="text-4xl font-bold text-green-900 mb-4">
            {t('home_sections.plants.title') || 'Realm of Plants'}
          </h2>
          <p className="text-lg text-gray-700 mb-10">
            {t('home_sections.plants.desc') || 'From delicate moss to towering giants—nature’s hidden kingdom.'}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {samplePlants.map(item => (
              <div
                key={item.id}
                onClick={() => handleOpenCard(item)}
                className="cursor-pointer group relative"
              >
                <Card item={item} />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
                  <div className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg">
                    <Eye className="w-6 h-6 text-green-800" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. SERVICES (بغیر تصویر والا موڈل) */}
      <section className="py-20 bg-green-50">
        <div ref={ref6} className={`max-w-7xl mx-auto px-4 text-center ${revealClass(vis6)}`}>
          <h2 className="text-4xl font-bold text-green-900 mb-12">
            {t('services.title') || 'What We Offer'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((svc, i) => (
              <div
                key={i}
                onClick={() => openGenericCard(svc.title, svc.desc, 'Our Service')}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow cursor-pointer group relative"
              >
                <div className="text-green-600 mb-4 flex justify-center">
                  {i === 0 ? <Footprints size={40} /> : i === 1 ? <Backpack size={40} /> : <TreePine size={40} />}
                </div>
                <h3 className="text-xl font-semibold text-gray-800">{svc.title}</h3>
                <p className="mt-2 text-gray-600">{svc.desc}</p>
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-2xl transition-opacity">
                  <Eye className="w-8 h-8 text-green-800 drop-shadow-lg" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS (بغیر تصویر) */}
      <section
        className="py-20 bg-fixed bg-cover bg-center relative"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-green-900/80" />
        <div ref={ref7} className={`relative max-w-5xl mx-auto px-4 text-center text-white ${revealClass(vis7)}`}>
          <h2 className="text-4xl font-bold mb-12">
            {t('home_sections.testimonials.title') || 'Voices of the Forest'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonialQuotes.map((q, i) => (
              <div
                key={i}
                onClick={() => openGenericCard(q.text, `– ${q.author}`, 'Forest Voice')}
                className="bg-white/10 backdrop-blur-md p-8 rounded-2xl cursor-pointer group relative"
              >
                <Quote className="text-green-300 mb-4" size={30} />
                <p className="text-xl italic mb-4">{q.text}</p>
                <p className="font-semibold">– {q.author}</p>
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-2xl transition-opacity">
                  <Eye className="w-8 h-8 text-white drop-shadow-lg" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. QUOTE */}
      <section className="py-20 bg-white">
        <div ref={ref8} className={`max-w-3xl mx-auto text-center px-4 ${revealClass(vis8)}`}>
          <p className="text-2xl md:text-4xl font-serif italic text-green-800 leading-relaxed">
            “{t('home_sections.quote') || 'Nature does not belong to us, we belong to nature.'}”
          </p>
        </div>
      </section>

      {/* 9. FOREST WHISPERS */}
      <section className="py-20 bg-gradient-to-r from-green-100 via-white to-green-50">
        <div ref={ref9} className={`max-w-4xl mx-auto px-4 text-center ${revealClass(vis9)}`}>
          <Wind className="mx-auto text-green-700 w-12 h-12 mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold text-green-900 mb-6">
            {t('home_sections.whispers.title') || 'Forest Whispers'}
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto">
            {t('home_sections.whispers.desc') || 'Every rustle of leaves, every distant bird call, carries a message only the heart understands. Sit quietly, and the forest will speak.'}
          </p>
        </div>
      </section>

      {/* 10. SUNLIT CANOPY (فوٹو گیلری – یہ تصاویر والا موڈل رہے گا) */}
      <section className="py-20 bg-white">
        <div ref={ref10} className={`max-w-7xl mx-auto px-4 ${revealClass(vis10)}`}>
          <div className="text-center mb-12">
            <Sun className="mx-auto text-yellow-500 w-12 h-12 mb-4" />
            <h2 className="text-4xl font-bold text-green-900">
              {t('home_sections.canopy.title') || 'Sunlit Canopy'}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
              'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
              'https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            ].map((url, i) => (
              <div
                key={i}
                onClick={() => handleOpenImage(url)}
                className="overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer group relative"
              >
                <img src={url} alt="Canopy" className="w-full h-72 object-cover" />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <Eye className="w-8 h-8 text-white drop-shadow-lg" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. ADVENTURER'S KIT (بغیر تصویر) */}
      <section className="py-20 bg-green-50">
        <div ref={ref11} className={`max-w-5xl mx-auto px-4 ${revealClass(vis11)}`}>
          <div className="text-center mb-12">
            <Backpack className="mx-auto text-green-700 w-12 h-12 mb-4" />
            <h2 className="text-4xl font-bold text-green-900">
              {t('home_sections.kit.title') || "Adventurer's Kit"}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {kitItems.map((kit, idx) => (
              <div
                key={idx}
                onClick={() => openGenericCard(kit.item, kit.desc, 'Kit Item')}
                className="bg-white p-6 rounded-2xl shadow text-center cursor-pointer group relative"
              >
                <div className="text-green-600 mb-3 flex justify-center">
                  {idx === 0 ? <Footprints size={32} /> :
                   idx === 1 ? <Wind size={32} /> :
                   idx === 2 ? <Sun size={32} /> :
                   <Ear size={32} />}
                </div>
                <h3 className="font-semibold text-gray-800 text-lg">{kit.item}</h3>
                <p className="text-sm text-gray-600 mt-2">{kit.desc}</p>
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-2xl transition-opacity">
                  <Eye className="w-6 h-6 text-green-800 drop-shadow-lg" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. ECHOES OF THE WILD */}
      <section className="py-20 bg-white">
        <div ref={ref12} className={`max-w-4xl mx-auto px-4 text-center ${revealClass(vis12)}`}>
          <Ear className="mx-auto text-green-800 w-12 h-12 mb-6" />
          <h2 className="text-4xl font-bold text-green-900 mb-6">
            {t('home_sections.echoes.title') || 'Echoes of the Wild'}
          </h2>
          <p className="text-lg text-gray-700 italic max-w-2xl mx-auto">
            “{t('home_sections.echoes.quote') || 'The forest does not need you to speak. It only asks that you listen.'}”
          </p>
          <p className="mt-8 text-gray-500 text-sm">
            {t('home_sections.echoes.hint') || 'Close your eyes. Hear the stream, the wind, the wings.'}
          </p>
        </div>
      </section>

      {/* 13. FINAL CTA */}
      <section
        className="py-20 bg-cover bg-center relative"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-green-900/70" />
        <div ref={ref13} className={`relative max-w-4xl mx-auto text-center text-white px-4 ${revealClass(vis13)}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            {t('home_sections.cta_section.title') || 'Begin Your Adventure'}
          </h2>
          <Link
            href={ROUTES.CHAT}
            className="inline-flex items-center gap-2 bg-white text-green-800 hover:bg-green-100 px-10 py-4 text-xl rounded-xl shadow-lg transition-colors"
          >
            {t('home_sections.cta_section.cta') || 'Talk to Spirit'} <ArrowRight size={22} />
          </Link>
        </div>
      </section>

      {/* ---------- موڈل (جنرک کارڈز کے لئے بغیر تصویر) ---------- */}
      {modalOpen && modalContent && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="relative max-w-lg w-full bg-white rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-white/80 rounded-full p-2 shadow hover:bg-white transition"
            >
              <X size={24} className="text-green-800" />
            </button>

            {/* صرف اس صورت میں تصویر دکھائیں جب modalContent.image موجود ہو */}
            {modalContent.image ? (
              <>
                <img
                  src={modalContent.image}
                  alt={modalContent.title || 'Image'}
                  className="w-full h-64 sm:h-96 object-cover"
                />
                <div className="p-6">
                  <span className="inline-block text-xs font-medium uppercase tracking-wider text-green-700 bg-green-100 px-2 py-1 rounded-full mb-2">
                    {modalContent.type || 'Detail'}
                  </span>
                  <h3 className="text-2xl font-bold text-gray-800">{modalContent.title}</h3>
                  <p className="mt-2 text-gray-600">{modalContent.desc}</p>
                </div>
              </>
            ) : (
              /* بغیر تصویر والا موڈل */
              <div className="p-8">
                <span className="inline-block text-xs font-medium uppercase tracking-wider text-green-700 bg-green-100 px-2 py-1 rounded-full mb-3">
                  {modalContent.type || 'Detail'}
                </span>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{modalContent.title}</h3>
                <p className="text-gray-600 leading-relaxed">{modalContent.desc}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}