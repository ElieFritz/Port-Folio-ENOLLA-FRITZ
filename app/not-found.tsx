import Link from "next/link";

export default function NotFound() {
  return (
    <main className="section-shell flex min-h-screen items-center justify-center py-20">
      <div className="ambient-stroke glass-panel max-w-xl rounded-[32px] p-8 text-center">
        <p className="eyebrow">Not Found / Introuvable</p>
        <h1 className="mt-4 font-display text-3xl font-semibold text-white">
          This case study does not exist. / Cette etude de cas n'existe pas.
        </h1>
        <p className="mt-4 text-sm leading-7 text-slate-300">
          Check the project slug in `content/portfolio-content.json` or in the
          admin console. / Verifiez le slug dans
          `content/portfolio-content.json` ou dans l'admin.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-full bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950"
        >
          Back To Home / Retour A L'Accueil
        </Link>
      </div>
    </main>
  );
}
