'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/sidebar';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';

export function SidebarWrapper({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background relative">

      {/* MOBILE HEADER */}
      <header className="lg:hidden sticky top-0 z-50 bg-card border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="font-semibold">VC Intel</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </header>

      {/* SIDEBAR */}
      <aside
        className={`
    fixed top-0 left-0 z-40 h-full w-64
    bg-card border-r border-border
    transition-transform duration-300 ease-in-out

    ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
    ${desktopOpen ? 'lg:translate-x-0' : 'lg:-translate-x-full'}
  `}
      >
        <Sidebar
          desktopOpen={desktopOpen}
          setDesktopOpen={setDesktopOpen}
        />
      </aside>

      {/* CHATGPT STYLE TOGGLE (DESKTOP ONLY) */}
      <button
        onClick={() => setDesktopOpen(!desktopOpen)}
        className={`
          hidden lg:flex
          fixed top-1/2 -translate-y-1/2
          z-50
          h-9 w-9
          items-center justify-center
          rounded-full
          border border-border
          bg-card shadow-md
          transition-all duration-300

          ${desktopOpen ? 'left-64' : 'left-4'}
        `}
      >
        {desktopOpen ? (
          <ChevronLeft className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </button>

      {/* MOBILE OVERLAY */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* MAIN CONTENT */}
      <main
        className={`
          min-h-screen transition-all duration-300
          ${desktopOpen ? 'lg:ml-64' : 'lg:ml-0'}
        `}
      >
        {children}
      </main>

    </div>
  );
}