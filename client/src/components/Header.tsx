import { Link, useLocation } from "wouter";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const logoUrl = "/wp-content/uploads/2025/01/Vector.svg";

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/features" },
    { name: "Private", href: "/private" },
    { name: "Ask Keeper", href: "/ask-keeper" },
    { name: "Support", href: "/#support-keeper" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/15 bg-[#2f554f]">
      <div className="flex h-[70px] w-full items-center justify-between px-3 md:px-5">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center transition-opacity hover:opacity-90"
        >
          <img
            src={logoUrl}
            alt="Bitcoin Keeper"
            className="h-[45px] w-[137px]"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-stretch self-stretch lg:flex">
          {navItems.map(item => {
            const isActive = location === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`relative flex items-center px-[22px] font-sans text-[12px] font-normal uppercase tracking-[2.2px] transition-colors hover:text-white ${
                  isActive ? "text-white" : "text-white/95"
                }`}
              >
                {item.name.toUpperCase()}
                {isActive && (
                  <span className="absolute bottom-0 left-[18px] right-[18px] h-[3px] bg-white" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-10 w-10 items-center justify-center text-white lg:hidden"
          aria-label="Menu Toggle"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="absolute left-0 top-[70px] w-full border-b border-white/15 bg-[#2f554f] px-6 py-8 shadow-xl animate-in fade-in slide-in-from-top-5 duration-200 lg:hidden"
        >
          <nav className="flex flex-col gap-5">
            {navItems.map(item => {
              const isActive = location === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-sans text-sm uppercase tracking-[2.2px] transition-colors ${
                    isActive ? "text-white" : "text-white/80"
                  }`}
                >
                  {item.name.toUpperCase()}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
