'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Building2,
  ListTodo,
  Bookmark,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react';

export function Sidebar({
  desktopOpen,
  setDesktopOpen,
}: {
  desktopOpen: boolean;
  setDesktopOpen: (open: boolean) => void;
}) {
  const pathname = usePathname();

  const links = [
    {
      label: 'Companies',
      href: '/companies',
      icon: Building2,
    },
    {
      label: 'Lists',
      href: '/lists',
      icon: ListTodo,
    },
    {
      label: 'Saved Searches',
      href: '/saved',
      icon: Bookmark,
    },
  ];

  return (
    <div className="flex h-full flex-col w-full">

      {/* Logo + Collapse Button */}
      <div className="border-b border-border px-4 sm:px-6 py-6 sm:py-8">
        
        <div className="flex items-start justify-between">

          {/* Logo */}
          <div className="truncate">
            <h1 className="text-xl sm:text-2xl font-bold text-primary truncate">
              VC Intel
            </h1>
            <p className="text-xs text-muted-foreground mt-1">
              Intelligence Platform
            </p>
          </div>

          {/* ChatGPT-style collapse button */}
          <button
            onClick={() => setDesktopOpen(!desktopOpen)}
            className="
              hidden lg:flex
              h-8 w-8
              items-center justify-center
              rounded-md
              border border-border
              hover:bg-muted
              transition-colors
              flex-shrink-0
            "
            aria-label="Toggle Sidebar"
          >
            {desktopOpen ? (
              <PanelLeftClose className="h-4 w-4" />
            ) : (
              <PanelLeftOpen className="h-4 w-4" />
            )}
          </button>

        </div>

      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 sm:px-4 py-4 sm:py-6 overflow-y-auto">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-sm font-medium transition-colors whitespace-nowrap',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground hover:bg-muted'
              )}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-border px-3 sm:px-4 py-3 sm:py-4">
        <p className="text-xs text-muted-foreground text-center truncate">
          VC Intel v1.0
        </p>
      </div>

    </div>
  );
}