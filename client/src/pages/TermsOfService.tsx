export default function TermsOfService() {
  return (
    <article className="container max-w-4xl py-16 md:py-24">
      <div className="space-y-6">
        <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-primary">
          Terms of Service
        </h1>
        <p className="font-sans text-lg text-muted-foreground leading-relaxed">
          This is a contract (the “Agreement”) between you and BitHyve Limited (“BitHyve”, “we” or “us”), a company registered and incorporated under English Law with company number 11373012.
        </p>
      </div>

      <hr className="my-10 border-primary/10" />

      <div className="space-y-10 font-sans text-base leading-relaxed text-foreground/80">
        <section className="bg-primary/5 border border-primary/10 rounded-xl p-6 md:p-8 space-y-3">
          <p className="font-semibold text-primary">Important Disclosure:</p>
          <p className="text-sm">
            The services provided by BitHyve as part of Bitcoin Keeper do not fall within the scope of the Financial Ombudsman Services (FOS) or the Financial Services Compensation Scheme (FSCS).
          </p>
          <p className="text-sm">
            By clicking on “I agree” or similar terms when using the Bitcoin Keeper Mobile Application, or by proceeding with a download or update, you are agreeing to be bound by the terms and conditions found in this Agreement.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-primary">1. Bitcoin Keeper Services</h2>
          <p>
            Keeper enables you to create multiple digital currency based accounts, and to store, send, request and receive supported digital assets. By using our services, you acknowledge and agree that you have carefully read and understood this document and our FAQs.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-primary">2. Supported Digital Assets</h2>
          <p>
            Our Services, including any Wallet, are for use with Bitcoin (BTC) and USDT (TRC-20) only. We do not guarantee support for any fork, airdrop or other coins except the one(s) supported as per the consensus mechanism followed by our node. We assume no responsibility or liability in connection with any attempt to use your Wallet for digital assets that we do not support.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-primary">3. Responsibility for Passcodes, Recovery Key and Authentication</h2>
          <p>
            Our Services provide a number of ways for you to secure your Wallet and help ensure you, and only you, are able to access and transact through it. These features include your Recovery Key, passcode, and multi-key signing, among others.
          </p>
          <p className="font-semibold text-primary">
            We do not store or have access to your Recovery Key or passcode. An optional Server Key is an independent, server-side signer in a Multi-Key Wallet; it cannot spend your bitcoin alone. It is your responsibility to keep your Recovery Key secure. If you lose your Recovery Key, BitHyve cannot recover it for you.
          </p>
          <p>
            It is your responsibility to carefully guard your Recovery Key, passcode, signer backups, Wallet Configuration Files, and any other means you use to secure and access your Wallet. If you forget or lose the information needed to recover or sign for your Wallet, BitHyve may be unable to restore your access and you may permanently lose access to your bitcoin.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-primary">4. Recovery Feature</h2>
          <p>
            Your 12-word Recovery Key can restore Keeper, including wallet configurations, when a matching encrypted app backup is available. An exported Wallet Configuration File is an independent recovery option. External hardware signers and their secrets require their own backups. You may be unable to restore previously added app data if the matching encrypted app backup is unavailable.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-primary">5. License</h2>
          <p>
            We grant you a limited, personal, non-transferable, non-exclusive license to access and use the Website and to use the Services as provided to you by BitHyve, subject to the terms of this Agreement and solely for approved purposes as permitted by us. Any other use of the Website or the Services is expressly prohibited.
          </p>
        </section>
      </div>
    </article>
  );
}
