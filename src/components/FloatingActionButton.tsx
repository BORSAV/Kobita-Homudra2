import React from 'react';
import { Plus } from 'lucide-react';

interface FloatingActionButtonProps {
  onClick: () => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-gradient-to-r from-amber-500 to-rose-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:from-amber-600 hover:to-rose-600 transition-all duration-300 transform hover:scale-105 z-40"
    >
      <Plus className="h-6 w-6" />
    </button>
  );
};

export default FloatingActionButton;