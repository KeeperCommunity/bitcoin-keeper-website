const guideSections = [
  {
    id: "what-is-bitcoin-keeper",
    label: "About Keeper",
    title: "What is Bitcoin Keeper?",
    paragraphs: [
      "Bitcoin Keeper is a free, open-source bitcoin self-custody wallet for managing wallets, signing keys, recovery and long-term access planning. It supports Single-Key Wallets and Multi-Key Wallets, including multisig setups. There are no subscriptions; donations are optional.",
    ],
  },
  {
    id: "self-custody-and-server-key",
    label: "Self-custody",
    title: "What does self-custody mean in Keeper?",
    paragraphs: [
      "You manage the keys needed to authorize spending and are responsible for their backups. Keeper is not an exchange or a custodial account.",
      "An optional Server Key is stored on Keeper’s servers and can help sign as one key in a Multi-Key Wallet. Keeper cannot spend your bitcoin with this key alone.",
    ],
  },
  {
    id: "multisig-wallets",
    label: "Multisig",
    title: "What is a multisig wallet?",
    paragraphs: [
      "A multisig wallet requires several keys to authorize spending. In a 2-of-3 setup, 2 of 3 keys are needed to spend. This can reduce dependence on a single key, but you must maintain the required keys. An exported configuration is an independent recovery option if the app backup is unavailable.",
    ],
  },
  {
    id: "mobile-and-hardware-wallets",
    label: "Phones and hardware",
    title: "Can I use Keeper on my phone with hardware wallets?",
    paragraphs: [
      "Keeper has iOS and Android apps and supports hardware and software signing devices. A Multi-Key Wallet can combine different signing devices. Connection methods depend on the device and phone; check the current app and device documentation before choosing your setup.",
    ],
  },
  {
    id: "backup-and-recovery",
    label: "Backup and recovery",
    title: "What should I back up?",
    paragraphs: ["These backups serve different purposes:"],
    backups: [
      {
        title: "Recovery Key",
        description:
          "Your 12-word key restores Keeper from its encrypted app backup, including wallet configurations. Keep it offline and never share it.",
      },
      {
        title: "Wallet Configuration File",
        description:
          "A separate export of a Multi-Key Wallet setup for independent recovery or use in compatible software. It contains no private keys.",
      },
      {
        title: "Signing-device backups",
        description:
          "Preserve access to your separate signing keys. App recovery does not replace these backups.",
      },
      {
        title: "Cloud Backup",
        description:
          "Saves wallet configuration files. It does not replace your Recovery Key or signing-device backups.",
      },
      {
        title: "Assisted Server Backup",
        description:
          "Backs up encrypted data using a community-run Keeper server. It is separate from Server Key and does not replace your Recovery Key.",
      },
    ],
  },
  {
    id: "wallet-interoperability",
    label: "Using other apps",
    title: "Can I recreate a Keeper wallet in another app?",
    paragraphs: [
      "A Wallet Configuration File can recreate the wallet setup in compatible software. You still need the required signing keys to spend. Importing a wallet adds it to an app; it does not move bitcoin. Exportable configurations help you plan access beyond one app or device.",
    ],
  },
  {
    id: "archived-wallets",
    label: "Archived wallets",
    title: "What happens when wallet keys or rules change?",
    paragraphs: [
      "Keeper retains the previous configuration as an Archived Wallet after key or scheme changes. To use it, unarchive it first. Bitcoin sent to an old address still belongs to that older configuration and requires its original signing-key quorum.",
      "Keep old keys and configuration backups until you have accounted for funds and any future payments to old addresses. Hiding a wallet is a separate visibility setting.",
    ],
  },
  {
    id: "inheritance-and-emergency-keys",
    label: "Delayed access",
    title: "How are Inheritance Key, Emergency Key and Wallet Timelock different?",
    paragraphs: [
      "An Inheritance Key can give an heir or trusted party a delayed access path. An Emergency Key is a separate delayed recovery path when normal access is unavailable. Wallet Timelock prevents spending until the selected time has passed.",
      "These rules depend on the wallet setup. Changing a rule later may require a new wallet and moving bitcoin. Key access does not establish legal ownership.",
    ],
  },
  {
    id: "usdt-wallet",
    label: "USDT",
    title: "Does Keeper support USDT?",
    paragraphs: [
      "The mobile app supports a separate USDT Wallet for USDT TRC-20 on Tron. Buy USDT via Ramp is no longer available. A USDT Wallet does not inherit a bitcoin Multi-Key Wallet’s signing rules.",
      "Check the displayed USDT receive address and network before sending. Imported USDT wallets can have separate recovery material; keep its backup. Gas-free transfers do not require you to hold TRX, but transfer and activation fees can apply.",
    ],
  },
  {
    id: "suitability-and-tradeoffs",
    label: "Suitability and tradeoffs",
    title: "Who is Keeper suitable for, and what are the tradeoffs?",
    paragraphs: [
      "Keeper suits people who want to manage bitcoin wallets, signing devices, recovery and long-term access planning together. A Single-Key Wallet is simpler for everyday use. Multisig requires managing more keys and backups.",
      "Advanced inheritance and timelock rules need careful planning; changing them may require a new wallet and moving bitcoin. Inheritance tools help plan access to keys and information; they do not establish legal ownership.",
    ],
  },
];

