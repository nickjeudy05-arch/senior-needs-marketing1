import "./globals.css";

const siteUrl = "https://seniorneedsmarketinginsurance.com";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Senior Needs Marketing | Life Insurance, Mortgage Protection, Final Expense & Medicare",
    template: "%s | Senior Needs Marketing",
  },
  description:
    "Compare life insurance, mortgage protection, final expense, and Medicare health insurance options with licensed agent support from Senior Needs Marketing.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Senior Needs Marketing",
    description:
      "Educational insurance guidance and licensed agent appointment support for life insurance, mortgage protection, final expense, and Medicare coverage.",
    url: siteUrl,
    siteName: "Senior Needs Marketing",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    name: "Senior Needs Marketing",
    url: siteUrl,
    telephone: "+1-610-609-1653",
    areaServed: "United States",
    description:
      "Insurance brokerage support for life insurance, mortgage protection, final expense, and Medicare health insurance reviews.",
    sameAs: [],
    serviceType: [
      "Life Insurance",
      "Mortgage Protection",
      "Final Expense Insurance",
      "Medicare Health Insurance",
    ],
  };

  return (
    <html lang="en">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
