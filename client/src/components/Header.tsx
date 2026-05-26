import { Link, useLocation } from "wouter";
import { useState } from "react";
import { Menu, X, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/features" },
    { name: "Team", href: "/team" },
    { name: "Private", href: "/private" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/5 bg-background/80 backdrop-blur-md">
      <div className="container flex h-20 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-90">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-accent">
            <Shield className="h-6 w-6" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg font-bold leading-tight text-primary">
              Bitcoin Keeper
            </span>
            <span className="text-xs font-medium tracking-wider uppercase text-muted-foreground">
              Self-Custody
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = location === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`relative font-sans text-sm font-semibold transition-colors hover:text-primary ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {item.name}
                {isActive && (
                  <span className="absolute -bottom-1.5 left-0 h-0.5 w-full rounded-full bg-accent" />
                )}
              </Link>
            );
          })}
          <a
            href="https://help.bitcoinkeeper.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
          >
            Knowledge Base
          </a>
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-4">
          <Button asChild variant="outline" className="font-semibold border-primary/10 hover:bg-primary/5">
            <a href="https://github.com/bithyve/bitcoin-keeper/releases" target="_blank" rel="noopener noreferrer">
              GitHub APK
            </a>
          </Button>
          <Button asChild className="font-semibold bg-primary text-primary-foreground hover:bg-primary/90">
            <a href="#download">Download App</a>
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary/10 text-primary md:hidden"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="absolute top-20 left-0 w-full border-b border-primary/10 bg-background px-6 py-8 shadow-xl md:hidden animate-in fade-in slide-in-from-top-5 duration-200">
          <nav className="flex flex-col gap-5">
            {navItems.map((item) => {
              const isActive = location === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-sans text-base font-bold transition-colors ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
            <a
              href="https://help.bitcoinkeeper.app/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="font-sans text-base font-bold text-muted-foreground"
            >
              Knowledge Base
            </a>
            <hr className="my-2 border-primary/5" />
            <div className="flex flex-col gap-3">
              <Button asChild variant="outline" className="w-full font-semibold border-primary/10">
                <a href="https://github.com/bithyve/bitcoin-keeper/releases" target="_blank" rel="noopener noreferrer">
                  GitHub APK
                </a>
              </Button>
              <Button asChild className="w-full font-semibold bg-primary text-primary-foreground">
                <a href="#download" onClick={() => setMobileMenuOpen(false)}>Download App</a>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
