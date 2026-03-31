"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { MediaShowcaseSection } from "@/components/media-showcase-section";
import type { Language, ShowcaseSection } from "@/data/site-content";
import { t } from "@/data/site-content";

type MediaShowcaseTabsProps = {
  sections: ShowcaseSection[];
  language: Language;
};

const sectionLabel = {
  eyebrow: { fr: "Réalisations", en: "Showcase" },
  title: { fr: "Portfolio De Réalisations", en: "Work Portfolio" },
  description: {
    fr: "Explorez mes réalisations par catégorie : pages gérées, supports visuels, vidéos, contrats, formations et systèmes.",
    en: "Explore my work by category: managed pages, visual assets, videos, contracts, training, and systems."
  }
};

export function MediaShowcaseTabs({ sections, language }: MediaShowcaseTabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (sections.length === 0) return null;

  return (
    <section id="showcase" className="section-shell section-break mt-16">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow">{t(sectionLabel.eyebrow, language)}</p>
          <h2 className="mt-3 max-w-3xl font-display text-3xl font-semibold text-white sm:text-5xl">
            {t(sectionLabel.title, language)}
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
          {t(sectionLabel.description, language)}
        </p>
      </div>

      {/* Tab bar */}
      <div className="mb-8 flex flex-wrap gap-2">
        {sections.map((section, index) => (
          <button
            key={`tab-${t(section.eyebrow, language)}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
              activeIndex === index
                ? "bg-accent text-slate-950"
                : "border border-white/10 bg-white/[0.04] text-slate-300 hover:border-accent/30 hover:text-white"
            }`}
          >
            {t(section.eyebrow, language)}
            {activeIndex === index && (
              <motion.div
                className="absolute inset-0 rounded-full bg-accent"
                layoutId="showcase-tab-indicator"
                style={{ zIndex: -1 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
        >
          <MediaShowcaseSection
            section={sections[activeIndex]}
            language={language}
            standalone={false}
          />
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
