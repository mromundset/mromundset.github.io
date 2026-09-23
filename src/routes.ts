import { getProjectBySlug } from './data/projects';

export type Route =
  | { name: 'home' }
  | { name: 'project'; slug: string; section?: string };

const PROJECT_HASH = /^#\/project\/([A-Za-z0-9-]+)(?:\/([A-Za-z0-9-]+))?\/?$/;

/**
 * Hash routing, deliberately. GitHub Pages serves static files only, so a real
 * path like /project/wc2026-arbitrage 404s unless we ship a 404.html fallback.
 * A `#/`-prefixed hash needs no build config and never collides with the plain
 * `#about` / `#projects` section anchors the nav uses.
 *
 * The optional trailing segment is the write-up section, so table-of-contents
 * entries are real shareable links. A bare `#verdict` would parse as home and
 * throw the reader off the project page entirely.
 */
export const parseHash = (hash: string): Route => {
  const match = hash.match(PROJECT_HASH);
  if (match && getProjectBySlug(match[1])) {
    return { name: 'project', slug: match[1], section: match[2] };
  }
  return { name: 'home' };
};

export const projectHref = (slug: string, section?: string) =>
  section ? `#/project/${slug}/${section}` : `#/project/${slug}`;
