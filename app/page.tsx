import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { LanguageSwitcher } from "@/components/language-switcher";
import { MediaShowcaseTabs } from "@/components/media-showcase-tabs";
import { Navbar } from "@/components/navbar";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { ScrollToTop } from "@/components/scroll-to-top";
import type { ShowcaseSection } from "@/data/site-content";
import { getLanguage, t } from "@/data/site-content";
import { getPortfolioContent } from "@/lib/portfolio-content";
import {
  getSiteUrl,
  SEO_DEFAULT_DESCRIPTION,
  SEO_LINKEDIN_URL,
  SEO_PERSON_NAME
} from "@/lib/seo";

type HomePageProps = {
  searchParams?: {
    lang?: string | string[];
  };
};

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Portfolio Executif | Marketing & Commercial | Nemalia",
  description: SEO_DEFAULT_DESCRIPTION,
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: `${SEO_PERSON_NAME} | Responsable Marketing & Commercial | Nemalia`,
    description: SEO_DEFAULT_DESCRIPTION,
    images: [
      {
        url: "/images/profile/enolla-cv-profile.jpg",
        width: 828,
        height: 1035,
        alt: `${SEO_PERSON_NAME} - Portfolio Executif`
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: `${SEO_PERSON_NAME} | Portfolio Executif`,
    description: SEO_DEFAULT_DESCRIPTION,
    images: ["/images/profile/enolla-cv-profile.jpg"]
  }
};

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
  const collectionPageStructuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: SEO_PERSON_NAME,
        url: siteUrl,
        sameAs: [SEO_LINKEDIN_URL],
        image: `${siteUrl}${homePageContent.hero.profileImage?.src ?? "/images/profile/enolla-cv-profile.jpg"}`,
        jobTitle: "Responsable Marketing & Commercial | Nemalia"
      },
      {
        "@type": "CollectionPage",
        name: `${SEO_PERSON_NAME} - Portfolio`,
        url: siteUrl,
        description: SEO_DEFAULT_DESCRIPTION,
        inLanguage: language === "fr" ? "fr-FR" : "en-US",
        author: {
          "@type": "Person",
          name: SEO_PERSON_NAME,
          url: SEO_LINKEDIN_URL
        }
      },
      {
        "@type": "ItemList",
        name: "Portfolio Projects",
        itemListElement: projects.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${siteUrl}/projects/${project.slug}`,
          name: project.title
        }))
      }
    ]
  };
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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionPageStructuredData)
        }}
      />
      <Navbar language={language} />
      <main className="pb-20 pt-24 sm:pt-28">
      <section className="section-shell">
        <div className="ambient-stroke glass-panel hero-sheen relative overflow-hidden rounded-[32px] px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-18">
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
                    className="rounded-full bg-accent px-5 py-3 text-sm font-semibold text-slate-950 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow"
                  >
                    {t(homePageContent.hero.primaryCta, language)}
                  </Link>
                  <Link
                    href={`mailto:${contactEmail}`}
                    className="rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:border-accent/40 hover:text-accent"
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
                          className="rounded-full border border-accent/25 bg-accent/10 px-5 py-3 text-sm font-semibold text-amber-100 transition-colors duration-300 hover:bg-accent/20"
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
                        className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4"
                      >
                        <p className="font-display text-3xl font-semibold text-accent">
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
                    <div className="ambient-stroke glass-panel relative overflow-hidden rounded-3xl p-3">
                      <div className="relative overflow-hidden rounded-2xl border border-white/10">
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
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent/80">
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
                      className="ambient-stroke relative rounded-3xl border border-white/10 bg-white/5 p-6"
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
          id="about"
          section={homePageContent.aboutSection}
          language={language}
        />
      ) : null}

      <section className="section-break mt-8 overflow-hidden">
        <div className="flex animate-ticker gap-6 whitespace-nowrap py-4">
          {[...homePageContent.strategicSignals, ...homePageContent.strategicSignals].map((signal, index) => (
            <div
              key={`signal-${index}`}
              className="inline-flex shrink-0 items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3"
            >
              <span className="text-xs font-semibold text-accent">
                {String(((index % homePageContent.strategicSignals.length) + 1)).padStart(2, "0")}
              </span>
              <span className="text-sm font-medium text-slate-200">
                {t(signal, language)}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section id="expertise" className="section-shell section-break mt-16">
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

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {homePageContent.expertise.items.map((item, index) => (
            <Reveal key={item.title.en} delay={index * 0.06}>
              <div className="ambient-stroke glass-panel relative h-full rounded-3xl p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl border border-accent/20 bg-accent/10">
                  <span className="font-display text-sm font-bold text-accent">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="font-display text-xl font-semibold text-white">
                  {t(item.title, language)}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {t(item.description, language)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-shell section-break mt-16">
        <Reveal>
            <div className="ambient-stroke glass-panel relative rounded-[32px] p-6 sm:p-8">
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
                    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 transition-colors duration-300 hover:border-accent/20">
                      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
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
                          className="mt-4 inline-flex rounded-full border border-accent/25 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent transition-colors duration-300 hover:bg-accent/10"
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
        <section id="experience" className="section-shell section-break mt-16">
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
                <div className="ambient-stroke glass-panel relative h-full rounded-3xl p-6">
                  <div className="flex flex-col gap-3 border-b border-white/10 pb-5 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="font-display text-2xl font-semibold text-white">
                        {item.company}
                      </p>
                      <p className="mt-2 text-sm font-semibold uppercase tracking-[0.22em] text-accent">
                        {t(item.role, language)}
                      </p>
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-300">
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
        <section className="section-shell section-break mt-16">
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
                <div className="ambient-stroke glass-panel h-full rounded-3xl p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-300">
                    {item.period}
                  </p>
                  <h3 className="mt-4 font-display text-2xl font-semibold text-white">
                    {item.institution}
                  </h3>
                  <p className="mt-4 text-base font-semibold leading-7 text-accent">
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

      {(() => {
        const showcaseSections = [
          managedPagesSection,
          flyersSection,
          motionSection,
          contractProofSection,
          trainingSessionSection,
          systemsNetworkSection
        ].filter((s): s is NonNullable<typeof s> => s !== null);

        return showcaseSections.length > 0 ? (
          <MediaShowcaseTabs sections={showcaseSections} language={language} />
        ) : null;
      })()}

      <section id="projects" className="section-shell section-break mt-16">
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

      <ContactSection language={language} contactEmail={contactEmail} />
      </main>
      <Footer language={language} contactEmail={contactEmail} />
      <ScrollToTop />
    </>
  );
}
