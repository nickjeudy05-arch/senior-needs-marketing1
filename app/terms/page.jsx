import SimpleHeader from "../components/SimpleHeader";

export const metadata = {
  title: "Terms of Service | Senior Needs Marketing",
  description: "Terms for Senior Needs Marketing brokerage information requests and appointment booking.",
};

export default function TermsPage() {
  return (
    <main>
      <SimpleHeader />
      <section className="legal-page">
        <p className="eyebrow">Terms of Service</p>
        <h1>Senior Needs Marketing Terms of Service</h1>
        <p className="legal-updated">Last updated: May 30, 2026</p>

        <article>
          <h2>Brokerage Purpose</h2>
          <p>
            Senior Needs Marketing helps visitors request information about life insurance, mortgage protection, final
            expense, and Medicare health insurance options. Information from the brokerage is educational and does not
            create an insurance policy, bind coverage, or guarantee eligibility.
          </p>
        </article>

        <article>
          <h2>Licensed Agent Review</h2>
          <p>
            Insurance availability, eligibility, pricing, benefits, and underwriting can vary by state, carrier, age,
            health history, and other factors. A licensed agent must review actual options before any application or
            coverage decision is made.
          </p>
        </article>

        <article>
          <h2>Not a Government Agency</h2>
          <p>
            Senior Needs Marketing is not a government agency and is not affiliated with Medicare, the federal
            government, or any state government program. Medicare plan information is educational and must be reviewed
            against actual local availability and eligibility.
          </p>
        </article>

        <article>
          <h2>No Legal, Tax, Medical, or Financial Advice</h2>
          <p>
            Senior Needs Marketing page content, chat responses, and SMS responses are general information only. They are not legal, tax,
            medical, financial, or final insurance advice.
          </p>
        </article>

        <article>
          <h2>Appointments and Communications</h2>
          <p>
            When you submit a form or request an appointment, you agree that Senior Needs Marketing, a licensed agent,
            or an automated or AI-assisted communication tool may contact you about your request using the information
            you provide. Appointment requests are not guaranteed until confirmed by a representative.
          </p>
        </article>

        <article>
          <h2>AI Assistant, Voice Calls, and SMS Replies</h2>
          <p>
            Chat, voice, and SMS assistant responses are automated educational support tools. They may help explain
            insurance concepts and prepare questions for an agent, but they are not final recommendations and should not
            be relied on as a substitute for a licensed agent review.
          </p>
        </article>

        <article>
          <h2>Third-Party Services</h2>
          <p>
            Senior Needs Marketing may use third-party technology providers for hosting, database storage, messaging, analytics,
            communications, and appointment support. Those services may have their own terms and privacy practices.
          </p>
        </article>

        <article>
          <h2>Acceptable Use</h2>
          <p>
            Do not submit false information, attempt to access systems without authorization, or use Senior Needs Marketing services in a way
            that interferes with normal operation.
          </p>
        </article>

        <article>
          <h2>Limitation of Liability</h2>
          <p>
            To the fullest extent allowed by law, Senior Needs Marketing is not responsible for indirect, incidental, or
            consequential damages arising from use of Senior Needs Marketing services, delayed communications, message delivery issues, or
            reliance on general educational information.
          </p>
        </article>

        <article>
          <h2>Contact</h2>
          <p>For questions about these terms, contact Senior Needs Marketing at 610-609-1653.</p>
        </article>
      </section>
    </main>
  );
}
