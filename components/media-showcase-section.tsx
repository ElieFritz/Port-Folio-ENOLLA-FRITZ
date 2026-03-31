"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import type { Language, ShowcaseItem, ShowcaseSection } from "@/data/site-content";
import { t } from "@/data/site-content";

type MediaShowcaseSectionProps = {
  section: ShowcaseSection;
  language: Language;
  standalone?: boolean;
};

const labels = {
  openLink: {
    fr: "Ouvrir",
    en: "Open"
  }
};

function getYouTubeEmbedUrl(src: string) {
  if (!src.includes("://") && src.trim().length > 0) {
    return `https://www.youtube.com/embed/${src.trim()}?rel=0`;
  }

  try {
    const url = new URL(src);

    if (url.hostname.includes("youtu.be")) {
      const videoId = url.pathname.replace(/^\/+/, "");
      return videoId
        ? `https://www.youtube.com/embed/${videoId}?rel=0`
        : src;
    }

    if (url.pathname.includes("/embed/")) {
      return src;
    }

    const videoId =
      url.searchParams.get("v") ??
      url.pathname
        .split("/")
        .filter(Boolean)
        .pop();

    return videoId
      ? `https://www.youtube.com/embed/${videoId}?rel=0`
      : src;
  } catch {
    return src;
  }
}

function getVimeoEmbedUrl(src: string) {
  if (!src.includes("://") && src.trim().length > 0) {
    return `https://player.vimeo.com/video/${src.trim()}`;
  }

  try {
    const url = new URL(src);

    if (url.hostname.includes("player.vimeo.com")) {
      return src;
    }

    const videoId = url.pathname
      .split("/")
      .filter(Boolean)
      .pop();

    return videoId
      ? `https://player.vimeo.com/video/${videoId}`
      : src;
  } catch {
    return src;
  }
}

function renderShowcaseMedia(item: ShowcaseItem, language: Language) {
  if (item.video) {
    const mediaTitle = t(item.video.title ?? item.title, language);

    if (item.video.kind === "mp4") {
      return (
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.35 }}
          className="relative"
        >
          <video
            controls
            preload="metadata"
            playsInline
            poster={item.video.poster?.src}
            className="aspect-[5/4] w-full bg-slate-950 object-contain object-center"
          >
            <source src={item.video.src} type="video/mp4" />
            {mediaTitle}
          </video>
        </motion.div>
      );
    }

    const embedUrl =
      item.video.kind === "youtube"
        ? getYouTubeEmbedUrl(item.video.src)
        : getVimeoEmbedUrl(item.video.src);

    return (
      <motion.div
        whileHover={{ scale: 1.015 }}
        transition={{ duration: 0.35 }}
        className="relative aspect-[5/4] w-full overflow-hidden rounded-2xl bg-slate-950"
      >
        <iframe
          src={embedUrl}
          title={mediaTitle}
          className="absolute inset-0 h-full w-full"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </motion.div>
    );
  }

  if (item.image) {
    return (
      <>
        <motion.div
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <Image
            src={item.image.src}
            alt={t(item.image.alt, language)}
            width={1600}
            height={1100}
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="aspect-[5/4] w-full object-cover object-center"
          />
        </motion.div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent" />
      </>
    );
  }

  return <div className="aspect-[5/4] w-full bg-slate-950" />;
}

export function MediaShowcaseSection({
  section,
  language,
  standalone = true
}: MediaShowcaseSectionProps) {
  const grid = (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {section.items.map((item, index) => (
        <Reveal
          key={`${item.video?.src ?? item.image?.src ?? item.title.en}-${index}`}
          delay={index * 0.07}
        >
          <motion.article
            className="ambient-stroke glass-panel group relative h-full overflow-hidden rounded-3xl p-3"
            whileHover={{ y: -6, rotateX: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative overflow-hidden rounded-3xl border border-white/10">
              {renderShowcaseMedia(item, language)}
              {item.tag ? (
                <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-slate-950/70 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-accent backdrop-blur">
                  {t(item.tag, language)}
                </div>
              ) : null}
            </div>

            <div className="space-y-4 px-3 pb-3 pt-5">
              <h3 className="font-display text-2xl font-semibold text-white">
                {t(item.title, language)}
              </h3>
              <p className="text-sm leading-7 text-slate-300">
                {t(item.description, language)}
              </p>
              {item.link ? (
                <Link
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white transition-colors duration-300 hover:border-accent/40 hover:text-accent"
                >
                  {t(labels.openLink, language)}
                </Link>
              ) : null}
            </div>
          </motion.article>
        </Reveal>
      ))}
    </div>
  );

  if (!standalone) {
    return grid;
  }

  return (
    <section className="section-shell section-break mt-16">
      <Reveal>
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">{t(section.eyebrow, language)}</p>
            <h2 className="mt-3 max-w-3xl font-display text-3xl font-semibold text-white sm:text-5xl">
              {t(section.title, language)}
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
            {t(section.description, language)}
          </p>
        </div>
      </Reveal>

      {grid}
    </section>
  );
}
