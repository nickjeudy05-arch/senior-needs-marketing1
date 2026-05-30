import { ArrowRight, BadgeCheck, BookOpenCheck, CheckCircle2, CircleDollarSign, ClipboardList } from "lucide-react";

const slideIcons = [BookOpenCheck, CircleDollarSign, BadgeCheck, ClipboardList, CheckCircle2];

export default function ProductEducation({ page }) {
  const education = page.education;
  if (!education) return null;

  return (
    <section className="education-section">
      <div className="education-intro">
        <p className="eyebrow">Coverage Education</p>
        <h2>{education.title}</h2>
        <p>{education.summary}</p>
        <div className="education-pills">
          {education.highlights.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>

      <div className={`education-board ${page.slug}`}>
        <div className="education-board-head">
          <span>Product Guide</span>
          <strong>{page.title}</strong>
        </div>

        <div className="education-slides">
          {education.slides.map((slide, index) => {
            const Icon = slideIcons[index % slideIcons.length];
            return (
              <article className="education-slide" key={slide.title}>
                <div className="slide-marker">
                  <Icon size={22} aria-hidden="true" />
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>
                <div>
                  <h3>{slide.title}</h3>
                  <p>{slide.body}</p>
                  <ul>
                    {slide.points.map((point) => (
                      <li key={point}>
                        <CheckCircle2 size={16} aria-hidden="true" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>

        <div className="product-type-grid">
          {education.productTypes.map((type) => (
            <article key={type.name}>
              <span>{type.label}</span>
              <h3>{type.name}</h3>
              <p>{type.description}</p>
            </article>
          ))}
        </div>

        <div className="education-cta">
          <div>
            <strong>{education.takeaway}</strong>
            <p>{education.agentNote}</p>
          </div>
          <a href="/#start">
            Start My Review <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
