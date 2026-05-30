import Link from "next/link";
import { ArrowRight, Check, UserRoundCheck } from "lucide-react";
import SimpleHeader from "./SimpleHeader";
import ProductEducation from "./ProductEducation";

export default function CoveragePage({ page }) {
  return (
    <main>
      <SimpleHeader />
      <section className="subpage-hero">
        <div>
          <p className="eyebrow">Senior Needs Marketing</p>
          <h1>{page.title}</h1>
          <p>{page.kicker}</p>
          <div className="subpage-actions">
            <Link href="/#start" className="primary-submit">
              Start My Review <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link href="/#start" className="ghost-call">
              <UserRoundCheck size={18} aria-hidden="true" /> Match With an Agent
            </Link>
          </div>
        </div>
        <img src={page.image} alt={`${page.title} guidance`} />
      </section>

      <ProductEducation page={page} />

      <section className="detail-page-grid">
        <article>
          <h2>How this coverage works</h2>
          {page.sections.map((section) => (
            <p key={section}>{section}</p>
          ))}
        </article>
        <aside>
          <h3>Good fit when you want</h3>
          {page.bullets.map((bullet) => (
            <p className="check-line" key={bullet}>
              <Check size={18} aria-hidden="true" /> {bullet}
            </p>
          ))}
        </aside>
      </section>
    </main>
  );
}
