'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface HeaderProps {
  title: string;
  description?: string;
}

export function Header({ title, description }: HeaderProps) {
  return (
    <div className="border-b border-border bg-card sticky top-0 z-30">
      <div className="flex flex-col gap-4 px-4 py-4 sm:px-6 sm:py-5 lg:px-8 lg:py-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{title}</h1>
          {description && (
            <p className="text-xs sm:text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
}
