import SeoArticlePage from "../../components/SeoArticlePage";
import { seoPages } from "../../seoPages";

const page = seoPages["burial-insurance-cost"];

export const metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: "/final-expense/burial-insurance-cost" },
};

export default function BurialInsuranceCostPage() {
  return <SeoArticlePage page={page} />;
}
