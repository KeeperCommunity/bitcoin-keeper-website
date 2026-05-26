import { Shield, Key, RefreshCw, Layers, CheckCircle2 } from "lucide-react";

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
      subtitle: "Use different wallet types and templates to stack sats as per your specific needs.",
      icon: Shield,
      features: [
        {
          title: "Single-sig hot wallet",
          description: "Easy to use wallets for small amounts and regular spends.",
        },
        {
          title: "Single-sig cold wallet",
          description: "Wallets using 1 cold stored key providing an added layer of protection.",
        },
        {
          title: "Multisig wallet",
          description: "Use multiple keys to sign a single transaction thus avoiding single points of failure.",
        },
        {
          title: "Collaborative Custody Wallet",
          description: "Use with trusted contacts who act as decision makers for spends.",
        },
        {
          title: "Custom Multisig",
          description: "Decide your preferred M-of-N configuration for your specific needs.",
        },
      ],
    },
    {
      title: "Manage Keys",
      subtitle: "Access and use all your keys from a dedicated key management center.",
      icon: Key,
      features: [
        {
          title: "Add Keys",
          description: "Add keys to the app to use across wallets.",
        },
        {
          title: "Share Key",
          description: "Share a key to help a trusted contact setup a multisig wallet.",
        },
        {
          title: "Change Keys",
          description: "Change a compromised or lost key and refresh your multisig quorum.",
        },
        {
          title: "Change Signer Type",
          description: "Change a damaged or lost signing device without changing the key itself.",
        },
        {
          title: "Key Health Check",
          description: "Ensure that a key is accessible and in working condition periodically.",
        },
      ],
    },
    {
      title: "Special Keys",
      subtitle: "Certain keys have been built in for you to use for particular situations. Set these up when the need arises.",
      icon: Layers,
      features: [
        {
          title: "Server Key",
          description: "Key hosted on Keeper's servers. Setup spending thresholds for specific usecases.",
        },
        {
          title: "Inheritance Key",
          description: "A time-delayed miniscript enabled key that acts as an extra key for your multisig setup.",
        },
        {
          title: "Emergency Key",
          description: "Made available as an additional key for special spending conditions.",
        },
      ],
    },
    {
      title: "Backup & Sovereignty",
      subtitle: "With a self-custody wallet, the onus is on you to protect your bitcoin. Creating robust backups is an important step.",
      icon: RefreshCw,
      features: [
        {
          title: "Recovery Key",
          description: "Your app's master backup. Write down the seed words to backup the entire app.",
        },
        {
          title: "Wallet Configuration File",
          description: "The backup for each of your multisig wallets, easily portable to other software.",
        },
        {
          title: "Key Backup",
          description: "Ensure that your keys are always accessible with secure key backups.",
        },
      ],
    },
  ];

  return (
    <div className="py-16 md:py-24 bg-background">
      {/* Hero Section */}
      <section className="container max-w-4xl text-center space-y-6 mb-20">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary font-semibold text-xs tracking-wider uppercase">
          <Shield className="h-3.5 w-3.5" /> Capabilities
        </div>
        <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-tight text-primary">
          Sovereign Features, <br />
          <span className="italic font-normal text-primary/80">hidden one layer deep</span>
        </h1>
        <p className="max-w-2xl mx-auto font-sans text-lg text-muted-foreground leading-relaxed">
          Bitcoin Keeper has several useful features designed to help you stack, secure, and preserve your sats better and longer.
        </p>
      </section>

      {/* Feature Sections */}
      <div className="container space-y-24">
        {sections.map((section, idx) => {
          const Icon = section.icon;
          return (
            <section key={section.title} className="space-y-10">
              {/* Section Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-primary/5 pb-6">
                <div className="space-y-2 max-w-xl">
                  <div className="flex items-center gap-3">
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
                <span className="font-serif text-5xl font-extrabold text-primary/5 hidden md:block select-none">
                  0{idx + 1}
                </span>
              </div>

              {/* Grid of features */}
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
    </div>
  );
}
