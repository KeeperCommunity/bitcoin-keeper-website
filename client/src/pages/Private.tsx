import { useState } from "react";
import { Shield, Mail, Check, AlertTriangle, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function Private() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitted(true);
    toast.success("Thank you! Our concierge team will reach out shortly.");
  };

  const services = [
    {
      title: "Bitcoin and USDT Sourcing",
      points: [
        {
          title: "Access to Trusted Channels",
          desc: "We help you identify trusted platforms for acquiring Bitcoin or USDT, with an emphasis on privacy and transparency.",
        },
        {
          title: "Transaction Discretion & Network Privacy",
          desc: "Guidance on privacy-conscious transaction methods, avoiding public key reuse, and using self-hosted wallets.",
        },
        {
          title: "Jurisdictional Considerations",
          desc: "We help you understand how your jurisdiction may impact your acquisition choices.",
        },
      ],
    },
    {
      title: "Secure Storage Consulting",
      points: [
        {
          title: "Multi-layered Wallet Setup",
          desc: "Guidance on building a resilient wallet structure using hardware and software solutions.",
        },
        {
          title: "Operational Security Practices",
          desc: "Education on how to implement and manage your own multisig or cold storage setup.",
        },
        {
          title: "Privacy-Conscious Practices",
          desc: "Best practices for reducing on-chain footprint and maintaining sovereignty.",
        },
      ],
      note: "*You retain full custody and control of your digital assets. We do not store or manage private keys.",
    },
    {
      title: "Optimal Usage Directions",
      points: [
        {
          title: "Structuring Your Bitcoin Usage",
          desc: "Advise on when and how to deploy Bitcoin for expenditures, balancing liquidity needs with long-term holding goals, and optimizing for tax and market conditions.",
        },
        {
          title: "Private and Compliant Transactions",
          desc: "Transact using privacy-preserving tools while remaining aligned with applicable regulatory frameworks, ensuring discretion without compromising legality.",
        },
        {
          title: "Integration with Business or Investment Activities",
          desc: "Assistance in incorporating Bitcoin into operational or investment workflows—whether for international settlements, diversification, or strategic positioning within a broader financial portfolio.",
        },
      ],
    },
    {
      title: "Inheritance Planning Support",
      points: [
        {
          title: "Bespoke Inheritance Frameworks",
          desc: "Learn to create custom inheritance plans using multisig wallets, time locks, and institute redundancy mechanisms that ensure Bitcoin access is securely passed on to chosen heirs.",
        },
        {
          title: "Clear Recovery Workflows",
          desc: "We help you document and implement step-by-step recovery instructions so beneficiaries can confidently access Bitcoin without compromising security.",
        },
        {
          title: "Legal and Jurisdictional Integration",
          desc: "Directives on aligning your Bitcoin inheritance strategy with legal structures such as wills, trusts, or family constitutions, tailored to your jurisdiction and estate planning goals.",
        },
      ],
      note: "*Note: Keeper Private does not act as an executor or legal advisor. Clients are encouraged to engage licensed legal professionals for estate matters.",
    },
    {
      title: "Privacy Focused Approach",
      points: [
        {
          title: "Bitcoin Privacy Fundamentals",
          desc: "Learn how Bitcoin's public ledger works, what information is visible on-chain, and how seemingly harmless actions can compromise financial privacy.",
        },
        {
          title: "Best Practices for Transaction Discretion",
          desc: "Guidance on techniques such as avoiding address reuse, managing UTXOs wisely, and separating personal and business wallets to reduce traceability.",
        },
        {
          title: "Discreet Wallet and Network Usage",
          desc: "Assistance in setting up and using wallets with privacy-conscious defaults, along with secure network practices like Tor or VPNs to obscure IP addresses during transactions.",
        },
      ],
    },
    {
      title: "Premium Concierge Services",
      points: [
        {
          title: "End-to-End Bitcoin Strategy & Execution",
          desc: "We provide personalized guidance across the full lifecycle of Bitcoin ownership—from discreet acquisition and secure storage to strategic usage and inheritance planning.",
        },
        {
          title: "Dedicated Expert Support",
          desc: "Clients receive direct access to a team of Bitcoin specialists who offer hands-on assistance, tailored advice, and ongoing support aligned with their financial goals and risk profile.",
        },
        {
          title: "White-Glove Coordination Across Disciplines",
          desc: "We work seamlessly with legal, tax, and technical professionals to ensure that every aspect of the client’s Bitcoin journey is integrated, compliant, and confidently managed.",
        },
      ],
      note: "*Note: All services are consultative in nature. You retain full control over execution and custody.",
    },
  ];

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32 border-b border-primary/5">
        <div className="container max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary font-semibold text-xs tracking-wider uppercase">
                <Shield className="h-3.5 w-3.5" /> Keeper Private
              </div>
              <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-tight text-primary leading-tight">
                Tailored Support & <br />
                <span className="italic font-normal text-primary/80">Enhanced Security</span> <br />
                for Your Bitcoin
              </h1>
              <p className="font-sans text-lg text-muted-foreground leading-relaxed max-w-xl">
                End-to-end, white-glove Bitcoin services—from acquisition to estate planning. Delivered with absolute expertise, nuance, and discretion.
              </p>

              {/* Email Form */}
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
                  <div className="relative flex-grow">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="Enter Your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-10 h-12 font-sans border-primary/10 bg-card"
                    />
                  </div>
                  <Button type="submit" className="h-12 px-6 font-semibold bg-primary text-primary-foreground hover:bg-primary/90">
                    Submit
                  </Button>
                </form>
              ) : (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-accent/10 border border-accent/20 text-primary max-w-md">
                  <Check className="h-5 w-5 text-accent shrink-0" />
                  <span className="font-sans text-sm font-semibold">
                    Request received. Our team will contact you soon.
                  </span>
                </div>
              )}

              <p className="font-sans text-xs text-muted-foreground/80 italic max-w-md">
                *Please note: We do not provide financial or investment advice. Bitcoin is not regulated by the FCA.
              </p>
            </div>

            {/* Right Image */}
            <div className="lg:col-span-5 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent rounded-3xl -rotate-3 scale-105" />
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663560985202/22PprtjboLFbJBcYYDxmC8/keeper-private-hero-jeAtZD9d2wVohr98JLDvyd.webp"
                alt="Keeper Private Advisor"
                className="relative rounded-3xl shadow-[0_20px_50px_rgba(30,53,47,0.1)] object-cover w-full aspect-[4/3] lg:aspect-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Service Highlights Header */}
      <section className="py-16 md:py-24 bg-primary/5">
        <div className="container max-w-4xl text-center space-y-6">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary">Service Highlights</h2>
          <p className="font-sans text-lg text-muted-foreground leading-relaxed">
            Designed for high-net-worth individuals and family offices, Keeper Private enables discreet Bitcoin acquisition and long-term custody—anchored in privacy, legal integrity, and regulatory foresight.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="container py-20 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {services.map((service) => (
            <div
              key={service.title}
              className="flex flex-col justify-between p-8 md:p-10 rounded-3xl bg-card border border-primary/5 shadow-[0_15px_40px_rgba(30,53,47,0.02)] hover:shadow-[0_25px_60px_rgba(30,53,47,0.06)] transition-all duration-300"
            >
              <div className="space-y-8">
                <h3 className="font-serif text-2xl font-bold text-primary border-b border-primary/5 pb-4">
                  {service.title}
                </h3>
                <div className="space-y-6">
                  {service.points.map((pt) => (
                    <div key={pt.title} className="space-y-2">
                      <h4 className="font-serif text-base font-bold text-primary flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                        {pt.title}
                      </h4>
                      <p className="font-sans text-sm text-muted-foreground leading-relaxed pl-3.5">
                        {pt.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              {service.note && (
                <p className="font-sans text-xs text-muted-foreground/70 italic mt-8 pt-4 border-t border-primary/5">
                  {service.note}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Risk Disclosure */}
      <section className="container max-w-4xl pb-20 md:pb-32">
        <div className="p-6 md:p-8 rounded-2xl bg-destructive/5 border border-destructive/15 flex items-start gap-4">
          <AlertTriangle className="h-6 w-6 text-destructive shrink-0 mt-0.5" />
          <div className="space-y-2">
            <h4 className="font-serif text-base font-bold text-destructive">Risk Disclosure</h4>
            <p className="font-sans text-xs md:text-sm text-muted-foreground leading-relaxed">
              Bitcoin and other digital assets are not regulated in the UK. They are high-risk and may lose value. Keeper Private does not offer financial advice and is not registered with the Financial Conduct Authority. Your capital is at risk. No FSCS or FOS protections apply.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
