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
            Our Services, including any Wallet or Vault, are for use with Bitcoin (BTC) and USDT (TRC-20) only. We do not guarantee support for any fork, airdrop or other coins except the one(s) supported as per the consensus mechanism followed by our node. We assume no responsibility or liability in connection with any attempt to use your Wallet for digital assets that we do not support.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-primary">3. Responsibility for Passcodes, Recovery Phrase and Authentication</h2>
          <p>
            Our Services provide a number of ways for you to secure your Wallet and Vault and help ensure you, and only you, are able to access and transact through them. These features include shares, mnemonics, personal identification numbers (Passcodes), multi-sig, among other features.
          </p>
          <p className="font-semibold text-primary">
            We do not store or have access to your Recovery Phrase, Passcodes or Private Keys. It is your responsibility to ensure that your Recovery Phrase are stored securely. In case you lose your Recovery Phrase for whatever reason, BitHyve will not be able to recover them for you.
          </p>
          <p>
            It is your responsibility to carefully guard your Recovery Phrase, Passcodes, multi-sig setup pins and backups, and any other means we may provide for you to secure and access your Wallet & Vault. If you forget or lose your means of backup and/or authentication, BitHyve has no way to recover them for you and you may permanently lose access to bitcoin you have stored.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-primary">4. Recovery Feature</h2>
          <p>
            We may provide a recovery feature to help protect you from loss of access to bitcoin though, should our Services become unavailable. Any such feature will not be available to you if you have not secured your Recovery Phrases and various other backup methods as described above.
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
