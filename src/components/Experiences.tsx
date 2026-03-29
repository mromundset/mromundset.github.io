import React from 'react';

interface Experience {
  id: string;
  company: string;
  role: string;
  year: string;
  logo: string;
  link: string;
}

const workExperiences: Experience[] = [
  {
    id: 'nbim',
    company: 'Norges Bank Investment Management',
    role: '[Incoming] Finance',
    year: '2026',
    logo: '/logos/nbim_logo.jpg',
    link: 'https://www.nbim.no/',
  },
  {
    id: 'n_and_p',
    company: 'Nording & Partners',
    role: 'Management Consulting',
    year: '2026',
    logo: '/logos/n_and_p.jpg',
    link: 'https://www.nordingpartners.no/',
  },
  {
    id: 'hyperspell',
    company: 'Hyperspell',
    role: 'Product',
    year: '2025',
    logo: '/logos/hyperspell_logo.jpg',
    link: 'https://www.hyperspell.com/',
  },
  {
    id: 'dualog',
    company: 'Dualog',
    role: 'Product - AI Solutions',
    year: '2025',
    logo: '/logos/dualog.jpg',
    link: 'https://dualog.com/',
  },
  {
    id: 'nvidia',
    company: 'NVIDIA',
    role: 'Product - Sales Forecasting',
    year: '2025',
    logo: '/logos/nvidia.jpg',
    link: 'https://www.nvidia.com/en-us/',
  },
  {
    id: 'jpmorgan',
    company: 'J.P. Morgan Chase',
    role: 'Corporate Strategy',
    year: '2024',
    logo: '/logos/jpmc.jpg',
    link: 'https://www.jpmorganchase.com/',
  },
  {
    id: 'tona.ai',
    company: 'Tona.ai',
    role: 'Strategy',
    year: '2023',
    logo: '/logos/tona.jpg',
    link: 'https://www.linkedin.com/company/tona-ai/',
  },
  {
    id: 'sofi',
    company: 'SoFi',
    role: 'Engineering',
    year: '2023',
    logo: '/logos/sofi.jpg',
    link: 'https://www.sofi.com/',
  },
];

const involvements: Experience[] = [
  {
    id: 'diversatech',
    company: 'DiversaTech Consulting',
    role: 'President',
    year: '2024 - Present',
    logo: '/logos/diversatech.jpg',
    link: 'https://www.diversatech.org/',
  },
  {
    id: 'research',
    company: 'UC Berkeley',
    role: 'AI Research',
    year: '2023 - Present',
    logo: '/logos/berkeley.jpg',
    link: 'https://www.berkeley.edu/',
  },
  {
    id: 'club_golf',
    company: 'Cal Club Golf Team',
    role: 'Team Captain',
    year: '2024 - Present',
    logo: '/logos/cal.png',
    link: 'https://recwell.berkeley.edu/competitive-programs/sport-clubs/golf-co-ed/',
  },
];

const ExperienceRow: React.FC<{ exp: Experience }> = ({ exp }) => (
  <div 
    className="flex items-center py-4 px-4 border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
  >
    {/* Logo */}
    <div className="w-12 h-12 flex-shrink-0 mr-4">
      <img 
        src={exp.logo} 
        alt={`${exp.company} logo`}
        className="w-full h-full object-contain rounded"
      />
    </div>
    
    {/* Company and Role on same line */}
    <div className="flex-grow min-w-0 flex items-baseline gap-3">
      <a 
        href={exp.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-lg font-bold text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors !bg-none flex-shrink-0"
      >
        {exp.company}
      </a>
      <span className="text-lg text-gray-600 dark:text-gray-400 truncate">
        {exp.role}
      </span>
    </div>
    
    {/* Year */}
    <div className="flex-shrink-0 ml-4">
      <span className="text-lg text-gray-500 dark:text-gray-400">
        {exp.year}
      </span>
    </div>
  </div>
);

const Experiences: React.FC = () => {
  return (
    <section id="experiences" className="max-w-5xl mx-auto px-6 py-12">
      {/* Work Experience Section */}
      <div className="mb-16">
        <h2 className="text-xl font-bold mb-8 text-left text-gray-900 dark:text-white">
          [ Work Experience ]
        </h2>
        <div className="space-y-0">
          {workExperiences.map((exp) => (
            <ExperienceRow key={exp.id} exp={exp} />
          ))}
        </div>
      </div>

      {/* Involvements Section */}
      <div>
        <h2 className="text-xl font-bold mb-8 text-left text-gray-900 dark:text-white">
          [ Involvements ]
        </h2>
        <div className="space-y-0">
          {involvements.map((exp) => (
            <ExperienceRow key={exp.id} exp={exp} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experiences;
