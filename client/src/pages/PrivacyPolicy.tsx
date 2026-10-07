export default function PrivacyPolicy() {
  return (
    <article className="container max-w-4xl py-16 md:py-24">
      <div className="space-y-6">
        <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-primary">
          Privacy Policy
        </h1>
        <p className="font-sans text-lg text-muted-foreground leading-relaxed">
          Bitcoin Keeper was originally developed by BitHyve UK Limited. It is now a free, open-source, community-run project maintained by independent contributors. In this policy, “we” means the contributors and service operators maintaining Keeper. This policy explains how data is handled when you use the Bitcoin Keeper application and supporting services.
        </p>
      </div>

      <hr className="my-10 border-primary/10" />

      <div className="space-y-10 font-sans text-base leading-relaxed text-foreground/80">
        <section className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-primary">1. What data do we collect?</h2>
          <p>
            We try to collect as little personal data as possible. Some optional services or notifications may require information such as an email address or phone number. Bitcoin addresses and keys are stored on your device. Information about bitcoin addresses, balances and transactions is recorded on the public Bitcoin blockchain.
          </p>
          <p>
            Any information related to your public keys and key secrets transmitted via the Bitcoin Keeper relayer is encrypted using the industry standard encryption algorithm AES-256 and is not accessible to Keeper contributors or service operators.
          </p>
          <p>
            Any information that you share with us as part of user support, including your phone number, telegram handles, etc., will only be used in-so-far as it helps address the specific issue you need help with.
          </p>
          <p>
            If you use an app store to download Keeper, you have a separate relationship with that store. Keeper does not receive individual user information from the app stores simply because you download the application.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-primary">2. Data processing records</h2>
          <p className="font-semibold text-primary">Purposes for Data Collection:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Sending alerts and notifications about Inheritance Key requests.</li>
            <li>Notifying users of relevant app or wallet activity.</li>
            <li>Contacting users for customer support purposes if needed.</li>
            <li>Legal Basis for Processing: Consent</li>
            <li>Data Retention Period: Until the user chooses to delete the data.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-primary">3. Access Logs</h2>
          <p>
            We maintain records of data access. Access logs are recorded at the backend servers.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-primary">4. Data Breach Response Plan</h2>
          <p>
            In the event of a data breach involving email addresses and phone numbers, our response plan includes the following steps:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Detecting and assessing the breach</li>
            <li>Reporting the breach to the relevant authorities within the legally required timeframe</li>
            <li>Mitigating measures to minimize the impact of the breach</li>
            <li>Notifying affected individuals, if required by law</li>
            <li>Reviewing and updating our security measures to prevent future breaches</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-primary">5. Records of Consent</h2>
          <p>
            Where consent is required for processing email addresses or phone numbers, relevant consent records may be maintained in backend systems, including:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Consent mechanism (e.g., checkboxes, user account settings)</li>
            <li>Date of consent</li>
            <li>Purpose of processing (e.g., notifications)</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-primary">6. Data Subject Request Handling</h2>
          <p>
            Data subject requests related to email addresses and phone numbers are handled through the app settings. Users can exercise the following rights:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access their data</li>
            <li>Rectify their data</li>
            <li>Erase their data</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-primary">7. Processing Records</h2>
          <p>
            We maintain records of data processing activities, including when data is collected, how it is used, and any data transfers or sharing with third parties. These records are maintained in our backend systems and are available for audit purposes.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-primary">8. Training and Awareness</h2>
          <p>
            We maintain records of training and awareness efforts related to data protection for relevant personnel.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-primary">9. Third Party integrations</h2>
          <p>
            If you choose to use an external service through Bitcoin Keeper, such as backing up Wallet Configuration Files to your chosen cloud service, information you provide to that service is handled by the provider under its own terms and privacy practices.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-primary">10. Changes to our privacy policy</h2>
          <p>
            We may change this Privacy Policy from time to time. Material changes may also be announced through Keeper's public project channels.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-primary">11. How to contact us</h2>
          <p>
            If you have questions about this privacy policy, use Ask Keeper. Do not include wallet secrets or sensitive personal information in support requests.
          </p>
        </section>
      </div>
    </article>
  );
}
