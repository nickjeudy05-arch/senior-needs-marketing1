import SeoArticlePage from "../../components/SeoArticlePage";
import { seoPages } from "../../seoPages";

const page = seoPages["how-much-life-insurance-do-i-need"];

export const metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: "/life-insurance/how-much-life-insurance-do-i-need" },
};

export default function HowMuchLifeInsurancePage() {
  return <SeoArticlePage page={page} />;
}
