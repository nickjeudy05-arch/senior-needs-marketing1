const siteUrl = "https://seniorneedsmarketinginsurance.com";

const routes = [
  "",
  "/about",
  "/life-insurance",
  "/life-insurance/term-vs-whole-life",
  "/life-insurance/how-much-life-insurance-do-i-need",
  "/mortgage-protection",
  "/mortgage-protection/what-is-mortgage-protection",
  "/final-expense",
  "/final-expense/burial-insurance-cost",
  "/medicare",
  "/medicare/medicare-advantage-vs-supplement",
  "/privacy",
  "/terms",
  "/sms-terms",
];

export default function sitemap() {
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.includes("privacy") || route.includes("terms") ? 0.3 : 0.8,
  }));
}
