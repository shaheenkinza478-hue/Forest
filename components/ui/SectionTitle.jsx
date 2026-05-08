import { cn } from '@/utils/helpers';

export default function SectionTitle({ title, subtitle, className }) {
  return (
    <div className={cn('text-center max-w-2xl mx-auto mb-12', className)}>
      <h2 className="text-3xl md:text-4xl font-bold text-forest-800 dark:text-forest-200">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          {subtitle}
        </p>
      )}
    </div>
  );
}