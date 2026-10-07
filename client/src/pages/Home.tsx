import { ArrowRight, Check, Copy, Download, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const WP = "/wp-content/uploads";
const SUPPORT_ADDRESS = "bc1q3usznw6j7j32hrq594zshmrkueccvqaene9d84";
const SUPPORT_URI = `bitcoin:${SUPPORT_ADDRESS}?label=Bitcoin%20Keeper`;

const assets = {
  logo: `${WP}/2025/04/500x500.png`,
  hero: `${WP}/2025/07/New-Banner-Image-2.png`,
  googlePlay: `${WP}/2025/02/Google-Play.svg`,
  appStore: `${WP}/2025/02/App-Store.svg`,
  desktopBadge: `${WP}/2025/02/Desktop-App-1.png`,
  apkBadge: `${WP}/2025/02/APK-1.png`,
  generational: `${WP}/2025/07/Group-1000004670.png`,
  selfCustody: `${WP}/2025/07/Group-1000004671.png`,
  galleryIcon: `${WP}/2025/02/gallery-icon.png`,
  appGallery: [
    `${WP}/2025/07/App-Gallery-07-1.png`,
    `${WP}/2025/07/App-Gallery-08-1.png`,
    `${WP}/2025/07/Key-Detail-Screen-1.png`,
    `${WP}/2025/07/Remote-Key-Sharing-1.png`,
    `${WP}/2025/07/Key-Detail-Screen-2.png`,
    `${WP}/2025/07/Coin-Screen-8.png`,
    `${WP}/2025/07/Manage-Tapsigner-1.png`,
    `${WP}/2025/07/Wallet-Settings-1.png`,
  ],
  specializedPhone: `${WP}/2025/07/Wallets-Landing-6.png`,
  specialIcons: [
    `${WP}/2025/02/Multisig-Templates.svg`,
    `${WP}/2025/02/Other-Wallets.png`,
    `${WP}/2025/02/Time-locked-wallets.svg`,
    `${WP}/2025/02/Inheritance-Key.svg`,
    `${WP}/2025/02/Server-Key.svg`,
    `${WP}/2025/02/Emergency-Key.svg`,
  ],
  walletFeatureIcons: [
    `${WP}/2025/02/Multisig-Templates.svg`,
    `${WP}/2025/02/Key-Management.svg`,
    `${WP}/2025/02/Other-Wallets.svg`,
  ],
  ben: `${WP}/2025/01/zKY_RrbA_400x400.jpg`,
  keyPhone: `${WP}/2025/07/Wallets-Landing-7.png`,
  keyIcons: [
    `${WP}/2025/01/User-friendly.png`,
    `${WP}/2025/01/No-lock-ins.png`,
    `${WP}/2025/01/Tools-and-Tips.png`,
    `${WP}/2025/01/Cost-optimized.png`,
  ],
};

const checkItems = [
  "UX/UI designed for an intuitive and effortless experience",
  "Cross-compatible with other bitcoin wallets",
  "Adaptable to suit your specific needs",
  "AI-assisted help with Ask Keeper",
];

const walletFeatures = [
  {
    title: "Easy Wallet Setup",
    desc: "Preset key configurations for Multi-Key Wallets",
  },
  {
    title: "Key Management",
    desc: "Dedicated tab for efficient keys management",
  },
  {
    title: "Other Wallets",
    desc: "Import or recreate wallets made in other apps",
  },
];

const specialVaults = [
  ["Multi-Key Wallet", "Choose a 2 of 3, 3 of 5, or custom setup with multiple signing keys."],
  ["Collaborative Wallet", "Share control using Keeper's fixed 2 of 3 wallet setup."],
  ["Wallet Timelock", "Prevent spending until the selected time has passed."],
  ["Inheritance Key", "Add a delayed access path for an heir or trusted party."],
  ["Server Key", "A Keeper-assisted signer in a Multi-Key Wallet. Keeper cannot spend with it alone."],
  ["Emergency Key", "Add a delayed recovery path if normal access is unavailable."],
];

const askKeeperItems = [
  ["Product questions", "Understand Keeper's wallets, keys, backups and features."],
  ["Problems and ideas", "Troubleshoot issues and prepare bug reports or feature requests."],
  ["Support resources", "Find relevant guides and reach the Keeper community when you need more help."],
];

const keyItems = ["User-friendly", "No lock-ins", "Tools and Tips ", "Cost optimized"];

const testimonials = [
  ["Rob | Bitsaga.be", "@BitsagaRob", "Keeper is a great multi-sig app! Try it out if you want to explore an upgrade into multi-sig, it's perfect for playing around and getting comfortable. Simple yet feature rich."],
  ["The Bitcoin Dudeist", "@BitcoinDudeist", "Free market competition driving bitcoin collaborative wallet services to innovate constantly. Of the services I've played with so far, I still like Keeper the best right now."],
  ["Ben", "BTC Sessions", "I've been using the Keeper wallet for a while now, and I have to say-it's an awesome way to manage and secure your coins. The multisig setup is a game changer."],
  ["Bitcoin Brabant", "@BitcoinBrabant", "Depends what you see as multisig. Have to say the using Keeper is easier than getting a bank account."],
  ["Oliver L. Velez", "1%'er Bitcoiner", "I'm so excited for this. Such a great project."],
];

const faqs = [
  ["Why is everything free now?", "Keeper transitioned to a community-led model. All features are available to everyone without a subscription."],
  ["Who maintains Keeper now?", "Independent developers and contributors. You can view them on GitHub."],
  ["How can I support the project?", "You can send bitcoin directly from the Support Keeper section below or tip from Settings → Support the Developers in the app."],
  ["Is Keeper regulated?", "Keeper is non-custodial and does not provide financial services."],
  ["Do you store my keys?", "Your hardware and software signing keys stay with their signing devices. The optional Server Key is stored on a Keeper server and works as one key in a Multi-Key Wallet. Keeper cannot spend your bitcoin with this key alone."],
];

function StoreBadges() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <a href="https://play.google.com/store/apps/details?id=io.hexawallet.bitcoinkeeper" target="_blank" rel="noopener noreferrer">
        <img src={assets.googlePlay} alt="Get it on Google Play" className="h-[48px] w-auto md:h-[54px]" />
      </a>
      <a href="https://apps.apple.com/us/app/bitcoin-keeper/id1545535925" target="_blank" rel="noopener noreferrer">
        <img src={assets.appStore} alt="Download on the App Store" className="h-[48px] w-auto md:h-[54px]" />
      </a>
    </div>
  );
}

