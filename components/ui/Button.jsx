import { cn } from '@/utils/helpers';

export default function Button({ children, variant = 'primary', className, ...props }) {
  const base = 'inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variants = {
    primary: 'bg-forest-600 text-white hover:bg-forest-700 focus:ring-forest-500',
    outline: 'border-2 border-forest-600 text-forest-700 dark:text-forest-300 hover:bg-forest-50 dark:hover:bg-forest-900 focus:ring-forest-400',
    ghost: 'text-forest-700 dark:text-forest-300 hover:bg-forest-100 dark:hover:bg-forest-900',
  };

  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}