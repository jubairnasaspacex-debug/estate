import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { smoothScrollToSection } from '../utils/motion';

interface NavbarProps {
  onEnquireClick: () => void;
}

const NAV_ITEMS = [
  { label: 'Developments', href: '#developments' },
  { label: 'Architecture', href: '#architecture' },
  { label: 'Philosophy', href: '#philosophy' },
  { label: 'Gallery', href: '#gallery' },
];

export function Navbar({ onEnquireClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 48);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    smoothScrollToSection(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-200 ${
        mobileOpen
          ? 'bg-[#F6F3EC] text-[#141413] border-b border-[#D6CEC0]'
          : scrolled
            ? 'bg-[#F6F3EC]/98 text-[#141413] border-b border-[#D6CEC0]'
            : 'bg-gradient-to-b from-[#141413]/75 to-transparent text-[#F6F3EC]'
      }`}
    >
      {/* Strict 3-zone Top Bar Contract */}
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-2 md:gap-8 px-4 sm:px-8 lg:px-12">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#hero"
          onClick={(e) => handleLinkClick(e, '#hero')}
          className="font-serif text-sm sm:text-xl font-medium tracking-[0.1em] sm:tracking-[0.14em] uppercase whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9A7B4F]"
        >
          Atelier Estates
        </a>

        {/* Zone 2: 4 concise single-line nav links */}
        <nav aria-label="Primary Navigation" className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleLinkClick(e, item.href)}
              className="editorial-underline text-xs font-medium tracking-[0.14em] uppercase whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9A7B4F]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              onEnquireClick();
            }}
            className={`px-3 sm:px-4 py-2 text-[11px] sm:text-xs font-medium tracking-[0.08em] sm:tracking-[0.12em] uppercase transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9A7B4F] ${
              scrolled || mobileOpen
                ? 'bg-[#141413] text-[#F6F3EC] hover:bg-[#785D37]'
                : 'bg-[#F6F3EC] text-[#141413] hover:bg-[#EAE4D8]'
            }`}
          >
            Private Viewing
          </button>

          <button
            type="button"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation-drawer"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center md:hidden shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9A7B4F]"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <nav
          id="mobile-navigation-drawer"
          aria-label="Mobile Navigation"
          className="border-t border-[#D6CEC0] bg-[#F6F3EC] px-6 py-6 text-[#141413] md:hidden"
        >
          <ul className="flex flex-col divide-y divide-[#D6CEC0]">
            {NAV_ITEMS.map((item, idx) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className="flex items-center justify-between py-4 text-sm font-medium tracking-[0.14em] uppercase"
                >
                  <span>{item.label}</span>
                  <span className="font-mono text-xs text-[#785D37]">0{idx + 1}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
