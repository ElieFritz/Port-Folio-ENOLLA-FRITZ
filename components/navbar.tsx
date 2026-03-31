"use client";

import { motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Language } from "@/data/site-content";

type NavbarProps = {
  language: Language;
};

const navItems = {
  about: { fr: "À Propos", en: "About" },
  expertise: { fr: "Expertise", en: "Expertise" },
  experience: { fr: "Parcours", en: "Experience" },
  projects: { fr: "Réalisations", en: "Portfolio" },
  contact: { fr: "Contact", en: "Contact" }
};

const sectionIds = ["about", "expertise", "experience", "showcase", "projects", "contact"];

export function Navbar({ language }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 60);
  });

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    const handleIntersect = (id: string) => (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(id);
        }
      });
    };

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        const observer = new IntersectionObserver(handleIntersect(id), {
          rootMargin: "-20% 0px -60% 0px",
          threshold: 0.1
        });
        observer.observe(el);
        observers.push(observer);
      }
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "nav-glass py-3" : "py-5"
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] origin-left bg-accent/70"
        style={{ scaleX }}
      />

      <div className="section-shell flex items-center justify-between">
        <Link
          href={`/?lang=${language}`}
          className="font-display text-lg font-semibold tracking-tight text-white"
        >
          <span className="text-accent">E.</span>Delangue
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {Object.entries(navItems).map(([key, label]) => (
            <Link
              key={key}
              href={`#${key}`}
              className={`nav-link ${activeSection === key ? "active" : ""}`}
              aria-current={activeSection === key ? "true" : undefined}
            >
              {label[language]}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="relative flex h-6 w-6 flex-col items-center justify-center md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <motion.span
            className="absolute block h-0.5 w-6 bg-white/80"
            animate={mobileOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -6 }}
            transition={{ duration: 0.25 }}
          />
          <motion.span
            className="absolute block h-0.5 w-6 bg-white/80"
            animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="absolute block h-0.5 w-6 bg-white/80"
            animate={mobileOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 6 }}
            transition={{ duration: 0.25 }}
          />
        </button>
      </div>

      <motion.nav
        className="nav-glass absolute left-0 right-0 top-full flex flex-col gap-4 px-6 py-6 md:hidden"
        initial={false}
        animate={mobileOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        style={{ overflow: "hidden", pointerEvents: mobileOpen ? "auto" : "none" }}
        transition={{ duration: 0.35 }}
        aria-label="Mobile navigation"
      >
        {Object.entries(navItems).map(([key, label]) => (
          <Link
            key={key}
            href={`#${key}`}
            className={`nav-link text-base ${activeSection === key ? "active" : ""}`}
            onClick={() => setMobileOpen(false)}
            aria-current={activeSection === key ? "true" : undefined}
          >
            {label[language]}
          </Link>
        ))}
      </motion.nav>
    </motion.header>
  );
}
