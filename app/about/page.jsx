import { Award, MapPin, ShieldCheck, UserRoundCheck } from "lucide-react";
import SimpleHeader from "../components/SimpleHeader";

export default function Page() {
  return (
    <main>
      <SimpleHeader />
      <section className="about-page">
        <div>
          <p className="eyebrow">National Agent Network</p>
          <h1>Matched with the right licensed agent.</h1>
          <p>
            Senior Needs Marketing helps clients in any state make confident
            insurance decisions across life insurance, mortgage protection,
            final expense, and Medicare health coverage. A licensed agent
            reviews each request and follows up based on the person&apos;s state,
            needs, and preferred contact method.
          </p>
          <a className="primary-submit" href="/#start">
            <UserRoundCheck size={18} aria-hidden="true" /> Get Matched
          </a>
        </div>
        <div className="about-card">
          <img
            src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85"
            alt="Advisor meeting with clients"
          />
          <p><ShieldCheck size={18} /> Coverage guidance for families, homeowners, workers, and retirees</p>
          <p><MapPin size={18} /> State-aware plan review and routing</p>
          <p><Award size={18} /> Built for clear, respectful agent follow-up</p>
        </div>
      </section>
    </main>
  );
}
