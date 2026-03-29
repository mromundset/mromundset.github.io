import React from 'react';

interface ContactLink {
  id: string;
  label: string;
  value: string;
  link: string;
}

const contactLinks: ContactLink[] = [
  {
    id: 'email',
    label: 'Email',
    value: 'mromundset@berkeley.edu',
    link: 'mailto:mromundset@berkeley.edu'
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: '/in/romundset',
    link: 'https://www.linkedin.com/in/romundset/'
  },
  {
    id: 'instagram',
    label: 'Instagram',
    value: '@denmagiskepotet',
    link: 'https://www.instagram.com/denmagiskepotet/'
  }
];

const Contact: React.FC = () => {
  return (
    <section id="contact" className="max-w-5xl mx-auto px-6 py-12">
      <h2 className="text-xl font-bold mb-12 text-left text-gray-900 dark:text-white">
        [ Contact ]
      </h2>
      
      <div className="space-y-4">
        {contactLinks.map((contact) => (
          <div 
            key={contact.id}
            className="flex items-baseline gap-4 py-2"
          >
            <span className="font-bold text-gray-900 dark:text-white font-mono text-lg flex-shrink-0 min-w-[120px]">
              {contact.label}
            </span>
            <a 
              href={contact.link}
              target={contact.id === 'email' ? '_self' : '_blank'}
              rel={contact.id === 'email' ? undefined : 'noopener noreferrer'}
              className="text-lg text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors !bg-none"
            >
              {contact.value}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Contact;
