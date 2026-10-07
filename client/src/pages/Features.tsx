import {
  Activity,
  ArrowRight,
  CheckCircle2,
  Eye,
  Key,
  Layers,
  Network,
  RefreshCw,
  Shield,
  Smartphone,
} from "lucide-react";

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
      subtitle: "Choose a wallet setup you can understand, back up and maintain",
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
        {
          title: "Watch-only Wallet",
          description: "Track balances and transactions without holding a spending key; it cannot send bitcoin",
        },
        {
          title: "Archived Wallet",
          description: "Keep an older wallet configuration after key or scheme changes; unarchive it before use",
        },
        {
          title: "Hidden Wallet",
          description: "Remove a wallet from normal view without deleting it or changing its keys",
        },
        {
          title: "Canary Wallet",
          description: "Use a small-value warning wallet to help signal unexpected access to a key",
        },
      ],
    },
    {
      title: "Signing devices and keys",
      subtitle: "Use hardware and software signers without depending on one device or vendor",
      icon: Key,
      features: [
        {
          title: "Hardware Signing Devices",
          description: "Use supported hardware wallets alongside software signers; connection methods vary by device",
        },
        {
          title: "Add Keys",
          description: "Add signing keys to Keeper and use them across supported wallet setups",
        },
        {
          title: "Share Key",
          description: "Share public signer details to help a trusted contact set up a Multi-Key Wallet",
        },
        {
          title: "Change Keys",
          description: "Replace a lost or compromised key while preserving the previous setup as an Archived Wallet",
        },
        {
          title: "Change Signer Type",
          description: "Move a key to a different supported signing device without changing the key itself where supported",
        },
        {
          title: "Mobile Key",
          description: "Use a key from another Keeper phone as a signer",
        },
        {
          title: "External Key",
          description: "Use public signer details from a trusted contact in a shared wallet setup",
        },
        {
          title: "Seed Key",
          description: "Create a signing key from seed words when that setup is appropriate",
        },
      ],
    },
    {
      title: "Recovery and backup",
      subtitle: "Keep the pieces needed to recover Keeper, wallet structure and signing keys",
      icon: RefreshCw,
      features: [
        {
          title: "Recovery Key",
          description: "Your 12-word backup for restoring Keeper with the matching encrypted app backup",
        },
        {
          title: "Personal Cloud Backup",
          description: "Save Wallet Configuration Files to your chosen cloud service; it does not replace your Recovery Key",
        },
        {
          title: "Assisted Server Backup",
          description: "Back up encrypted app data using a community-run Keeper server; separate from Server Key",
        },
        {
          title: "Wallet Configuration File",
          description: "Recreate a Multi-Key Wallet in Keeper or compatible software without exposing private keys",
        },
        {
          title: "Signing-device Backups",
          description: "Keep the separate backup required for each hardware or software signing key",
        },
      ],
    },
    {
      title: "Delayed access and security",
      subtitle: "Add optional signing and delayed-access rules to supported Multi-Key Wallets",
      icon: Layers,
      features: [
        {
          title: "Server Key",
          description: "A Keeper-assisted signer in a Multi-Key Wallet. Keeper cannot spend with it alone",
        },
        {
          title: "Inheritance Key",
          description: "Give an heir or trusted party a delayed access path under the wallet rules you set",
        },
        {
          title: "Emergency Key",
          description: "Add a separate delayed recovery path if normal access becomes unavailable",
        },
        {
          title: "Wallet Timelock",
          description: "Prevent spending until the selected time has passed",
        },
      ],
    },
    {
      title: "Health checks",
      subtitle: "Periodically verify that critical recovery material and signers are still available",
      icon: Activity,
      features: [
        {
          title: "Recovery Key Health Check",
          description: "Confirm that your Recovery Key backup is still available when you need it",
        },
        {
          title: "Signing-device Health Check",
          description: "Verify that a signer is accessible and working before an emergency",
        },
        {
          title: "Server Key Health Check",
          description: "Check the assisted Server Key path independently from your other signers",
        },
        {
          title: "Manual Health Check",
          description: "Run a health check when you want rather than waiting for a reminder",
        },
      ],
    },
    {
      title: "Privacy and coin control",
      subtitle: "Control which bitcoin coins you spend and keep useful wallet metadata portable",
      icon: Eye,
      features: [
        {
          title: "Coin Control",
          description: "Review and select individual bitcoin coins instead of relying only on automatic coin selection",
        },
        {
          title: "Dust Protection",
          description: "Flag potential dust activity and linked coins, mark affected coins Do Not Spend and review them in Dust Report",
        },
        {
          title: "Labels and Notes",
          description: "Keep useful context on addresses and transactions while managing your wallet",
        },
        {
          title: "BIP-329 Import and Export",
          description: "Move supported bitcoin labels between compatible tools using an open format",
        },
        {
          title: "Tor Settings",
          description: "Use Keeper's network privacy settings when you want to route supported connections through Tor",
        },
      ],
    },
    {
      title: "App and network controls",
      subtitle: "Advanced controls for shared devices, testing and network selection",
      icon: Network,
      features: [
        {
          title: "Multi User Mode",
          description: "Keep separate user profiles on one device, each protected by its own PIN",
        },
        {
          title: "Network Type",
          description: "Switch the app globally between Mainnet and Testnet; the setting affects wallets, keys and nodes",
        },
        {
          title: "Open Wallet Imports",
          description: "Import compatible wallets or wallet configurations without moving bitcoin",
        },
        {
          title: "No Lock-in",
          description: "Export wallet configuration so supported Multi-Key Wallets can be recreated in compatible software",
        },
      ],
    },
  ];

  return (
    <div className="bg-background py-16 md:py-24">
      <section className="container mb-16 max-w-4xl space-y-5 text-center md:mb-20">
        <h1 className="font-serif text-[42px] font-semibold leading-[1.15] text-primary md:text-[64px]">Features</h1>
        <p className="mx-auto max-w-2xl text-[18px] leading-[1.55] text-secondary-foreground/80">
          Keeper brings wallets, signing devices, recovery, inheritance and privacy tools together without locking you into one device or app.
        </p>
      </section>

      <div className="container space-y-24">
        {sections.map(section => {
          const Icon = section.icon;
          return (
            <section key={section.title} className="space-y-10">
              <div className="flex flex-col items-center gap-4 border-b border-primary/5 pb-6 text-center">
                <div className="max-w-xl space-y-2">
                  <div className="flex items-center justify-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/5 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h2 className="font-serif text-2xl font-bold text-primary md:text-3xl">
                      {section.title}
                    </h2>
                  </div>
                  <p className="font-sans text-sm leading-relaxed text-muted-foreground">
                    {section.subtitle}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {section.features.map(feature => (
                  <div
                    key={feature.title}
                    className="group relative flex flex-col rounded-2xl border border-primary/5 bg-card p-6 shadow-[0_10px_30px_rgba(30,53,47,0.02)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(30,53,47,0.06)] md:p-8"
                  >
                    <div className="flex items-start gap-3.5">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                      <div className="space-y-2">
                        <h3 className="font-serif text-lg font-bold text-primary">
                          {feature.title}
                        </h3>
                        <p className="font-sans text-sm leading-relaxed text-muted-foreground">
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
            Understand what each backup and key does before relying on it. Multi-Key Wallets need both the required signing-key backups and a record of the wallet configuration.
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
          <p className="mt-7 text-sm text-muted-foreground">
            Ready to try Keeper?{" "}
            <a className="font-semibold text-primary underline underline-offset-4" href="https://apps.apple.com/us/app/bitcoin-keeper/id1545535925">
              Get for iOS
            </a>{" "}
            or{" "}
            <a className="font-semibold text-primary underline underline-offset-4" href="https://play.google.com/store/apps/details?id=io.hexawallet.bitcoinkeeper">
              get for Android
            </a>.
          </p>
        </div>
      </section>
    </div>
  );
}
