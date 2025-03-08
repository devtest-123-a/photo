import React, { useState, useRef } from 'react';
import { supabase } from "../supabaseClient";
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
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // ✅ Thêm state lưu file
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
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
    setSelectedFile(null); // ✅ Reset file
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile) { // ✅ Kiểm tra state thay vì fileInputRef
      alert("Chưa chọn ảnh!");
      setIsUploading(false);
      return;
    }

    setIsUploading(true);

    const file = selectedFile; // ✅ Lấy file từ state
    const fileName = `${Date.now()}_${file.name}`;

    const { data, error } = await supabase.storage.from("uploads").upload(fileName, file);
    if (error) {
      console.error("Lỗi khi tải lên:", error);
      alert("Upload thất bại!");
      setIsUploading(false);
      return;
    }

    const publicUrl = supabase.storage.from("uploads").getPublicUrl(fileName).data.publicUrl;

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
  };

  return (
    <>
      <button 
        className="px-6 py-3 btn-primary flex items-center shadow-lg"
        onClick={() => setIsOpen(true)}
      >
        <Upload size={20} className="mr-2" />
        Thêm kỷ niệm mới
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-black/60">
          <div className="relative w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg">
            <button
              className="absolute top-3 right-3"
              onClick={() => setIsOpen(false)}
            >
              <X size={20} />
            </button>

            <h2 className="text-2xl font-bold text-center mb-6">
              Thêm kỷ niệm mới
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                {!imagePreview ? (
                  <div className="border-2 border-dashed p-8 text-center cursor-pointer" 
                       onClick={() => fileInputRef.current?.click()}>
                    <Upload size={40} className="mx-auto mb-4" />
                    <p className="mb-2">Nhấn để tải ảnh lên</p>
                    <p className="text-xs">Hỗ trợ định dạng JPG, PNG</p>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange} // ✅ Đảm bảo chọn ảnh hoạt động
                    />
                  </div>
                ) : (
                  <div className="relative rounded-xl overflow-hidden h-48">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      className="absolute top-2 right-2"
                      onClick={() => {
                        setImagePreview(null);
                        setSelectedFile(null); // ✅ Xóa file khi ấn x
                      }}
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-1">Mô tả kỷ niệm</label>
                  <textarea
                    className="w-full p-3 border rounded-lg"
                    rows={3}
                    placeholder="Mô tả kỷ niệm..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="special"
                    className="mr-2"
                    checked={isSpecial}
                    onChange={(e) => setIsSpecial(e.target.checked)}
                  />
                  <label htmlFor="special">Đánh dấu là kỷ niệm đặc biệt</label>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button type="button" className="btn-secondary" onClick={() => setIsOpen(false)} disabled={isUploading}>
                    Hủy
                  </button>
                  <button type="submit" className="btn-primary" disabled={!selectedFile || !description || isUploading}>
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
