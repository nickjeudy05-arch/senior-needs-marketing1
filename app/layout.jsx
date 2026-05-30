import "./globals.css";

export const metadata = {
  title: "Senior Needs Marketing | National Insurance Brokerage",
  description:
    "Life insurance, mortgage protection, final expense, and Medicare health insurance support for clients in any state.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
