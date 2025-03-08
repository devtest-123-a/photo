
export type Photo = {
  id: string;
  url: string;
  description: string;
  year: number;
  isSpecial: boolean;
  date?: Date;
};

export type PhotoContextType = {
  photos: Photo[];
  isLoading: boolean;
  addPhoto: (photo: Omit<Photo, 'id'>) => Photo | null;
  updatePhoto: (id: string, updates: Partial<Omit<Photo, 'id'>>) => boolean;
  deletePhoto: (id: string) => boolean;
  toggleSpecial: (id: string) => boolean;
  getPhotosByYear: (year: number) => Photo[];
  getSpecialPhotos: () => Photo[];
  getYears: () => number[];
  exportData: () => boolean;
  importData: (jsonData: string) => boolean;
};
