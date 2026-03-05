import Image from "next/image";
import Link from "next/link";
import { AboutSection } from "@/components/about-section";
import { LanguageSwitcher } from "@/components/language-switcher";
import { MediaShowcaseSection } from "@/components/media-showcase-section";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import type { ShowcaseSection } from "@/data/site-content";
import { getLanguage, t } from "@/data/site-content";
import { getPortfolioContent } from "@/lib/portfolio-content";

type HomePageProps = {
  searchParams?: {
    lang?: string | string[];
  };
};

export const dynamic = "force-dynamic";

function normalizeExternalLink(value?: string) {
  if (!value || !value.startsWith("http")) {
    return null;
  }

  try {
    const url = new URL(value);
    url.hash = "";
    if (url.pathname.endsWith("/")) {
      url.pathname = url.pathname.slice(0, -1);
    }
    return url.toString().toLowerCase();
  } catch {
    return value.trim().toLowerCase();
  }
}

function sanitize(value: string) {
  return value.trim().toLowerCase();
}

function dedupeShowcaseSection(
  section: ShowcaseSection | undefined,
  state: {
    usedMedia: Set<string>;
    usedLinks: Set<string>;
    usedTitles: Set<string>;
  },
  excludedLinks?: Set<string>
) {
  if (!section) {
    return null;
  }

  const uniqueItems = section.items.filter((item) => {
    const titleKey = `${sanitize(item.title.fr)}::${sanitize(item.title.en)}`;
    const mediaKey = item.video
      ? `video:${sanitize(item.video.kind)}:${sanitize(item.video.src)}`
      : item.image
        ? `image:${sanitize(item.image.src)}`
        : null;
    const linkKey = normalizeExternalLink(item.link);

    if (state.usedTitles.has(titleKey)) {
      return false;
    }

    if (mediaKey && state.usedMedia.has(mediaKey)) {
      return false;
    }

    if (linkKey && (state.usedLinks.has(linkKey) || excludedLinks?.has(linkKey))) {
      return false;
    }

    state.usedTitles.add(titleKey);

    if (mediaKey) {
      state.usedMedia.add(mediaKey);
    }

    if (linkKey) {
      state.usedLinks.add(linkKey);
    }

    return true;
  });

  if (uniqueItems.length === 0) {
    return null;
  }

  return {
    ...section,
    items: uniqueItems
  };
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const language = getLanguage(searchParams?.lang);
  const content = await getPortfolioContent();
  const { contactEmail, homePageContent, projects } = content;
  const portfolioLabel =
    language === "fr" ? "Portfolio Executif" : "Executive Portfolio";
  const certificationCtaLabel =
    language === "fr" ? "Voir Le Certificat" : "View Certificate";
  const showcaseDedupState = {
    usedMedia: new Set<string>(),
    usedLinks: new Set<string>(),
    usedTitles: new Set<string>()
  };
  const projectLinks = new Set(
    projects
      .map((project) => normalizeExternalLink(project.website))
      .filter((link): link is string => link !== null)
  );
  const managedPagesSection = dedupeShowcaseSection(
    homePageContent.managedPagesSection,
    showcaseDedupState,
    projectLinks
  );
  const flyersSection = dedupeShowcaseSection(
    homePageContent.flyersSection,
    showcaseDedupState
  );
  const motionSection = dedupeShowcaseSection(
    homePageContent.motionSection,
    showcaseDedupState
  );
  const contractProofSection = dedupeShowcaseSection(
    homePageContent.contractProofSection,
    showcaseDedupState
  );
  const trainingSessionSection = dedupeShowcaseSection(
    homePageContent.trainingSessionSection,
    showcaseDedupState
  );
  const systemsNetworkSection = dedupeShowcaseSection(
    homePageContent.systemsNetworkSection,
    showcaseDedupState
  );

  return (
    <main className="pb-20 pt-6 sm:pt-10">
      <section className="section-shell">
        <div className="ambient-stroke glass-panel hero-sheen relative overflow-hidden rounded-[36px] px-6 py-8 sm:px-10 sm:py-12 lg:px-14 lg:py-16">
          <div className="floating-orb left-[-4rem] top-[8rem] h-36 w-36" />
          <div className="floating-orb floating-orb--slow right-[8%] top-[-2rem] h-44 w-44" />
          <div className="floating-orb bottom-[-3rem] right-[22%] h-28 w-28" />
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <span className="eyebrow">{portfolioLabel}</span>
            <LanguageSwitcher language={language} pathname="/" />
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <Reveal>
              <div className="space-y-7">
                <div className="space-y-5">
                  <h1 className="kinetic-title max-w-4xl font-display text-6xl font-semibold tracking-[-0.05em] text-white sm:text-8xl lg:text-[7rem]">
                    {t(homePageContent.hero.eyebrow, language)}
                  </h1>
                  <p className="max-w-3xl text-2xl font-semibold leading-tight text-slate-100 sm:text-3xl">
                    {t(homePageContent.hero.title, language)}
                  </p>
                  <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                    {t(homePageContent.hero.description, language)}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="#projects"
                    className="rounded-full bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    {t(homePageContent.hero.primaryCta, language)}
                  </Link>
                  <Link
                    href={`mailto:${contactEmail}`}
                    className="rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:border-cyan-300/40 hover:text-cyan-200"
                  >
                    {t(homePageContent.hero.secondaryCta, language)}
                  </Link>
                </div>
                {homePageContent.hero.quickLinks &&
                homePageContent.hero.quickLinks.length > 0 ? (
                  <div className="flex flex-wrap gap-3">
                    {homePageContent.hero.quickLinks.map((link) => {
                      const isExternal = link.href.startsWith("http");
                      const isDownload = link.href.toLowerCase().endsWith(".pdf");

                      return (
                        <Link
                          key={`${link.href}-${link.label.en}`}
                          href={link.href}
                          target={isExternal ? "_blank" : undefined}
                          rel={isExternal ? "noreferrer" : undefined}
                          download={isDownload ? true : undefined}
                          className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-5 py-3 text-sm font-semibold text-cyan-100 transition-colors duration-300 hover:bg-cyan-300/20"
                        >
                          {t(link.label, language)}
                        </Link>
                      );
                    })}
                  </div>
                ) : null}
                {homePageContent.hero.proofMetrics &&
                homePageContent.hero.proofMetrics.length > 0 ? (
                  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    {homePageContent.hero.proofMetrics.map((metric) => (
                      <div
                        key={`${metric.value}-${metric.label.en}`}
                        className="rounded-[22px] border border-white/10 bg-white/[0.04] px-4 py-4"
                      >
                        <p className="font-display text-3xl font-semibold text-cyan-200">
                          {metric.value}
                        </p>
                        <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-300">
                          {t(metric.label, language)}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </Reveal>

            <Reveal delay={0.12}>
                <div className="space-y-4">
                  {homePageContent.hero.profileImage ? (
                    <div className="ambient-stroke glass-panel breathing-panel hero-sheen relative overflow-hidden rounded-[28px] p-3">
                      <div className="relative overflow-hidden rounded-[22px] border border-white/10">
                        <Image
                        src={homePageContent.hero.profileImage.src}
                        alt={t(homePageContent.hero.profileImage.alt, language)}
                        width={900}
                        height={1100}
                        sizes="(max-width: 1024px) 100vw, 32vw"
                        className="aspect-[4/5] w-full object-cover object-center"
                        priority
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent px-5 py-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200">
                          {portfolioLabel}
                        </p>
                        <p className="mt-2 text-base font-semibold text-white">
                          {t(homePageContent.hero.eyebrow, language)}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : null}

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                  {homePageContent.supportCards.map((card) => (
                    <div
                      key={card.title.en}
                      className="ambient-stroke hero-sheen relative rounded-[28px] border border-white/10 bg-white/5 p-6"
                    >
                      <p className="eyebrow">{t(card.title, language)}</p>
                      <p className="mt-3 text-sm leading-7 text-slate-300">
                        {t(card.description, language)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {homePageContent.aboutSection ? (
        <AboutSection
          section={homePageContent.aboutSection}
          language={language}
          profileImage={homePageContent.hero.profileImage}
        />
      ) : null}

      <section className="section-shell mt-8 grid gap-4 md:grid-cols-3">
        {homePageContent.strategicSignals.map((signal, index) => (
          <Reveal key={signal.en} delay={index * 0.08}>
            <div className="ambient-stroke soft-pulse rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">
                0{index + 1}
              </p>
              <p className="mt-4 text-base leading-7 text-slate-200">
                {t(signal, language)}
              </p>
            </div>
          </Reveal>
        ))}
      </section>

      <section className="section-shell mt-16">
        <Reveal>
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">{t(homePageContent.expertise.eyebrow, language)}</p>
              <h2 className="mt-3 max-w-3xl font-display text-3xl font-semibold text-white sm:text-5xl">
                {t(homePageContent.expertise.title, language)}
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
              {t(homePageContent.expertise.description, language)}
            </p>
          </div>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
          {homePageContent.expertise.items.map((item, index) => (
            <Reveal key={item.title.en} delay={index * 0.06}>
              <div className="ambient-stroke glass-panel hero-sheen relative h-full rounded-[28px] p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200">
                  0{index + 1}
                </p>
                <h3 className="mt-4 font-display text-2xl font-semibold text-white">
                  {t(item.title, language)}
                </h3>
                <p className="mt-4 text-sm leading-7 text-slate-300">
                  {t(item.description, language)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-shell mt-16">
        <Reveal>
          <div className="ambient-stroke glass-panel hero-sheen relative rounded-[32px] p-6 sm:p-8">
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
              <div>
                <p className="eyebrow">
                  {t(homePageContent.certifications.eyebrow, language)}
                </p>
                <h2 className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl">
                  {t(homePageContent.certifications.title, language)}
                </h2>
                <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
                  {t(homePageContent.certifications.description, language)}
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {homePageContent.certifications.items.map((item, index) => (
                  <Reveal key={item.title.en} delay={index * 0.08}>
                    <div className="soft-pulse rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200">
                        M0{index + 1}
                      </p>
                      <h3 className="mt-4 font-display text-xl font-semibold text-white">
                        {t(item.title, language)}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-slate-300">
                        {t(item.description, language)}
                      </p>
                      {item.link ? (
                        <Link
                          href={item.link}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-4 inline-flex rounded-full border border-cyan-300/30 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200 transition-colors duration-300 hover:bg-cyan-300/10"
                        >
                          {certificationCtaLabel}
                        </Link>
                      ) : null}
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {homePageContent.experienceSection ? (
        <section className="section-shell mt-16">
          <Reveal>
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="eyebrow">
                  {t(homePageContent.experienceSection.eyebrow, language)}
                </p>
                <h2 className="mt-3 max-w-3xl font-display text-3xl font-semibold text-white sm:text-5xl">
                  {t(homePageContent.experienceSection.title, language)}
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                {t(homePageContent.experienceSection.description, language)}
              </p>
            </div>
          </Reveal>

          <div className="grid gap-6 xl:grid-cols-2">
            {homePageContent.experienceSection.items.map((item, index) => (
              <Reveal key={`${item.company}-${item.period}`} delay={index * 0.08}>
                <div className="ambient-stroke glass-panel hero-sheen relative h-full rounded-[28px] p-6">
                  <div className="flex flex-col gap-3 border-b border-white/10 pb-5 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="font-display text-2xl font-semibold text-white">
                        {item.company}
                      </p>
                      <p className="mt-2 text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200">
                        {t(item.role, language)}
                      </p>
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                      {item.period}
                    </p>
                  </div>
                  <p className="mt-5 text-sm leading-7 text-slate-300">
                    {t(item.summary, language)}
                  </p>
                  <div className="mt-5 space-y-3">
                    {item.highlights.map((highlight, highlightIndex) => (
                      <div
                        key={`${item.company}-${highlightIndex}`}
                        className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm leading-7 text-slate-200"
                      >
                        {t(highlight, language)}
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}

      {homePageContent.educationSection ? (
        <section className="section-shell mt-16">
          <Reveal>
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="eyebrow">
                  {t(homePageContent.educationSection.eyebrow, language)}
                </p>
                <h2 className="mt-3 max-w-3xl font-display text-3xl font-semibold text-white sm:text-5xl">
                  {t(homePageContent.educationSection.title, language)}
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                {t(homePageContent.educationSection.description, language)}
              </p>
            </div>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {homePageContent.educationSection.items.map((item, index) => (
              <Reveal key={`${item.institution}-${item.period}`} delay={index * 0.08}>
                <div className="ambient-stroke glass-panel h-full rounded-[28px] p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                    {item.period}
                  </p>
                  <h3 className="mt-4 font-display text-2xl font-semibold text-white">
                    {item.institution}
                  </h3>
                  <p className="mt-4 text-base font-semibold leading-7 text-cyan-200">
                    {t(item.degree, language)}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    {t(item.focus, language)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}

      {managedPagesSection ? (
        <MediaShowcaseSection
          section={managedPagesSection}
          language={language}
        />
      ) : null}

      {flyersSection ? (
        <MediaShowcaseSection
          section={flyersSection}
          language={language}
        />
      ) : null}

      {motionSection ? (
        <MediaShowcaseSection
          section={motionSection}
          language={language}
        />
      ) : null}

      {contractProofSection ? (
        <MediaShowcaseSection
          section={contractProofSection}
          language={language}
        />
      ) : null}

      {trainingSessionSection ? (
        <MediaShowcaseSection
          section={trainingSessionSection}
          language={language}
        />
      ) : null}

      {systemsNetworkSection ? (
        <MediaShowcaseSection
          section={systemsNetworkSection}
          language={language}
        />
      ) : null}

      <section id="projects" className="section-shell mt-16">
        <Reveal>
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">{t(homePageContent.projects.eyebrow, language)}</p>
              <h2 className="mt-3 font-display text-3xl font-semibold text-white sm:text-5xl">
                {t(homePageContent.projects.title, language)}
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
              {t(homePageContent.projects.description, language)}
            </p>
          </div>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index}
              language={language}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
