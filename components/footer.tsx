"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Language } from "@/data/site-content";

type FooterProps = {
  language: Language;
  contactEmail: string;
};

const footerLabels = {
  brand: {
    fr: "Portfolio Exécutif",
    en: "Executive Portfolio"
  },
  tagline: {
    fr: "Stratégie marketing, communication corporate & croissance B2B.",
    en: "Marketing strategy, corporate communication & B2B growth."
  },
  navigation: {
    fr: "Navigation",
    en: "Navigation"
  },
  contact: {
    fr: "Contact",
    en: "Contact"
  },
  rights: {
    fr: "Tous droits réservés.",
    en: "All rights reserved."
  }
};

const footerNav = [
  { label: { fr: "À Propos", en: "About" }, href: "#about" },
  { label: { fr: "Expertise", en: "Expertise" }, href: "#expertise" },
  { label: { fr: "Parcours", en: "Experience" }, href: "#experience" },
  { label: { fr: "Réalisations", en: "Showcase" }, href: "#showcase" },
  { label: { fr: "Projets", en: "Projects" }, href: "#projects" },
  { label: { fr: "Contact", en: "Contact" }, href: "#contact" }
];

export function Footer({ language, contactEmail }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="footer-gradient relative mt-24 overflow-hidden">
      <div className="section-shell pb-8 pt-20">
        <motion.div
          className="grid gap-12 md:grid-cols-3"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Brand column */}
          <div className="space-y-4">
            <p className="font-display text-xl font-semibold text-white">
              <span className="text-accent">E.</span>Delangue
            </p>
            <p className="text-sm leading-7 text-slate-300">
              {footerLabels.tagline[language]}
            </p>
          </div>

          {/* Nav column */}
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              {footerLabels.navigation[language]}
            </p>
            <div className="flex flex-col gap-3">
              {footerNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-slate-300 transition-colors duration-300 hover:text-accent"
                >
                  {item.label[language]}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact column */}
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              {footerLabels.contact[language]}
            </p>
            <div className="flex flex-col gap-3">
              <Link
                href={`mailto:${contactEmail}`}
                className="text-sm text-slate-300 transition-colors duration-300 hover:text-accent"
              >
                {contactEmail}
              </Link>
              <Link
                href="tel:+237655750746"
                className="text-sm text-slate-300 transition-colors duration-300 hover:text-accent"
              >
                +237 655 750 746
              </Link>
              <Link
                href="https://www.linkedin.com/in/fritzenolla/"
                target="_blank"
                rel="noreferrer"
                className="text-sm text-slate-300 transition-colors duration-300 hover:text-accent"
              >
                LinkedIn
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div className="mt-16 border-t border-white/[0.06] pt-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-slate-400">
              &copy; {year} Enolla Elie Fritz Delangue. {footerLabels.rights[language]}
            </p>
            <p className="eyebrow text-[0.6rem]">
              {footerLabels.brand[language]}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
