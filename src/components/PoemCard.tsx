import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Calendar } from 'lucide-react';
import { Poem } from '../types';
import CommentSection from './CommentSection';

interface PoemCardProps {
  poem: Poem;
  onLike: (id: string) => void;
  onComment: (poemId: string, content: string) => void;
  onShare: (id: string) => void;
}

const backgroundPatterns = [
  'bg-gradient-to-br from-amber-50 to-rose-50',
  'bg-gradient-to-br from-blue-50 to-indigo-50',
  'bg-gradient-to-br from-green-50 to-teal-50',
  'bg-gradient-to-br from-purple-50 to-pink-50',
  'bg-gradient-to-br from-orange-50 to-red-50'
];

const PoemCard: React.FC<PoemCardProps> = ({ poem, onLike, onComment, onShare }) => {
  const [showComments, setShowComments] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const backgroundClass = backgroundPatterns[parseInt(poem.id) % backgroundPatterns.length];
  const truncatedContent = poem.content.length > 300 ? poem.content.substring(0, 300) + '...' : poem.content;

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className={`${backgroundClass} p-6 relative`}>
        <div className="absolute top-4 right-4 opacity-20">
          <div className="w-20 h-20 bg-white/30 rounded-full flex items-center justify-center">
            <span className="text-2xl">❝</span>
          </div>
        </div>
        
        <div className="relative z-10">
          <h3 className="text-xl font-bold text-gray-800 mb-3 leading-tight">{poem.title}</h3>
          <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {isExpanded ? poem.content : truncatedContent}
          </div>
          
          {poem.content.length > 300 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-3 text-amber-600 hover:text-amber-700 font-medium text-sm transition-colors"
            >
              {isExpanded ? 'কম চাওক' : 'আৰু পঢ়ক'}
            </button>
          )}
        </div>
      </div>
      
      <div className="p-4 bg-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-rose-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">{poem.author[0]}</span>
            </div>
            <div>
              <p className="font-medium text-gray-800">{poem.author}</p>
              <div className="flex items-center space-x-1 text-xs text-gray-500">
                <Calendar className="h-3 w-3" />
                <span>{new Date(poem.createdAt).toLocaleDateString('bn-BD')}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-center space-x-6">
            <button
              onClick={() => onLike(poem.id)}
              className={`flex items-center space-x-2 px-3 py-1 rounded-full transition-all ${
                poem.isLiked 
                  ? 'bg-rose-50 text-rose-600' 
                  : 'hover:bg-gray-50 text-gray-600'
              }`}
            >
              <Heart className={`h-4 w-4 ${poem.isLiked ? 'fill-current' : ''}`} />
              <span className="text-sm font-medium">{poem.likes}</span>
            </button>
            
            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center space-x-2 px-3 py-1 rounded-full hover:bg-gray-50 text-gray-600 transition-all"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="text-sm font-medium">শ্বেয়াৰ</span>
            </button>
          </div>
          
          <button
            onClick={() => onShare(poem.id)}
            className="flex items-center space-x-2 px-3 py-1 rounded-full hover:bg-gray-50 text-gray-600 transition-all"
          >
            <Share2 className="h-4 w-4" />
            <span className="text-sm font-medium">শেয়ার</span>
          </button>
        </div>
        
        {showComments && (
          <CommentSection
            comments={poem.comments}
            onComment={(content) => onComment(poem.id, content)}
          />
        )}
      </div>
    </div>
  );
};

export default PoemCard;