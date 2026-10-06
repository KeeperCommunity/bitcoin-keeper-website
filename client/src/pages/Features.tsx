import { ArrowRight, CheckCircle2, Key, Layers, RefreshCw, Shield, Smartphone } from "lucide-react";

interface FeatureCard {
  title: string;
  description: string;
}

interface FeatureSection {
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  features: FeatureCard[];
}

export default function Features() {
  const sections: FeatureSection[] = [
    {
      title: "Wallets",
      subtitle: "Choose the wallet setup that fits how you manage your signing keys",
      icon: Shield,
      features: [
        {
          title: "Single-Key Wallet",
          description: "One key is needed to spend; a simpler setup for everyday use",
        },
        {
          title: "2 of 3 Multi-Key Wallet",
          description: "Any 2 of 3 keys are needed to spend",
        },
        {
          title: "3 of 5 Multi-Key Wallet",
          description: "Any 3 of 5 keys are needed to spend",
        },
        {
          title: "Collaborative Wallet",
          description: "A fixed 2 of 3 setup for shared control with trusted people",
        },
        {
          title: "Custom Setup",
          description: "Choose your own supported multi-key configuration",
        },
      ],
    },
    {
      title: "Manage Keys",
      subtitle: "Access and use all your keys from a dedicated key management center",
      icon: Key,
      features: [
        {
          title: "Add Keys",
          description: "Add keys to the app to use across wallets",
        },
        {
          title: "Share Key",
          description: "Share public signer details to help a trusted contact set up a Multi-Key Wallet",
        },
        {
          title: "Change Keys",
          description: "Replace a lost or compromised key; keep the resulting Archived Wallet configuration",
        },
        {
          title: "Change Signer Type",
          description: "Change a damaged or lost signing device without changing the key itself",
        },
        {
          title: "Key Health Check",
          description: "Ensure that a key is accessible and in working condition periodically",
        },
      ],
    },
    {
      title: "Assisted Keys",
      subtitle: "Optional signers and delayed-access paths for supported wallet setups",
      icon: Layers,
      features: [
        {
          title: "Server Key",
          description: "A Keeper-assisted signer in a Multi-Key Wallet. Keeper cannot spend with it alone",
        },
        {
          title: "Inheritance Key",
          description: "A delayed access path for an heir or trusted party under your wallet rules",
        },
        {
          title: "Emergency Key",
          description: "A separate delayed recovery path if normal access is unavailable",
        },
      ],
    },
    {
      title: "Software Keys",
      subtitle: "Software signers can be part of a supported wallet setup",
      icon: Smartphone,
      features: [
        {
          title: "Mobile Key",
          description: "A key from another Keeper phone that can act as a signer",
        },
        {
          title: "External Key",
          description: "Public signer details from a trusted contact for a shared wallet",
        },
        {
          title: "Seed Key",
          description: "Uses seed words to setup a key",
        },
        {
          title: "Other Signer",
          description: "Generic signer that follows standards of a bitcoin key",
        },
      ],
    },
    {
      title: "Backup",
      subtitle: "With a self-custody wallet, the onus is on you to protect your bitcoin, creating robust backups is an important step to that end",
      icon: RefreshCw,
      features: [
        {
          title: "Recovery Key",
          description: "Your 12-word key restores Keeper from its encrypted app backup, including wallet configurations",
        },
        {
          title: "Wallet Configuration File",
          description: "Records a Multi-Key Wallet's setup without containing its private keys",
        },
        {
          title: "Key Backup",
          description: "Ensure that your keys are always accessible with key backups",
        },
      ],
    },
    {
      title: "Privacy and coin control",
      subtitle: "Review coins before combining them in a bitcoin transaction",
      icon: Shield,
      features: [
        {
          title: "Dust Protection",
          description: "Keeper flags potential dust activity and linked coins, marks affected coins Do Not Spend, and lets you review them in Dust Report. You can change a coin’s status or choose to donate all current Do Not Spend coins.",
        },
      ],
    },
  ];

  return (
    <div className="bg-background py-16 md:py-24">
      <section className="container mb-16 max-w-4xl space-y-5 text-center md:mb-20">
        <h1 className="font-serif text-[42px] font-semibold leading-[1.15] text-primary md:text-[64px]">Features</h1>
        <p className="mx-auto max-w-2xl text-[18px] leading-[1.55] text-secondary-foreground/80">
          Explore wallet setups, signing keys, backups and delayed-access options. Choose a setup you can understand, back up and maintain.
        </p>
      </section>

      <div className="container space-y-24">
        {sections.map((section, idx) => {
          const Icon = section.icon;
          return (
            <section key={section.title} className="space-y-10">
              <div className="flex flex-col items-center gap-4 border-b border-primary/5 pb-6 text-center">
                <div className="max-w-xl space-y-2">
                  <div className="flex items-center justify-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/5 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary">
                      {section.title}
                    </h2>
                  </div>
                  <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                    {section.subtitle}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {section.features.map((feature) => (
                  <div
                    key={feature.title}
                    className="group relative flex flex-col p-6 md:p-8 rounded-2xl bg-card border border-primary/5 shadow-[0_10px_30px_rgba(30,53,47,0.02)] transition-all hover:shadow-[0_20px_50px_rgba(30,53,47,0.06)] hover:-translate-y-1 duration-300"
                  >
                    <div className="flex items-start gap-3.5">
                      <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                      <div className="space-y-2">
                        <h3 className="font-serif text-lg font-bold text-primary group-hover:text-primary transition-colors">
                          {feature.title}
                        </h3>
                        <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <section className="container mt-24 max-w-5xl" aria-labelledby="features-next-step">
        <div className="rounded-2xl border border-primary/10 bg-card p-6 text-center shadow-[0_10px_30px_rgba(30,53,47,0.03)] md:p-10">
          <h2 id="features-next-step" className="font-serif text-2xl font-semibold text-primary md:text-3xl">
            Plan your setup before moving funds
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-secondary-foreground/80">
            Learn what each backup does and how delayed-access options differ. Keep the required signing-key backups and wallet configuration for any Multi-Key Wallet.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
            <a href="/ask-keeper#backup-and-recovery" className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
              Read the backup guide <ArrowRight className="h-4 w-4" />
            </a>
            <a href="/ask-keeper#inheritance-and-emergency-keys" className="inline-flex min-h-12 items-center gap-2 rounded-lg border border-primary/20 px-5 py-3 font-semibold text-primary hover:bg-primary/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
              Compare delayed access <ArrowRight className="h-4 w-4" />
            </a>
            <a href="/ask-keeper#dust-protection" className="inline-flex min-h-12 items-center gap-2 rounded-lg border border-primary/20 px-5 py-3 font-semibold text-primary hover:bg-primary/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
              Read about Dust Protection <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <p className="mt-7 text-sm text-muted-foreground">Ready to try Keeper? <a className="font-semibold text-primary underline underline-offset-4" href="https://apps.apple.com/us/app/bitcoin-keeper/id1545535925">Get for iOS</a> or <a className="font-semibold text-primary underline underline-offset-4" href="https://play.google.com/store/apps/details?id=io.hexawallet.bitcoinkeeper">get for Android</a>.</p>
        </div>
      </section>
    </div>
  );
}
