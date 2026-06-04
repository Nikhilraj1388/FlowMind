'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FlowMindLogo } from '@/components/layout/flowmind-logo';
import { UserMenu } from '@/components/layout/user-menu';

const navLinks = [
  { href: '#features', label: 'Features' },
  { href: '#visualizations', label: 'Visualizations' },
  { href: '#pricing', label: 'Pricing' },
];

export function MarketingNavigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'border-b border-border/50 bg-background/80 backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between px-4 py-4 sm:px-6">
        <FlowMindLogo />

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <UserMenu />
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-border/50 bg-background/95 px-4 py-4 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Link href="/dashboard" onClick={() => setMobileOpen(false)}>
              <Button variant="gradient" className="w-full">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      )}
    </motion.header>
  );
}
