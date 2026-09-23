import type { Writeup } from '../components/project/ProjectPage';
import wc2026Arbitrage from './wc2026Arbitrage';

/**
 * slug -> write-up. Adding a project page is two steps: write the content
 * module, then register it here and set the matching `slug` in data/projects.ts.
 */
export const writeups: Record<string, Writeup> = {
  'wc2026-arbitrage': wc2026Arbitrage,
};

export const getWriteup = (slug: string): Writeup | undefined => writeups[slug];
