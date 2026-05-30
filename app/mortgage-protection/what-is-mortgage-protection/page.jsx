import SeoArticlePage from "../../components/SeoArticlePage";
import { seoPages } from "../../seoPages";

const page = seoPages["what-is-mortgage-protection"];

export const metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: "/mortgage-protection/what-is-mortgage-protection" },
};

export default function WhatIsMortgageProtectionPage() {
  return <SeoArticlePage page={page} />;
}
