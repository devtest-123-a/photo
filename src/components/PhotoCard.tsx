
import React from 'react';
import { Heart, Trash2 } from 'lucide-react';
import { Photo } from '../types';
import { usePhotoContext } from '../context/PhotoContext';

type PhotoCardProps = {
  photo: Photo;
  onClick: () => void;
};

const PhotoCard: React.FC<PhotoCardProps> = ({ photo, onClick }) => {
  const { deletePhoto, toggleSpecial } = usePhotoContext();

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Bạn có chắc chắn muốn xóa ảnh này không?')) {
      deletePhoto(photo.id);
    }
  };

  const handleToggleSpecial = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleSpecial(photo.id);
  };

  return (
    <div 
      className="photo-card w-full h-52 group cursor-pointer animate-fade-in"
      onClick={onClick}
    >
      <div className="relative w-full h-full">
        <img 
          src={photo.url} 
          alt={photo.description}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
          <p className="text-white text-sm truncate">{photo.description}</p>
        </div>
        
        <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            className="btn-icon"
            onClick={handleToggleSpecial}
            title={photo.isSpecial ? "Bỏ đánh dấu đặc biệt" : "Đánh dấu đặc biệt"}
          >
            <Heart 
              size={16} 
              className={photo.isSpecial ? "fill-romantic-500 text-romantic-500" : "text-romantic-500"}
            />
          </button>
          
          <button
            className="btn-icon"
            onClick={handleDelete}
            title="Xóa ảnh"
          >
            <Trash2 size={16} className="text-romantic-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhotoCard;
