import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ProjectGallery } from "@/components/project-gallery";
import { Reveal } from "@/components/reveal";
import { getLanguage, t } from "@/data/site-content";
import { getPortfolioContent, getProjectBySlug } from "@/lib/portfolio-content";

type ProjectPageProps = {
  params: {
    slug: string;
  };
  searchParams?: {
    lang?: string | string[];
  };
};

const labels = {
  backToPortfolio: {
    fr: "Retour Au Portfolio",
    en: "Back To Portfolio"
  },
  role: {
    fr: "Role",
    en: "Role"
  },
  results: {
    fr: "Resultats",
    en: "Results"
  },
  technologyStack: {
    fr: "Axes D'Execution",
    en: "Execution Scope"
  },
  openLive: {
    fr: "Ouvrir Le Site",
    en: "Open Live Experience"
  },
  storytelling: {
    fr: "Narration Projet",
    en: "Project Storytelling"
  },
  frameworkTitle: {
    fr: "Probleme -> Strategie -> Execution -> Resultats",
    en: "Problem -> Strategy -> Execution -> Results"
  },
  problem: {
    fr: "Probleme",
    en: "Problem"
  },
  strategy: {
    fr: "Strategie",
    en: "Strategy"
  },
  execution: {
    fr: "Execution",
    en: "Execution"
  }
};
export const dynamic = "force-dynamic";

export default async function ProjectPage({
  params,
  searchParams
}: ProjectPageProps) {
  const language = getLanguage(searchParams?.lang);
  const content = await getPortfolioContent();
  const project = getProjectBySlug(content.projects, params.slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="pb-20 pt-6 sm:pt-10">
      <section className="section-shell flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href={`/?lang=${language}`}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200 transition-colors duration-300 hover:text-cyan-200"
        >
          &lt;- {t(labels.backToPortfolio, language)}
        </Link>
        <LanguageSwitcher
          language={language}
          pathname={`/projects/${project.slug}`}
        />
      </section>

      <section className="section-shell mt-6">
        <div className="ambient-stroke glass-panel hero-sheen relative overflow-hidden rounded-[36px] p-4 sm:p-6">
          <div className="floating-orb left-[-3rem] top-[-2rem] h-36 w-36" />
          <div className="floating-orb floating-orb--slow bottom-[-3rem] right-[12%] h-44 w-44" />
          <div className="relative overflow-hidden rounded-[28px] border border-white/10">
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent" />
            <Image
              src={project.heroImage}
              alt={`${project.title} hero banner`}
              width={1600}
              height={900}
              sizes="100vw"
              className="aspect-[16/8] w-full object-cover"
              priority
            />
            <div className="absolute inset-x-0 bottom-0 z-20 p-6 sm:p-8 lg:p-10">
              <div className="max-w-4xl">
                <p className="eyebrow">{t(project.category, language)}</p>
                <h1 className="mt-3 font-display text-3xl font-semibold text-white sm:text-5xl lg:text-6xl">
                  {project.title}
                </h1>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-200 sm:text-base">
                  {t(project.description, language)}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">
                  <p className="eyebrow">{t(labels.role, language)}</p>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    {t(project.role, language)}
                  </p>
                </div>
                <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">
                  <p className="eyebrow">{t(labels.results, language)}</p>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    {t(project.results, language)}
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="hero-sheen relative rounded-[28px] border border-white/10 bg-white/[0.04] p-6">
                <p className="eyebrow">{t(labels.technologyStack, language)}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-full border border-cyan-300/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
                <Link
                  href={project.website}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex rounded-full bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950 transition-transform duration-300 hover:-translate-y-0.5"
                >
                  {t(labels.openLive, language)}
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-shell mt-14 grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
        <Reveal>
          <div className="ambient-stroke glass-panel rounded-[32px] p-6 sm:p-8">
            <p className="eyebrow">{t(labels.storytelling, language)}</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-white">
              {t(labels.frameworkTitle, language)}
            </h2>

            <div className="mt-8 space-y-6">
              <div className="hero-sheen relative rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200">
                  {t(labels.problem, language)}
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {t(project.challenge, language)}
                </p>
              </div>

              <div className="hero-sheen relative rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200">
                  {t(labels.strategy, language)}
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {t(project.strategy, language)}
                </p>
              </div>

              <div className="hero-sheen relative rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200">
                  {t(labels.execution, language)}
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {t(project.execution, language)}
                </p>
              </div>

              <div className="hero-sheen relative rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200">
                  {t(labels.results, language)}
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {t(project.outcome, language)}
                </p>
                <div className="mt-4 space-y-3">
                  {project.metrics.map((metric) => (
                    <div
                      key={metric.en}
                      className="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-slate-200"
                    >
                      {t(metric, language)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="ambient-stroke glass-panel rounded-[32px] p-6 sm:p-8">
            <ProjectGallery
              coverImage={project.coverImage}
              images={project.images}
              projectTitle={project.title}
              language={language}
            />
          </div>
        </Reveal>
      </section>
    </main>
  );
}
