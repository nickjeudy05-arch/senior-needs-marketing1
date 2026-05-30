import Link from "next/link";
import { ArrowRight, Check, ChevronRight, UserRoundCheck } from "lucide-react";
import SimpleHeader from "./SimpleHeader";
import ProductEducation from "./ProductEducation";

const guideLinks = {
  "life-insurance": [
    ["Term vs Whole Life", "/life-insurance/term-vs-whole-life"],
    ["How Much Life Insurance Do I Need?", "/life-insurance/how-much-life-insurance-do-i-need"],
  ],
  "mortgage-protection": [["What Is Mortgage Protection?", "/mortgage-protection/what-is-mortgage-protection"]],
  "final-expense": [["Burial Insurance Cost", "/final-expense/burial-insurance-cost"]],
  medicare: [["Medicare Advantage vs Supplement", "/medicare/medicare-advantage-vs-supplement"]],
};

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
          {guideLinks[page.slug] && (
            <div className="related-guides">
              <h3>Related Guides</h3>
              {guideLinks[page.slug].map(([label, href]) => (
                <Link href={href} key={href}>
                  {label}
                  <ChevronRight size={15} aria-hidden="true" />
                </Link>
              ))}
            </div>
          )}
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
