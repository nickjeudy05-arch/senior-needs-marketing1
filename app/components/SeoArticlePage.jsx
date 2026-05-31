import Link from "next/link";
import { Check, ChevronRight } from "lucide-react";
import SimpleHeader from "./SimpleHeader";

export default function SeoArticlePage({ page }) {
  return (
    <main>
      <SimpleHeader />
      <section className="seo-hero">
        <div>
          <p className="eyebrow">{page.kicker}</p>
          <h1>{page.title}</h1>
          <p>{page.description}</p>
          <div className="subpage-actions">
            <Link className="call-link" href="/#start">
              Match With an Agent
              <ChevronRight size={18} aria-hidden="true" />
            </Link>
            <Link className="ghost-call" href={page.parentHref}>
              Learn About {page.parentLabel}
            </Link>
          </div>
        </div>
        <aside>
          <strong>Quick Review</strong>
          <ul>
            {page.quickFacts.map((fact) => (
              <li key={fact}>
                <Check size={17} aria-hidden="true" />
                {fact}
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="seo-article">
        {page.sections.map((section) => (
          <article key={section.heading}>
            <h2>{section.heading}</h2>
            {section.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.points && (
              <ul>
                {section.points.map((point) => (
                  <li key={point}>
                    <Check size={17} aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </section>

      <section className="seo-faq">
        <div className="section-heading">
          <p className="eyebrow">Common Questions</p>
          <h2>Questions People Ask Before Speaking With a Licensed Agent.</h2>
        </div>
        <div className="faq-list">
          {page.faqs.map((faq) => (
            <article key={faq.question}>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
