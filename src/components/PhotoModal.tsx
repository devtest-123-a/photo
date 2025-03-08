
import React, { useEffect } from 'react';
import { X, Heart } from 'lucide-react';
import { Photo } from '../types';
import { usePhotoContext } from '../context/PhotoContext';

type PhotoModalProps = {
  photo: Photo | null;
  onClose: () => void;
};

const PhotoModal: React.FC<PhotoModalProps> = ({ photo, onClose }) => {
  const { toggleSpecial } = usePhotoContext();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!photo) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="absolute inset-0" onClick={onClose}></div>
      
      <div className="relative glass-card w-full max-w-5xl max-h-[90vh] flex flex-col md:flex-row overflow-hidden z-10 animate-scale-in">
        <button
          className="absolute top-3 right-3 btn-icon z-20"
          onClick={onClose}
        >
          <X size={20} />
        </button>
        
        <div className="w-full md:w-2/3 h-64 md:h-[70vh] relative">
          <img
            src={photo.url}
            alt={photo.description}
            className="w-full h-full object-contain"
          />
        </div>
        
        <div className="w-full md:w-1/3 p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <span className="year-chip">{photo.year}</span>
            <button
              className="btn-icon"
              onClick={() => toggleSpecial(photo.id)}
              title={photo.isSpecial ? "Bỏ đánh dấu đặc biệt" : "Đánh dấu đặc biệt"}
            >
              <Heart 
                size={18} 
                className={photo.isSpecial ? "fill-romantic-500 text-romantic-500" : "text-romantic-500"}
              />
            </button>
          </div>
          
          <h3 className="text-xl font-semibold mb-4 text-romantic-700">Mô tả</h3>
          <p className="text-romantic-600">{photo.description}</p>
        </div>
      </div>
    </div>
  );
};

export default PhotoModal;
