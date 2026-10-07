export default function TermsOfService() {
  return (
    <article className="container max-w-4xl py-16 md:py-24">
      <div className="space-y-6">
        <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-primary">
          Terms of Service
        </h1>
        <p className="font-sans text-lg text-muted-foreground leading-relaxed">
          These terms describe the use of Bitcoin Keeper. Bitcoin Keeper was originally developed by BitHyve UK Limited. It is now a free, open-source, community-run project. The code and supporting services are maintained by independent contributors.
        </p>
      </div>

      <hr className="my-10 border-primary/10" />

      <div className="space-y-10 font-sans text-base leading-relaxed text-foreground/80">
        <section className="bg-primary/5 border border-primary/10 rounded-xl p-6 md:p-8 space-y-3">
          <p className="font-semibold text-primary">Important Disclosure:</p>
          <p className="text-sm">
            Bitcoin Keeper is non-custodial software. It is not a bank, custodian, broker, or investment service. There is no company operating Keeper as a financial-services provider.
          </p>
          <p className="text-sm">
            By using the Bitcoin Keeper application, website, or supporting services, you agree to these terms.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-primary">1. Bitcoin Keeper Services</h2>
          <p>
            Keeper enables you to create and manage supported wallets, and to store, send, request and receive supported digital assets. You are responsible for understanding the wallet setup and security choices you use.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-primary">2. Supported Digital Assets</h2>
          <p>
            Keeper supports only the assets and networks shown in the application. Support can change over time. The project does not guarantee support for forks, airdrops, or unsupported assets, and contributors are not responsible for losses caused by attempting to use Keeper with unsupported assets or networks.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-primary">3. Responsibility for Passcodes, Recovery Key and Authentication</h2>
          <p>
            Keeper provides tools that help you secure your wallets, including your Recovery Key, passcode, and multi-key signing.
          </p>
          <p className="font-semibold text-primary">
            Keeper does not store or have access to your Recovery Key or passcode. An optional Server Key is an independent, server-side signer in a Multi-Key Wallet and cannot spend your bitcoin alone. Keeper contributors cannot recover your Recovery Key for you.
          </p>
          <p>
            You are responsible for protecting your Recovery Key, passcode, signer backups, Wallet Configuration Files, and any other information needed to recover or sign for your wallets. Losing the information required for recovery or signing can result in permanent loss of access to your bitcoin.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-primary">4. Recovery Feature</h2>
          <p>
            Your 12-word Recovery Key can restore Keeper, including wallet configurations, when a matching encrypted app backup is available. An exported Wallet Configuration File is an independent recovery option. External hardware signers and their secrets require their own backups. You may be unable to restore previously added app data if the matching encrypted app backup is unavailable.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-primary">5. Open-source License</h2>
          <p>
            Bitcoin Keeper is released under the MIT License. Your rights to use, copy, modify and distribute the open-source software are governed by that license.
          </p>
        </section>
      </div>
    </article>
  );
}
