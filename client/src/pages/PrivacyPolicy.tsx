export default function PrivacyPolicy() {
  return (
    <article className="container max-w-4xl py-16 md:py-24">
      <div className="space-y-6">
        <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-primary">
          Privacy Policy
        </h1>
        <p className="font-sans text-lg text-muted-foreground leading-relaxed">
          Bitcoin Keeper is an application developed by BitHyve UK Limited. This privacy policy is in accordance with the EU General Data Protection Regulation (GDPR) and explains how the app stores any data generated when you use the Bitcoin Keeper Mobile Application.
        </p>
      </div>

      <hr className="my-10 border-primary/10" />

      <div className="space-y-10 font-sans text-base leading-relaxed text-foreground/80">
        <section className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-primary">1. What data do we collect?</h2>
          <p>
            We try to ensure that we collect little to no data in the first place. In certain cases we may require your phone number, and email address. You could always choose to not give us the information and are encouraged to use pseudonymous phone numbers and email ids. Bitcoin addresses and keys are stored directly on your device. Information about your bitcoin addresses, balances belonging to bitcoin addresses, and your bitcoin transactions are recorded on the public Bitcoin blockchain.
          </p>
          <p>
            Any information related to your public keys and key secrets transmitted via the Bitcoin Keeper relayer is encrypted using the industry standard encryption algorithm AES-256 and no party, including BitHyve, can ever access it.
          </p>
          <p>
            Any information that you share with us as part of user support, including your phone number, telegram handles, etc., will only be used in-so-far as it helps address the specific issue you need help with.
          </p>
          <p>
            If you request Keeper Private through our website, the email address you submit is sent through FormSubmit to keeper@bithyve.com so our team can respond to your inquiry.
          </p>
          <p>
            If you use an app store to download Keeper, please note that you would be having a separate relationship with the store. BitHyve neither solicits nor receives individual users’ information who use the app stores to access our app.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-primary">2. Data processing records</h2>
          <p className="font-semibold text-primary">Purposes for Data Collection:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Sending alerts and notifications about Inheritance Key requests.</li>
            <li>Notifying users of account activity.</li>
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
            We document user consent for processing email addresses and phone numbers. Consent records are maintained in our backend systems and linked to user accounts, including:
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
            If you choose to use external services through Bitcoin Keeper, such as buying bitcoin or backing up Wallet Configuration Files to your chosen cloud service, information you provide to those services is shared with the provider with your consent.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-primary">10. Changes to our privacy policy</h2>
          <p>
            We may change this Privacy Policy from time to time. Changes to this Privacy Policy will be notified to you by revising the date at the bottom of the policy and we will provide additional notice by adding a statement on our official twitter account.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-primary">11. How to contact us</h2>
          <p>
            If you have any questions about the privacy policy or would like clarifications about the same, please reach out via{" "}
            <a href="mailto:keeper@bithyve.com" className="text-accent font-semibold hover:underline">
              keeper@bithyve.com
            </a>
          </p>
        </section>
      </div>
    </article>
  );
}
