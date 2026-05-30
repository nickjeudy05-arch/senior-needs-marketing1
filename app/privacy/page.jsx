import SimpleHeader from "../components/SimpleHeader";

export const metadata = {
  title: "Privacy Policy | Senior Needs Marketing",
  description: "Privacy practices for Senior Needs Marketing website leads, appointment requests, and SMS communications.",
};

export default function PrivacyPage() {
  return (
    <main>
      <SimpleHeader />
      <section className="legal-page">
        <p className="eyebrow">Privacy Policy</p>
        <h1>Senior Needs Marketing Privacy Policy</h1>
        <p className="legal-updated">Last updated: May 30, 2026</p>

        <article>
          <h2>Information We Collect</h2>
          <p>
            When you submit a form or book an appointment, we may collect your name, email address, phone number,
            state, date of birth, beneficiary information, coverage interest, appointment details, and any information
            you voluntarily provide in messages or forms.
          </p>
        </article>

        <article>
          <h2>How We Use Information</h2>
          <p>
            We use submitted information to respond to insurance requests, match you with a licensed agent, confirm
            appointments, answer questions, maintain lead records, and improve our customer-care process.
          </p>
        </article>

        <article>
          <h2>SMS and Mobile Information</h2>
          <p>
            No mobile information will be shared with third parties or affiliates for marketing or promotional
            purposes. SMS opt-in data and consent will not be sold, rented, or shared with third parties for their
            marketing purposes.
          </p>
          <p>
            Message frequency may vary based on your request and appointment activity. Message and data rates may
            apply. You may reply STOP to opt out or HELP for help.
          </p>
        </article>

        <article>
          <h2>Service Providers</h2>
          <p>
            We may use trusted service providers to operate the website, store lead information, send appointment
            messages, and support customer communications. These providers are used only to help deliver requested
            services and business operations.
          </p>
        </article>

        <article>
          <h2>Information Security</h2>
          <p>
            We use reasonable administrative, technical, and organizational safeguards to protect submitted information.
            No method of transmission or storage is completely secure, so please do not submit Social Security numbers,
            bank information, Medicare ID numbers, or full medical records through website forms or chat.
          </p>
        </article>

        <article>
          <h2>Your Choices</h2>
          <p>
            You can ask us to update or remove your information from our active follow-up lists. You can opt out of SMS
            messages at any time by replying STOP.
          </p>
        </article>

        <article>
          <h2>Contact</h2>
          <p>
            For privacy questions or help with your information, contact Senior Needs Marketing at 610-609-1653.
          </p>
        </article>
      </section>
    </main>
  );
}
