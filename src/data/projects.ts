export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string;
  /** External source / demo. Always shown, even when a write-up exists. */
  link: string;
  /** Present when the project has an on-site write-up at #/project/<slug>. */
  slug?: string;
}

export const projects: Project[] = [
  {
    id: 'scandinavian-flavor',
    title: 'Scandinavian Flavor Networks',
    description:
      'Applied AI research on flavor networks in Scandinavia performed under Professor Tangherlini. Primary focus was to find inferences regarding how flavor compounds interact, change, and form traceable networks across time. Research is still ongoing.',
    technologies: 'Python, PostgreSQL, Ollama, OpenAI API',
    link: 'https://github.com/mromundset/Scandinavian_Flavor_Networks_Overview',
  },
  {
    id: 'us-stock-eval',
    title: 'U.S. Stock Evaluations',
    description:
      'Fundamental analysis and predictive modeling of S&P 500. Prediction models trained using scikit-learn on fundamental factors. Performed as a part of the interview process of Norges Bank Investment Management ($2T AUM).',
    technologies: 'Python, Pandas, Numpy, scikit-learn (ML training framework)',
    link: 'https://github.com/mromundset/nbim_us_stock_eval',
  },
  {
    id: 'wc2026-arbitrage-exploration',
    slug: 'wc2026-arbitrage',
    title: '2026 World Cup Arbitrage Exploration',
    description:
      'Tested whether Polymarket misprices long-range World Cup aggregates by propagating its own match odds through a bivariate-Poisson simulation of all 12 groups. The apparent edge turned out to be a modeling artifact — a three-venue comparison against Pinnacle settled it.',
    technologies: 'Python, NumPy, SciPy, Matplotlib, Polymarket Gamma API',
    link: 'https://github.com/mromundset/wc2026_arbitrage_exploration',
  },
  {
    id: 'crewly-cms',
    title: 'Crewly CMS',
    description:
      'Hackathon project to showcase proof-of-concept of a modular Crew Management System. Primary focus was for ease of use for small shipping operators ( < 5 vessels). Made from scratch in 3 days.',
    technologies: 'Go, C#, Angular.js, PostgreSQL, FastAPI',
    link: 'https://app.crewly.cloud/',
  },
  {
    id: 'linkedin-scraper',
    title: 'LinkedIn Scraper',
    description:
      'Automatic LinkedIn scraper that may be used for sourcing or profile extraction. Exports all results to a .csv format, allowing for ease of data transfer.',
    technologies: 'Python, BeautifulSoup',
    link: 'https://github.com/mromundset/Linkedin_Scraper',
  },
];

export const getProjectBySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);
