'use client';
import { useState, useEffect, useRef } from 'react';
 import { useLanguage } from '@/hooks/useLanguage';
import { allItems } from '@/data/forestData';
import {
  ArrowRight,
  Send,
  Leaf,
  Bird,
  TreePine,
  HelpCircle,
  MessageCircle,
  Sparkles,
  Quote,
  Compass,
  Flower2,
  Star,
  User,
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

function getForestResponse(message, allItems) {
  const msg = message.toLowerCase().trim();
  const animals = allItems.filter(i => i.type === 'animal');
  for (const animal of animals) {
    if (msg.includes(animal.name.toLowerCase())) {
      return {
        text: `🦊 **${animal.name}**\n\n${animal.description}\n\n*The ${animal.name} is one of the forest's most fascinating inhabitants. Would you like to know more about its habitat or behavior?*`,
        image: animal.image,
      };
    }
  }
  const birds = allItems.filter(i => i.type === 'bird');
  for (const bird of birds) {
    if (msg.includes(bird.name.toLowerCase())) {
      return {
        text: `🐦 **${bird.name}**\n\n${bird.description}\n\n*Birds like the ${bird.name} fill our forests with music and life. Their songs are the forest's oldest language.*`,
        image: bird.image,
      };
    }
  }
  const plants = allItems.filter(i => i.type === 'plant');
  for (const plant of plants) {
    if (msg.includes(plant.name.toLowerCase())) {
      return {
        text: `🌿 **${plant.name}**\n\n${plant.description}\n\n*Plants like the ${plant.name} are the silent guardians of the forest, giving life to all creatures.*`,
        image: plant.image,
      };
    }
  }

  const keywordResponses = {
    hello: '🌲 *Greetings, wanderer!* The forest welcomes you with open branches. What would you like to know about this ancient green world?',
    hi: '🌿 *Hello, friend!* I am the spirit of these woods. Ask me anything about the creatures and plants that call this forest home.',
    hey: '🍃 *Hey there!* The wind carries your voice to me. What forest secrets shall I share with you today?',
    'how are you': '🌳 *I am as eternal as the oldest oak!* The forest thrives, the streams sing, and the birds paint the sky. All is well in this green realm.',
    forest: '🌲 **The Forest** is a living, breathing entity. Every tree is a library of wisdom, every stream a storyteller. Our forests are home to countless species of animals, birds, and plants — each one a vital thread in the tapestry of life. Explore our pages to meet them all!',
    animal: '🦊 **Forest Animals** are the heartbeats of the wilderness. From the cunning Red Fox to the mighty Gray Wolf, each creature plays a unique role. You can find them all in our Explore section!',
    bird: '🐦 **Forest Birds** are the musicians of the canopy. The Great Horned Owl watches silently by night, while the Scarlet Macaw paints the day with color. Discover their songs!',
    plant: '🌿 **Forest Plants** are the foundation of all life here. From tiny Moss carpets to towering Oak trees, the green world sustains everything. Learn about them in our plant collection.',
    tree: '🌳 *Trees are the pillars of the forest.* Did you know that some trees communicate through underground fungal networks — sometimes called the "Wood Wide Web"? Oak, Birch, and ancient pines have stood here for centuries.',
    wolf: '🐺 The **Gray Wolf** — a symbol of wild freedom. These pack hunters keep the forest in balance, and their howls echo through the valleys like ancient songs.',
    fox: '🦊 The **Red Fox** is nature\'s clever survivor. With its bright coat and bushy tail, it thrives in forest edges and teaches us the art of adaptation.',
    deer: '🦌 The **White-tailed Deer** moves with grace through the undergrowth. Alert and gentle, they are the forest\'s quiet watchers.',
    owl: '🦉 The **Great Horned Owl** — silent hunter of the night. Its golden eyes pierce the darkness, and its wisdom is legendary among forest creatures.',
    macaw: '🦜 The **Scarlet Macaw** brings tropical brilliance to the canopy. These intelligent birds are the jewels of rainforests.',
    robin: '🐦 The **European Robin** — small but full of spirit. Its red breast and cheerful song have made it a beloved garden companion.',
    oak: '🌳 The **Oak Tree** — king of the forest. A single oak can support over 500 different species! It is the cornerstone of woodland life.',
    fern: '🌿 **Ferns** are among the oldest plants on Earth. Their delicate fronds create soft green carpets in the shade of damp forests.',
    mushroom: '🍄 **Mushrooms** are the internet of the forest! Their underground mycelium networks connect trees and recycle nutrients — nature\'s brilliant engineers.',
    moss: '🌱 **Moss** — the soft velvet of the forest floor. It holds precious moisture and prevents erosion, creating a nurturing bed for seeds.',
    bear: '🐻 The **Black Bear** roams our deeper woods. A powerful omnivore, it reminds us of the raw strength and gentle curiosity of wild nature.',
    badger: '🦡 The **European Badger** — a master digger. Its elaborate underground setts are engineering marvels that shelter whole families.',
    chipmunk: '🐿️ The **Eastern Chipmunk** — a tiny bundle of energy! These striped rodents are essential seed dispersers, planting future forests with every forgotten acorn.',
    jay: '🐦 The **Blue Jay** — bold, brilliant, and intelligent. Its striking blue feathers flash through the trees like pieces of sky.',
    woodpecker: '🔨 The **Pileated Woodpecker** — the drummer of the deep woods. Its powerful beak carves homes in dead trees, creating shelter for many other creatures.',
    hummingbird: '💎 The **Ruby-throated Hummingbird** — a flying jewel! It hovers like magic, sipping nectar and pollinating flowers with every visit.',
    rose: '🌹 The **Wild Rose** — beauty with thorns. Its fragrant blossoms feed bees and butterflies, and its hips sustain birds through winter.',
    birch: '🌳 The **Birch Tree** — graceful and resilient. Its paper-like bark has been used for centuries by indigenous peoples for canoes, baskets, and shelter.',
    ecosystem: '*An ecosystem is a delicate web.* Every creature, from the smallest ant to the tallest tree, is connected. Disrupt one thread, and the whole web trembles.',
    biodiversity: '🌍 *Biodiversity is the forest\'s greatest treasure.* 80% of Earth\'s terrestrial species live in forests. Protecting them protects our future.',
    conservation: '🛡️ *Conservation is not just a duty — it is a sacred bond.* We plant trees, protect habitats, and teach others to walk gently upon the Earth.',
    trail: '🥾 *Forest trails are invitations to wonder.* Each path leads to a new discovery — a hidden waterfall, a sunlit glade, or the perfect silence.',
    hike: '🥾 *Hiking through the forest awakens the soul.* Remember: take only pictures, leave only footprints, and let the wild remain wild.',
    silence: '🤫 *Silence is the forest\'s most profound language.* Sit quietly beneath an old tree, and soon you\'ll hear what the world has forgotten.',
    listen: '👂 *Listen...* Can you hear it? The rustle of leaves, the distant bird call, the whisper of wind through ancient branches? The forest is always speaking.',
    spirit: '🌲 *I am the voice of these ancient woods.* I have watched a thousand seasons pass and held the stories of every creature that has called this forest home.',
    thank: '🙏 *Thank you, gentle soul.* The forest is grateful for your kindness. Return anytime — the trees will remember you.',
    bye: '🍃 *Until we meet again!* May the forest live in your heart, and may its peace follow your every step. Walk gently, friend.',
    good: '✨ That warms the ancient sap in my roots! The forest rejoices in your presence.',
    love: '❤️ *And the forest loves you back.* Every creature here, from the smallest ant to the tallest oak, is part of a grand, beautiful story.',
    danger: '⚠️ *The wild deserves respect.* Stay on marked trails, keep your distance from wildlife, and always let someone know your plans. The forest is safe for those who walk wisely.',
    weather: '☀️🌧️ *Forest weather is a mood of its own!* Misty mornings, golden afternoons, and starry nights — each brings a different magic to these woods.',
    food: '🍎 *The forest is nature\'s pantry!* Wild berries, nuts, and mushrooms abound — but always forage with expert knowledge, for not all that glitters is gold.',
    water: '💧 *Water is the lifeblood of the forest.* Streams and rivers carve paths through the wilderness, sustaining every living thing.',
    fire: '🔥 *Fire is a fearsome force.* While some forests depend on occasional fires for renewal, we must always be vigilant. Prevent wildfires at all costs!',
    help: '🤝 *I am here for you!* Ask me about any forest creature, plant, or mystery. Together we shall explore the wonders of this green world.',
  };

  for (const [keyword, response] of Object.entries(keywordResponses)) {
    if (msg.includes(keyword)) return { text: response, image: null };
  }

  if (msg.includes('fauna') || msg.includes('wildlife') || msg.includes('creature')) {
    return { text: '🦊🐦 **Forest Wildlife** is incredibly diverse! We have cunning foxes, graceful deer, wise owls, colorful macaws, and many more. Visit our Explore page to meet them all!', image: null };
  }

  if (msg.includes('flora') || msg.includes('vegetation') || msg.includes('green')) {
    return { text: '🌿🌳 **Forest Flora** ranges from tiny mosses to towering oaks. Our plant kingdom includes ferns, mushrooms, wild roses, and birch trees. Explore them all!', image: null };
  }

  const poeticReplies = [
    '🌲 *The forest whispers...* "Every tree holds a thousand stories. Sit beneath my branches, and I shall tell you one." What would you like to know — about animals, birds, or the ancient plants?',
    '🍃 *The wind carries your question through the canopy...* "I have seen centuries pass and seasons change. Ask me about the creatures of the wood, and I shall share their secrets."',
    '🌿 *A gentle rustle answers you...* "The forest is vast and full of wonder. Tell me what stirs your curiosity — a particular animal, bird, or the silent green world?"',
    '🦉 *The wise owl turns its head...* "Many mysteries lie hidden in these woods. Speak your question — about any forest creature or plant — and I will guide you."',
    '🌳 *The ancient oak nods slowly...* "I know the names of every bird, every beast, every flower in this forest. Share your question, young wanderer."',
  ];

  return {
    text: poeticReplies[Math.floor(Math.random() * poeticReplies.length)],
    image: null,
  };
}

export default function ChatPage() {
  const { t } = useLanguage();
  const [messages, setMessages] = useState([
    {
      text: '🌲 *Greetings, wanderer!* I am the **Spirit of the Forest**. Ask me anything about the animals, birds, plants, and secrets of these ancient woods...',
      isUser: false,
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);

  // خودکار اسکرول بند
  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages(prev => [...prev, { text: userMsg, isUser: true }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getForestResponse(userMsg, allItems);
      setMessages(prev => [...prev, { ...response, isUser: false }]);
      setIsTyping(false);
    }, 800 + Math.random() * 1200);
  };

  const handleQuickQuestion = (question) => {
    setMessages(prev => [...prev, { text: question, isUser: true }]);
    setIsTyping(true);
    setTimeout(() => {
      const response = getForestResponse(question, allItems);
      setMessages(prev => [...prev, { ...response, isUser: false }]);
      setIsTyping(false);
    }, 800 + Math.random() * 1200);
  };

  const [ref1, vis1] = useScrollReveal();
  const [ref2, vis2] = useScrollReveal();
  const [ref3, vis3] = useScrollReveal();
  const [ref4, vis4] = useScrollReveal();
  const [ref5, vis5] = useScrollReveal();
  const [ref6, vis6] = useScrollReveal();
  const [ref7, vis7] = useScrollReveal();

  const revealClass = (visible) =>
    `transition-all duration-1000 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`;

  const quickQuestions = [
    'Tell me about the Red Fox',
    'What is the Wood Wide Web?',
    'How do forests help the planet?',
    'Tell me about the Great Horned Owl',
    'What plants grow in forests?',
    'How can I help protect forests?',
  ];

  return (
    <div className="bg-white text-gray-800">
      {/* 1. HERO — گرتے پتوں کے ساتھ */}
      <section
        className="relative flex items-center justify-center min-h-screen bg-fixed bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `url(' ./forset5.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />
        {/* 🌿 گرتے پتے */}
        <FloatingLeaves />
        <div ref={ref1} className={`relative z-10 text-center text-white max-w-5xl px-4 sm:px-6 -mt-20 ${revealClass(vis1)}`}>
           
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-2xl">
            {t('chat.title') || 'Chat with the Forest Spirit'}
          </h1>
          <p className="mt-4 text-base sm:text-lg md:text-xl text-green-100 max-w-3xl mx-auto drop-shadow">
            Ask anything about the wild — animals, birds, plants, and the ancient wisdom of the woods.
          </p>
        </div>
      </section>

      {/* 2. CHAT INTERFACE */}
      <section className="py-20 bg-white">
        <div ref={ref2} className={`max-w-4xl mx-auto px-4 sm:px-6 ${revealClass(vis2)}`}>
          <div className="bg-white rounded-2xl shadow-2xl border border-green-100 overflow-hidden">
            <div className="bg-green-700 text-white p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center">
                <Leaf size={28} />
              </div>
              <div>
                <h3 className="font-bold text-lg">{t('chat.spiritName') || 'Forest Spirit'}</h3>
                <p className="text-green-200 text-sm flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
                  {isTyping ? 'Typing...' : 'Online — ready to guide you'}
                </p>
              </div>
            </div>

            <div className="h-[320px] overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-green-50/50 to-white">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-3 ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                  {!msg.isUser && (
                    <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center shrink-0 mt-1">
                      <Leaf size={20} className="text-green-800" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] px-5 py-4 rounded-2xl ${
                      msg.isUser
                        ? 'bg-green-600 text-white rounded-br-none'
                        : 'bg-green-50 text-gray-800 rounded-bl-none border border-green-100'
                    }`}
                  >
                    <p className="whitespace-pre-line text-sm sm:text-base leading-relaxed">{msg.text}</p>
                    {msg.image && (
                      <img
                        src={msg.image}
                        alt="Forest"
                        className="mt-3 rounded-xl w-full h-40 object-cover shadow-md"
                      />
                    )}
                  </div>
                  {msg.isUser && (
                    <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center shrink-0 mt-1 text-white">
                      <User size={20} />
                    </div>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center shrink-0">
                    <Leaf size={20} className="text-green-800" />
                  </div>
                  <div className="bg-green-50 px-5 py-4 rounded-2xl rounded-bl-none border border-green-100">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-bounce" />
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-bounce delay-100" />
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <div className="border-t border-green-100 p-4 flex gap-3 bg-white">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={t('chat.placeholder') || 'Ask something about the forest...'}
                className="flex-1 rounded-xl border border-green-200 bg-green-50/50 px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white rounded-xl px-5 flex items-center justify-center transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. QUICK QUESTIONS */}
      <section className="py-20 bg-green-50">
        <div ref={ref3} className={`max-w-7xl mx-auto px-4 sm:px-6 text-center ${revealClass(vis3)}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-green-900 mb-6">
            Quick Questions
          </h2>
          <p className="text-lg text-gray-700 mb-10 max-w-2xl mx-auto">
            Not sure what to ask? Tap any question below and let the forest answer.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {quickQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => handleQuickQuestion(q)}
                className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg hover:bg-green-50 transition-all text-left flex items-start gap-3 group border border-green-100"
              >
                <HelpCircle className="w-5 h-5 text-green-600 mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-sm text-gray-700 group-hover:text-green-800">{q}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CHAT TIPS */}
      <section className="py-20 bg-green-800 text-white">
        <div ref={ref4} className={`max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center ${revealClass(vis4)}`}>
          {[
            { icon: Compass, title: 'Be Curious', desc: 'Ask about any forest topic — the spirit knows no bounds.' },
            { icon: Sparkles, title: 'Be Specific', desc: 'Try asking about a particular animal, bird, or plant by name.' },
            { icon: Leaf, title: 'Explore Freely', desc: 'There are no wrong questions — every inquiry is a seed of wisdom.' },
          ].map((item, i) => (
            <div key={i} className="p-6">
              <item.icon className="mx-auto text-green-300 w-10 h-10 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-green-200">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. FEATURED CREATURES */}
      <section
        className="py-20 bg-fixed bg-cover bg-center relative"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-white/85" />
        <div ref={ref5} className={`relative max-w-7xl mx-auto px-4 sm:px-6 text-center ${revealClass(vis5)}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-green-900 mb-12">
            Ask About These Creatures
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {allItems.slice(0, 8).map((item, i) => (
              <button
                key={item.id}
                onClick={() => handleQuickQuestion(`Tell me about the ${item.name}`)}
                className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg hover:bg-green-50 transition-all text-center group border border-green-100"
              >
                <div className="text-3xl mb-2">
                  {item.type === 'animal' ? '🦊' : item.type === 'bird' ? '🐦' : '🌿'}
                </div>
                <p className="text-sm font-medium text-gray-700 group-hover:text-green-800">{item.name}</p>
                <p className="text-xs text-green-600 uppercase mt-1">{item.type}</p>
              </button>
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
        <div ref={ref6} className={`relative max-w-4xl mx-auto px-4 sm:px-6 text-center text-white`}>
          <Quote className="mx-auto text-green-300 w-12 h-12 mb-6" />
          <p className="text-2xl md:text-4xl italic font-light leading-relaxed">
            “I asked the Forest Spirit about owls, and it told me things I never knew. Magical!”
          </p>
          <p className="mt-6 text-green-200 font-medium">— A Curious Explorer</p>
        </div>
      </section>

      {/* 7. WHAT YOU CAN EXPLORE */}
      <section className="py-20 bg-white">
        <div ref={ref7} className={`max-w-7xl mx-auto px-4 sm:px-6 text-center ${revealClass(vis7)}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-green-900 mb-12">
            What You Can Explore
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Bird, title: 'Animals & Birds', desc: 'Ask about any forest creature — from the cunning fox to the wise owl.' },
              { icon: Flower2, title: 'Plants & Trees', desc: 'Learn about the green kingdom — moss, ferns, oaks, and wild roses.' },
              { icon: Sparkles, title: 'Forest Secrets', desc: 'Discover the hidden wonders: ecosystems, biodiversity, and ancient wisdom.' },
            ].map((item, i) => (
              <div key={i} className="bg-green-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all group">
                <item.icon className="mx-auto text-green-700 w-12 h-12 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
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
        <div className="relative max-w-4xl mx-auto text-center text-white px-4">
          <Leaf className="mx-auto w-12 h-12 mb-4 text-green-200" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            The Forest Is Listening
          </h2>
          <p className="text-green-100 text-lg mb-8 max-w-xl mx-auto">
            Every question you ask brings you closer to the heart of the wild.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={ROUTES.EXPLORE}>
              <button className="bg-white text-green-800 hover:bg-green-100 px-8 py-4 rounded-xl font-medium inline-flex items-center gap-2 shadow-lg transition-colors">
                Explore Species <ArrowRight size={18} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* 🌿 گرتے پتوں کی اینیمیشن CSS */}
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