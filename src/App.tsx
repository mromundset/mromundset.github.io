import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experiences from './components/Experiences';
import Projects from './components/Projects';
import Media from './components/Media';
import Coursework from './components/Coursework';
import Contact from './components/Contact';
import './index.css';

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const twinklingStarsRef = useRef<HTMLDivElement>(null);
  const shootingStarsRef = useRef<HTMLDivElement>(null);

  // Theme management
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
    manageTwinklingStars(theme);
  }, [theme]);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)');
    const initialTheme = savedTheme || (prefersLight.matches ? 'light' : 'dark');
    setTheme(initialTheme);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Star field management
  const createTwinklingStars = (count: number) => {
    if (!twinklingStarsRef.current || twinklingStarsRef.current.children.length > 0) return;
    const frag = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
      const star = document.createElement('div');
      const size = Math.random() * 2 + 1;
      star.className = 'star';
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.animationDuration = `${(Math.random() * 3 + 2).toFixed(2)}s`;
      star.style.animationDelay = `${(Math.random() * 3).toFixed(2)}s`;
      frag.appendChild(star);
    }
    twinklingStarsRef.current.appendChild(frag);
  };

  const manageTwinklingStars = (currentTheme: 'light' | 'dark') => {
    if (currentTheme === 'dark') {
      createTwinklingStars(150);
    } else if (twinklingStarsRef.current) {
      twinklingStarsRef.current.textContent = '';
    }
  };

  const spawnShootingStar = () => {
    if (theme !== 'dark' || !shootingStarsRef.current) {
      setTimeout(spawnShootingStar, 4000);
      return;
    }
    const star = document.createElement('div');
    star.className = 'shooting-star';
    const startX = Math.random() * window.innerWidth;
    const startY = -150;
    const endX = Math.random() * window.innerWidth;
    const endY = window.innerHeight + 150;
    const angle = Math.atan2(endY - startY, endX - startX) * (180 / Math.PI);
    const duration = Math.random() * 2 + 1;

    star.style.setProperty('--angle', `${angle + 90}deg`);
    star.style.setProperty('--start-x', `${startX}px`);
    star.style.setProperty('--start-y', `${startY}px`);
    star.style.setProperty('--end-x', `${endX}px`);
    star.style.setProperty('--end-y', `${endY}px`);
    star.style.animationDuration = `${duration}s`;

    shootingStarsRef.current.appendChild(star);
    setTimeout(() => star.remove(), duration * 1000);

    const randomInterval = Math.random() * 15000 + 5000;
    setTimeout(spawnShootingStar, randomInterval);
  };

  useEffect(() => {
    spawnShootingStar();
  }, [theme]);

  // Dropdown functionality
  useEffect(() => {
    const togglePanel = (button: HTMLElement) => {
      const experienceHeader = button.closest('.experience-header');
      const courseworkHeader = button.closest('.coursework-header');
      let contentElement: HTMLElement | null = null;
      
      if (experienceHeader) {
        contentElement = experienceHeader.nextElementSibling as HTMLElement;
      } else if (courseworkHeader) {
        contentElement = courseworkHeader.nextElementSibling as HTMLElement;
      } else {
        contentElement = button.nextElementSibling as HTMLElement;
      }
      
      if (!contentElement) return;

      const expanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!expanded));
      button.classList.toggle('expanded', !expanded);

      if (!expanded) {
        contentElement.style.maxHeight = 'none';
        const full = contentElement.scrollHeight;
        contentElement.style.maxHeight = '0px';
        contentElement.offsetHeight;
        contentElement.style.maxHeight = full + 'px';
      } else {
        const current = contentElement.scrollHeight;
        contentElement.style.maxHeight = current + 'px';
        requestAnimationFrame(() => {
          contentElement!.style.maxHeight = '0px';
        });
      }
    };

    const expandButtons = document.querySelectorAll('.expand-btn');
    expandButtons.forEach(btn => {
      btn.addEventListener('click', () => togglePanel(btn as HTMLElement));
    });

    const courseworkHeaders = document.querySelectorAll('.coursework-header');
    courseworkHeaders.forEach(header => {
      header.addEventListener('click', (e) => {
        if (!(e.target as HTMLElement).closest('.expand-btn')) {
          const btn = header.querySelector('.expand-btn');
          if (btn) togglePanel(btn as HTMLElement);
        }
      });
    });

    // Initialize all panels as collapsed
    document.querySelectorAll('.experience-details').forEach(p => {
      (p as HTMLElement).style.maxHeight = '0px';
      (p as HTMLElement).style.overflow = 'hidden';
      (p as HTMLElement).style.transition = 'max-height 0.4s ease';
    });

    return () => {
      expandButtons.forEach(btn => {
        btn.removeEventListener('click', () => togglePanel(btn as HTMLElement));
      });
      courseworkHeaders.forEach(header => {
        header.removeEventListener('click', () => {});
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-300">
      <div id="twinkling-stars" ref={twinklingStarsRef}></div>
      <div id="shooting-stars" ref={shootingStarsRef}></div>
      
      <Header theme={theme} toggleTheme={toggleTheme} />

      <main className="max-w-5xl mx-auto px-6">
        <Hero />

        <About />

        <Experiences />

        <Projects />

        <Media />

        <Coursework />

        <Contact />
      </main>
    </div>
  );
};

export default App;

