import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { Project, ProjectCategory } from '../../content/projects';
import type { Lang } from '../../content/types';

/** Every label the island needs, already resolved to one language. */
export interface ProjectsLabels {
  all: string;
  readMore: string;
  viewRepo: string;
  viewDemo: string;
  close: string;
  problem: string;
  contribution: string;
  outcome: string;
  stack: string;
  confidentialNote: string;
  confidentialBadge: string;
  categories: Record<ProjectCategory, string>;
}

interface Props {
  projects: Project[];
  lang: Lang;
  labels: ProjectsLabels;
}

type Filter = 'all' | ProjectCategory;

function LockIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  );
}

export default function ProjectsGrid({ projects, lang, labels }: Props) {
  const [filter, setFilter] = useState<Filter>('all');
  const [openId, setOpenId] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);

  /** Only offer filters that actually have projects behind them. */
  const filters = useMemo(() => {
    const present = Array.from(new Set(projects.map((p) => p.category)));
    return (['all', ...present] as Filter[]).map((id) => ({
      id,
      label: id === 'all' ? labels.all : labels.categories[id],
    }));
  }, [projects, labels]);

  const visible = useMemo(
    () => (filter === 'all' ? projects : projects.filter((p) => p.category === filter)),
    [projects, filter]
  );

  const active = useMemo(() => projects.find((p) => p.id === openId) ?? null, [projects, openId]);

  const open = useCallback((project: Project, trigger: HTMLElement) => {
    lastTrigger.current = trigger;
    setOpenId(project.id);
  }, []);

  const close = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  // Drive the native <dialog> from state so focus trapping and Escape are free.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (active && !dialog.open) {
      dialog.showModal();
      document.body.style.overflow = 'hidden';
    } else if (!active && dialog.open) {
      dialog.close();
    }
  }, [active]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const onClose = () => {
      setOpenId(null);
      document.body.style.overflow = '';
      lastTrigger.current?.focus();
    };
    dialog.addEventListener('close', onClose);
    return () => dialog.removeEventListener('close', onClose);
  }, []);

  // Clicking the backdrop (outside the panel) dismisses the dialog.
  const onDialogClick = useCallback((event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) event.currentTarget.close();
  }, []);

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter projects">
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            aria-pressed={filter === f.id}
            className={
              filter === f.id
                ? 'rounded border border-accent px-3 py-1.5 text-xs font-medium text-accent transition-colors'
                : 'rounded border border-line px-3 py-1.5 text-xs text-muted transition-colors hover:border-line-strong hover:text-ink'
            }
          >
            {f.label}
          </button>
        ))}
      </div>

      <ul>
        {visible.map((project) => (
          <li key={project.id} className="border-t border-line last:border-b">
            <article className="group grid gap-x-8 gap-y-2 py-6 md:grid-cols-[5rem_1fr_auto] md:items-baseline">
              <p className="tnum text-sm text-subtle">{project.year}</p>

              <div className="min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="font-serif text-xl leading-snug">{project.title[lang]}</h3>
                  <span className="eyebrow">{labels.categories[project.category]}</span>
                  {project.confidential && (
                    <span className="chip !py-0 !text-[0.65rem]">
                      <LockIcon />
                      <span className="ml-1">{labels.confidentialBadge}</span>
                    </span>
                  )}
                </div>

                <p className="mt-1.5 text-sm text-muted">{project.kicker[lang]}</p>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                  {project.summary[lang]}
                </p>
                <p className="mt-3 max-w-2xl text-xs leading-relaxed text-subtle">
                  {project.stack.join(' · ')}
                </p>
              </div>

              <div className="flex items-center gap-4 md:justify-end">
                <button
                  type="button"
                  onClick={(e) => open(project, e.currentTarget)}
                  className="link-underline whitespace-nowrap text-sm font-medium text-ink"
                >
                  {labels.readMore} &rarr;
                </button>
                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${labels.viewRepo} — ${project.title[lang]}`}
                    className="text-subtle transition-colors hover:text-accent"
                  >
                    <ExternalIcon />
                  </a>
                )}
              </div>
            </article>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        onClick={onDialogClick}
        aria-labelledby="project-dialog-title"
        className="w-[min(44rem,calc(100vw-2rem))] max-w-none rounded-lg border border-line bg-surface p-0 text-ink backdrop:bg-black/50"
      >
        {active && (
          <div className="max-h-[85vh] overflow-y-auto">
            {active.image && (
              <img
                src={active.image}
                alt=""
                className="aspect-[2/1] w-full border-b border-line object-cover object-top"
              />
            )}

            <header className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-line bg-surface p-6">
              <div>
                <p className="eyebrow">
                  {labels.categories[active.category]} · {active.year}
                </p>
                <h3 id="project-dialog-title" className="mt-1.5 font-serif text-2xl leading-snug">
                  {active.title[lang]}
                </h3>
                <p className="mt-1 text-sm text-muted">{active.kicker[lang]}</p>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label={labels.close}
                className="grid h-9 w-9 shrink-0 place-items-center rounded border border-line text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </header>

            <div className="space-y-7 p-6">
              <section>
                <h4 className="eyebrow">{labels.problem}</h4>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">{active.problem[lang]}</p>
              </section>

              <section>
                <h4 className="eyebrow">{labels.contribution}</h4>
                <ul className="mt-2.5 space-y-2.5">
                  {active.contributions[lang].map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span
                        className="mt-2 h-px w-3 shrink-0 bg-line-strong"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              {active.outcome && (
                <section>
                  <h4 className="eyebrow">{labels.outcome}</h4>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">{active.outcome[lang]}</p>
                </section>
              )}

              <section>
                <h4 className="eyebrow">{labels.stack}</h4>
                <ul className="mt-2.5 flex flex-wrap gap-1.5">
                  {active.stack.map((tech) => (
                    <li key={tech} className="chip">
                      {tech}
                    </li>
                  ))}
                </ul>
              </section>

              <footer className="flex flex-wrap items-center gap-3 border-t border-line pt-5">
                {active.repo && (
                  <a
                    href={active.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost !py-2 !text-xs"
                  >
                    {labels.viewRepo}
                    <ExternalIcon />
                  </a>
                )}
                {active.demo && (
                  <a
                    href={active.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary !py-2 !text-xs"
                  >
                    {labels.viewDemo}
                    <ExternalIcon />
                  </a>
                )}
                {active.confidential && (
                  <p className="flex items-start gap-2 text-xs leading-relaxed text-subtle">
                    <span className="mt-0.5">
                      <LockIcon />
                    </span>
                    {labels.confidentialNote}
                  </p>
                )}
              </footer>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
