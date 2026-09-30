import { Link } from "wouter";
import { Shield, Twitter, Youtube, Linkedin, BookOpen, Send, Github } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: "Twitter", href: "https://twitter.com/bitcoinKeeper_", icon: Twitter },
    { name: "Youtube", href: "https://www.youtube.com/channel/UCMqDNxbz16w8pxpmsa6s8GQ", icon: Youtube },
    { name: "Linkedin", href: "https://www.linkedin.com/company/bithyve/", icon: Linkedin },
    { name: "Medium", href: "https://medium.com/bitbees", icon: BookOpen },
    { name: "Telegram", href: "https://t.me/bitcoinkeeper", icon: Send },
    { name: "Github", href: "https://github.com/KeeperCommunity/bitcoin-keeper", icon: Github },
  ];

  return (
    <footer className="border-t border-primary/5 bg-primary text-primary-foreground">
      <div className="container py-16 md:py-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Brand Info */}
          <div className="flex flex-col gap-5 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <Shield className="h-5 w-5" />
              </div>
              <span className="font-serif text-xl font-bold tracking-tight text-background">
                Bitcoin Keeper
              </span>
            </div>
            <p className="max-w-md font-sans text-sm leading-relaxed text-primary-foreground/70">
              A community-led, open-source wallet for secure multisig self-custody. 
              No accounts. No subscriptions. Your keys, your bitcoin — always.
            </p>
            {/* Social Icons */}
            <div className="flex flex-wrap gap-3.5 mt-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-background/10 text-primary-foreground/80 transition-all hover:bg-accent hover:text-accent-foreground hover:scale-105"
                    title={social.name}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-serif text-base font-bold text-background">Navigation</h4>
            <nav className="flex flex-col gap-2.5">
              <Link href="/" className="font-sans text-sm text-primary-foreground/70 transition-colors hover:text-accent">
                Home
              </Link>
              <Link href="/features" className="font-sans text-sm text-primary-foreground/70 transition-colors hover:text-accent">
                Features
              </Link>
              <Link href="/team" className="font-sans text-sm text-primary-foreground/70 transition-colors hover:text-accent">
                Team
              </Link>
              <Link href="/private" className="font-sans text-sm text-primary-foreground/70 transition-colors hover:text-accent">
                Private
              </Link>
              <a
                href="https://help.bitcoinkeeper.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm text-primary-foreground/70 transition-colors hover:text-accent"
              >
                Knowledge Base
              </a>
            </nav>
          </div>

          {/* Legal / Contact */}
          <div className="flex flex-col gap-4">
            <h4 className="font-serif text-base font-bold text-background">Legal & Support</h4>
            <nav className="flex flex-col gap-2.5">
              <Link href="/privacy-policy" className="font-sans text-sm text-primary-foreground/70 transition-colors hover:text-accent">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="font-sans text-sm text-primary-foreground/70 transition-colors hover:text-accent">
                Terms of Service
              </Link>
              <span className="font-sans text-xs text-primary-foreground/50 mt-2">
                Contact support:
              </span>
              <a
                href="mailto:keeper@bithyve.com"
                className="font-sans text-sm font-semibold text-accent transition-colors hover:underline"
              >
                keeper@bithyve.com
              </a>
            </nav>
          </div>
        </div>

        <hr className="my-12 border-background/10" />

        {/* Bottom Bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-sans text-xs text-primary-foreground/50">
            &copy; {currentYear} BitHyve UK Limited. All Rights Reserved. Bitcoin Keeper is developed by BitHyve UK Limited.
          </p>
          <p className="font-sans text-[10px] tracking-wide text-primary-foreground/40 uppercase">
            Sovereign Self-Custody
          </p>
        </div>
      </div>
    </footer>
  );
}
