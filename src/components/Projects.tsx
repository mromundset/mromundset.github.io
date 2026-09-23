import React from 'react';
import { projects, type Project } from '../data/projects';
import { projectHref } from '../routes';

const ExternalIcon: React.FC = () => (
  <svg
    className="inline-block ml-2"
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M7 17l9.2-9.2M17 17V7H7" />
  </svg>
);

const ArrowIcon: React.FC = () => (
  <svg
    className="inline-block ml-2"
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const ProjectEntry: React.FC<{ project: Project }> = ({ project }) => {
  const hasWriteup = Boolean(project.slug);

  return (
    <div>
      <h3>
        <a
          href={hasWriteup ? projectHref(project.slug!) : project.link}
          target={hasWriteup ? undefined : '_blank'}
          rel={hasWriteup ? undefined : 'noopener noreferrer'}
          className="text-lg font-bold text-gray-900 dark:text-white !bg-none"
        >
          {project.title}
          {hasWriteup ? <ArrowIcon /> : <ExternalIcon />}
        </a>
      </h3>
      <p className="text-gray-700 dark:text-gray-400 leading-relaxed mt-2">
        {project.description}
      </p>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 text-gray-700 dark:text-gray-400 text-sm">
        <span className="flex items-center gap-2">
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
            className="flex-shrink-0 text-gray-700 dark:text-gray-400"
            aria-hidden="true"
          >
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
          </svg>
          <span className="text-gray-700 dark:text-gray-400">{project.technologies}</span>
        </span>
        {hasWriteup && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-gray-600 dark:text-gray-500 hover:text-black dark:hover:text-white transition-colors !bg-none"
          >
            source ↗
          </a>
        )}
      </div>
    </div>
  );
};

const Projects: React.FC = () => {
  return (
    <section id="projects" className="max-w-5xl mx-auto px-6 py-12">
      <h2 className="text-xl font-bold mb-12 text-left text-gray-900 dark:text-white">
        [ Projects &amp; Research ]
      </h2>

      <div className="space-y-8">
        {projects.map((project) => (
          <ProjectEntry key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
