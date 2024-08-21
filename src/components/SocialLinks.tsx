import React from 'react';

interface SocialLink {
  href: string;
  icon: React.ReactNode;
  text: string;
}

interface SocialLinksProps {
  links: SocialLink[];
}

const SocialLinks: React.FC<SocialLinksProps> = ({ links }) => {
  return (
    <div className="flex flex-wrap justify-center md:flex gap-4 mt-5">
      {links.map((link, index) => (
        <div key={index} className="bg-white rounded-md p-2 flex">
          <a
            href={link.href}
            className="text-white text-underline flex items-center font-bold gap-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="text-gray-700 mt-0.5 size-4">{link.icon}</span>
            <p className="animate-gradient gradient-text text-transparent font-medium">
              {link.text}
            </p>
          </a>
        </div>
      ))}
    </div>
  );
};

export default SocialLinks;
