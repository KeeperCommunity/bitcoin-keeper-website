import { Code2, Github, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const contributionAreas = [
  {
    title: "Code and maintenance",
    copy: "Build features, fix bugs, improve wallet interoperability and keep dependencies and platforms current.",
    icon: Code2,
  },
  {
    title: "Testing and review",
    copy: "Review changes, test releases, report issues and help strengthen security-critical flows.",
    icon: ShieldCheck,
  },
  {
    title: "Docs and community",
    copy: "Improve guidance, explain self-custody clearly and help other users contribute effectively.",
    icon: Users,
  },
];

export default function Team() {
  return (
    <div className="bg-background py-16 md:py-24">
      <section className="container max-w-5xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
          <Users className="h-3.5 w-3.5" /> Contributors
        </div>
        <h1 className="mt-6 font-serif text-4xl font-bold tracking-tight text-primary md:text-6xl">
          Built and maintained in public
        </h1>
        <p className="mx-auto mt-6 max-w-3xl font-sans text-lg leading-relaxed text-muted-foreground">
          Bitcoin Keeper is a free, open-source, community-run project. It has no company management structure. The code and supporting services are maintained by independent contributors.
        </p>
      </section>

      <section className="container mt-16 max-w-6xl">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {contributionAreas.map(({ title, copy, icon: Icon }) => (
            <article key={title} className="rounded-[8px] border border-primary/10 bg-white p-7">
              <Icon className="h-8 w-8 text-primary" />
              <h2 className="mt-5 font-serif text-[23px] font-semibold text-primary">{title}</h2>
              <p className="mt-3 text-[16px] leading-[1.55] text-secondary-foreground/80">{copy}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-[8px] bg-primary p-8 text-center text-primary-foreground md:p-12">
          <h2 className="font-serif text-[30px] font-semibold text-white">See who is contributing</h2>
          <p className="mx-auto mt-4 max-w-2xl text-[17px] leading-relaxed text-white/80">
            Contributions and project activity are visible in the public repository. The contributor list changes as people join, review, test and maintain the project.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild className="h-auto rounded-[4px] bg-white px-7 py-4 text-[16px] font-semibold text-primary hover:bg-white/90">
              <a href="https://github.com/KeeperCommunity/bitcoin-keeper/graphs/contributors" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" /> View contributors
              </a>
            </Button>
            <Button asChild variant="outline" className="h-auto rounded-[4px] border-white/30 bg-transparent px-7 py-4 text-[16px] font-semibold text-white hover:bg-white/10 hover:text-white">
              <a href="https://github.com/KeeperCommunity/bitcoin-keeper" target="_blank" rel="noopener noreferrer">
                Contribute on GitHub
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
