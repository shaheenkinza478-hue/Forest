'use client';
import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { getRandomReply } from '@/utils/helpers';
import { Send } from 'lucide-react';
import ChatMessage from './ChatMessage';

export default function ChatBox() {
  const { t } = useLanguage();
  const [messages, setMessages] = useState([
    { text: t('chat.spiritReplies')[0], isUser: false }
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages(prev => [...prev, { text: userMsg, isUser: true }]);
    setInput('');

    // Simulate forest spirit reply after short delay
    setTimeout(() => {
      const replies = t('chat.spiritReplies');
      const reply = getRandomReply(replies);
      setMessages(prev => [...prev, { text: reply, isUser: false }]);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="max-w-2xl mx-auto glass rounded-2xl overflow-hidden shadow-lg flex flex-col h-[600px]">
      {/* Chat Header */}
      <div className="bg-forest-50 dark:bg-dark-forest-800 p-4 border-b border-forest-200 dark:border-forest-700 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-forest-200 dark:bg-forest-700 flex items-center justify-center">
          <span className="text-xl">🌲</span>
        </div>
        <div>
          <h3 className="font-semibold text-forest-800 dark:text-forest-200">{t('chat.spiritName')}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">online</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <ChatMessage key={i} message={msg.text} isUser={msg.isUser} />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-forest-200 dark:border-forest-700 p-3 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t('chat.placeholder')}
          className="flex-1 rounded-xl border border-forest-200 dark:border-forest-700 bg-white dark:bg-dark-forest-800 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500 dark:text-white"
        />
        <button
          onClick={handleSend}
          className="bg-forest-600 hover:bg-forest-700 text-white rounded-xl px-4 flex items-center justify-center transition-colors"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}