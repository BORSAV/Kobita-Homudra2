import React, { useState } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';

interface PoemFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string, content: string, author: string) => void;
}

const PoemForm: React.FC<PoemFormProps> = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && content.trim() && author.trim()) {
      onSubmit(title.trim(), content.trim(), author.trim());
      setTitle('');
      setContent('');
      setAuthor('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent">
            নতুন কবিতা লিখক
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                লেখকৰ নাম
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all"
                placeholder="আপোনাৰ নাম লিখক..."
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                কবিতাৰ শিৰোনাম
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all"
                placeholder="আপোনাৰ কবিতাৰ শিৰোনাম লিখক..."
                required
              />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  কবিতাৰ বিষয়বস্তু
                </label>
                <button
                  type="button"
                  onClick={() => setShowPreview(!showPreview)}
                  className="flex items-center space-x-1 text-sm text-amber-600 hover:text-amber-700 transition-colors"
                >
                  {showPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  <span>{showPreview ? 'সম্পাদনা' : 'পূৰ্বদৰ্শন'}</span>
                </button>
              </div>
              
              {showPreview ? (
                <div className="w-full p-4 bg-gradient-to-br from-amber-50 to-rose-50 rounded-lg min-h-[200px] border-2 border-dashed border-amber-200">
                  <h3 className="font-bold text-lg text-gray-800 mb-3">{title || 'কবিতাৰ শিৰোনাম'}</h3>
                  <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {content || 'ইয়াত আপোনাৰ কবিতা দেখা যাব...'}
                  </div>
                  <div className="mt-4 pt-4 border-t border-amber-200">
                    <p className="text-sm text-gray-600">- {author || 'লেখকৰ নাম'}</p>
                  </div>
                </div>
              ) : (
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all resize-none"
                  placeholder="আপোনাৰ কবিতা লিখক..."
                  rows={10}
                  required
                />
              )}
            </div>
            
            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                বাতিল কৰক
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-gradient-to-r from-amber-500 to-rose-500 text-white rounded-lg hover:from-amber-600 hover:to-rose-600 transition-all font-medium"
              >
                প্ৰকাশ কৰক
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PoemForm;