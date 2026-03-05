"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";
import type { Language } from "@/data/site-content";
import { t } from "@/data/site-content";

type ProjectCardProps = {
  project: Project;
  index: number;
  language: Language;
};

const labels = {
  techMarkers: {
    fr: "axes",
    en: "delivery markers"
  },
  hoverPreview: {
    fr: "Apercu Hover",
    en: "Hover Preview"
  },
  viewCaseStudy: {
    fr: "Voir La Realisation",
    en: "View Work"
  },
  visitSite: {
    fr: "Visiter Le Site",
    en: "Visit Live Site"
  }
};

export function ProjectCard({ project, index, language }: ProjectCardProps) {
  return (
    <motion.article
      className="ambient-stroke glass-panel hero-sheen group relative overflow-hidden rounded-[28px] p-4"
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: index * 0.08 }}
      whileHover={{ y: -8 }}
    >
      <div className="relative overflow-hidden rounded-3xl">
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent" />
        <motion.div whileHover={{ scale: 1.06 }} transition={{ duration: 0.6 }}>
          <Image
            src={project.coverImage}
            alt={`${project.title} cover preview`}
            width={1440}
            height={900}
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="aspect-[5/4] w-full object-cover object-center"
            priority={index < 2}
          />
        </motion.div>
        <motion.div
          className="absolute bottom-4 left-4 z-20 rounded-full border border-white/15 bg-slate-950/70 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-200 backdrop-blur"
          initial={{ opacity: 0.88 }}
          whileHover={{ x: 6, opacity: 1 }}
        >
          {t(labels.hoverPreview, language)}
        </motion.div>
      </div>

      <div className="mt-5 space-y-4 px-2 pb-2">
        <div className="flex items-center justify-between gap-4">
          <span className="eyebrow">{t(project.category, language)}</span>
          <span className="text-xs font-medium text-slate-400">
            {project.technologies.length} {t(labels.techMarkers, language)}
          </span>
        </div>

        <div className="space-y-3">
          <Link
            href={`/projects/${project.slug}?lang=${language}`}
            className="inline-flex items-center gap-2 font-display text-2xl font-semibold text-white transition-colors duration-300 hover:text-cyan-200"
          >
            {project.title}
            <span aria-hidden="true">-&gt;</span>
          </Link>
          <p className="text-sm leading-7 text-slate-300">
            {t(project.shortDescription, language)}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <span
              key={technology}
              className="rounded-full border border-cyan-300/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200"
            >
              {technology}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href={`/projects/${project.slug}?lang=${language}`}
            className="rounded-full bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950 transition-transform duration-300 hover:-translate-y-0.5"
          >
            {t(labels.viewCaseStudy, language)}
          </Link>
          <Link
            href={project.website}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white transition-colors duration-300 hover:border-cyan-300/40 hover:text-cyan-200"
          >
            {t(labels.visitSite, language)}
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
