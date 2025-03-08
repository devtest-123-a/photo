

import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";  // Import kết nối Supabase

import PhotoCard from './PhotoCard';
import PhotoModal from './PhotoModal';
import { Photo } from '../types';

type PhotoGalleryProps = {
  selectedYear: number | null;
};

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ selectedYear }) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchPhotos = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("photos") // Lấy dữ liệu từ bảng "photos" trong Supabase
      .select("*")
      .order("date", { ascending: false }); // Sắp xếp theo thời gian

    if (error) {
      console.error("Lỗi khi lấy ảnh:", error);
    } else {
      setPhotos(data || []);
    }
    setLoading(false);
  };

  fetchPhotos();
}, []);

  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const years = selectedYear ? [selectedYear] : [];


  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  // If there are no photos, show an empty state
  // Nếu đang tải dữ liệu, hiển thị thông báo "Đang tải..."
if (loading) {
  return <p className="text-center text-romantic-500">Đang tải ảnh...</p>;
}

// Nếu không có ảnh, hiển thị trạng thái trống
if (photos.length === 0) {
  return (
    <div className="text-center py-12 animate-fade-in">
      <p className="text-romantic-500">Chưa có kỷ niệm nào được lưu trữ.</p>
      <p className="text-romantic-400 mt-2">Hãy thêm kỷ niệm đầu tiên của bạn!</p>
    </div>
  );
}


  // If a year is selected but there are no photos for that year
  if (selectedYear && !photos.some(photo => photo.year === selectedYear)) {
    return (
      <div className="text-center py-12 animate-fade-in">
        <p className="text-romantic-500">Không có kỷ niệm nào trong năm {selectedYear}.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pb-24">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {photos
      .filter(photo => (selectedYear ? photo.year === selectedYear : true)) // Lọc theo năm nếu có
      .map((photo, index) => (
        <PhotoCard key={photo.id} photo={photo} onClick={() => handlePhotoClick(photo)} />
      ))}
  </div>

  <PhotoModal photo={selectedPhoto} onClose={closeModal} />
</div>
);
};
export default PhotoGallery;
