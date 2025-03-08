
import React, { useState } from 'react';
import { PhotoProvider } from '../context/PhotoContext';
import HeartBackground from '../components/HeartBackground';
import Header from '../components/Header';
import YearNavigation from '../components/YearNavigation';
import SpecialMemories from '../components/SpecialMemories';
import PhotoGallery from '../components/PhotoGallery';
import UploadPhoto from '../components/UploadPhoto';
import Footer from '../components/Footer';

const Index = () => {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  return (
    <PhotoProvider>
      <div className="min-h-screen bg-romantic-gradient pb-20 relative">
        <HeartBackground />
        
        <div className="container mx-auto px-4">
          <Header />
          
          {/* Move the upload button to header section for better visibility */}
          <div className="fixed bottom-20 right-10 z-[9999]">
            <UploadPhoto />
          </div>
          
          <YearNavigation 
            selectedYear={selectedYear} 
            setSelectedYear={setSelectedYear} 
          />
          
          <SpecialMemories />
          
          <PhotoGallery selectedYear={selectedYear} />
        </div>
        
        <div className="fixed bottom-0 left-0 right-0 z-10">
          <Footer />
        </div>
      </div>
    </PhotoProvider>
  );
};

export default Index;
