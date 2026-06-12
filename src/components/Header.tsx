import React, { useState, useEffect } from 'react';

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  const [activeSection, setActiveSection] = useState('about');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        const rect = contactEl.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
          setActiveSection('contact');
          return;
        }
      }

      const sections = ['about', 'experiences', 'media', 'projects', 'coursework'];
      let currentSection = 'about';

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.5) {
            currentSection = section;
          }
        }
      }
      
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'about', label: 'About' },
    { id: 'experiences', label: 'Experience' },
    { id: 'media', label: 'Featured' },
    { id: 'projects', label: 'Projects' },
    { id: 'coursework', label: 'Coursework' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b backdrop-blur-md bg-white/80 dark:bg-black/80 border-gray-200 dark:border-white/10 transition-colors duration-300">
      <nav className="max-w-5xl mx-auto px-6 h-16 flex items-end justify-between">
        {/* Mobile hamburger (hidden on md+, so desktop is unchanged) */}
        <button
          className="md:hidden text-gray-900 dark:text-white p-2 -ml-2 mb-2 rounded-md hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>

        <div className="hidden md:flex flex-1 border-b border-gray-200 dark:border-gray-800">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`flex-1 pb-3 text-lg font-mono transition-colors border-b-2 text-left !bg-none ${
                activeSection === link.id
                  ? 'text-black dark:text-white border-black dark:border-white font-bold'
                  : 'text-gray-600 dark:text-gray-400 border-transparent hover:text-black dark:hover:text-white'
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>
        <button 
          id="theme-toggle" 
          className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 p-2 rounded-full transition-colors ml-6 mb-2" 
          aria-label="Toggle theme"
          onClick={toggleTheme}
        >
          {theme === 'light' ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile dropdown menu (md:hidden, so desktop is unchanged) */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-white/10 bg-white/95 dark:bg-black/95 backdrop-blur-md">
          <div className="max-w-5xl mx-auto px-6 flex flex-col">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setMenuOpen(false)}
                className={`py-3 text-lg font-mono border-b border-gray-100 dark:border-white/5 last:border-b-0 !bg-none transition-colors ${
                  activeSection === link.id
                    ? 'text-black dark:text-white font-bold'
                    : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
