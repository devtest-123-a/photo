
import React from 'react';
import { MessageCircle, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-4 px-6 bg-romantic-100/70 backdrop-blur-sm">
      <div className="container mx-auto flex justify-center items-center space-x-8">
        {/* Zalo Link */}
        <a 
          href="https://zalo.me" 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn-icon"
          aria-label="Zalo"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 100 100" 
            className="text-romantic-600"
            fill="currentColor"
          >
            <path d="M50,0C22.4,0,0,22.4,0,50s22.4,50,50,50s50-22.4,50-50S77.6,0,50,0z M82,67.2c-0.3,4.3-2.8,8-6.7,10
              c-2.8,1.5-6,1.7-8.9,0.8c-9.7-2.9-18.1-8.3-25.1-15.6c-6.1-6.5-10.8-14-13.4-22.1c-1.5-5.1-0.4-10.8,2.8-15.1
              c2.5-3.3,6.5-5.4,10.7-5.6c3.7-0.2,7.3,0.8,10.5,2.8c3.3,2.1,5.4,5.4,5.9,9.1c0.4,2.6-0.3,5.3-2,7.3c-2.5,3.2-7.2,5-10.8,2.8
              c-1.2-0.8-1.9-2.1-2.2-3.6c-0.3-1.8,0.1-3.2,1.2-4.5c1-1.3,2.5-2.1,4.1-2.4c0.5-0.1,0.7-0.1,1.2-0.1c0,0,0.3,0,0.7,0.1
              c0.4,0.2,0.8,0.5,0.9,1c0.1,0.4,0,0.8-0.3,1.1c-0.1,0.2-0.4,0.3-0.6,0.4c-0.2,0.1-0.4,0.2-0.6,0.3c-1.1,0.6-1.6,1.8-1.7,3
              c-0.1,1.7,0.4,3.1,1.8,4.2c1.6,1.3,3.7,1,5.3-0.1c1.3-0.9,2.3-2.2,2.8-3.8c0.6-2.1,0.3-4.2-0.6-6.1c-1.1-2.2-3-3.8-5.2-4.6
              c-2.4-0.8-5-0.5-7.4,0.5c-3.5,1.5-6.2,5.1-6.3,8.9c-0.1,3.7,1.5,7.2,4,9.8c8.4,8.8,20.3,14,32.5,13.6c2.1-0.1,3.9-1.3,5-3
              C81.9,70.3,82.2,68.7,82,67.2z M67.6,48.5h-7.8v7.8c0,1.4-1.1,2.4-2.5,2.4s-2.5-1.1-2.5-2.4v-7.8h-7.8c-1.4,0-2.4-1.1-2.4-2.5
              s1.1-2.5,2.4-2.5h7.8v-7.8c0-1.4,1.1-2.4,2.5-2.4s2.5,1.1,2.5,2.4v7.8h7.8c1.4,0,2.4,1.1,2.4,2.5S68.9,48.5,67.6,48.5z"/>
          </svg>
        </a>
        
        {/* Facebook Link */}
        <a 
          href="https://facebook.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn-icon"
          aria-label="Facebook"
        >
          <Facebook size={24} className="text-romantic-600" />
        </a>
        
        {/* TikTok Link */}
        <a 
          href="https://tiktok.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn-icon"
          aria-label="TikTok"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            className="text-romantic-600"
          >
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
          </svg>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
