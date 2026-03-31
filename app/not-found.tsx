import { headers } from "next/headers";
import Link from "next/link";

export default function NotFound() {
  const headersList = headers();
  const acceptLang = headersList.get("accept-language") ?? "";
  const isFr = acceptLang.toLowerCase().startsWith("fr");

  const content = isFr
    ? {
        eyebrow: "Introuvable",
        title: "Cette étude de cas n'existe pas.",
        description:
          "Vérifiez le slug du projet dans content/portfolio-content.json ou dans la console d'administration.",
        cta: "Retour À L'Accueil"
      }
    : {
        eyebrow: "Not Found",
        title: "This case study does not exist.",
        description:
          "Check the project slug in content/portfolio-content.json or in the admin console.",
        cta: "Back To Home"
      };

  return (
    <main className="section-shell flex min-h-screen items-center justify-center py-20">
      <div className="ambient-stroke glass-panel max-w-xl rounded-[32px] p-8 text-center">
        <p className="eyebrow">{content.eyebrow}</p>
        <h1 className="mt-4 font-display text-3xl font-semibold text-white">
          {content.title}
        </h1>
        <p className="mt-4 text-sm leading-7 text-slate-300">
          {content.description}
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-full bg-accent px-4 py-2 text-sm font-semibold text-slate-950"
        >
          {content.cta}
        </Link>
      </div>
    </main>
  );
}
