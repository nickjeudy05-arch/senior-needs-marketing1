import SeoArticlePage from "../../components/SeoArticlePage";
import { seoPages } from "../../seoPages";

const page = seoPages["medicare-advantage-vs-supplement"];

export const metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: "/medicare/medicare-advantage-vs-supplement" },
};

export default function MedicareAdvantageVsSupplementPage() {
  return <SeoArticlePage page={page} />;
}
