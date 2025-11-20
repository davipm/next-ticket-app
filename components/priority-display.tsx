import { Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

const MAX_PRIORITY = 5;

export function PriorityDisplay({ priority }: { priority: number }) {
  const level = Math.max(0, Math.min(priority, MAX_PRIORITY));

  return (
    <div className="flex items-baseline">
      {Array.from({ length: MAX_PRIORITY }, (_, i) => (
        <Flame
          key={i}
          size={20}
          strokeWidth={3}
          className={cn(
            'transition-colors', // optional: nice subtle animation on change
            i < level ? 'text-red-400' : 'text-slate-400',
          )}
        />
      ))}
    </div>
  );
}
