'use client';

import { useCallback } from 'react';
import { cn } from '@/lib/utils';

export function StatusDisplay({ status }: { status: string }) {
  const getColor = useCallback((status: string) => {
    const statusLowerCase = status.toLowerCase();

    const colorMaps: { [key: string]: string } = {
      done: 'bg-green-200',
      started: 'bg-yellow-200',
      'not started': 'bg-red-200',
      default: 'bg-slate-700',
    };

    return colorMaps[statusLowerCase] || colorMaps['default'];
  }, []);

  return (
    <div
      className={cn(
        'inline-block rounded-full px-2 py-1 text-xs font-semibold text-gray-700',
        getColor(status),
      )}
    >
      {status}
    </div>
  );
}