const linkClassName =
  "text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

export default function KeeperGuide() {
  return (
    <article
      id="guide"
      className="scroll-mt-28 bg-background pt-16 text-foreground md:pt-20"
    >
      <header className="container mb-12 max-w-4xl space-y-5 text-center md:mb-16">
        <h2 className="font-serif text-3xl font-semibold leading-[1.15] text-primary md:text-4xl">
          Self-custody basics
        </h2>
        <p className="mx-auto max-w-2xl text-[18px] leading-[1.55] text-secondary-foreground/80">
          A short guide to Bitcoin Keeper, multisig, signing devices and the
          backups you need to understand.
        </p>
        <p className="text-sm text-muted-foreground">
          Published <time dateTime="2026-09-30">30 September 2026</time>
        </p>
        <a href="#ask-question" className={linkClassName}>
          Ask a Question
        </a>
      </header>

      <div className="container max-w-4xl space-y-10 md:space-y-12">
        <nav
          aria-label="In this guide"
          className="rounded-2xl border border-primary/5 bg-card p-6 md:p-8"
        >
          <p className="mb-4 font-semibold text-primary">In this guide</p>
          <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {guideSections.map(section => (
              <li key={section.id}>
                <a href={`#${section.id}`} className={linkClassName}>
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {guideSections.map(section => (
          <section
            key={section.id}
            id={section.id}
            aria-labelledby={`${section.id}-title`}
            className="scroll-mt-28 space-y-5 rounded-2xl border border-primary/5 bg-card p-6 shadow-[0_10px_30px_rgba(30,53,47,0.02)] md:p-8"
          >
            <h3
              id={`${section.id}-title`}
              className="font-serif text-2xl font-semibold leading-[1.3] text-primary md:text-3xl"
            >
              {section.title}
            </h3>
            {section.paragraphs.map(paragraph => (
              <p
                key={paragraph}
                className="text-[18px] leading-[1.6] text-secondary-foreground/80"
              >
                {paragraph}
              </p>
            ))}
            {section.backups && (
              <dl className="space-y-5">
                {section.backups.map(backup => (
                  <div key={backup.title} className="space-y-1">
                    <dt className="font-semibold text-primary">
                      {backup.title}
                    </dt>
                    <dd className="text-[18px] leading-[1.6] text-secondary-foreground/80">
                      {backup.description}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </section>
        ))}

        <aside
          aria-label="Download and source links"
          className="space-y-6 rounded-2xl border border-primary/5 bg-card p-6 text-center md:p-8"
        >
          <p className="font-serif text-2xl font-semibold text-primary">
            Get Bitcoin Keeper
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <a
              href="https://apps.apple.com/us/app/bitcoin-keeper/id1545535925"
              className="inline-flex min-h-12 items-center justify-center rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              Get for iOS
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=io.hexawallet.bitcoinkeeper"
              className="inline-flex min-h-12 items-center justify-center rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              Get for Android
            </a>
          </div>
          <p className="leading-relaxed text-muted-foreground">
            Read the{" "}
            <a
              href="https://github.com/KeeperCommunity/bitcoin-keeper"
              className={linkClassName}
            >
              source code
            </a>{" "}
            or find{" "}
            <a
              href="https://github.com/KeeperCommunity/bitcoin-keeper/releases"
              className={linkClassName}
            >
              release notes and direct Android downloads
            </a>
            .
          </p>
        </aside>
      </div>
    </article>
  );
}
