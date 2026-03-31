"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import type { Language } from "@/data/site-content";

type ContactSectionProps = {
  language: Language;
  contactEmail: string;
};

const labels = {
  eyebrow: { fr: "Contact", en: "Contact" },
  title: { fr: "Travaillons Ensemble", en: "Let's Work Together" },
  description: {
    fr: "Vous avez un projet, une opportunité ou simplement envie d'échanger ? N'hésitez pas à me contacter.",
    en: "Have a project, an opportunity, or just want to connect? Feel free to reach out."
  },
  cta: { fr: "Envoyer Un Email", en: "Send An Email" },
  linkedin: { fr: "Voir Mon LinkedIn", en: "View My LinkedIn" },
  phone: { fr: "Appeler", en: "Call" },
  cv: { fr: "Télécharger Mon CV", en: "Download My CV" }
};

export function ContactSection({ language, contactEmail }: ContactSectionProps) {
  return (
    <section id="contact" className="section-shell section-break mt-16">
      <Reveal>
        <div className="ambient-stroke glass-panel relative overflow-hidden rounded-[32px] p-8 sm:p-12 lg:p-16">
          <div className="relative z-10 mx-auto max-w-2xl text-center">
            <p className="eyebrow">{labels.eyebrow[language]}</p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-white sm:text-5xl">
              {labels.title[language]}
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-300 sm:text-lg">
              {labels.description[language]}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href={`mailto:${contactEmail}`}
                className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-slate-950 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow"
              >
                {labels.cta[language]}
              </Link>
              <Link
                href="https://www.linkedin.com/in/fritzenolla/"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:border-accent/40 hover:text-accent"
              >
                {labels.linkedin[language]}
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-6">
              <Link
                href="tel:+237655750746"
                className="text-sm text-slate-300 transition-colors duration-300 hover:text-accent"
              >
                +237 655 750 746
              </Link>
              <span className="hidden h-4 w-px bg-white/10 sm:block" />
              <Link
                href="/documents/enolla-delangue-cv.html"
                target="_blank"
                className="text-sm text-slate-300 transition-colors duration-300 hover:text-accent"
              >
                {labels.cv[language]}
              </Link>
            </div>
          </div>

          {/* Background glow */}
          <motion.div
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              background: "radial-gradient(ellipse at 50% 50%, rgba(212, 175, 85, 0.12), transparent 70%)"
            }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </Reveal>
    </section>
  );
}
