
import React from 'react';
import { Heart } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="pt-8 pb-6 px-4 text-center animate-fade-in">
      <div className="flex justify-center items-center mb-2">
        <Heart size={28} className="text-romantic-500 fill-romantic-200 mr-2 animate-pulse-gentle" />
        <h1 className="text-4xl md:text-5xl font-dancing text-romantic-600">
          Kỷ Niệm Của Chúng Mình
        </h1>
        <Heart size={28} className="text-romantic-500 fill-romantic-200 ml-2 animate-pulse-gentle" />
      </div>
      <p className="text-romantic-500 italic max-w-md mx-auto">
        Nơi lưu giữ những khoảnh khắc đẹp đẽ và ngọt ngào của chúng mình
      </p>
    </header>
  );
};

export default Header;
