"use client";

import { useMemo, useState } from "react";
import type { PortfolioContent } from "@/data/site-content";

type AdminEditorProps = {
  initialContent: PortfolioContent;
  contentFilePath: string;
};

type StatusState = {
  tone: "neutral" | "success" | "error";
  message: string;
};

function getStatusClasses(tone: StatusState["tone"]) {
  if (tone === "success") {
    return "border-emerald-400/20 bg-emerald-400/10 text-emerald-100";
  }

  if (tone === "error") {
    return "border-rose-400/20 bg-rose-400/10 text-rose-100";
  }

  return "border-white/10 bg-white/[0.04] text-slate-200";
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error occurred.";
}

export function AdminEditor({
  initialContent,
  contentFilePath
}: AdminEditorProps) {
  const initialDraft = JSON.stringify(initialContent, null, 2);
  const [draft, setDraft] = useState(initialDraft);
  const [savedDraft, setSavedDraft] = useState(initialDraft);
  const [isSaving, setIsSaving] = useState(false);
  const [isReloading, setIsReloading] = useState(false);
  const [status, setStatus] = useState<StatusState>({
    tone: "neutral",
    message:
      "Edit the JSON below to update all portfolio content, then save to persist it on the server."
  });

  const parsedDraft = useMemo(() => {
    try {
      return JSON.parse(draft) as Partial<PortfolioContent>;
    } catch {
      return null;
    }
  }, [draft]);

  const draftIsValidJson = parsedDraft !== null;
  const projectSummaries = useMemo(() => {
    if (!parsedDraft || !Array.isArray(parsedDraft.projects)) {
      return [];
    }

    return parsedDraft.projects
      .filter(
        (project) =>
          typeof project?.slug === "string" &&
          typeof project?.title === "string" &&
          typeof project?.website === "string"
      )
      .map((project) => ({
        slug: project.slug as string,
        title: project.title as string,
        website: project.website as string
      }));
  }, [parsedDraft]);

  async function handleSave() {
    if (!draftIsValidJson) {
      setStatus({
        tone: "error",
        message: "The JSON is invalid. Fix the syntax before saving."
      });
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch("/api/admin/content", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: draft
      });

      const payload = (await response.json()) as {
        content?: PortfolioContent;
        error?: string;
      };

      if (!response.ok || !payload.content) {
        throw new Error(payload.error ?? "Unable to save content.");
      }

      const nextDraft = JSON.stringify(payload.content, null, 2);
      setDraft(nextDraft);
      setSavedDraft(nextDraft);
      setStatus({
        tone: "success",
        message: "Content saved. The public site now reads the updated data."
      });
    } catch (error) {
      setStatus({
        tone: "error",
        message: getErrorMessage(error)
      });
    } finally {
      setIsSaving(false);
    }
  }

  async function handleReload() {
    setIsReloading(true);

    try {
      const response = await fetch("/api/admin/content", {
        cache: "no-store"
      });

      const payload = (await response.json()) as {
        content?: PortfolioContent;
        error?: string;
      };

      if (!response.ok || !payload.content) {
        throw new Error(payload.error ?? "Unable to reload content.");
      }

      const nextDraft = JSON.stringify(payload.content, null, 2);
      setDraft(nextDraft);
      setSavedDraft(nextDraft);
      setStatus({
        tone: "neutral",
        message: "Latest saved content loaded from the server."
      });
    } catch (error) {
      setStatus({
        tone: "error",
        message: getErrorMessage(error)
      });
    } finally {
      setIsReloading(false);
    }
  }

  function handleReset() {
    setDraft(savedDraft);
    setStatus({
      tone: "neutral",
      message: "Draft reset to the latest saved version."
    });
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.38fr_0.62fr]">
      <section className="space-y-6">
        <div className="ambient-stroke glass-panel rounded-[28px] p-6">
          <p className="eyebrow">Admin Console</p>
          <h1 className="mt-3 font-display text-3xl font-semibold text-white">
            Portfolio Content Control
          </h1>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            This screen edits the complete portfolio payload: bilingual copy,
            links, project narratives, badges, image paths, and contact email.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/?lang=fr"
              className="rounded-full bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950 transition-transform duration-300 hover:-translate-y-0.5"
            >
              Open Portfolio
            </a>
            <a
              href="/?lang=en"
              className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white transition-colors duration-300 hover:border-cyan-300/40 hover:text-cyan-200"
            >
              Open English View
            </a>
          </div>
        </div>

        <div className="ambient-stroke glass-panel rounded-[28px] p-6">
          <p className="eyebrow">Persistence</p>
          <div className="mt-4 rounded-3xl border border-white/10 bg-slate-950/50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200">
              Content File
            </p>
            <p className="mt-3 break-all text-sm leading-7 text-slate-200">
              {contentFilePath}
            </p>
          </div>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            This admin writes to a local JSON file on the server. For a public
            production deployment, add authentication and move persistence to a
            database or a managed CMS.
          </p>
        </div>

        <div className="ambient-stroke glass-panel rounded-[28px] p-6">
          <p className="eyebrow">Current Scope</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200">
                Projects
              </p>
              <p className="mt-3 text-3xl font-display font-semibold text-white">
                {projectSummaries.length}
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200">
                JSON Status
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-200">
                {draftIsValidJson
                  ? "The editor content is valid JSON."
                  : "The editor content is not valid JSON."}
              </p>
            </div>
          </div>
        </div>

        <div className="ambient-stroke glass-panel rounded-[28px] p-6">
          <p className="eyebrow">Project Map</p>
          <div className="mt-4 space-y-3">
            {projectSummaries.map((project) => (
              <div
                key={project.slug}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-4"
              >
                <p className="font-display text-lg font-semibold text-white">
                  {project.title}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.24em] text-cyan-200">
                  {project.slug}
                </p>
                <p className="mt-3 break-all text-sm leading-6 text-slate-300">
                  {project.website}
                </p>
              </div>
            ))}
            {projectSummaries.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.02] p-4 text-sm leading-7 text-slate-300">
                No readable project list in the current draft.
              </div>
            ) : null}
          </div>
        </div>

        <div className="ambient-stroke glass-panel rounded-[28px] p-6">
          <p className="eyebrow">Image Rules</p>
          <div className="mt-4 rounded-3xl border border-white/10 bg-white/[0.04] p-4 text-sm leading-7 text-slate-300">
            Keep image paths aligned with{" "}
            <code>public/images/projects/{"{slug}"}/</code>. Each project can
            reference <code>cover.jpg</code>, <code>screen-1.jpg</code>,{" "}
            <code>screen-2.jpg</code>, or any additional files as long as the{" "}
            <code>images</code> array points to the correct path.
          </div>
        </div>
      </section>

      <section className="ambient-stroke glass-panel rounded-[28px] p-4 sm:p-6">
        <div className="flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="eyebrow">JSON Workspace</p>
            <p className="mt-2 text-sm leading-7 text-slate-300">
              Edit every field directly. The save action validates the structure
              before persisting it.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleReload}
              disabled={isReloading}
              className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white transition-colors duration-300 hover:border-cyan-300/40 hover:text-cyan-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isReloading ? "Reloading..." : "Reload"}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white transition-colors duration-300 hover:border-cyan-300/40 hover:text-cyan-200"
            >
              Reset Draft
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="rounded-full bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950 transition-transform duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSaving ? "Saving..." : "Save Content"}
            </button>
          </div>
        </div>

        <div
          className={`mt-5 rounded-3xl border px-4 py-3 text-sm leading-7 ${getStatusClasses(
            status.tone
          )}`}
        >
          {status.message}
        </div>

        <textarea
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          spellCheck={false}
          className="mt-5 min-h-[780px] w-full rounded-[24px] border border-white/10 bg-slate-950/70 p-5 font-mono text-sm leading-7 text-slate-100 outline-none ring-0 transition-colors duration-300 placeholder:text-slate-500 focus:border-cyan-300/40"
          aria-label="Portfolio content JSON editor"
        />
      </section>
    </div>
  );
}
