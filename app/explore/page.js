'use client';
import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { allItems } from '@/data/forestData';
import {
  Compass,
  Search,
  Clock,
  MapPin,
  Leaf,
  Bird,
  Flower2,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Star,
} from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';
import FloatingLeaves from '@/components/common/FloatingLeaves';

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

export default function ExplorePage() {
  const { t } = useLanguage();

  // Data
  const allAnimals = allItems.filter(i => i.type === 'animal');
  const allBirds = allItems.filter(i => i.type === 'bird');
  const allPlants = allItems.filter(i => i.type === 'plant');

  // Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  // Live filtered items
  const filteredItems = allItems.filter(item => {
    const nameMatches = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const typeMatches = selectedType === 'all' || item.type === selectedType;
    return nameMatches && typeMatches;
  });

  // Featured slider (first 6)
  const featured = allItems.slice(0, 6);
  const [slideIndex, setSlideIndex] = useState(0);
  const nextSlide = () => setSlideIndex(prev => (prev + 1) % featured.length);
  const prevSlide = () => setSlideIndex(prev => (prev - 1 + featured.length) % featured.length);
  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, []);

  const heroTitles = [
    t('explore.title') || 'Explore the Forest',
    'Uncover Hidden Wonders',
    'Meet the Wild Inhabitants',
  ];
  const typedHeroTitle = useTypewriter(heroTitles, 80, 40, 2500);

  return (
    <div className="bg-white text-gray-800">
      {/* 1. HERO – clean, like Home page */}
      <section
        className="relative flex items-center justify-center min-h-screen bg-fixed bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `url('./forsett.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />
        <FloatingLeaves />
        <div className="relative z-10 text-center text-white max-w-4xl px-4 sm:px-6 -mt-20">
        
          <h1 className="text-4xl  md:text-5xl font-extrabold tracking-tight drop-shadow-2xl min-h-[1.5em]">
            {typedHeroTitle}
            <span className="inline-block w-[3px] h-[0.9em] bg-green-300 ml-1 animate-pulse align-middle" />
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-green-100 max-w-3xl mx-auto drop-shadow">
            Discover the rich tapestry of forest life — from the smallest fern to the tallest oak.
          </p>
          <div className="mt-8">
            <a
              href="#all-species"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-10 py-4 text-lg rounded-xl shadow-xl transition-transform hover:scale-105 font-semibold"
            >
              <Compass size={20} /> Explore All Species
            </a>
          </div>
        </div>
      </section>

      {/* 2. STICKY SEARCH & FILTER BAR */}
      <section className="sticky top-16 z-30 bg-white border-b border-green-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <h2 className="text-xl font-bold text-green-900 hidden sm:block">All Species</h2>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            {/* Search */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-green-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-green-200 bg-green-50/50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
              />
            </div>
            {/* Type Filter */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-green-200 bg-green-50/50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="all">All Types</option>
              <option value="animal">Animals</option>
              <option value="bird">Birds</option>
              <option value="plant">Plants</option>
            </select>
          </div>
        </div>
      </section>

      {/* ==================== FEATURED SLIDER (one‑click = one slide) ==================== */}
<section className="py-20 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6">
    <h2 className="text-3xl sm:text-4xl font-bold text-green-900 mb-12 text-center flex items-center justify-center gap-3">
      <Star className="w-8 h-8 text-yellow-500" /> Featured Species
    </h2>

    <div className="relative">
      {/* Left button */}
      <button
        onClick={() => {
          if (!isTransitioning.current) {
            prevSlide();
          }
        }}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition"
      >
        <ArrowLeft className="w-6 h-6 text-green-800" />
      </button>

      {/* Slider track */}
      <div
        className="overflow-hidden"
        onTransitionEnd={() => (isTransitioning.current = false)}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${slideIndex * 100}%)` }}
        >
          {featured.map(item => (
            <div key={item.id} className="w-full flex-shrink-0 px-4">
              <div className="flex flex-col md:flex-row items-center bg-green-50 rounded-3xl shadow-xl p-8 gap-8">
                <div className="w-full md:w-1/3 h-64 rounded-2xl overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <span className="text-xs font-medium uppercase tracking-wider text-green-700 bg-green-100 px-3 py-1 rounded-full">
                    {item.type}
                  </span>
                  <h3 className="text-2xl font-bold text-green-900 mt-2">
                    {item.name}
                  </h3>
                  <p className="mt-4 text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                  <Link
                    href={ROUTES.CHAT}
                    className="mt-6 inline-flex items-center gap-2 text-green-700 hover:underline font-medium"
                  >
                    Ask the Spirit <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right button */}
      <button
        onClick={() => {
          if (!isTransitioning.current) {
            nextSlide();
          }
        }}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition"
      >
        <ArrowRight className="w-6 h-6 text-green-800" />
      </button>
    </div>
  </div>
</section>
      {/* 4. ALL SPECIES GRID – this is where search results appear */}
      <section id="all-species" className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-green-900 mb-12 flex items-center justify-center gap-3">
            <Sparkles className="w-8 h-8 text-green-600" /> All Forest Inhabitants
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => (
              <div key={item.id} className="group relative h-72 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <span className="text-xs font-medium uppercase tracking-wider bg-green-600/80 px-2 py-1 rounded-full mb-2 inline-block">{item.type}</span>
                  <h3 className="text-lg font-bold drop-shadow">{item.name}</h3>
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50">
                  <h3 className="text-white text-xl font-bold mb-2">{item.name}</h3>
                  <p className="text-green-200 text-sm text-center leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          {filteredItems.length === 0 && (
            <p className="text-gray-500 mt-10">🚫 No species match your criteria. Try a different search or filter.</p>
          )}
        </div>
      </section>

      {/* 5. HABITATS (unchanged) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-green-900 mb-12 flex items-center justify-center gap-3">
            <MapPin className="w-8 h-8 text-green-700" /> Forest Habitats
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Tropical Rainforest', img: './Moss.jpg' },
              { name: 'Temperate Woods', img: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
              { name: 'Boreal Forest', img: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
            ].map((habitat, i) => (
              <div key={i} className="relative overflow-hidden rounded-2xl shadow-lg group h-64">
                <img src={habitat.img} alt={habitat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-bold drop-shadow-lg">{habitat.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. DID YOU KNOW (unchanged) */}
      <section className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-green-900 mb-12 flex items-center justify-center gap-3">
            <Sparkles className="w-8 h-8 text-yellow-500" /> Did You Know?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { fact: 'Some trees can "talk" to each other through underground fungal networks.', icon: Leaf },
              { fact: 'A single oak tree can provide enough oxygen for 4 people every day.', icon: Leaf },
              { fact: 'Birdsong has been proven to reduce stress and improve mental health.', icon: Bird },
              { fact: 'Fungi help trees share nutrients and water across the forest floor.', icon: Flower2 },
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all border border-green-100 group">
                <item.icon className="w-10 h-10 text-green-600 mb-4 group-hover:scale-110 transition-transform" />
                <p className="text-gray-700 italic">{item.fact}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== RECENT SIGHTINGS – Professional Timeline ==================== */}
<section className="py-20 bg-white">
  <div className="max-w-5xl mx-auto px-4 sm:px-6">
    <div className="text-center mb-16">
      <h2 className="text-3xl sm:text-4xl font-bold text-green-900 mb-4 flex items-center justify-center gap-3">
        <Clock className="w-8 h-8 text-green-700" /> Recent Forest Sightings
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Our rangers and visitors share their latest encounters with the wild.
      </p>
    </div>

    <div className="relative">
      {/* عمودی لائن (صرف درمیانے اور بڑے اسکرین پر) */}
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-green-200 transform -translate-x-0.5" />

      <div className="space-y-12">
        {[
          {
            date: 'May 8, 2025',
            time: 'Morning patrol',
            event: 'Spotted a Red Fox near the creek',
            desc: 'The fox was drinking water and quickly vanished into the undergrowth.',
            icon: Leaf,
            color: 'bg-green-500',
          },
          {
            date: 'May 6, 2025',
            time: 'Dusk observation',
            event: 'Great Horned Owl heard at dusk',
            desc: 'Its deep hooting echoed through the valley for nearly an hour.',
            icon: Compass,
            color: 'bg-green-600',
          },
          {
            date: 'May 3, 2025',
            time: 'Afternoon hike',
            event: 'New fern growth in the understory',
            desc: 'Fresh fiddleheads were emerging all along the shaded trail.',
            icon: Flower2,
            color: 'bg-green-700',
          },
          {
            date: 'Apr 28, 2025',
            time: 'Early morning',
            event: 'White-tailed Deer grazing in the clearing',
            desc: 'A small herd of three does stayed for over ten minutes before moving on.',
            icon: Bird,
            color: 'bg-green-800',
          },
        ].map((item, i) => (
          <div
            key={i}
            className={`relative flex flex-col md:flex-row gap-4 items-center ${
              i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}
          >
            {/* Timeline dot (hidden on mobile) */}
            <div className="hidden md:flex absolute left-1/2 top-8 -translate-x-1/2 w-10 h-10 rounded-full bg-green-200 border-4 border-white shadow-md z-10 items-center justify-center">
              <item.icon className="w-4 h-4 text-green-800" />
            </div>

            {/* Card */}
            <div className={`w-full md:w-[calc(50%-2rem)] bg-green-50 rounded-2xl shadow-md hover:shadow-lg transition-all p-6 relative`}>
              <div className="flex items-start gap-3">
                <div className={`${item.color} text-white p-2 rounded-full shrink-0 shadow-md md:hidden`}>
                  <item.icon size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-2 text-xs font-medium text-green-800 uppercase tracking-wide mb-1">
                    <span>{item.date}</span>
                    <span className="w-1 h-1 bg-green-400 rounded-full" />
                    <span className="text-gray-500">{item.time}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">{item.event}</h3>
                  <p className="text-sm text-gray-600 mt-2">{item.desc}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>
      {/* 8. CTA (unchanged) */}
      <section className="py-20 bg-green-800 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Experience the Wild?</h2>
          <p className="text-green-100 text-lg mb-8">
            Chat with the Forest Spirit and get answers to all your nature questions.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={ROUTES.CHAT}>
              <button className="bg-white text-green-800 hover:bg-green-100 px-8 py-4 rounded-xl font-medium inline-flex items-center gap-2 shadow-lg transition-colors">
                Talk to Spirit <ArrowRight size={18} />
              </button>
            </Link>
            <Link href={ROUTES.ABOUT}>
              <button className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-xl font-medium inline-flex items-center gap-2 transition-colors">
                About Us <ArrowRight size={18} />
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}