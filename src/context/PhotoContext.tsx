
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Photo, PhotoContextType } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from "@/hooks/use-toast";

// Empty initial photos array (removed sample photos)
const samplePhotos: Photo[] = [];

const PhotoContext = createContext<PhotoContextType | undefined>(undefined);

export const PhotoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate database loading
    setIsLoading(true);
    
    // Load photos from localStorage or use empty array
    const loadPhotos = async () => {
      try {
        const savedPhotos = localStorage.getItem('photos');
        if (savedPhotos) {
          setPhotos(JSON.parse(savedPhotos));
        } else {
          setPhotos(samplePhotos);
        }
      } catch (error) {
        console.error("Error loading photos:", error);
        toast({
          title: "Lỗi",
          description: "Không thể tải kỷ niệm. Vui lòng thử lại.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    // Simulate network delay for database
    setTimeout(() => {
      loadPhotos();
    }, 500);
  }, []);

  useEffect(() => {
    // Save photos to localStorage whenever they change (like syncing to database)
    if (!isLoading) {
      try {
        localStorage.setItem('photos', JSON.stringify(photos));
      } catch (error) {
        console.error("Error saving photos:", error);
        toast({
          title: "Lỗi",
          description: "Không thể lưu kỷ niệm. Vui lòng thử lại.",
          variant: "destructive",
        });
      }
    }
  }, [photos, isLoading]);

  const addPhoto = (photo: Omit<Photo, 'id'>) => {
    try {
      const newPhoto = { ...photo, id: uuidv4() };
      setPhotos(prev => [...prev, newPhoto]);
      return newPhoto;
    } catch (error) {
      console.error("Error adding photo:", error);
      toast({
        title: "Lỗi",
        description: "Không thể thêm kỷ niệm. Vui lòng thử lại.",
        variant: "destructive",
      });
      return null;
    }
  };

  const updatePhoto = (id: string, updates: Partial<Omit<Photo, 'id'>>) => {
    try {
      setPhotos(prev => 
        prev.map(photo => 
          photo.id === id ? { ...photo, ...updates } : photo
        )
      );
      return true;
    } catch (error) {
      console.error("Error updating photo:", error);
      toast({
        title: "Lỗi",
        description: "Không thể cập nhật kỷ niệm. Vui lòng thử lại.",
        variant: "destructive",
      });
      return false;
    }
  };

  const deletePhoto = (id: string) => {
    try {
      setPhotos(prev => prev.filter(photo => photo.id !== id));
      return true;
    } catch (error) {
      console.error("Error deleting photo:", error);
      toast({
        title: "Lỗi",
        description: "Không thể xóa kỷ niệm. Vui lòng thử lại.",
        variant: "destructive",
      });
      return false;
    }
  };

  const toggleSpecial = (id: string) => {
    try {
      setPhotos(prev => 
        prev.map(photo => 
          photo.id === id ? { ...photo, isSpecial: !photo.isSpecial } : photo
        )
      );
      return true;
    } catch (error) {
      console.error("Error toggling special:", error);
      toast({
        title: "Lỗi",
        description: "Không thể đánh dấu kỷ niệm. Vui lòng thử lại.",
        variant: "destructive",
      });
      return false;
    }
  };

  const getPhotosByYear = (year: number) => {
    return photos.filter(photo => photo.year === year);
  };

  const getSpecialPhotos = () => {
    return photos.filter(photo => photo.isSpecial);
  };

  const getYears = () => {
    const years = [...new Set(photos.map(photo => photo.year))];
    return years.sort((a, b) => b - a); // Sort descending (newest first)
  };

  const exportData = () => {
    try {
      const dataStr = JSON.stringify(photos);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = 'ky-niem-cua-chung-minh.json';
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      
      return true;
    } catch (error) {
      console.error("Error exporting data:", error);
      toast({
        title: "Lỗi",
        description: "Không thể xuất dữ liệu. Vui lòng thử lại.",
        variant: "destructive",
      });
      return false;
    }
  };

  const importData = (jsonData: string) => {
    try {
      const parsedData = JSON.parse(jsonData) as Photo[];
      setPhotos(parsedData);
      toast({
        title: "Thành công",
        description: `Đã nhập ${parsedData.length} kỷ niệm.`,
      });
      return true;
    } catch (error) {
      console.error("Error importing data:", error);
      toast({
        title: "Lỗi",
        description: "Không thể nhập dữ liệu. Vui lòng kiểm tra định dạng file.",
        variant: "destructive",
      });
      return false;
    }
  };

  return (
    <PhotoContext.Provider value={{ 
      photos, 
      addPhoto, 
      updatePhoto,
      deletePhoto, 
      toggleSpecial, 
      getPhotosByYear, 
      getSpecialPhotos,
      getYears,
      isLoading,
      exportData,
      importData
    }}>
      {children}
    </PhotoContext.Provider>
  );
};

export const usePhotoContext = () => {
  const context = useContext(PhotoContext);
  if (!context) {
    throw new Error('usePhotoContext must be used within a PhotoProvider');
  }
  return context;
};