function SectionHeading({ title, copy, centered = false }: { title: string; copy?: string; centered?: boolean }) {
  return (
    <div className={centered ? "mx-auto mb-12 max-w-3xl text-center" : "mb-8 max-w-2xl"}>
      <h2 className="font-serif text-[30px] font-semibold leading-[1.25] text-primary md:text-[42px]">{title}</h2>
      {copy && <p className="mt-5 text-[18px] leading-[1.55] text-secondary-foreground/80">{copy}</p>}
    </div>
  );
}

export default function Home() {
  return (
    <div className="bg-background text-foreground">
      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#1e352f_0%,#596f66_100%)] pt-24 text-white md:pt-36">
        <div className="container relative z-10 grid max-w-6xl grid-cols-1 items-center gap-10 pb-[30px] md:grid-cols-[55%_45%]">
          <div className="pt-6 md:pt-20">
            <img src={assets.logo} alt="Bitcoin Keeper" className="mb-5 h-[84px] w-[84px]" />
            <h1 className="font-serif text-[48px] font-semibold leading-[1.25] text-white md:text-[50px]">
              Bitcoin Keeper
            </h1>
            <p className="mt-5 max-w-[600px] text-[20px] leading-[1.4] text-white">
              A community-led, open-source wallet for secure multisig self-custody.
              <br />
              No accounts. No subscriptions. Your keys, your bitcoin — always.
            </p>
            <div id="download" className="mt-8 space-y-5">
              <StoreBadges />
              <div className="flex flex-wrap items-center gap-4">
                <a href="/desktop" target="_blank" rel="noopener noreferrer">
                  <img src={assets.desktopBadge} alt="Desktop App" className="h-[52px] w-auto" />
                </a>
                <a href="https://github.com/KeeperCommunity/bitcoin-keeper/releases/" target="_blank" rel="noopener noreferrer">
                  <img src={assets.apkBadge} alt="PGP Signed APK" className="h-[52px] w-auto" />
                </a>
              </div>
            </div>
          </div>

          <div className="flex translate-y-8 justify-center md:translate-y-12 md:justify-end">
            <img src={assets.hero} alt="Bitcoin Keeper app screens" className="max-h-[760px] w-auto max-w-full object-contain" />
          </div>
        </div>
        <div className="absolute bottom-[-1px] left-0 w-full text-background">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none" className="h-[150px] w-[200%] -scale-y-100">
            <path fill="currentColor" opacity="0.33" d="M473,67.3c-203.9,88.3-263.1-34-320.3,0C66,119.1,0,59.7,0,59.7V0h1000v59.7c0,0-62.1,26.1-94.9,29.3c-32.8,3.3-62.8-12.3-75.8-22.1C806,49.6,745.3,8.7,694.9,4.7S492.4,59,473,67.3z" />
            <path fill="currentColor" opacity="0.66" d="M734,67.3c-45.5,0-77.2-23.2-129.1-39.1c-28.6-8.7-150.3-10.1-254,39.1s-91.7-34.4-149.2,0C115.7,118.3,0,39.8,0,39.8V0h1000v36.5c0,0-28.2-18.5-92.1-18.5C810.2,18.1,775.7,67.3,734,67.3z" />
            <path fill="currentColor" d="M766.1,28.9c-200-57.5-266,65.5-395.1,19.5C242,1.8,242,5.4,184.8,20.6C128,35.8,132.3,44.9,89.9,52.5C28.6,63.7,0,0,0,0h1000c0,0-9.9,40.9-83.6,48.1S829.6,47,766.1,28.9z" />
          </svg>
        </div>
      </section>

      <section className="bg-background py-20 md:py-28">
        <div className="container grid max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-[35%_65%]">
          <div>
            <SectionHeading title="Built for long-term self-custody" />
            <div className="space-y-4">
              {[
                "Easy multisig creation and management",
                "Manage your own signing keys and backups",
                "Assisted Server Backup (optional)",
                "Inheritance and emergency access tools",
                "Wallet Timelock and hidden-wallet options",
                "Open-source and community-maintained",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 border-b border-primary/10 pb-4 text-[16px] text-secondary-foreground/80">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-[#2d6759]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <img src="/wp-content/uploads/2025/07/Expanse-Filters-1-1-1536x1479.png" alt="Built for long-term self-custody" className="mx-auto w-full max-w-[820px]" />
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="container grid max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-[35%_65%]">
          <div>
            <SectionHeading
              title="Generational Wealth Management"
              copy="Bitcoin Keeper helps you plan long-term access to your bitcoin, including the keys, wallet configuration and instructions your heirs may need."
            />
            <div className="space-y-4">
              {checkItems.map((item) => (
                <div key={item} className="flex items-start gap-3 border-b border-primary/10 pb-4 text-[16px] text-secondary-foreground/80">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-[#2d6759]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <img src={assets.generational} alt="Generational wealth management in Bitcoin Keeper" className="mx-auto w-full max-w-[780px]" />
        </div>
      </section>

      <section className="bg-background py-20 md:py-24">
        <div className="container max-w-6xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {walletFeatures.map((feature, index) => (
              <div key={feature.title} className="text-center">
                <img src={assets.walletFeatureIcons[index]} alt="" className="mx-auto mb-5 h-[90px] w-[90px]" />
                <h3 className="font-serif text-[24px] font-semibold text-primary">{feature.title}</h3>
                <p className="mx-auto mt-3 max-w-[260px] text-[17px] leading-[1.45] text-secondary-foreground/80">{feature.desc}</p>
              </div>
            ))}
          </div>

          <div className="my-16 h-px bg-primary/10" />

          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div>
              <h3 className="font-serif text-[30px] font-semibold text-primary">Product Philosophy</h3>
              <p className="mt-5 text-[18px] leading-[1.55] text-secondary-foreground/80">
                Open source, privacy-focused, and customizable—these core tenets guide every feature we build in Keeper
              </p>
              <div className="my-8 h-px w-1/2 bg-primary/10" />
              <blockquote className="text-[17px] italic leading-[1.6] text-secondary-foreground/80">
                I've been using the Keeper wallet for a while now, and I have to say—it’s an awesome way to manage and secure your coins. The multisig setup is a game changer. I love having multiple vaults and the ability to customize the security of my BTC. The transaction labeling and UTXO management features are awesome."
              </blockquote>
              <div className="mt-6 flex items-center gap-4">
                <img src={assets.ben} alt="Ben, BTC Sessions" className="h-14 w-14 rounded-full object-cover" />
                <div>
                  <p className="font-semibold text-primary">Ben</p>
                  <p className="text-sm text-secondary-foreground/70">BTC Sessions</p>
                </div>
              </div>
            </div>
            <img src={assets.selfCustody} alt="Bitcoin Keeper product philosophy screens" className="mx-auto w-full max-w-[680px]" />
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-24">
        <div className="container max-w-6xl text-center">
          <img src={assets.galleryIcon} alt="" className="mx-auto mb-5 h-[86px] w-[86px]" />
          <h3 className="mb-10 font-serif text-[30px] font-semibold text-primary">App Features Gallery</h3>
          <div className="mx-auto flex max-w-6xl snap-x gap-5 overflow-x-auto pb-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {assets.appGallery.map((src, index) => (
              <a
                key={src}
                href={src}
                target="_blank"
                rel="noopener noreferrer"
                className="block min-w-[68%] snap-center sm:min-w-[42%] lg:min-w-[calc(25%-15px)]"
              >
                <img src={src} alt={`Bitcoin Keeper app gallery ${index + 1}`} className="w-full rounded-[22px] shadow-[0_18px_40px_rgba(30,53,47,0.16)]" />
              </a>
            ))}
          </div>
          <div className="mx-auto flex justify-center gap-2">
            {assets.appGallery.slice(0, 4).map((src, index) => (
              <span key={src} className={`h-2 w-2 rounded-full ${index === 0 ? "bg-primary" : "bg-primary/25"}`} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-20 md:py-24">
        <div className="container max-w-6xl">
          <SectionHeading
            centered
            title="Wallets and enhanced options"
            copy="Choose a wallet setup, then review optional signing and delayed-access features for your recovery plan."
          />
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[1fr_auto_1fr]">
            <div className="space-y-8">
              {specialVaults.slice(0, 3).map(([title, desc], index) => (
                <div key={title} className="text-center">
                  <img src={assets.specialIcons[index]} alt="" className="mx-auto mb-4 h-[90px] w-[90px] object-contain" />
                  <h4 className="font-serif text-[22px] font-semibold text-primary">{title}</h4>
                  <p className="mt-3 text-[16px] leading-[1.45] text-secondary-foreground/80">{desc}</p>
                </div>
              ))}
            </div>
            <img src={assets.specializedPhone} alt="Bitcoin Keeper wallet screen" className="mx-auto max-h-[620px] w-auto" />
            <div className="space-y-8">
              {specialVaults.slice(3).map(([title, desc], i) => {
                const index = i + 3;
                return (
                  <div key={title} className="text-center">
                    <img src={assets.specialIcons[index]} alt="" className="mx-auto mb-4 h-[90px] w-[90px] object-contain" />
                    <h4 className="font-serif text-[22px] font-semibold text-primary">{title}</h4>
                    <p className="mt-3 text-[16px] leading-[1.45] text-secondary-foreground/80">{desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#2d6759] py-10">
        <div className="container grid max-w-6xl grid-cols-1 items-center gap-6 md:grid-cols-[60%_40%]">
          <div>
            <h2 className="font-serif text-[30px] font-semibold text-white">Keeper Desktop App</h2>
            <p className="mt-3 text-center text-[18px] text-white/85 md:text-left">Free. Open-source. No signups. No subscriptions</p>
          </div>
          <div className="flex justify-center md:justify-end">
            <Button asChild className="h-auto rounded-[4px] bg-[#f3efe3] px-8 py-5 text-[17px] font-semibold text-[#1f2d29] hover:bg-[#e9e2d2]">
              <a href="/desktop" target="_blank" rel="noopener noreferrer">
                <Download className="h-4 w-4" /> Download the Desktop App
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-background py-20 md:py-24">
        <div className="container max-w-6xl">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[60%_40%]">
            <div>
              <SectionHeading
                title="Ask Keeper"
                copy="Get help, report a problem or share an idea with the same AI-assisted help service available in the Keeper app."
              />
              <div className="space-y-5">
                {askKeeperItems.map(([title, desc]) => (
                  <div key={title} className="flex gap-5">
                    <MessageSquare aria-hidden="true" className="h-10 w-10 shrink-0 text-primary" />
                    <div>
                      <h3 className="font-serif text-[22px] font-semibold text-primary">{title}</h3>
                      <p className="mt-1 text-[16px] text-secondary-foreground/80">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button asChild className="mt-9 h-auto rounded-[4px] bg-[#2d6759] px-8 py-5 text-[17px] font-semibold text-white hover:bg-[#245348]">
                <Link href="/ask-keeper"><ArrowRight className="h-4 w-4" /> Ask Keeper</Link>
              </Button>
            </div>
            <div className="rounded-2xl border border-primary/10 bg-card p-8 text-center md:p-12">
              <MessageSquare aria-hidden="true" className="mx-auto mb-6 h-16 w-16 text-primary" />
              <h3 className="font-serif text-[28px] font-semibold text-primary">Ask Keeper anything</h3>
              <p className="mt-5 text-[18px] leading-relaxed text-secondary-foreground/80">Questions about multisig, signing devices or backups? Start a conversation.</p>
              <p className="mt-6 text-base font-semibold text-primary">Never share seed words or private keys.</p>
            </div>
          </div>

          <div className="my-16 h-px bg-primary/10" />

          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[33%_34%_33%]">
            <div>
              <h3 className="font-serif text-[30px] font-semibold text-primary">Comprehensive Key Management</h3>
              <p className="mt-4 text-center text-[18px] text-secondary-foreground/80 md:text-left">Built to avoid single points of failure, including ourselves</p>
              <p className="mt-5 text-[16px] leading-[1.55] text-secondary-foreground/80">
                Use a mix of hardware wallets and software. Change keys and key types effortlessly. Recreate wallets in other apps. Guide your heirs with our extensive in app directions and prompt.
              </p>
              <Button asChild className="mt-8 h-auto rounded-[4px] bg-[#2d6759] px-8 py-5 text-[17px] font-semibold text-white hover:bg-[#245348]">
                <a href="https://github.com/KeeperCommunity/bitcoin-keeper/releases/" target="_blank" rel="noopener noreferrer">
                  Download PGP Signed APK <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
            <img src={assets.keyPhone} alt="Keeper key management screen" className="mx-auto max-h-[640px] w-auto" />
            <div className="w-full max-w-[300px] space-y-3 justify-self-center md:justify-self-end">
              {keyItems.map((item, index) => (
                <div
                  key={item}
                  className={`flex min-h-[82px] w-full items-center gap-4 rounded-[4px] px-5 py-4 ${
                    index === 3 ? "bg-[#8ba39a]" : "bg-[#3f6f64]"
                  }`}
                >
                  <img src={assets.keyIcons[index]} alt="" className="h-14 w-14 shrink-0 object-contain brightness-0 invert" />
                  <h4 className="text-left font-serif text-[16px] font-medium leading-[1.25] text-white md:text-[17px]">{item}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-24">
        <div className="container max-w-6xl">
          <SectionHeading centered title="The Community Speaks" copy="The community loves us for our product philosophy and feature implementation prowess. You don’t have to take our word for it!" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.map(([name, handle, quote]) => (
              <div key={name} className="rounded-[4px] bg-white p-7 shadow-[0_12px_28px_rgba(30,53,47,0.08)]">
                <p className="text-[16px] leading-[1.6] text-secondary-foreground/80">"{quote}"</p>
                <div className="mt-6 border-t border-primary/10 pt-5">
                  <p className="font-semibold text-primary">{name}</p>
                  <p className="text-sm text-secondary-foreground/70">{handle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="support-keeper" className="bg-background py-20 md:py-24">
        <div className="container max-w-5xl">
          <div className="grid grid-cols-1 items-center gap-10 rounded-[8px] border border-primary/10 bg-white p-8 md:grid-cols-[1fr_auto] md:p-12">
            <div>
              <h2 className="font-serif text-[35px] font-semibold text-primary md:text-[44px]">Support Keeper</h2>
              <p className="mt-5 max-w-2xl text-[18px] leading-[1.55] text-secondary-foreground/80">
                Keeper is free, open-source and community-run. Voluntary tips and grants help fund development, maintenance and security work.
              </p>
              <p className="mt-4 text-[16px] leading-[1.55] text-secondary-foreground/80">
                Send bitcoin to the address below, or open Settings → Support the Developers in the Keeper app.
              </p>
              <div className="mt-6 rounded-[6px] bg-background p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-secondary-foreground/60">Bitcoin address</p>
                <p className="mt-2 break-all font-mono text-[14px] text-primary">{SUPPORT_ADDRESS}</p>
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button asChild className="h-auto rounded-[4px] bg-[#2d6759] px-7 py-4 text-[16px] font-semibold text-white hover:bg-[#245348]">
                  <a href={SUPPORT_URI}>
                    <ArrowRight className="h-4 w-4" /> Open in wallet
                  </a>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="h-auto rounded-[4px] px-7 py-4 text-[16px] font-semibold"
                  onClick={() => navigator.clipboard?.writeText(SUPPORT_ADDRESS)}
                >
                  <Copy className="h-4 w-4" /> Copy address
                </Button>
              </div>
              <p className="mt-4 text-sm text-secondary-foreground/60">
                Keeper does not charge a donation fee. Your wallet may charge the normal Bitcoin network fee.
              </p>
            </div>
            <div className="justify-self-center rounded-[8px] bg-white p-4 shadow-[0_12px_28px_rgba(30,53,47,0.08)]">
              <img src="/support-bitcoin-qr.svg" alt="QR code for the Bitcoin Keeper support address" className="h-[220px] w-[220px]" />
              <p className="mt-3 text-center text-xs text-secondary-foreground/60">Scan with a Bitcoin wallet</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-24">
        <div className="container max-w-6xl">
          <SectionHeading centered title="Frequently Asked Questions" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="space-y-4">
              {faqs.slice(0, 3).map(([q, a]) => (
                <details key={q} className="rounded-[4px] border border-primary/10 bg-background p-5 text-left">
                  <summary className="font-serif text-[19px] font-semibold text-primary">{q}</summary>
                  <p className="mt-3 text-[16px] text-secondary-foreground/80">{a}</p>
                </details>
              ))}
            </div>
            <div className="space-y-4">
              {faqs.slice(3).map(([q, a]) => (
                <details key={q} className="rounded-[4px] border border-primary/10 bg-background p-5 text-left">
                  <summary className="font-serif text-[19px] font-semibold text-primary">{q}</summary>
                  <p className="mt-3 text-[16px] text-secondary-foreground/80">{a}</p>
                </details>
              ))}
            </div>
            <div className="rounded-[4px] bg-background p-8 text-center">
              <h3 className="font-serif text-[26px] font-semibold text-primary">Can't find an answer?</h3>
              <p className="mt-4 text-[18px] text-secondary-foreground/80">Ask Keeper helps with questions about Keeper, problems and ideas.</p>
              <Button asChild className="mt-6 h-auto rounded-[4px] bg-[#2d6759] px-7 py-4 text-[17px] font-semibold text-white hover:bg-[#245348]">
                <Link href="/ask-keeper">Ask Keeper <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="get-keeper" className="bg-background py-20 text-center md:py-24">
        <div className="container max-w-4xl">
          <img src={assets.logo} alt="" className="mx-auto mb-6 h-[84px] w-[84px]" />
          <h2 className="font-serif text-[35px] font-semibold text-primary md:text-[44px]">Download Bitcoin Keeper today</h2>
          <p className="mx-auto mt-5 max-w-2xl text-[18px] leading-[1.55] text-secondary-foreground/80">
            Set up wallets, manage keys and plan long-term access with help when you need it.
          </p>
          <div className="mt-8 flex justify-center">
            <StoreBadges />
          </div>
        </div>
      </section>
    </div>
  );
}
