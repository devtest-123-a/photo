
import React, { useState } from 'react';
import { usePhotoContext } from '../context/PhotoContext';
import PhotoCard from './PhotoCard';
import PhotoModal from './PhotoModal';
import { Photo } from '../types';

const SpecialMemories: React.FC = () => {
  const { getSpecialPhotos } = usePhotoContext();
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  
  const specialPhotos = getSpecialPhotos();
  
  // If there are no special photos, don't render this section
  if (specialPhotos.length === 0) return null;
  
  return (
    <div className="container mx-auto px-4 mb-12 animate-slide-up" style={{ animationDelay: '0.1s' }}>
      <div className="glass-blur p-6 rounded-2xl">
        <h2 className="text-3xl font-dancing text-romantic-600 mb-6 flex items-center">
          <span className="inline-block w-8 h-8 rounded-full bg-romantic-100 flex items-center justify-center mr-3">
            ✨
          </span>
          Kỷ Niệm Đặc Biệt
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {specialPhotos.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              onClick={() => setSelectedPhoto(photo)}
            />
          ))}
        </div>
        
        <PhotoModal photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
      </div>
    </div>
  );
};

export default SpecialMemories;
