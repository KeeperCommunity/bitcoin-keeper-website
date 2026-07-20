import { Users } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  description: string;
  avatarUrl?: string;
  category: "Leadership" | "Engineering" | "Advisor" | "Investor";
}

export default function Team() {
  const teamMembers: TeamMember[] = [
    {
      name: "Anant Tapadia",
      role: "Founder & Chairman",
      description: "Monetary maximalist and meme lover.",
      avatarUrl: "/images/team/Anant.jpg",
      category: "Leadership",
    },
    {
      name: "Ben Kaufman",
      role: "CEO",
      description: "Leading vision, execution, and self custody strategy.",
      avatarUrl: "/images/team/IMG_9437-2.jpg",
      category: "Leadership",
    },
    {
      name: "Caleb Marc Cross",
      role: "CMO",
      description: "Creator and maintainer of the Zeus lightning wallet.",
      avatarUrl: "/images/team/1736810169203.jpeg",
      category: "Leadership",
    },
    {
      name: "Abhilash Nair",
      role: "Head - Community Nurturing",
      description: "Creating and connecting bitcoin stories.",
      avatarUrl: "/images/team/abhilash.jpg",
      category: "Leadership",
    },
    {
      name: "Parshva Jain",
      role: "Principal Engineer",
      description: "Building Keeper as a route to social change via bitcoin.",
      avatarUrl: "/images/team/Parshva-Jain.jpg",
      category: "Engineering",
    },
    {
      name: "Raheel Ahmed",
      role: "Front End Developer",
      description: "Crafting beautiful, high-fidelity interfaces for Keeper.",
      avatarUrl: "/images/team/PHOTO-2024-04-29-18-49-55.jpg",
      category: "Engineering",
    },
    {
      name: "Vaibhav Biturwar",
      role: "Software Engineer",
      description: "Application developer - React Native, React hooks, Redux, Typescript.",
      avatarUrl: "/images/team/IMG_5678.png",
      category: "Engineering",
    },
    {
      name: "Umer Javaid",
      role: "UI/UX Design Lead",
      description: "Designing the intuitive and effortless experience of Keeper.",
      avatarUrl: "/images/team/image-6-1.png",
      category: "Engineering",
    },
    {
      name: "Swati Pawar",
      role: "QA Lead",
      description: "Ensuring absolute reliability and security of wallet software.",
      avatarUrl: "/images/team/IMG_20230619_223849.jpg",
      category: "Engineering",
    },
    {
      name: "Andrew",
      role: "Advisor",
      description: "PM @TheSolo401k | Independent Contractor | Organizer @BitDevsLA.",
      avatarUrl: "/images/team/Andrew.jpg",
      category: "Advisor",
    },
    {
      name: "Sahil Chaturvedi",
      role: "Advisor",
      description: "Advises on and litigating potential legal disputes ranging from inheritance.",
      avatarUrl: "/images/team/yP4o43cz_400x400.jpg",
      category: "Advisor",
    },
    {
      name: "Amanda Kita",
      role: "Estate Planning - Advisor",
      description: "Advisor estate and trust administration for Bitcoin holders.",
      avatarUrl: "/images/team/Amanda.jpeg",
      category: "Advisor",
    },
    {
      name: "Gautam",
      role: "Advisor",
      description: "Strategic advisory on sovereign self-custody frameworks.",
      avatarUrl: "/images/team/FpAR3b0akAAhJ-g.jpeg",
      category: "Advisor",
    },
    {
      name: "Brad Mills",
      role: "Advisor - Experience",
      description: "Serial entrepreneur. Host of Magic Internet Money Podcast.",
      avatarUrl: "/images/team/brad.jpg",
      category: "Advisor",
    },
    {
      name: "Oleg Mikhalsky",
      role: "Advisor",
      description: "Angel investor and partner at Fulgur Ventures.",
      avatarUrl: "/images/team/oleg-1.jpg",
      category: "Advisor",
    },
    {
      name: "Ved Chopra",
      role: "Investor",
      description: "Supporting open-source, community-led financial sovereignty.",
      avatarUrl: "/images/team/Ved.jpeg",
      category: "Investor",
    },
    {
      name: "Bnk To The Future",
      role: "Investor",
      description: "Global online investment platform for financial technology.",
      avatarUrl: "/images/team/bank-to-the-future-1.png",
      category: "Investor",
    },
  ];

  return (
    <div className="py-16 md:py-24 bg-background">
      {/* Hero Section */}
      <section className="container max-w-5xl text-center space-y-6 mb-20">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary font-semibold text-xs tracking-wider uppercase">
          <Users className="h-3.5 w-3.5" /> Our Team
        </div>
        <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-tight text-primary">
          Built by Bitcoiners, <br />
          <span className="italic font-normal text-primary/80">for Bitcoiners first</span>
        </h1>
        <p className="max-w-2xl mx-auto font-sans text-lg text-muted-foreground leading-relaxed">
          A team full of bitcoiners, who are all working for bitcoin first, and Keeper second.
        </p>
      </section>

      <div className="container">
        <section className="space-y-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {teamMembers.map((member) => (
              <article key={member.name} className="group">
                <div className="relative overflow-hidden border-b-[3px] border-[#3e524d] bg-primary/10">
                  {member.avatarUrl ? (
                    <img
                      src={member.avatarUrl}
                      alt={member.name}
                      className="h-[320px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-[320px] w-full items-center justify-center bg-primary/5 text-primary font-serif text-4xl font-bold">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,29,27,0.15)_30%,rgba(20,29,27,0.72)_100%)]" />
                  <p className="absolute bottom-4 left-4 right-4 text-center text-[13px] italic leading-[1.4] text-white">
                    {member.description}
                  </p>
                </div>
                <div className="pt-4 text-center">
                  <h3 className="font-serif text-[20px] font-semibold uppercase tracking-[0.2px] text-primary">{member.name}</h3>
                  <p className="mt-1 text-[11px] font-bold uppercase tracking-[1.3px] text-[#3e524d]">{member.role}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
