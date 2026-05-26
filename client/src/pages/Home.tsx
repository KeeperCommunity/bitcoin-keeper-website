import { useState } from "react";
import { 
  Shield, Check, ArrowRight, Download, Users, Landmark, 
  HelpCircle, ChevronDown, ChevronRight, MessageSquare, Star, 
  Key, Heart, Lock, Compass, Users2, ShieldAlert
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

export default function Home() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  const handleSupportTip = () => {
    toast.success("Thank you for supporting open-source Bitcoin development!");
  };

  const testimonials = [
    {
      quote: "Keeper is a great multi-sig app! 👌 Try it out if you want to explore an upgrade into multi-sig, it's perfect for playing around and getting comfortable. Simple yet feature rich.",
      author: "Rob | Bitsaga.be",
      handle: "@BitsagaRob"
    },
    {
      quote: "Free market competition driving #bitcoin collaborative wallet services to innovate constantly. Of the services I’ve played with so far, I still like Keeper the best right now.",
      author: "The Bitcoin Dudeist ⚡️",
      handle: "@BitcoinDudeist"
    },
    {
      quote: "I've been using the Keeper wallet for a while now, and I have to say—it’s an awesome way to manage and secure your coins. The multisig setup is a game changer.",
      author: "Ben",
      handle: "BTC Sessions"
    },
    {
      quote: "Depends what you see as multisig. Have to say the using Keeper is easier than getting a bank account.",
      author: "Bitcoin Brabant",
      handle: "@BitcoinBrabant"
    },
    {
      quote: "I'm so excited for this. Such a great project.",
      author: "Oliver L. Velez",
      handle: "⚡️ 1%'er Bitcoiner"
    }
  ];

  const faqs = [
    {
      q: "Why is everything free now?",
      a: "Keeper used to offer subscription features. Today, all functionality is free and available to everyone. We believe secure self-custody is a fundamental right, and open-source tools should be accessible to all without financial gates."
    },
    {
      q: "Who maintains Keeper now?",
      a: "Keeper is community-led and open-source. A dedicated group of Bitcoin developers, designers, and contributors maintain and continuously improve the codebase to ensure it remains cutting-edge."
    },
    {
      q: "How can I support the project?",
      a: "If you want to support future development, you can tip the developer(s) who built the features directly inside the app, contribute to the GitHub repository, or spread the word to other Bitcoiners."
    },
    {
      q: "Is Keeper regulated?",
      a: "No, Bitcoin Keeper is a non-custodial software tool, not a financial institution. We do not hold, manage, or transfer your assets. Therefore, traditional financial regulations do not apply to the software itself."
    },
    {
      q: "Do you store my keys?",
      a: "Never. Your private keys and recovery phrases are generated and stored exclusively on your own devices. We have zero access to your funds, backups, or personal data."
    }
  ];

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32 border-b border-primary/5">
        {/* Subtle decorative background pattern */}
        <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#1e352f_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="container max-w-6xl relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Text & CTAs */}
            <div className="lg:col-span-6 space-y-8 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary font-semibold text-xs tracking-wider uppercase">
                <Shield className="h-3.5 w-3.5" /> Community-Led & Open Source
              </div>
              
              <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight text-primary leading-[1.05]">
                Bitcoin <br />
                <span className="italic font-normal text-primary/80">Keeper</span>
              </h1>
              
              <p className="font-sans text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
                A community-led, open-source wallet for secure multisig self-custody. 
                No accounts. No subscriptions. Your keys, your bitcoin — always.
              </p>

              {/* Download Buttons Grid */}
              <div id="download" className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md">
                <Button asChild className="h-14 font-semibold bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl flex items-center justify-center gap-2.5">
                  <a href="https://play.google.com/store/apps/details?id=io.hexawallet.bitcoinkeeper" target="_blank" rel="noopener noreferrer">
                    <Download className="h-5 w-5" /> Google Play
                  </a>
                </Button>
                <Button asChild className="h-14 font-semibold bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl flex items-center justify-center gap-2.5">
                  <a href="https://apps.apple.com/us/app/bitcoin-keeper/id1545535925" target="_blank" rel="noopener noreferrer">
                    <Download className="h-5 w-5" /> App Store
                  </a>
                </Button>
                <Button asChild variant="outline" className="h-14 font-semibold border-primary/10 hover:bg-primary/5 rounded-xl flex items-center justify-center gap-2.5">
                  <a href="https://github.com/bithyve/keeper-desktop/releases/" target="_blank" rel="noopener noreferrer">
                    Desktop App
                  </a>
                </Button>
                <Button asChild variant="outline" className="h-14 font-semibold border-primary/10 hover:bg-primary/5 rounded-xl flex items-center justify-center gap-2.5">
                  <a href="https://github.com/bithyve/bitcoin-keeper/releases/" target="_blank" rel="noopener noreferrer">
                    PGP Signed APK
                  </a>
                </Button>
              </div>
            </div>

            {/* Right Column: Custom Generated Mockup */}
            <div className="lg:col-span-6 relative flex justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent rounded-3xl -rotate-2 scale-105" />
              <img 
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663560985202/22PprtjboLFbJBcYYDxmC8/keeper-hero-mockup-ZPPhjnorV4RoEHWH9hzUdu.webp" 
                alt="Bitcoin Keeper App UI" 
                className="relative rounded-3xl shadow-[0_20px_50px_rgba(30,53,47,0.08)] max-w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Built for Long-Term Self-Custody */}
      <section className="py-20 md:py-32 border-b border-primary/5">
        <div className="container max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-primary leading-tight">
                Built for long-term <br />
                <span className="italic font-normal text-primary/80">self-custody</span>
              </h2>
              <p className="font-sans text-base md:text-lg text-muted-foreground leading-relaxed">
                Keeper helps you manage multisig setups with absolute clarity and control. No single points of failure, ever.
              </p>
              <div className="space-y-4 pt-4">
                {[
                  "Easy multisig creation and management",
                  "Keys stored only on your devices",
                  "Server-assisted recovery (optional)",
                  "Inheritance and emergency access tools",
                  "Timelocked and duress configurations",
                  "Open-source and community-maintained"
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent">
                      <Check className="h-3 w-3 stroke-[3]" />
                    </div>
                    <span className="font-sans text-sm font-semibold text-foreground/90">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Visual Block representing key security */}
            <div className="p-8 md:p-12 rounded-3xl bg-primary text-primary-foreground space-y-6 shadow-[0_20px_50px_rgba(30,53,47,0.1)]">
              <Lock className="h-10 w-10 text-accent" />
              <h3 className="font-serif text-2xl font-bold text-background">Absolute Sovereignty</h3>
              <p className="font-sans text-sm leading-relaxed text-primary-foreground/80">
                Keeper leverages advanced Bitcoin standards (Miniscript, PSBTs, and multi-key descriptors) to guarantee that you retain 100% control. Your keys never leave your physical device.
              </p>
              <div className="h-px bg-background/10 my-4" />
              <div className="flex justify-between items-center text-xs font-mono text-primary-foreground/60">
                <span>STANDARD: BIP-48 / DESCRIPTORS</span>
                <span>STATUS: SECURE</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Generational Wealth Management */}
      <section className="py-20 md:py-32 bg-primary/5 border-b border-primary/5">
        <div className="container max-w-5xl">
          <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
            <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-primary">
              Generational Wealth Management
            </h2>
            <p className="font-sans text-base md:text-lg text-muted-foreground leading-relaxed">
              Bitcoin Keeper is designed with a focus on flexibility and reliability. Our holistic approach ensures your Bitcoin stays secure and accessible for generations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Easy Wallet Setup",
                desc: "Preset key configurations to create multikey wallets in seconds.",
                icon: Compass
              },
              {
                title: "Key Management",
                desc: "Dedicated center for efficient, granular control of your keys.",
                icon: Key
              },
              {
                title: "Other Wallets",
                desc: "Import or recreate wallets made in other apps with ease.",
                icon: Users2
              }
            ].map((card) => {
              const Icon = card.icon;
              return (
                <Card key={card.title} className="p-8 rounded-2xl border-primary/5 bg-card shadow-[0_10px_30px_rgba(30,53,47,0.02)] space-y-4 hover:shadow-[0_20px_50px_rgba(30,53,47,0.06)] transition-all duration-300">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-primary">{card.title}</h3>
                  <p className="font-sans text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Product Philosophy & Testimonial */}
      <section className="py-20 md:py-32 border-b border-primary/5">
        <div className="container max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-5 space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-primary">
                Our Product Philosophy
              </h2>
              <p className="font-sans text-base text-muted-foreground leading-relaxed">
                Open source, privacy-focused, and customizable—these core tenets guide every feature we build in Keeper.
              </p>
              <div className="h-px bg-primary/5 my-4" />
              <blockquote className="font-sans text-sm italic text-muted-foreground leading-relaxed border-l-2 border-accent pl-4">
                "The multisig setup is a game changer. I love having multiple vaults and the ability to customize the security of my BTC."
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20 text-accent font-bold font-serif">
                  B
                </div>
                <div>
                  <p className="font-sans text-sm font-bold text-primary">Ben</p>
                  <p className="font-sans text-xs text-muted-foreground">BTC Sessions</p>
                </div>
              </div>
            </div>

            {/* Showcase feature lists */}
            <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Inheritance Wallets", desc: "Special wallets for you to bequeath your bitcoin securely." },
                { title: "Collaborative Wallets", desc: "Create wallets with friends, family and business associates." },
                { title: "Time locked wallets", desc: "To be unlocked and accessed when you think the time is right." },
                { title: "Inheritance Key", desc: "A special miniscript enabled key that unlocks after a specific time." },
                { title: "Server Key", desc: "Use for a range of bitcoin spends as decided by you." },
                { title: "Emergency Key", desc: "Made available as an additional key for special spending conditions." }
              ].map((item) => (
                <div key={item.title} className="p-6 rounded-2xl bg-primary/5 border border-primary/5 space-y-2">
                  <h4 className="font-serif text-base font-bold text-primary">{item.title}</h4>
                  <p className="font-sans text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Concierge Services */}
      <section className="py-20 md:py-32 bg-primary/5 border-b border-primary/5">
        <div className="container max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-primary">
                Concierge Services
              </h2>
              <p className="font-sans text-base md:text-lg text-muted-foreground leading-relaxed">
                From multikey wallet creation to inheritance planning, our experts ensure a seamless and secure experience tailored to your needs.
              </p>
              <div className="space-y-4 pt-4">
                {[
                  { title: "Connect With Experts", desc: "Get queries resolved from our in-house and partnered experts." },
                  { title: "Share Diagnostics", desc: "Help your consultants help you better securely." },
                  { title: "Independent Relationships", desc: "Get in touch with your consultants outside the app. Keeper doesn't gatekeep!" }
                ].map((item) => (
                  <div key={item.title} className="space-y-1">
                    <h4 className="font-serif text-base font-bold text-primary">{item.title}</h4>
                    <p className="font-sans text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 md:p-12 rounded-3xl bg-card border border-primary/5 shadow-[0_20px_50px_rgba(30,53,47,0.02)] space-y-6 text-center">
              <h3 className="font-serif text-2xl font-bold text-primary">Become a Consultant</h3>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                Are you an estate planner, financial advisor, or Bitcoin consultant? Partner with Keeper to offer advanced multisig custody to your clients.
              </p>
              <Button asChild className="w-full h-12 font-semibold bg-primary text-primary-foreground hover:bg-primary/90">
                <a href="mailto:keeper@bithyve.com">Get in Touch</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* The Community Speaks */}
      <section className="py-20 md:py-32 border-b border-primary/5">
        <div className="container max-w-5xl">
          <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
            <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-primary">
              The Community Speaks
            </h2>
            <p className="font-sans text-base md:text-lg text-muted-foreground leading-relaxed">
              The community loves us for our product philosophy and feature implementation prowess. You don’t have to take our word for it!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <Card key={idx} className="p-6 md:p-8 rounded-2xl border-primary/5 bg-card shadow-[0_10px_30px_rgba(30,53,47,0.01)] flex flex-col justify-between space-y-6 hover:shadow-[0_20px_50px_rgba(30,53,47,0.05)] transition-all duration-300">
                <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-primary/5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 text-accent font-bold text-xs uppercase">
                    {t.author[0]}
                  </div>
                  <div>
                    <h4 className="font-sans text-xs font-bold text-primary">{t.author}</h4>
                    <p className="font-sans text-[10px] text-muted-foreground">{t.handle}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Free and Community Supported */}
      <section className="py-20 md:py-32 bg-primary text-primary-foreground border-b border-primary/5">
        <div className="container max-w-4xl text-center space-y-8">
          <Heart className="h-12 w-12 text-accent mx-auto animate-pulse" />
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-background">
            Free and Community-Supported
          </h2>
          <p className="font-sans text-lg text-primary-foreground/80 leading-relaxed max-w-2xl mx-auto">
            Keeper used to offer subscription features. Today, all functionality is free and available to everyone. 
            If you want to support future development, you can tip the developer(s) who built the features directly inside the app.
          </p>
          <Button onClick={handleSupportTip} className="h-12 px-8 font-semibold bg-accent text-accent-foreground hover:bg-accent/90 rounded-xl">
            Support Development
          </Button>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-20 md:py-32 border-b border-primary/5">
        <div className="container max-w-3xl">
          <div className="text-center space-y-4 mb-16">
            <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-primary">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx} 
                  className="border border-primary/5 rounded-2xl bg-card overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-6 text-left font-serif text-base md:text-lg font-bold text-primary hover:bg-primary/5 transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronDown className="h-5 w-5 text-accent" /> : <ChevronRight className="h-5 w-5 text-muted-foreground" />}
                  </button>
                  
                  {isOpen && (
                    <div className="p-6 pt-0 border-t border-primary/5 bg-primary/5 animate-in fade-in duration-200">
                      <p className="font-sans text-sm md:text-base text-muted-foreground leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Download CTA */}
      <section className="py-20 md:py-32 bg-primary/5 text-center">
        <div className="container max-w-3xl space-y-8">
          <h2 className="font-serif text-4xl md:text-6xl font-bold tracking-tight text-primary">
            Download Bitcoin Keeper Today
          </h2>
          <p className="font-sans text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">
            Setup wallets, get ample help, manage keys effectively and plan your inheritance. All enabled via an intuitive, sovereign design.
          </p>
          <div className="flex justify-center">
            <Button asChild className="h-14 px-8 font-semibold bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl">
              <a href="#download">Get Started Now</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
