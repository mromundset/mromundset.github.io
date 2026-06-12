import React from 'react';

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string;
  link: string;
}

const projects: Project[] = [
  {
    id: 'scandinavian-flavor',
    title: 'Scandinavian Flavor Networks',
    description: 'Applied AI research on flavor networks in Scandinavia performed under Professor Tangherlini. Primary focus was to find inferences regarding how flavor compunds interact, change, and form traceable networks across time. Research is still ongoing.',
    technologies: 'Python, PostgreSQL, Ollama, OpenAI API',
    link: 'https://github.com/mromundset/Scandinavian_Flavor_Networks_Overview'
  },
  {
    id: 'us-stock-eval',
    title: 'U.S. Stock Evaluations',
    description: 'Fundamental analysis and predictive modeling of S&P 500. Prediction models trained using scikit-learn on fundamental factors. Performed as a part of the interview process of Norges Bank Investment Management ($2T AUM).',
    technologies: 'Python, Pandas, Numpy, scikit-learn (ML training framework)',
    link: 'https://github.com/mromundset/nbim_us_stock_eval'
  },
  {
    id: 'wc2026-arbitrage-exploration',
    title: '2026 World Cup Arbitrage Exploration',
    description: 'Exploration of arbitrage opportunities on prediction market betting of 2026 Fifa World Cup matches. Used fundamental dependent statistical methods.',
    technologies: 'Python, Numpy, scikit-learn',
    link: 'https://github.com/mromundset/wc2026_arbitrage_exploration'
  },
  {
    id: 'crewly-cms',
    title: 'Crewly CMS',
    description: 'Hackathon project to showcase proof-of-concept of a modular Crew Management System. Primary focus was for ease of use for small shipping operators ( < 5 vessels). Made from scratch in 3 days.',
    technologies: 'Go, C#, Angular.js, PostgreSQL, FastAPI',
    link: 'https://app.crewly.cloud/'
  },
  {
    id: 'linkedin-scraper',
    title: 'LinkedIn Scraper',
    description: 'Automatic LinkedIn scraper that may be used for sourcing or profile extraction. Exports all results to a .csv format, allowing for ease of data transfer.',
    technologies: 'Python, BeautifulSoup',
    link: 'https://github.com/mromundset/Linkedin_Scraper'
  },
];

const Projects: React.FC = () => {
  return (
    <section id="projects" className="max-w-5xl mx-auto px-6 py-12">
      <h2 className="text-xl font-bold mb-12 text-left text-gray-900 dark:text-white">
        [ Projects & Research ]
      </h2>
      
      <div className="space-y-8">
        {projects.map((project) => (
          <div key={project.id}>
            <h3>
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-lg font-bold text-gray-900 dark:text-white !bg-none"
              >
                {project.title}
                <svg 
                  className="text-gray-900 dark:text-white inline-block ml-2" 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M7 17l9.2-9.2M17 17V7H7"/>
                </svg>
              </a>
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-2">
              {project.description}
            </p>
            <div className="flex items-center gap-2 mt-3 text-gray-600 dark:text-gray-400 text-sm">
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
                className="flex-shrink-0 text-gray-600 dark:text-gray-400"
              >
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
              </svg>
              <span className="text-gray-600 dark:text-gray-400">{project.technologies}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
