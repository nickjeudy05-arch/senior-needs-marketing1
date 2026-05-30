import Link from "next/link";
import { UserRoundCheck } from "lucide-react";
import { navLinks } from "../coverageData";

export default function SimpleHeader() {
  return (
    <header className="topbar">
      <Link href="/" className="wordmark logo-wordmark" aria-label="Senior Needs Marketing home">
        <img src="/snm-logo.svg" alt="Senior Needs Marketing" />
      </Link>
      <nav aria-label="Primary navigation">
        {navLinks.map((link) => (
          <Link href={link.href} key={link.href}>
            {link.label}
          </Link>
        ))}
        <Link href="/#start">
          <UserRoundCheck size={16} aria-hidden="true" />
          Match With Agent
        </Link>
      </nav>
    </header>
  );
}
