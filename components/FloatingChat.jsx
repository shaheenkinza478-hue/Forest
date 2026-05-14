'use client';
import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Minus, Leaf, Bot } from 'lucide-react';
import { allItems } from '@/data/forestData';

// Intelligent responses (no API)
function getForestResponse(message, allItems) {
  const msg = message.toLowerCase().trim();
  // Animals
  const animals = allItems.filter(i => i.type === 'animal');
  for (const animal of animals) {
    if (msg.includes(animal.name.toLowerCase())) {
      return { text: `🦊 **${animal.name}**\n\n${animal.description}\n\n*Ask me more!*`, image: animal.image };
    }
  }
  const birds = allItems.filter(i => i.type === 'bird');
  for (const bird of birds) {
    if (msg.includes(bird.name.toLowerCase())) {
      return { text: `🐦 **${bird.name}**\n\n${bird.description}\n\n*Their songs heal the soul.*`, image: bird.image };
    }
  }
  const plants = allItems.filter(i => i.type === 'plant');
  for (const plant of plants) {
    if (msg.includes(plant.name.toLowerCase())) {
      return { text: `🌿 **${plant.name}**\n\n${plant.description}\n\n*Silent guardians.*`, image: plant.image };
    }
  }
  // International forests
  if (msg.includes('amazon')) return { text: "🌎 *Amazon*: largest rainforest, 10% of species, 20% oxygen. Deforestation is a threat, but you can help by choosing sustainable products.", image: null };
  if (msg.includes('congo')) return { text: "🦍 *Congo Basin*: second largest rainforest, home to gorillas and forest elephants. Vital for climate stability.", image: null };
  if (msg.includes('boreal')) return { text: "❄️ *Boreal/Taiga*: spans Canada, Russia, Scandinavia. Stores massive carbon. Its animals include wolves, bears, and lynx.", image: null };
  if (msg.includes('sundarbans')) return { text: "🐅 *Sundarbans*: mangrove forest in India/Bangladesh, home to Royal Bengal Tigers. UNESCO site.", image: null };
  if (msg.includes('deforestation')) return { text: "😢 *Deforestation* destroys 10M hectares/year. Causes: agriculture, logging. Solutions: reforestation, sustainable products, protect indigenous lands.", image: null };
  if (msg.includes('climate')) return { text: "🌡️ *Forests fight climate change*: they absorb CO₂. One mature tree absorbs 48 lbs CO₂/year. Protect forests = protect our future.", image: null };
  // Common animals
  if (msg.includes('wolf')) return { text: "🐺 *Wolves* are keystone species. They keep deer populations in check, allowing forests to regenerate.", image: null };
  if (msg.includes('bear')) return { text: "🐻 *Bears* hibernate in winter. Their sense of smell is 100x better than humans. Respect them from a distance.", image: null };
  if (msg.includes('fox')) return { text: "🦊 *Foxes* are clever survivors. The red fox adapts to forests, cities, and even mountains.", image: null };
  if (msg.includes('owl')) return { text: "🦉 *Owls* are silent night hunters. They can rotate their heads 270 degrees.", image: null };
  if (msg.includes('oak')) return { text: "🌳 *Oaks* support over 500 species. An oak tree is an entire ecosystem.", image: null };
  // Greetings
  if (msg.includes('hello') || msg.includes('hi')) return { text: "🌲 *Hello, wanderer!* Ask me about animals, trees, or how to protect nature.", image: null };
  if (msg.includes('thank')) return { text: "🙏 *You're welcome!* The forest is grateful.", image: null };
  if (msg.includes('bye')) return { text: "🍂 *Farewell!* May the forest walk with you.", image: null };
  if (msg.includes('help')) return { text: "💚 *You can ask about:* wolves, bears, amazon, deforestation, climate, oak, mushrooms... just type your question!", image: null };
  // Default
  return { text: "🌿 *I didn't quite catch that.* Try asking: 'Tell me about wolves', 'What is deforestation?', or 'Hello'. I'm here to help!", image: null };
}

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "🌲 *Hello!* I'm the Spirit of the Forest. Ask me anything about animals, trees, or ecology.", isUser: false },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages(prev => [...prev, { text: userMsg, isUser: true }]);
    setInput('');
    setIsTyping(true);
    setTimeout(() => {
      const response = getForestResponse(userMsg, allItems);
      setMessages(prev => [...prev, { text: response.text, isUser: false, image: response.image }]);
      setIsTyping(false);
    }, 600);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-green-800 to-emerald-500 text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-green-500/50"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window - bottom right, slides up */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-96 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-green-200 transition-all duration-300 ${
          isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        style={{ height: '500px', maxHeight: '70vh' }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-green-700 to-green-600 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-white/20 p-1.5 rounded-full">
              <Bot size={18} />
            </div>
            <div>
              <h3 className="font-bold">Forest Spirit</h3>
              <p className="text-xs text-green-100">Ask me anything</p>
            </div>
          </div>
          <button onClick={toggleChat} className="hover:bg-white/20 p-1 rounded-full">
            <Minus size={18} />
          </button>
        </div>

        {/* Messages with custom scrollbar design */}
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-green-50 to-white custom-scrollbar"
        >
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-2 ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
              {!msg.isUser && (
                <div className="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center shrink-0">
                  <Leaf size={16} className="text-green-700" />
                </div>
              )}
              <div className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm ${
                msg.isUser
                  ? 'bg-green-600 text-white rounded-br-none'
                  : 'bg-white border border-green-200 text-green-800 rounded-bl-none shadow-sm'
              }`}>
                <p className="whitespace-pre-line">{msg.text}</p>
                {msg.image && <img src={msg.image} alt="forest" className="mt-2 rounded-lg w-full h-28 object-cover" />}
              </div>
              {msg.isUser && (
                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center shrink-0 text-white">
                  <span className="text-xs">You</span>
                </div>
              )}
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-2 justify-start">
              <div className="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center">
                <Leaf size={16} className="text-green-700" />
              </div>
              <div className="bg-white border border-green-200 px-4 py-2 rounded-2xl rounded-bl-none">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce delay-100" />
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce delay-200" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-green-100 p-3 flex gap-2 bg-white">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about forests, animals..."
            className="flex-1 rounded-xl border border-green-200 bg-white px-4 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white rounded-xl px-4 flex items-center justify-center shadow-md"
          >
            <Send size={18} />
          </button>
        </div>
      </div>

      <style jsx global>{`
        /* Custom scrollbar for chat messages */
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f0fdf4;
          border-radius: 10px;
          margin: 4px 0;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #22c55e;
          border-radius: 10px;
          transition: all 0.2s;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #16a34a;
        }
        /* Firefox scrollbar */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #22c55e #f0fdf4;
        }
      `}</style>
    </>
  );
}