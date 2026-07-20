import { CheckCircle2, Key, Layers, RefreshCw, Shield, Smartphone } from "lucide-react";

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
      subtitle: "Use different wallet types and templates to stack sats as per your specific needs",
      icon: Shield,
      features: [
        {
          title: "Single-sig hot wallet",
          description: "Easy to use wallets for small amounts and regular spends",
        },
        {
          title: "Single-sig cold wallet",
          description: "Wallets using 1 cold stored key providing an added layer of protection",
        },
        {
          title: "Multisig wallet",
          description: "Use multiple keys to sign a single transaction thus avoiding single points of failure",
        },
        {
          title: "Collaborative Custody Wallet",
          description: "Use with trusted contacts who act as decision makers for spends",
        },
        {
          title: "Custom Multisig",
          description: "Decide your preferred M-of-N configuration for your specific needs",
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
          description: "Share a key to help a trusted contact setup a multisig wallet",
        },
        {
          title: "Change Keys",
          description: "Change a compromised or lost key and refresh your multisig quorum",
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
      title: "Special Keys",
      subtitle: "Certain keys have been built in for you to use for particular situations. Set these up when the need arises",
      icon: Layers,
      features: [
        {
          title: "Server Key",
          description: "Key hosted on Keeper's servers. Setup spending thresholds for specific usecases",
        },
        {
          title: "Inheritance Key",
          description: "A time-delayed miniscript enabled key that acts as an extra key for your multisig setup",
        },
        {
          title: "Emergency Key",
          description: "Made available as an additional key for special spending conditions",
        },
      ],
    },
    {
      title: "Software Keys",
      subtitle: "You don't need to rely on a hardware device to setup a multisig. Use some of software keys for the purpose.",
      icon: Smartphone,
      features: [
        {
          title: "Mobile Key",
          description: "The key of the first hot wallet that's setup when you setup the app",
        },
        {
          title: "External Key",
          description: "A key shared with you by a trusted contact",
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
          description: "Your app's master backup. Write down the seed words to backup the entire app",
        },
        {
          title: "Wallet Configuration File",
          description: "The backup for each of your multisig wallet",
        },
        {
          title: "Key Backup",
          description: "Ensure that your keys are always accessible with key backups",
        },
      ],
    },
  ];

  return (
    <div className="bg-background py-16 md:py-24">
      <section className="container mb-16 max-w-4xl space-y-5 text-center md:mb-20">
        <h1 className="font-serif text-[42px] font-semibold leading-[1.15] text-primary md:text-[64px]">Features</h1>
        <p className="mx-auto max-w-2xl text-[18px] leading-[1.55] text-secondary-foreground/80">
          Bitcoin Keeper has several useful features hidden one layer that help you stack sats better and longer. Get to know the hidden gems here.
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
    </div>
  );
}
