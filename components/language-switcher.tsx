import Link from "next/link";
import type { Language } from "@/data/site-content";

type LanguageSwitcherProps = {
  language: Language;
  pathname: string;
};

const options: Array<{ value: Language; label: string }> = [
  { value: "fr", label: "FR" },
  { value: "en", label: "EN" }
];

export function LanguageSwitcher({
  language,
  pathname
}: LanguageSwitcherProps) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1">
      {options.map((option) => (
        <Link
          key={option.value}
          href={`${pathname}?lang=${option.value}`}
          className={`rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.28em] transition-colors duration-300 ${
            option.value === language
              ? "bg-accent text-slate-950"
              : "text-slate-300 hover:text-white"
          }`}
        >
          {option.label}
        </Link>
      ))}
    </div>
  );
}
