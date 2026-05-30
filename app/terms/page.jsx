import SimpleHeader from "../components/SimpleHeader";

export const metadata = {
  title: "Terms of Service | Senior Needs Marketing",
  description: "Website terms for Senior Needs Marketing insurance information requests and appointment booking.",
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
          <h2>Website Purpose</h2>
          <p>
            This website helps visitors request information about life insurance, mortgage protection, final expense,
            and Medicare health insurance options. Information on this site is educational and does not create an
            insurance policy, bind coverage, or guarantee eligibility.
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
          <h2>No Legal, Tax, Medical, or Financial Advice</h2>
          <p>
            Website content, chat responses, and SMS responses are general information only. They are not legal, tax,
            medical, financial, or final insurance advice.
          </p>
        </article>

        <article>
          <h2>Appointments and Communications</h2>
          <p>
            When you submit a form or request an appointment, you agree that Senior Needs Marketing or a licensed agent
            may contact you about your request using the information you provide. Appointment requests are not guaranteed
            until confirmed by a representative.
          </p>
        </article>

        <article>
          <h2>Acceptable Use</h2>
          <p>
            Do not submit false information, attempt to access systems without authorization, or use the website in a way
            that interferes with normal operation.
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
