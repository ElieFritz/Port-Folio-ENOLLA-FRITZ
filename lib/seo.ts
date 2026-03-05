export const SEO_PERSON_NAME = "Enolla Elie Fritz Delangue";
export const SEO_LINKEDIN_URL = "https://www.linkedin.com/in/fritzenolla/";
export const SEO_DEFAULT_TITLE =
  "Enolla Elie Fritz Delangue | Portfolio Executif Marketing, Communication & Growth B2B";
export const SEO_DEFAULT_DESCRIPTION =
  "Portfolio officiel de Enolla Elie Fritz Delangue, Responsable Marketing, Communication et Growth B2B. Projets, preuves terrain, certifications et resultats business.";

export const SEO_KEYWORDS = [
  "Enolla Elie Fritz Delangue",
  "Enolla Fritz",
  "Fritz Enolla",
  "Portfolio Enolla Elie Fritz Delangue",
  "Responsable marketing",
  "Communication corporate",
  "Growth marketing B2B",
  "Lead generation",
  "Marketing digital Douala",
  "Business development B2B"
] as const;

const DEFAULT_SITE_URL = "https://portfolio-enolla-fritz.vercel.app";

export function getSiteUrl() {
  const rawUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? DEFAULT_SITE_URL;
  return rawUrl.endsWith("/") ? rawUrl.slice(0, -1) : rawUrl;
}
