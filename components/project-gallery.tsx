"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useMemo, useState } from "react";
import type { ProjectImage } from "@/data/projects";
import { ImageLightbox } from "@/components/image-lightbox";
import type { Language } from "@/data/site-content";
import { t } from "@/data/site-content";

type ProjectGalleryProps = {
  coverImage: string;
  images: ProjectImage[];
  projectTitle: string;
  language: Language;
};

const labels = {
  eyebrow: {
    fr: "Systeme Galerie",
    en: "Gallery System"
  },
  title: {
    fr: "Couche De Preuve Visuelle",
    en: "Visual Proof Layer"
  },
  description: {
    fr: "Optimise avec `next/image`, zoom au survol, lazy loading, lightbox plein ecran et navigation swipe sur mobile.",
    en: "Optimized with `next/image`, hover zoom, lazy loading, fullscreen lightbox, and swipe navigation on touch devices."
  },
  swipeGallery: {
    fr: "Galerie Swipe",
    en: "Swipe Gallery"
  },
  frames: {
    fr: "vues",
    en: "frames"
  },
  coverCaption: {
    fr: "Visuel hero utilise dans toute l'etude de cas",
    en: "Hero visual used across the case study"
  }
};

export function ProjectGallery({
  coverImage,
  images,
  projectTitle,
  language
}: ProjectGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const galleryImages = useMemo<ProjectImage[]>(
    () => [
      {
        src: coverImage,
        alt: {
          fr: `Visuel de couverture ${projectTitle}`,
          en: `${projectTitle} cover image`
        },
        caption: labels.coverCaption
      },
      ...images
    ],
    [coverImage, images, projectTitle]
  );

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="eyebrow">{t(labels.eyebrow, language)}</p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-white sm:text-3xl">
              {t(labels.title, language)}
            </h2>
          </div>
          <p className="hidden max-w-sm text-right text-sm leading-7 text-slate-300 md:block">
            {t(labels.description, language)}
          </p>
        </div>

        <div className="md:hidden">
          <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-[0.28em] text-slate-400">
            <span>{t(labels.swipeGallery, language)}</span>
            <span>
              {galleryImages.length} {t(labels.frames, language)}
            </span>
          </div>
          <div className="-mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-2">
            {galleryImages.map((image, index) => (
              <button
                key={image.src}
                type="button"
                className="ambient-stroke glass-panel min-w-[82%] snap-center overflow-hidden rounded-[24px] p-2 text-left"
                onClick={() => {
                  setActiveIndex(index);
                  setIsLightboxOpen(true);
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative aspect-[16/10] overflow-hidden rounded-[20px]"
                >
                  <Image
                    src={image.src}
                    alt={t(image.alt, language)}
                    fill
                    sizes="82vw"
                    className="object-cover"
                  />
                </motion.div>
                <p className="px-2 py-3 text-sm font-medium text-slate-200">
                  {t(image.caption, language)}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div className="hidden gap-4 md:grid md:grid-cols-3">
          {galleryImages.map((image, index) => (
            <motion.button
              key={image.src}
              type="button"
              className={`ambient-stroke glass-panel overflow-hidden rounded-[26px] p-2 text-left ${
                index === 0 ? "md:col-span-2" : ""
              }`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: index * 0.06 }}
              whileHover={{ y: -5 }}
              onClick={() => {
                setActiveIndex(index);
                setIsLightboxOpen(true);
              }}
            >
              <div className="relative overflow-hidden rounded-[22px]">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.45 }}
                  className="relative aspect-[16/10]"
                >
                  <Image
                    src={image.src}
                    alt={t(image.alt, language)}
                    fill
                    sizes={
                      index === 0
                        ? "(max-width: 1280px) 66vw, 50vw"
                        : "(max-width: 1280px) 33vw, 25vw"
                    }
                    className="object-cover"
                  />
                </motion.div>
              </div>
              <p className="px-2 pb-1 pt-4 text-sm font-medium text-slate-200">
                {t(image.caption, language)}
              </p>
            </motion.button>
          ))}
        </div>
      </div>

      <ImageLightbox
        images={galleryImages}
        initialIndex={activeIndex}
        open={isLightboxOpen}
        language={language}
        onClose={() => setIsLightboxOpen(false)}
      />
    </>
  );
}
