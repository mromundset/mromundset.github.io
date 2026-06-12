import React from 'react';

interface MediaItem {
  id: string;
  outlet: string;
  description: string;
  logo: string;
  link: string;
}

const mediaItems: MediaItem[] = [
  {
    id: 'e24',
    outlet: 'E24 - Studiekamerater frykter å reise hjem i ferien',
    description: 'Portrait interview about studying Computer Science at UC Berkeley, technology, and politics.',
    logo: '/logos/e24_logo.png',
    link: 'https://e24.no/internasjonal-oekonomi/i/1M3l7e/har-studiekamerater-som-ikke-toer-aa-reise-hjem-i-ferien',
  },
  {
    id: 'bodø_nu',
    outlet: 'Bodø Nu - Fra Mørkvdemarka til amerikansk eliteuniveristet',
    description: 'Portrait interview about growing up in a small city in Northern Norway and sacrifices American culture fosters.',
    logo: '/logos/bodø_nu_logo.png',
    link: 'https://e24.no/internasjonal-oekonomi/i/1M3l7e/har-studiekamerater-som-ikke-toer-aa-reise-hjem-i-ferien',
  },
  {
    id: 'berkeley_news',
    outlet: 'UC Berkeley - Marcus Romundset & The Flavor Network Project',
    description: 'Sit-down interview regarding research on Scandinavian Cuisine and Data Science in humanities.',
    logo: '/logos/berkeley_l&s_logo.jpg',
    link: 'https://artshumanities.berkeley.edu/news/flavor-network-project-and-one-students-tracking-scandinavian-cuisine-data-science',
  },
  {
    id: 'daily_cal',
    outlet: 'Daily Cal - Breaking down the $1.2 million in UC Berkeley student organization funds',
    description: 'Interviewed as part of being the President of DiversaTech. Spoke on student-organization funding disclosure.',
    logo: '/logos/daily_cal_logo.png',
    link: 'https://data.dailycal.org/2026-01-06-asucspending',
  },
  {
    id: 'cal_admissions',
    outlet: 'Cal Admissions - Student Spotlight: Marcus Romundset - Class of 2027',
    description: 'Highlighted on UC Berkeley Admissions page due to interdisciplinary research work.',
    logo: '/logos/cal_admissions_logo.png',
    link: 'https://www.instagram.com/p/DO6qrYfkkSQ/',
  },
  {
    id: 'stars_and_stripes',
    outlet: 'Stars and Stripes - European Golf Championships 2022',
    description: '3rd place finish at 2022 DoDEA European Golf Championships.',
    logo: '/logos/stars_and_stripes_logo.png',
    link: 'https://www.stripes.com/sports/europe/2021-10-07/dodea-europe-high-school-sports-golf-championships-3161368.html',
  },
];

const MediaRow: React.FC<{ item: MediaItem }> = ({ item }) => (
  <div
    className="flex items-center py-4 px-4 border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
  >
    {/* Logo */}
    <div className="w-12 h-12 flex-shrink-0 mr-4">
      <img
        src={item.logo}
        alt={`${item.outlet} logo`}
        className="w-full h-full object-contain rounded"
      />
    </div>

    {/* Outlet name on line 1, description on line 2 */}
    <div className="flex-grow min-w-0">
      <a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-lg font-bold text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors !bg-none"
      >
        {item.outlet}
      </a>
      <p className="text-gray-600 dark:text-gray-400 mt-1">
        {item.description}
      </p>
    </div>
  </div>
);

const Media: React.FC = () => {
  return (
    <section id="media" className="max-w-5xl mx-auto px-6 py-12">
      <h2 className="text-xl font-bold mb-8 text-left text-gray-900 dark:text-white">
        [ Media Coverage ]
      </h2>
      <div className="space-y-0">
        {mediaItems.map((item) => (
          <MediaRow key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default Media;
