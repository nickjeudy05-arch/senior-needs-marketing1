import SimpleHeader from "../components/SimpleHeader";

export const metadata = {
  title: "SMS Terms | Senior Needs Marketing",
  description: "SMS terms and opt-out instructions for Senior Needs Marketing appointment and customer-care messages.",
};

export default function SmsTermsPage() {
  return (
    <main>
      <SimpleHeader />
      <section className="legal-page">
        <p className="eyebrow">SMS Terms</p>
        <h1>Senior Needs Marketing SMS Terms</h1>
        <p className="legal-updated">Last updated: May 30, 2026</p>

        <article>
          <h2>Program Description</h2>
          <p>
            Senior Needs Marketing may send SMS messages to people who submit a website form, request insurance
            information, or book an appointment. Messages may include appointment confirmations, appointment reminders,
            customer-care replies, and responses to insurance questions.
          </p>
        </article>

        <article>
          <h2>Opt-In</h2>
          <p>
            You opt in by entering your phone number on our website form and checking the consent box before submitting
            your request. Consent to receive text messages is not required to buy any product or service.
          </p>
        </article>

        <article>
          <h2>Message Frequency and Costs</h2>
          <p>
            Message frequency may vary based on your request, appointment activity, and replies. Message and data rates
            may apply.
          </p>
        </article>

        <article>
          <h2>Opt-Out and Help</h2>
          <p>
            Reply STOP to opt out of SMS messages. Reply HELP for help. You may also call Senior Needs Marketing at
            610-609-1653.
          </p>
        </article>

        <article>
          <h2>Mobile Information</h2>
          <p>
            No mobile information will be shared with third parties or affiliates for marketing or promotional purposes.
            SMS opt-in data and consent will not be sold, rented, or shared with third parties for their marketing.
          </p>
        </article>

        <article>
          <h2>Carrier Disclaimer</h2>
          <p>
            Wireless carriers are not liable for delayed or undelivered messages. SMS delivery may depend on carrier
            availability, device status, and compliance approvals.
          </p>
        </article>
      </section>
    </main>
  );
}
