import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import type {
  AboutSection as AboutSectionContent,
  ContentImage,
  Language
} from "@/data/site-content";
import { t } from "@/data/site-content";

type AboutSectionProps = {
  section: AboutSectionContent;
  language: Language;
  profileImage?: ContentImage;
};

export function AboutSection({
  section,
  language,
  profileImage
}: AboutSectionProps) {
  const displayImage = section.image ?? profileImage;

  return (
    <section className="section-shell mt-14">
      <Reveal>
        <div className="ambient-stroke glass-panel hero-sheen relative overflow-hidden rounded-[34px] p-5 sm:p-7 lg:p-8">
          <div className="floating-orb left-[-2rem] top-[20%] h-24 w-24" />
          <div className="floating-orb floating-orb--slow right-[12%] top-[-2rem] h-32 w-32" />

          <div className="grid gap-6 lg:grid-cols-[0.42fr_0.58fr]">
            <div className="space-y-5">
              {displayImage ? (
                <div className="ambient-stroke glass-panel breathing-panel relative overflow-hidden rounded-[28px] p-3">
                  <div className="relative overflow-hidden rounded-[22px] border border-white/10">
                    <Image
                      src={displayImage.src}
                      alt={t(displayImage.alt, language)}
                      width={900}
                      height={1100}
                      sizes="(max-width: 1024px) 100vw, 36vw"
                      className="aspect-[4/5] w-full object-cover object-center"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent px-5 py-5">
                      <p className="eyebrow">{t(section.eyebrow, language)}</p>
                      <p className="mt-2 font-display text-xl font-semibold text-white sm:text-2xl">
                        {t(section.title, language)}
                      </p>
                    </div>
                  </div>
                </div>
              ) : null}

              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                {section.contactPoints.map((item) => {
                  const content = (
                    <div className="rounded-[22px] border border-white/10 bg-white/[0.04] px-4 py-4 transition-colors duration-300 hover:border-cyan-300/30">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-200">
                        {t(item.label, language)}
                      </p>
                      <p className="mt-3 text-sm font-medium leading-7 text-slate-200">
                        {item.value}
                      </p>
                    </div>
                  );

                  return item.href ? (
                    <Link key={`${item.value}-${item.href}`} href={item.href}>
                      {content}
                    </Link>
                  ) : (
                    <div key={item.value}>{content}</div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <p className="eyebrow">{t(section.eyebrow, language)}</p>
                <h2 className="mt-3 max-w-3xl font-display text-3xl font-semibold text-white sm:text-5xl">
                  {t(section.title, language)}
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-8 text-slate-300 sm:text-base">
                  {t(section.description, language)}
                </p>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">
                <p className="text-base leading-8 text-slate-200 sm:text-lg">
                  {t(section.bio, language)}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                  {language === "fr" ? "Marqueurs De Profil" : "Profile Markers"}
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {section.badges.map((badge) => (
                    <span
                      key={badge.en}
                      className="soft-pulse rounded-full border border-cyan-300/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100"
                    >
                      {t(badge, language)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
