"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronRight, Menu, UserRoundCheck, X } from "lucide-react";
import { navLinks } from "../coverageData";

const productNavLinks = navLinks.filter((link) =>
  ["/life-insurance", "/mortgage-protection", "/final-expense", "/medicare"].includes(link.href),
);

export default function SimpleHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

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
      <button
        className="menu-button"
        aria-expanded={menuOpen}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        type="button"
        onClick={() => setMenuOpen((value) => !value)}
      >
        {menuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>
      {menuOpen && (
        <nav className="mobile-dropdown" aria-label="Mobile navigation">
          {productNavLinks.map((link) => (
            <Link href={link.href} key={link.href} onClick={() => setMenuOpen(false)}>
              {link.label}
              <ChevronRight size={15} aria-hidden="true" />
            </Link>
          ))}
          <Link href="/#start" onClick={() => setMenuOpen(false)}>
            Match With Agent
            <ChevronRight size={15} aria-hidden="true" />
          </Link>
        </nav>
      )}
    </header>
  );
}
