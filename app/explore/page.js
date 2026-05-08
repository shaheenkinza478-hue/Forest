'use client';
import { useState, useEffect, useRef } from 'react';
 
import { useLanguage } from '@/hooks/useLanguage';
import Card from '@/components/ui/Card';
import { allItems } from '@/data/forestData';
import {
  Compass,
  ArrowRight,
  Sparkles,
  Mountain,
  Cloud,
  Waves,
  Flower2,
  Quote,
  TreePine,
  Globe,
  Network,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';

const FACT_IMAGES = [
  'https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1502082553048-f009c37129b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
];

// مسلسل ٹائپ رائٹر ہک
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

// گرتے پتوں کا بیک گراؤنڈ کمپوننٹ
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

export default function ExplorePage() {
  const { t } = useLanguage();

  // تمام جانور، پرندے اور پودے
  const allAnimals = allItems.filter(item => item.type === 'animal');
  const allBirds = allItems.filter(item => item.type === 'bird');
  const allPlants = allItems.filter(item => item.type === 'plant');

  // موڈل اسٹیٹ
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const openCard = (item) => {
    setModalContent({
      image: item.image,
      title: item.name,
      type: item.type,
      desc: item.description,
    });
    setModalOpen(true);
  };

  const openFactModal = (fact, index) => {
    setModalContent({
      image: FACT_IMAGES[index % FACT_IMAGES.length],
      title: 'Forest Fact',
      type: 'Did You Know?',
      desc: fact,
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalContent(null);
  };

  // ہیرو کے لئے مسلسل چلنے والے عنوانات
  const heroTitles = [
    t('explore.title') || 'Explore the Forest',
    'Uncover Hidden Wonders',
    'Meet the Wild Inhabitants',
  ];
  const typedHeroTitle = useTypewriter(heroTitles, 80, 40, 2500);

  return (
    <div className="bg-white text-gray-800">
     {/* 1. HERO — پرکشش اینیمیشنز کے ساتھ */}
<section
  className="relative flex items-center justify-center min-h-screen bg-fixed bg-cover bg-center overflow-hidden"
  style={{
    backgroundImage: `url('./forset2.jpg')`,
  }}
>
  <div className="absolute inset-0 bg-black/40" />
  <FloatingLeaves />
  <div className="relative z-10 text-center text-white max-w-5xl px-4 sm:px-6 -mt-32">
    {/* دھڑکتا ہوا کمپاس */}
    <div className="mx-auto mb-6 w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
     </div>
    {/* ٹائپ رائٹر ہیڈنگ */}
    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-2xl min-h-[1.5em]">
      {typedHeroTitle}
      <span className="inline-block w-[3px] h-[0.9em] bg-green-300 ml-1 animate-pulse align-middle" />
    </h1>
    <p className="mt-4 text-base sm:text-lg md:text-xl text-green-100 max-w-3xl mx-auto drop-shadow">
      Uncover hidden trails, rare wildlife, and the whispers of ancient trees.
    </p>
  </div>
</section>

      {/* باقی تمام سیکشنز ویسے ہی ہیں – کوئی تبدیلی نہیں */}
      {/* 2. WHY EXPLORE */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-green-900 mb-12">
            Why Journey Into the Wild?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Mountain, title: 'Discover Diversity', desc: 'Every step reveals a new species, a hidden waterfall, a story untold.' },
              { icon: Cloud, title: 'Breathe the Mist', desc: 'Feel the cool fog of the canopy and the freshness of dawn.' },
              { icon: Waves, title: 'Follow the Streams', desc: 'Rivers and creeks guide you deeper into the heart of the forest.' },
            ].map((item, i) => (
              <div key={i} className="group p-8 rounded-2xl bg-green-700 text-white hover:bg-green-600 transition-colors shadow-md hover:shadow-xl">
                <item.icon className="mx-auto text-white w-12 h-12 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-green-100">{item.desc}</p>
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
        <div className="absolute inset-0 bg-white/85" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-4xl font-bold text-green-900 mb-4">
            Meet the Forest Animals
          </h2>
          <p className="text-lg text-gray-700 mb-10 max-w-2xl mx-auto">
            Get close to the untamed spirits of the woods.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {allAnimals.map(item => (
              <div
                key={item.id}
                onClick={() => openCard(item)}
                className="cursor-pointer group relative"
              >
                <Card item={item} />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
                  <div className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg">
                    <Compass className="w-6 h-6 text-green-800" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SYMPHONY OF BIRDS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-4xl font-bold text-green-900 mb-4">
            Symphony of Birds
          </h2>
          <p className="text-lg text-gray-700 mb-10 max-w-2xl mx-auto">
            Listen to melodies that only the forest can compose.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {allBirds.map(item => (
              <div
                key={item.id}
                onClick={() => openCard(item)}
                className="cursor-pointer group relative"
              >
                <Card item={item} />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
                  <div className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg">
                    <Compass className="w-6 h-6 text-green-800" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. REALM OF PLANTS */}
      <section className="py-20 bg-gradient-to-t from-green-100 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-4xl font-bold text-green-900 mb-4">
            Realm of Plants
          </h2>
          <p className="text-lg text-gray-700 mb-10 max-w-2xl mx-auto">
            From delicate moss to towering giants—nature’s hidden kingdom.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {allPlants.map(item => (
              <div
                key={item.id}
                onClick={() => openCard(item)}
                className="cursor-pointer group relative"
              >
                <Card item={item} />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
                  <div className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg">
                    <Compass className="w-6 h-6 text-green-800" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. STATS بار */}
      <section className="py-16 bg-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { number: `${allAnimals.length + allBirds.length + allPlants.length}`, label: 'Total Species' },
            { number: `${allAnimals.length}`, label: 'Animals' },
            { number: `${allBirds.length}`, label: 'Birds' },
            { number: `${allPlants.length}`, label: 'Plants' },
          ].map((stat, i) => (
            <div key={i} className="p-4">
              <div className="text-4xl md:text-5xl font-bold">{stat.number}</div>
              <div className="mt-2 text-green-200 text-sm sm:text-base uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. FOREST LAYERS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-green-900 mb-12">
            The Layers of Life
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { img: './Forest Floor.jpg', name: 'Forest Floor' },
              { img: './Understory.jpg', name: 'Understory' },
              { img: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', name: 'Canopy' },
              { img: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', name: 'Emergent' },
            ].map((layer, idx) => (
              <div key={idx} className="group relative overflow-hidden rounded-2xl shadow-lg h-64">
                <img src={layer.img} alt={layer.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-bold drop-shadow-lg">{layer.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. DID YOU KNOW? */}
      <section className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <Flower2 className="mx-auto text-green-600 w-10 h-10 mb-4" />
          <h2 className="text-3xl sm:text-4xl font-bold text-green-900 mb-12">
            Did You Know?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                fact: 'A single oak tree can support over 500 different species of insects, birds, and mammals.',
                Icon: TreePine,
              },
              {
                fact: 'Forests are home to 80% of the world’s terrestrial biodiversity.',
                Icon: Globe,
              },
              {
                fact: 'Some trees communicate through underground fungal networks — the "Wood Wide Web".',
                Icon: Network,
              },
            ].map((item, i) => (
              <div
                key={i}
                onClick={() => openFactModal(item.fact, i)}
                className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow cursor-pointer group relative"
              >
                <item.Icon className="mx-auto text-green-600 w-10 h-10 mb-4 group-hover:scale-110 transition-transform" />
                <p className="text-gray-700 italic">{item.fact}</p>
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-2xl transition-opacity">
                  <div className="bg-white/80 backdrop-blur-sm p-2 rounded-full shadow">
                    <ArrowRight className="w-5 h-5 text-green-800" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. TESTIMONIAL */}
      <section
        className="py-20 bg-fixed bg-cover bg-center relative"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-green-900/80" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center text-white">
          <Quote className="mx-auto text-green-300 w-12 h-12 mb-6" />
          <p className="text-2xl md:text-4xl italic font-light leading-relaxed">
            “In every walk with nature one receives far more than he seeks.”
          </p>
          <p className="mt-6 text-green-200 font-medium">— John Muir</p>
        </div>
      </section>

      {/* 10. CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <Compass className="mx-auto text-green-700 w-12 h-12 mb-4" />
          <h2 className="text-3xl sm:text-4xl font-bold text-green-900 mb-6">
            Ready to Deepen Your Journey?
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Talk to the Forest Spirit or explore more pages filled with wonder.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={ROUTES.CHAT}>
              <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-medium inline-flex items-center gap-2 shadow-lg transition-colors">
                Chat with Spirit <ArrowRight size={18} />
              </button>
            </Link>
            <Link href={ROUTES.ABOUT}>
              <button className="border-2 border-green-600 text-green-700 hover:bg-green-50 px-8 py-4 rounded-xl font-medium inline-flex items-center gap-2 transition-colors">
                About Us <ArrowRight size={18} />
              </button>
            </Link>
          </div>
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
              alt={modalContent.title || 'Image'}
              className="w-full h-64 sm:h-96 object-cover"
            />
            {modalContent.title && (
              <div className="p-6">
                <span className="inline-block text-xs font-medium uppercase tracking-wider text-green-700 bg-green-100 px-2 py-1 rounded-full mb-2">
                  {modalContent.type}
                </span>
                <h3 className="text-2xl font-bold text-gray-800">{modalContent.title}</h3>
                <p className="mt-2 text-gray-600">{modalContent.desc}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* گرتے پتوں کی اینیمیشن */}
      <style jsx global>{`
        @keyframes leaf-fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 0.2; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
        .animate-leaf-fall {
          animation: leaf-fall linear infinite;
        }
      `}</style>
    </div>
  );
}