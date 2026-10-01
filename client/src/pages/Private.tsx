import { useState } from "react";
import { Shield, Mail, Check, AlertTriangle, Coins, ShieldCheck, Wallet, Users, EyeOff, ConciergeBell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function Private() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const privateAssets = {
    hero: "/wp-content/uploads/2025/04/banner-image-1-1.png",
    shape: "/wp-content/uploads/2025/04/object-2.png",
    serviceVisuals: [
      "/wp-content/uploads/2025/07/Group-1000004668-1.png",
      "/wp-content/uploads/2025/07/Group-1000004687.png",
      "/wp-content/uploads/2025/07/Group-1000004694.png",
      "/wp-content/uploads/2025/07/Group-1000004699.png",
      "/wp-content/uploads/2025/07/Group-1000004706.png",
      "/wp-content/uploads/2025/07/Keeper-kit-Iamge-2.png",
    ],
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim() || isSubmitting) return;
    if (new FormData(e.currentTarget).get("_honey")) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("https://formsubmit.co/ajax/keeper@bithyve.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          _subject: "Keeper Private website inquiry",
          _captcha: "false",
          _honey: "",
          message: "Please contact me about Keeper Private.",
        }),
      });
      const result = await response.json();
      if (!response.ok || result.success !== "true") throw new Error("Submission failed");
      setIsSubmitted(true);
      toast.success("Request sent. Our team will contact you soon.");
    } catch {
      toast.error("We couldn't send your request. Please email keeper@bithyve.com.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    {
      title: "Bitcoin and USDT Sourcing",
      icon: Coins,
      image: privateAssets.serviceVisuals[0],
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
      icon: ShieldCheck,
      image: privateAssets.serviceVisuals[1],
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
      icon: Wallet,
      image: privateAssets.serviceVisuals[2],
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
      icon: Users,
      image: privateAssets.serviceVisuals[3],
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
      icon: EyeOff,
      image: privateAssets.serviceVisuals[4],
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
      icon: ConciergeBell,
      image: privateAssets.serviceVisuals[5],
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
    <div className="bg-[#0e1413] text-[#f1efe8]">
      <section className="relative overflow-hidden border-b border-[#3e524d]/40 bg-[radial-gradient(circle_at_20%_0%,#2b3a36_0%,#0e1413_60%)] py-20 md:py-28">
        <img src={privateAssets.shape} alt="" className="pointer-events-none absolute -right-20 -top-20 w-[340px] opacity-20" />
        <div className="container max-w-6xl">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="space-y-8 lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#A58969]/45 bg-[#A58969]/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#dcccb4]">
                <Shield className="h-3.5 w-3.5" /> Keeper Private
              </div>
              <h1 className="font-serif text-4xl font-semibold leading-[1.1] text-[#f6f3ea] md:text-6xl">
                Tailored Support and
                <br />
                Enhanced Security
                <br />
                for Your Bitcoin
              </h1>
              <p className="max-w-xl text-lg leading-relaxed text-[#d6d1c4]">
                End-to-end, white-glove Bitcoin services—from acquisition to estate planning. Delivered with expertise, nuance, and discretion.
              </p>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-3 sm:flex-row">
                  <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
                  <div className="relative flex-grow">
                    <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#b9b2a2]" />
                    <Input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-12 border-[#3e524d] bg-[#16201e] pl-10 text-[#f6f3ea] placeholder:text-[#8f968f]"
                    />
                  </div>
                  <Button type="submit" disabled={isSubmitting} className="h-12 bg-[#A58969] px-6 font-semibold text-[#111614] hover:bg-[#b59c7f]">
                    {isSubmitting ? "Sending…" : "Submit"}
                  </Button>
                </form>
              ) : (
                <div className="flex max-w-md items-center gap-3 rounded-xl border border-[#A58969]/35 bg-[#A58969]/15 p-4 text-[#efe4d3]">
                  <Check className="h-5 w-5 shrink-0 text-[#d8bf9d]" />
                  <span className="text-sm font-semibold">Request sent. Our team will contact you soon.</span>
                </div>
              )}

              <p className="max-w-md text-xs italic text-[#a8a496]">
                *Please note: We do not provide financial or investment advice. Bitcoin is not regulated by the FCA.
              </p>
            </div>

            <div className="relative lg:col-span-5">
              <div className="absolute inset-0 -rotate-2 rounded-[28px] bg-[#A58969]/20" />
              <img
                src={privateAssets.hero}
                alt="Keeper Private"
                className="relative w-full rounded-[28px] border border-[#3e524d]/50 bg-[#141c1a] object-cover p-2 shadow-[0_30px_70px_rgba(0,0,0,0.45)]"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#3e524d]/40 bg-[#101816] py-14 md:py-18">
        <div className="container max-w-5xl space-y-6 text-center">
          <h2 className="font-serif text-3xl font-semibold text-[#f4f1e8] md:text-4xl">Service Highlights</h2>
          <p className="text-lg leading-relaxed text-[#c8c1b0]">
            Designed for high-net-worth individuals and family offices, Keeper Private enables discreet Bitcoin acquisition and long-term custody—anchored in privacy, legal integrity, and regulatory foresight.
          </p>

          <div className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={`${service.title}-highlight`}
                className="rounded-[10px] border border-[#846E55]/70 bg-[#141d1b] px-4 py-3 text-center"
              >
                <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#A58969]/20 text-[#c8b064]">
                  <service.icon className="h-4.5 w-4.5" />
                </div>
                <p className="font-sans text-[16px] leading-[1.25] text-[#f0e8d7]">{service.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container space-y-14 py-16 md:py-24">
        {services.map((service, idx) => (
          <article
            key={service.title}
            className="grid grid-cols-1 items-stretch gap-8 rounded-[22px] border border-[#3e524d]/45 bg-[#141d1b] p-6 md:p-8 lg:grid-cols-[1fr_1fr]"
          >
            <div className={`${idx % 2 === 1 ? "lg:order-2" : ""} flex items-center justify-center rounded-[16px] border border-[#3e524d]/35 bg-[#0f1514] p-4 md:p-6`}>
              <img src={service.image} alt={service.title} className="max-h-[340px] w-full object-contain" />
            </div>

            <div className={`${idx % 2 === 1 ? "lg:order-1" : ""} space-y-6`}>
              <h3 className="border-b border-[#3e524d]/45 pb-3 font-serif text-[30px] font-semibold leading-[1.2] text-[#f1eee4]">
                {service.title}
              </h3>
              <div className="space-y-5">
                {service.points.map((pt) => (
                  <div key={pt.title} className="space-y-2">
                    <h4 className="flex items-center gap-2 font-serif text-[17px] font-semibold text-[#e6d8c1]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#A58969]" />
                      {pt.title}
                    </h4>
                    <p className="pl-3.5 text-[14px] leading-relaxed text-[#b8b1a2]">{pt.desc}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-4">
                <Button className="h-10 rounded-[6px] bg-[#A58969] px-5 text-[13px] font-semibold uppercase tracking-[0.8px] text-[#111614] hover:bg-[#b59c7f]">
                  Learn More
                </Button>
                {service.note && <p className="text-xs italic text-[#9f9a8a]">{service.note}</p>}
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="container max-w-5xl pb-20 md:pb-28">
        <div className="flex items-start gap-4 rounded-2xl border border-[#b71c1c]/35 bg-[#2a1515] p-6 md:p-8">
          <AlertTriangle className="mt-0.5 h-6 w-6 shrink-0 text-[#f08b8b]" />
          <div className="space-y-2">
            <h4 className="font-serif text-lg font-semibold text-[#ffd3d3]">Risk Disclosure</h4>
            <p className="text-sm leading-relaxed text-[#e6bbbb]">
              Bitcoin and other digital assets are not regulated in the UK. They are high-risk and may lose value. Keeper Private does not offer financial advice and is not registered with the Financial Conduct Authority. Your capital is at risk. No FSCS or FOS protections apply.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
