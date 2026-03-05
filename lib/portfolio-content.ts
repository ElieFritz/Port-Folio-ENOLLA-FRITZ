import { promises as fs } from "fs";
import path from "path";
import { defaultProjects, type Project } from "@/data/projects";
import {
  defaultHomePageContent,
  type HomePageContent,
  type LocalizedText,
  type PortfolioContent
} from "@/data/site-content";

const CONTENT_DIR = path.join(process.cwd(), "content");
const CONTENT_FILE = path.join(CONTENT_DIR, "portfolio-content.json");

function buildDefaultContent(): PortfolioContent {
  return JSON.parse(
    JSON.stringify({
      contactEmail: "enollafritz@gmail.com",
      homePageContent: defaultHomePageContent,
      projects: defaultProjects
    })
  ) as PortfolioContent;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isLocalizedText(value: unknown): value is LocalizedText {
  return (
    isRecord(value) &&
    typeof value.fr === "string" &&
    typeof value.en === "string"
  );
}

function isContentImage(value: unknown) {
  return (
    isRecord(value) &&
    typeof value.src === "string" &&
    isLocalizedText(value.alt)
  );
}

function isShowcaseVideo(value: unknown) {
  return (
    isRecord(value) &&
    (value.kind === "mp4" ||
      value.kind === "youtube" ||
      value.kind === "vimeo") &&
    typeof value.src === "string" &&
    (value.title === undefined || isLocalizedText(value.title)) &&
    (value.poster === undefined || isContentImage(value.poster))
  );
}

function isShowcaseItem(value: unknown) {
  return (
    isRecord(value) &&
    isLocalizedText(value.title) &&
    isLocalizedText(value.description) &&
    (value.image === undefined || isContentImage(value.image)) &&
    (value.video === undefined || isShowcaseVideo(value.video)) &&
    (value.image !== undefined || value.video !== undefined) &&
    (value.tag === undefined || isLocalizedText(value.tag)) &&
    (value.link === undefined || typeof value.link === "string")
  );
}

function isShowcaseSection(value: unknown) {
  return (
    isRecord(value) &&
    isLocalizedText(value.eyebrow) &&
    isLocalizedText(value.title) &&
    isLocalizedText(value.description) &&
    Array.isArray(value.items) &&
    value.items.every((item) => isShowcaseItem(item))
  );
}

function isContactPoint(value: unknown) {
  return (
    isRecord(value) &&
    isLocalizedText(value.label) &&
    typeof value.value === "string" &&
    (value.href === undefined || typeof value.href === "string")
  );
}

function isHeroMetric(value: unknown) {
  return (
    isRecord(value) &&
    typeof value.value === "string" &&
    isLocalizedText(value.label)
  );
}

function isHeroQuickLink(value: unknown) {
  return (
    isRecord(value) &&
    isLocalizedText(value.label) &&
    typeof value.href === "string"
  );
}

function isExperienceEntry(value: unknown) {
  return (
    isRecord(value) &&
    typeof value.company === "string" &&
    typeof value.period === "string" &&
    isLocalizedText(value.role) &&
    isLocalizedText(value.summary) &&
    Array.isArray(value.highlights) &&
    value.highlights.every((highlight) => isLocalizedText(highlight))
  );
}

function isEducationEntry(value: unknown) {
  return (
    isRecord(value) &&
    typeof value.period === "string" &&
    typeof value.institution === "string" &&
    isLocalizedText(value.degree) &&
    isLocalizedText(value.focus)
  );
}

function isExperienceSection(value: unknown) {
  return (
    isRecord(value) &&
    isLocalizedText(value.eyebrow) &&
    isLocalizedText(value.title) &&
    isLocalizedText(value.description) &&
    Array.isArray(value.items) &&
    value.items.every((item) => isExperienceEntry(item))
  );
}

function isEducationSection(value: unknown) {
  return (
    isRecord(value) &&
    isLocalizedText(value.eyebrow) &&
    isLocalizedText(value.title) &&
    isLocalizedText(value.description) &&
    Array.isArray(value.items) &&
    value.items.every((item) => isEducationEntry(item))
  );
}

function isAboutSection(value: unknown) {
  return (
    isRecord(value) &&
    isLocalizedText(value.eyebrow) &&
    isLocalizedText(value.title) &&
    isLocalizedText(value.description) &&
    (value.image === undefined || isContentImage(value.image)) &&
    isLocalizedText(value.bio) &&
    Array.isArray(value.badges) &&
    value.badges.every((badge) => isLocalizedText(badge)) &&
    Array.isArray(value.contactPoints) &&
    value.contactPoints.every((item) => isContactPoint(item))
  );
}

function isProject(value: unknown): value is Project {
  return (
    isRecord(value) &&
    typeof value.slug === "string" &&
    typeof value.title === "string" &&
    typeof value.website === "string" &&
    isLocalizedText(value.category) &&
    isLocalizedText(value.shortDescription) &&
    isLocalizedText(value.description) &&
    isLocalizedText(value.role) &&
    isLocalizedText(value.results) &&
    typeof value.coverImage === "string" &&
    typeof value.heroImage === "string" &&
    Array.isArray(value.technologies) &&
    value.technologies.every((technology) => typeof technology === "string") &&
    Array.isArray(value.images) &&
    value.images.every(
      (image) =>
        isRecord(image) &&
        typeof image.src === "string" &&
        isLocalizedText(image.alt) &&
        isLocalizedText(image.caption)
    ) &&
    isLocalizedText(value.challenge) &&
    isLocalizedText(value.strategy) &&
    isLocalizedText(value.execution) &&
    isLocalizedText(value.outcome) &&
    Array.isArray(value.metrics) &&
    value.metrics.every((metric) => isLocalizedText(metric))
  );
}

function isHomePageContent(value: unknown): value is HomePageContent {
  return (
    isRecord(value) &&
    isRecord(value.hero) &&
    isLocalizedText(value.hero.eyebrow) &&
    isLocalizedText(value.hero.title) &&
    isLocalizedText(value.hero.description) &&
    isLocalizedText(value.hero.primaryCta) &&
    isLocalizedText(value.hero.secondaryCta) &&
    (value.hero.profileImage === undefined ||
      isContentImage(value.hero.profileImage)) &&
    (value.hero.proofMetrics === undefined ||
      (Array.isArray(value.hero.proofMetrics) &&
        value.hero.proofMetrics.every((metric) => isHeroMetric(metric)))) &&
    (value.hero.quickLinks === undefined ||
      (Array.isArray(value.hero.quickLinks) &&
        value.hero.quickLinks.every((link) => isHeroQuickLink(link)))) &&
    Array.isArray(value.supportCards) &&
    value.supportCards.every(
      (card) =>
        isRecord(card) &&
        isLocalizedText(card.title) &&
        isLocalizedText(card.description)
    ) &&
    Array.isArray(value.strategicSignals) &&
    value.strategicSignals.every((signal) => isLocalizedText(signal)) &&
    isRecord(value.expertise) &&
    isLocalizedText(value.expertise.eyebrow) &&
    isLocalizedText(value.expertise.title) &&
    isLocalizedText(value.expertise.description) &&
    Array.isArray(value.expertise.items) &&
    value.expertise.items.every(
      (item) =>
        isRecord(item) &&
        isLocalizedText(item.title) &&
        isLocalizedText(item.description)
    ) &&
    isRecord(value.certifications) &&
    isLocalizedText(value.certifications.eyebrow) &&
    isLocalizedText(value.certifications.title) &&
    isLocalizedText(value.certifications.description) &&
    Array.isArray(value.certifications.items) &&
      value.certifications.items.every(
        (item) =>
          isRecord(item) &&
          isLocalizedText(item.title) &&
          isLocalizedText(item.description) &&
          (item.link === undefined || typeof item.link === "string")
      ) &&
      (value.experienceSection === undefined ||
        isExperienceSection(value.experienceSection)) &&
      (value.educationSection === undefined ||
        isEducationSection(value.educationSection)) &&
      (value.aboutSection === undefined || isAboutSection(value.aboutSection)) &&
      isRecord(value.projects) &&
    isLocalizedText(value.projects.eyebrow) &&
    isLocalizedText(value.projects.title) &&
    isLocalizedText(value.projects.description) &&
    (value.managedPagesSection === undefined ||
      isShowcaseSection(value.managedPagesSection)) &&
    (value.flyersSection === undefined || isShowcaseSection(value.flyersSection)) &&
    (value.motionSection === undefined || isShowcaseSection(value.motionSection)) &&
    (value.contractProofSection === undefined ||
      isShowcaseSection(value.contractProofSection)) &&
    (value.trainingSessionSection === undefined ||
      isShowcaseSection(value.trainingSessionSection)) &&
    (value.systemsNetworkSection === undefined ||
      isShowcaseSection(value.systemsNetworkSection))
  );
}

export function isPortfolioContent(value: unknown): value is PortfolioContent {
  return (
    isRecord(value) &&
    typeof value.contactEmail === "string" &&
    isHomePageContent(value.homePageContent) &&
    Array.isArray(value.projects) &&
    value.projects.every((project) => isProject(project))
  );
}

async function ensureContentFile() {
  await fs.mkdir(CONTENT_DIR, { recursive: true });

  try {
    await fs.access(CONTENT_FILE);
  } catch {
    const defaultContent = buildDefaultContent();
    await fs.writeFile(
      CONTENT_FILE,
      JSON.stringify(defaultContent, null, 2),
      "utf8"
    );
  }
}

export async function getPortfolioContent() {
  await ensureContentFile();

  try {
    const rawContent = await fs.readFile(CONTENT_FILE, "utf8");
    const parsedContent = JSON.parse(rawContent) as unknown;

    if (isPortfolioContent(parsedContent)) {
      return parsedContent;
    }
  } catch {
    // Fall through and restore default content below.
  }

  const defaultContent = buildDefaultContent();
  await fs.writeFile(CONTENT_FILE, JSON.stringify(defaultContent, null, 2), "utf8");
  return defaultContent;
}

export async function savePortfolioContent(content: PortfolioContent) {
  await fs.mkdir(CONTENT_DIR, { recursive: true });
  await fs.writeFile(CONTENT_FILE, JSON.stringify(content, null, 2), "utf8");
  return content;
}

export function getProjectBySlug(projects: Project[], slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getContentFilePath() {
  return CONTENT_FILE;
}
