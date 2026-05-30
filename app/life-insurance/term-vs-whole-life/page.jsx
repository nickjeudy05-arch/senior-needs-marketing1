import SeoArticlePage from "../../components/SeoArticlePage";
import { seoPages } from "../../seoPages";

const page = seoPages["term-vs-whole-life"];

export const metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: "/life-insurance/term-vs-whole-life" },
};

export default function TermVsWholeLifePage() {
  return <SeoArticlePage page={page} />;
}
