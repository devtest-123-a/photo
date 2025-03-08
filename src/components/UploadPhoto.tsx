import React, { useState, useRef } from 'react'; // ✅ Thêm useRef
import { supabase } from "../supabaseClient";
import { Upload, X } from 'lucide-react';
import { usePhotoContext } from '../context/PhotoContext';
import { useToast } from "@/hooks/use-toast";

const [selectedFile, setSelectedFile] = useState<File | null>(null);


const UploadPhoto: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [isSpecial, setIsSpecial] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null); // ✅ Tạo ref

  const { addPhoto } = usePhotoContext();

 const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    setSelectedFile(file); // ✅ Lưu file vào state
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

    if (!selectedFile) { // ✅ Kiểm tra state thay vì fileInputRef
  alert("Chưa chọn ảnh!");
  setIsUploading(false);
  return;
}
const file = selectedFile; // ✅ Lấy file từ state
const fileName = `${Date.now()}_${file.name}`;

    const fileName = ${Date.now()}_${file.name};

    const { data, error } = await supabase.storage.from("uploads").upload(fileName, file);
    if (error) {
      console.error("Lỗi khi tải lên:", error);
      alert("Upload thất bại!");
      setIsUploading(false);
      return;
    }

   const { data: uploadedFile, error } = await supabase.storage.from("uploads").upload(fileName, file);
if (error) {
  console.error("❌ Lỗi khi tải ảnh lên:", error);
  alert("Lỗi upload ảnh!");
  setIsUploading(false);
  return;
}

// 🔥 Lấy URL đúng cách
const { data: publicUrlData, error: urlError } = supabase.storage.from("uploads").getPublicUrl(fileName);
if (urlError || !publicUrlData?.publicUrl) {
  console.error("❌ Không lấy được URL ảnh:", urlError);
  alert("Lỗi: Không lấy được URL ảnh!");
  setIsUploading(false);
  return;
}

const publicUrl = publicUrlData.publicUrl;
console.log("🔵 URL ảnh:", publicUrl);


    addPhoto({
      url: publicUrl,
      description,
      year,
      isSpecial,
      date: new Date(),
    });

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
                  <div className="border-2 border-dashed border-romantic-200 rounded-xl p-8 text-center cursor-pointer hover:border-romantic-400 transition-colors duration-200" onClick={() => fileInputRef.current?.click()}>
                    <Upload size={40} className="mx-auto mb-4 text-romantic-400" />
                    <p className="text-romantic-500 mb-2">Nhấn để tải ảnh lên</p>
                    <p className="text-xs text-romantic-400">Hỗ trợ định dạng JPG, PNG</p>
                    <input
  type="file"
  ref={fileInputRef} // ✅ Vẫn giữ ref để click
  className="hidden"
  accept="image/*"
  onChange={handleFileChange} // ✅ Quan trọng: Lấy file từ đây
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
