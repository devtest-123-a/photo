
import React, { useState } from 'react';
 import { supabase } from "../supabaseClient"; // Đảm bảo đã import Supabase
import { Upload, X } from 'lucide-react';
import { usePhotoContext } from '../context/PhotoContext';
import { useToast } from "@/hooks/use-toast";

const UploadPhoto: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [isSpecial, setIsSpecial] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const { addPhoto } = usePhotoContext();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setImagePreview(null);
    setDescription('');
    setYear(new Date().getFullYear());
    setIsSpecial(false);
    setIsUploading(false);
  };



const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!imagePreview) return;

  setIsUploading(true);

  const fileInput = document.getElementById("file-upload") as HTMLInputElement;
  if (!fileInput.files?.length) {
    alert("Chưa chọn ảnh!");
    setIsUploading(false);
    return;
  }

  const file = fileInput.files[0];
  const fileName = `${Date.now()}_${file.name}`;

  // 🛠️ Tải ảnh lên Supabase Storage
  const { data, error } = await supabase.storage.from("uploads").upload(fileName, file);
  if (error) {
    console.error("Lỗi khi tải lên:", error);
    alert("Upload thất bại!");
    setIsUploading(false);
    return;
  }

  // ✅ Lấy URL ảnh sau khi upload thành công
  const { publicUrl } = supabase.storage.from("uploads").getPublicUrl(fileName).data;

  // 📸 Lưu vào danh sách ảnh hiển thị trên web
  addPhoto({
    url: publicUrl,
    description,
    year,
    isSpecial,
    date: new Date(),
  });

  // 🎉 Hiển thị thông báo thành công
  toast({
    title: "Thành công!",
    description: "Kỷ niệm đã được lưu trữ.",
  });

  resetForm();
  setIsOpen(false);
  setIsUploading(false);
};

  return (
    <>
      <button 
        className="px-6 py-3 btn-primary flex items-center shadow-lg animate-pulse-gentle z-[1000] relative"
        onClick={() => setIsOpen(true)}
      >
        <Upload size={20} className="mr-2" />
        Thêm kỷ niệm mới
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="absolute inset-0" onClick={() => setIsOpen(false)}></div>
          
          <div className="relative glass-card w-full max-w-2xl p-6 z-[1000000] animate-scale-in my-8 max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-3 right-3 btn-icon"
              onClick={() => setIsOpen(false)}
            >
              <X size={20} />
            </button>
            
            <h2 className="text-2xl font-dancing text-romantic-600 mb-6 text-center">
              Thêm kỷ niệm mới
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                {!imagePreview ? (
                  <div className="border-2 border-dashed border-romantic-200 rounded-xl p-8 text-center cursor-pointer hover:border-romantic-400 transition-colors duration-200" onClick={() => document.getElementById('file-upload')?.click()}>
                    <Upload size={40} className="mx-auto mb-4 text-romantic-400" />
                    <p className="text-romantic-500 mb-2">Nhấn để tải ảnh lên</p>
                    <p className="text-xs text-romantic-400">Hỗ trợ định dạng JPG, PNG</p>
                    <input
                      type="file"
                      id="file-upload"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </div>
                ) : (
                  <div className="relative rounded-xl overflow-hidden h-48">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      className="absolute top-2 right-2 btn-icon"
                      onClick={() => setImagePreview(null)}
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-romantic-700 mb-1">
                    Mô tả kỷ niệm
                  </label>
                  <textarea
                    className="w-full p-3 rounded-lg border border-romantic-200 focus:ring-2 focus:ring-romantic-300 focus:border-romantic-300 outline-none transition-all duration-200"
                    rows={3}
                    placeholder="Hãy mô tả về kỷ niệm đẹp này..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-romantic-700 mb-1">
                      Năm
                    </label>
                    <input
                      type="number"
                      className="w-full p-3 rounded-lg border border-romantic-200 focus:ring-2 focus:ring-romantic-300 focus:border-romantic-300 outline-none transition-all duration-200"
                      min="2000"
                      max={new Date().getFullYear()}
                      value={year}
                      onChange={(e) => setYear(parseInt(e.target.value))}
                      required
                    />
                  </div>
                  
                  <div className="flex-1 flex items-end">
                    <label className="flex items-center w-full p-3 rounded-lg border border-romantic-200 cursor-pointer hover:bg-romantic-50 transition-colors duration-200">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-romantic-500 border-romantic-300 rounded focus:ring-romantic-400"
                        checked={isSpecial}
                        onChange={(e) => setIsSpecial(e.target.checked)}
                      />
                      <span className="ml-2 text-romantic-700">
                        Đánh dấu là kỷ niệm đặc biệt
                      </span>
                    </label>
                  </div>
                </div>
                
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => setIsOpen(false)}
                    disabled={isUploading}
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={!imagePreview || !description || isUploading}
                  >
                    {isUploading ? 'Đang lưu...' : 'Lưu kỷ niệm'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UploadPhoto;
