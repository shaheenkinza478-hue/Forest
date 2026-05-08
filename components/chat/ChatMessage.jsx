import { cn } from '@/utils/helpers';
import { User, Bot } from 'lucide-react';

export default function ChatMessage({ message, isUser }) {
  return (
    <div className={cn('flex gap-3 mb-4', isUser ? 'justify-end' : 'justify-start')}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-forest-100 dark:bg-forest-800 flex items-center justify-center">
          <Bot size={18} className="text-forest-600" />
        </div>
      )}
      <div
        className={cn(
          'max-w-[80%] px-4 py-3 rounded-2xl text-sm',
          isUser
            ? 'bg-forest-600 text-white rounded-br-none'
            : 'glass rounded-bl-none text-gray-800 dark:text-gray-100'
        )}
      >
        {message}
      </div>
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-forest-200 dark:bg-forest-700 flex items-center justify-center">
          <User size={18} className="text-forest-800 dark:text-forest-200" />
        </div>
      )}
    </div>
  );
}