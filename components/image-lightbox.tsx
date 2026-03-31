"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { ProjectImage } from "@/data/projects";
import type { Language } from "@/data/site-content";
import { t } from "@/data/site-content";

type ImageLightboxProps = {
  images: ProjectImage[];
  initialIndex: number;
  open: boolean;
  language: Language;
  onClose: () => void;
};

const labels = {
  close: {
    fr: "Fermer",
    en: "Close"
  },
  previousImage: {
    fr: "Image precedente",
    en: "Previous image"
  },
  nextImage: {
    fr: "Image suivante",
    en: "Next image"
  },
  viewImage: {
    fr: "Voir l'image",
    en: "View image"
  }
};

export function ImageLightbox({
  images,
  initialIndex,
  open,
  language,
  onClose
}: ImageLightboxProps) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    setActiveIndex(initialIndex);
  }, [initialIndex, open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((current) => (current - 1 + images.length) % images.length);
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((current) => (current + 1) % images.length);
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [images.length, onClose, open]);

  const activeImage = useMemo(() => images[activeIndex], [activeIndex, images]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 px-4 py-6 backdrop-blur-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-6xl"
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 18 }}
            transition={{ duration: 0.24 }}
            onClick={(event) => event.stopPropagation()}
            onTouchStart={(event) => setTouchStart(event.touches[0]?.clientX ?? null)}
            onTouchEnd={(event) => {
              if (touchStart === null) {
                return;
              }

              const delta = event.changedTouches[0]?.clientX - touchStart;

              if (delta > 45) {
                setActiveIndex((current) => (current - 1 + images.length) % images.length);
              }

              if (delta < -45) {
                setActiveIndex((current) => (current + 1) % images.length);
              }

              setTouchStart(null);
            }}
          >
            <div className="ambient-stroke glass-panel overflow-hidden rounded-[32px] p-3">
              <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-white/10">
                <Image
                  key={activeImage.src}
                  src={activeImage.src}
                  alt={t(activeImage.alt, language)}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 to-transparent px-5 py-5">
                  <p className="text-sm font-medium text-slate-200">
                    {t(activeImage.caption, language)}
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full border border-white/10 bg-slate-950/70 px-3 py-2 text-sm font-semibold text-white"
              aria-label={t(labels.close, language)}
            >
              {t(labels.close, language)}
            </button>

            <button
              type="button"
              onClick={() =>
                setActiveIndex((current) => (current - 1 + images.length) % images.length)
              }
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-slate-950/70 px-3 py-2 text-xl text-white sm:left-4"
              aria-label={t(labels.previousImage, language)}
            >
              &lt;
            </button>

            <button
              type="button"
              onClick={() => setActiveIndex((current) => (current + 1) % images.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-slate-950/70 px-3 py-2 text-xl text-white sm:right-4"
              aria-label={t(labels.nextImage, language)}
            >
              &gt;
            </button>

            <div className="mt-4 flex items-center justify-center gap-2">
              {images.map((image, index) => (
                <button
                  key={image.src}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`h-2.5 rounded-full transition-all ${
                    index === activeIndex
                      ? "w-10 bg-accent"
                      : "w-2.5 bg-white/30 hover:bg-white/50"
                  }`}
                  aria-label={`${t(labels.viewImage, language)} ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
