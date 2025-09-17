
'use client';

import Link from 'next/link';
import { BookOpen, CalendarDays, Languages, Menu, Video, X, Map, PlaySquare, Briefcase } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { DharmaWheelIcon } from '../icons/dharma-wheel';

const navigation = [
  { name: 'Virtual Tours', href: '/tours', icon: Video },
  { name: 'Narrated Walkthroughs', href: '/walkthroughs', icon: PlaySquare },
  { name: 'Digital Archive', href: '/archive', icon: BookOpen },
  { name: 'Events Calendar', href: '/calendar', icon: CalendarDays },
  { name: 'Interactive Map', href: '/map', icon: Map },
  { name: 'Local Services', href: '/services', icon: Briefcase },
];

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getLinkClass = (href: string) => {
    return pathname.startsWith(href)
      ? 'bg-secondary text-secondary-foreground'
      : 'text-muted-foreground hover:bg-secondary/50 hover:text-secondary-foreground';
  };
  
  const getMobileLinkClass = (href: string) => {
    return pathname.startsWith(href)
      ? 'bg-secondary text-primary'
      : 'text-foreground/70 hover:bg-secondary/80';
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <DharmaWheelIcon className="h-6 w-6 text-primary" />
          <span className="hidden font-bold sm:inline-block font-headline text-lg">Monastery360</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-2 text-sm md:flex">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn('transition-colors px-3 py-2 rounded-md font-medium', getLinkClass(item.href))}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-2">
          {/* Language Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Languages className="h-5 w-5" />
                <span className="sr-only">Change language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>English</DropdownMenuItem>
              <DropdownMenuItem disabled>Sikkimese (soon)</DropdownMenuItem>
              <DropdownMenuItem disabled>Tibetan (soon)</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Navigation */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <Link href="/" className="mr-6 flex items-center space-x-2 mb-6" onClick={() => setIsMobileMenuOpen(false)}>
                <DharmaWheelIcon className="h-6 w-6 text-primary" />
                <span className="font-bold font-headline text-lg">Monastery360</span>
              </Link>
              <div className="flex flex-col space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn('flex items-center gap-3 p-3 rounded-l-md font-medium', getMobileLinkClass(item.href))}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
