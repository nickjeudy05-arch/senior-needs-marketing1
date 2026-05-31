import Link from "next/link";
import { Award, Check, Languages, ShieldCheck, UserRoundCheck } from "lucide-react";
import SimpleHeader from "../components/SimpleHeader";

export const metadata = {
  title: "Meet Our Agents | Senior Needs Marketing",
  description:
    "Meet Senior Needs Marketing agents who support life insurance, health insurance, Medicare, final expense, and Spanish-speaking clients.",
};

const agents = [
  {
    name: "Denice Jeudy",
    image: "/agents/denice-jeudy.png",
    role: "Licensed Life and Health Insurance Agent",
    credentials: ["Selling insurance since 2008", "Life and Health licensed", "Spanish-speaking client support"],
    bio: [
      "Denice Jeudy has been helping clients understand insurance options since 2008.",
      "She is licensed in Life and Health insurance and brings a patient, service-focused approach to every conversation.",
      "Denice works closely with Spanish-speaking clients who want clear explanations without pressure or confusion.",
      "Her experience helps families compare protection for income, health needs, final costs, and long-term planning goals.",
      "She focuses on making each client feel heard, prepared, and confident before moving forward.",
    ],
  },
  {
    name: "Robert Hernandez",
    image: "/agents/robert-hernandez.png",
    role: "Licensed Life Insurance Agent",
    credentials: ["Life insurance licensed", "Final expense experience", "Spanish-speaking client support"],
    bio: [
      "Robert Hernandez is licensed in Life Insurance and works with clients who want practical protection for their families.",
      "He has experience with final expense products and understands how important it is to make end-of-life planning clear and respectful.",
      "Robert also supports Spanish-speaking clients who prefer guidance in a more comfortable and familiar conversation.",
      "His approach is centered on helping people compare coverage amounts, monthly budget, beneficiaries, and carrier options.",
      "He helps clients move from uncertainty to a plan that feels organized and easier to understand.",
    ],
  },
  {
    name: "Jaden Jeudy",
    image: "/agents/jaden-jeudy.png",
    role: "Licensed Life and Health Insurance Agent",
    credentials: ["Life and Health licensed", "Modern client support", "Protection planning focus"],
    bio: [
      "Jaden Jeudy is licensed in Life and Health insurance and supports clients who want a modern, straightforward insurance review.",
      "He helps clients think through life insurance, health coverage questions, beneficiary planning, and the reason behind each coverage decision.",
      "Jaden is focused on making insurance feel less overwhelming by explaining options in clear, direct language.",
      "He works with families, working adults, homeowners, and individuals who are trying to protect people they care about.",
      "His goal is to help each client leave the conversation with a better understanding of what coverage may fit their needs.",
    ],
  },
];

export default function AgentsPage() {
  return (
    <main>
      <SimpleHeader />
      <section className="agents-hero">
        <div>
          <p className="eyebrow">Meet Our Agents</p>
          <h1>Experienced Guidance From the Senior Needs Marketing Brokerage.</h1>
          <p>
            Senior Needs Marketing pairs clients with licensed agents who can
            review life insurance, health insurance, Medicare, mortgage
            protection, and final expense needs. Each request is handled with
            clear education, respectful follow-up, and attention to the
            client&apos;s state, goals, language preference, and budget.
          </p>
          <div className="subpage-actions">
            <Link className="call-link" href="/#start">
              <UserRoundCheck size={18} aria-hidden="true" />
              Match With an Agent
            </Link>
            <a className="ghost-call" href="tel:6106091653">
              Call 610-609-1653
            </a>
          </div>
        </div>
        <article className="featured-agent">
          <img src="/agents/bernie-jeudy.png" alt="Bernie Jeudy" />
          <div>
            <p className="eyebrow">Featured Agent</p>
            <h2>Bernie Jeudy</h2>
            <span>Licensed Since 2005 | Life and Health Insurance | Medicare | Final Expense</span>
            <p>
              Bernie Jeudy has been licensed since 2005 and brings extensive
              experience across Life and Health insurance, Medicare, and final
              expense planning. He helps clients understand how coverage choices
              affect families, budgets, beneficiaries, and long-term protection
              goals. Bernie is known for taking time to explain options clearly
              before a client makes a decision. His background allows him to
              support people at many stages of life, from family protection to
              retirement health coverage. As part of Senior Needs Marketing, he
              helps guide the brokerage&apos;s client-first approach to insurance
              conversations.
            </p>
          </div>
        </article>
      </section>

      <section className="agents-section">
        <div className="section-heading">
          <p className="eyebrow">Brokerage Team</p>
          <h2>Agents Who Help Clients Understand the Next Step.</h2>
          <p>
            The brokerage is built around clear conversations, licensed review,
            and matching each client with support that fits their coverage need.
          </p>
        </div>
        <div className="agents-grid">
          {agents.map((agent) => (
            <article className="agent-card" key={agent.name}>
              <img src={agent.image} alt={agent.name} />
              <div className="agent-card-body">
                <h3>{agent.name}</h3>
                <strong>{agent.role}</strong>
                <div className="agent-credentials">
                  {agent.credentials.map((credential) => (
                    <span key={credential}>
                      <Check size={15} aria-hidden="true" />
                      {credential}
                    </span>
                  ))}
                </div>
                {agent.bio.map((sentence) => (
                  <p key={sentence}>{sentence}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="agent-values">
        <article>
          <ShieldCheck size={28} aria-hidden="true" />
          <h3>Licensed Review</h3>
          <p>Clients are guided toward coverage conversations with licensed agents who understand product fit and eligibility.</p>
        </article>
        <article>
          <Languages size={28} aria-hidden="true" />
          <h3>Spanish-Speaking Support</h3>
          <p>Spanish-speaking clients can be paired with agents who can make the insurance conversation clearer and more comfortable.</p>
        </article>
        <article>
          <Award size={28} aria-hidden="true" />
          <h3>Product Experience</h3>
          <p>The team supports conversations across life insurance, health coverage, Medicare, final expense, and family protection needs.</p>
        </article>
      </section>
    </main>
  );
}
