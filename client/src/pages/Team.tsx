import { Shield, Users, Award, Landmark } from "lucide-react";

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
      category: "Leadership",
    },
    {
      name: "Ben Kaufman",
      role: "CEO",
      description: "Leading vision, execution, and self custody strategy.",
      category: "Leadership",
    },
    {
      name: "Caleb Marc Cross",
      role: "CMO",
      description: "Creator and maintainer of the Zeus lightning wallet.",
      category: "Leadership",
    },
    {
      name: "Abhilash Nair",
      role: "Head - Community Nurturing",
      description: "Creating and connecting bitcoin stories.",
      category: "Leadership",
    },
    {
      name: "Parshva Jain",
      role: "Principal Engineer",
      description: "Building Keeper as a route to social change via bitcoin.",
      category: "Engineering",
    },
    {
      name: "Raheel Ahmed",
      role: "Front End Developer",
      description: "Crafting beautiful, high-fidelity interfaces for Keeper.",
      category: "Engineering",
    },
    {
      name: "Vaibhav Biturwar",
      role: "Software Engineer",
      description: "Application developer - React Native, React hooks, Redux, Typescript.",
      category: "Engineering",
    },
    {
      name: "Umer Javaid",
      role: "UI/UX Design Lead",
      description: "Designing the intuitive and effortless experience of Keeper.",
      category: "Engineering",
    },
    {
      name: "Swati Pawar",
      role: "QA Lead",
      description: "Ensuring absolute reliability and security of wallet software.",
      category: "Engineering",
    },
    {
      name: "Andrew",
      role: "Advisor",
      description: "PM @TheSolo401k | Independent Contractor | Organizer @BitDevsLA.",
      category: "Advisor",
    },
    {
      name: "Sahil Chaturvedi",
      role: "Advisor",
      description: "Advises on and litigating potential legal disputes ranging from inheritance.",
      category: "Advisor",
    },
    {
      name: "Amanda Kita",
      role: "Estate Planning - Advisor",
      description: "Advisor estate and trust administration for Bitcoin holders.",
      category: "Advisor",
    },
    {
      name: "Gautam",
      role: "Advisor",
      description: "Strategic advisory on sovereign self-custody frameworks.",
      category: "Advisor",
    },
    {
      name: "Brad Mills",
      role: "Advisor - Experience",
      description: "Serial entrepreneur. Host of Magic Internet Money Podcast.",
      category: "Advisor",
    },
    {
      name: "Oleg Mikhalsky",
      role: "Advisor",
      description: "Angel investor and partner at Fulgur Ventures.",
      category: "Advisor",
    },
    {
      name: "Ved Chopra",
      role: "Investor",
      description: "Supporting open-source, community-led financial sovereignty.",
      category: "Investor",
    },
    {
      name: "Bnk To The Future",
      role: "Investor",
      description: "Global online investment platform for financial technology.",
      category: "Investor",
    },
  ];

  const categories = ["Leadership", "Engineering", "Advisor", "Investor"] as const;

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
          We are a team of dedicated builders, engineers, and advisors committed to delivering absolute self-custody and sovereign wealth management.
        </p>
      </section>

      {/* Category Groups */}
      <div className="container space-y-24">
        {categories.map((category) => {
          const members = teamMembers.filter((m) => m.category === category);
          if (members.length === 0) return null;

          return (
            <section key={category} className="space-y-10">
              <div className="flex items-center gap-4 border-b border-primary/5 pb-4">
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary">
                  {category === "Leadership" && "Core Leadership"}
                  {category === "Engineering" && "Engineering & Design"}
                  {category === "Advisor" && "Advisors"}
                  {category === "Investor" && "Backed By"}
                </h2>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-primary/5 text-primary">
                  {members.length}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {members.map((member) => (
                  <div
                    key={member.name}
                    className="group relative flex flex-col justify-between p-6 md:p-8 rounded-2xl bg-card border border-primary/5 shadow-[0_10px_30px_rgba(30,53,47,0.02)] transition-all hover:shadow-[0_20px_50px_rgba(30,53,47,0.06)] hover:-translate-y-1 duration-300"
                  >
                    <div className="space-y-4">
                      {/* Avatar Placeholder with Initials */}
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/5 text-primary font-serif text-xl font-bold group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300">
                        {member.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-serif text-lg font-bold text-primary group-hover:text-primary transition-colors">
                          {member.name}
                        </h3>
                        <p className="font-sans text-xs font-bold text-accent uppercase tracking-wider">
                          {member.role}
                        </p>
                      </div>
                      <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                        {member.description}
                      </p>
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
