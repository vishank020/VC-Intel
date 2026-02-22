'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Building2, ListTodo, Bookmark, Search } from 'lucide-react';

export function Sidebar() {
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
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-card">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="border-b border-border px-6 py-8">
          <h1 className="text-2xl font-bold text-primary">VC Intel</h1>
          <p className="text-xs text-muted-foreground mt-1">Intelligence Platform</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 px-4 py-6">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-muted'
                )}
              >
                <Icon className="h-5 w-5" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-border px-4 py-4">
          <p className="text-xs text-muted-foreground text-center">
            VC Intelligence Platform v1.0
          </p>
        </div>
      </div>
    </aside>
  );
}
