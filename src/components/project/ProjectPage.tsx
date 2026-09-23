import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { Project } from '../../data/projects';
import { projectHref } from '../../routes';

export interface WriteupSection {
  id: string;
  /** Shown in the sticky table of contents. */
  navLabel: string;
  /** Shown as the section heading. Falls back to navLabel. */
  heading?: string;
  content: React.ReactNode;
}

export interface Writeup {
  /** One-sentence thesis under the title. */
  thesis: string;
  sections: WriteupSection[];
}

/**
 * Long-form project write-up shell: a sticky scrollspy table of contents beside
 * a single scrolling narrative. Chosen over tabs because the argument in these
 * write-ups is sequential — landing on "Results" without the method loses the
 * point — while the TOC still gives random access.
 */
const ProjectPage: React.FC<{ project: Project; writeup: Writeup }> = ({
  project,
  writeup,
}) => {
  const { sections } = writeup;
  const [activeId, setActiveId] = useState(sections[0]?.id ?? '');
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

  const ids = useMemo(() => sections.map((s) => s.id), [sections]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Track every section's current position, then take the topmost one
        // that has crossed the header. Avoids the flicker you get from acting
        // on individual intersection events.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .map((e) => e.target.id);
        if (visible.length === 0) return;
        const topmost = ids.find((id) => visible.includes(id));
        if (topmost) setActiveId(topmost);
      },
      {
        // Band just below the fixed header — a section is "active" once its top
        // reaches the top third of the viewport.
        rootMargin: '-88px 0px -66% 0px',
        threshold: 0,
      },
    );

    sectionRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  const registerSection = (id: string) => (el: HTMLElement | null) => {
    if (el) sectionRefs.current.set(id, el);
    else sectionRefs.current.delete(id);
  };

  return (
    <article className="max-w-5xl mx-auto px-6 pt-20 pb-24">
      {/* Back link */}
      <a
        href="#projects"
        className="inline-flex items-center gap-2 font-mono text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors !bg-none mb-10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Back to projects
      </a>

      {/* Title block */}
      <header className="border-b border-gray-300 dark:border-gray-800 pb-10 mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
          {project.title}
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-700 dark:text-gray-400 leading-relaxed max-w-3xl">
          {writeup.thesis}
        </p>
        <div className="mt-6">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-sm font-bold text-gray-900 dark:text-white !bg-none border-b-2 border-gray-900 dark:border-white pb-0.5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
            </svg>
            Source on GitHub
          </a>
        </div>
      </header>

      {/* The narrative column is full width so it lines up exactly with a home
          section; the TOC lives in the page margin from xl up, and stacks above
          the text below that, where there is no margin to put it in. */}
      <div className="relative">
        <nav
          aria-label="Sections"
          className="mb-10 pb-6 border-b border-gray-300 dark:border-gray-800 xl:absolute xl:right-full xl:top-0 xl:bottom-0 xl:w-52 xl:mr-10 xl:mb-0 xl:pb-0 xl:border-b-0"
        >
          <div className="xl:sticky xl:top-24">
            <h2 className="font-mono text-xs uppercase tracking-widest text-gray-500 dark:text-gray-500 mb-4">
              Contents
            </h2>
            <ol className="space-y-1">
            {sections.map((section, i) => {
              const isActive = activeId === section.id;
              return (
                <li key={section.id}>
                  <a
                    href={projectHref(project.slug!, section.id)}
                    aria-current={isActive ? 'true' : undefined}
                    className={`flex gap-2.5 py-1.5 text-sm leading-snug transition-colors !bg-none border-l-2 pl-3 -ml-px ${
                      isActive
                        ? 'text-black dark:text-white font-bold border-black dark:border-white'
                        : 'text-gray-600 dark:text-gray-500 border-gray-300 dark:border-gray-800 hover:text-black dark:hover:text-white'
                    }`}
                  >
                    <span className="font-mono text-xs opacity-60 pt-0.5">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span>{section.navLabel}</span>
                  </a>
                </li>
              );
            })}
            </ol>
          </div>
        </nav>

        {/* Narrative */}
        <div className="min-w-0 space-y-20">
          {sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              ref={registerSection(section.id)}
              className="scroll-mt-24 space-y-6"
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                [ {section.heading ?? section.navLabel} ]
              </h2>
              {section.content}
            </section>
          ))}
        </div>
      </div>
    </article>
  );
};

export default ProjectPage;
