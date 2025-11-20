'use client';

import { cn } from '@/lib/utils';

const statusColors = {
  done: 'bg-green-200',
  started: 'bg-yellow-200',
  'not started': 'bg-red-200',
} as const;

const defaultColor = 'bg-slate-700';

export function StatusDisplay({ status }: { status: string }) {
  const normalized = status.toLowerCase();
  const bgColor =
    normalized in statusColors
      ? statusColors[normalized as keyof typeof statusColors]
      : defaultColor;

  return (
    <div
      className={cn(
        'inline-block rounded-full px-2 py-1 text-xs font-semibold text-gray-700',
        bgColor,
      )}
    >
      {status}
    </div>
  );
}
