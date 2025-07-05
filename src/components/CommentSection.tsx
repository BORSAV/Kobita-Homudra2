import React, { useState } from 'react';
import { Send, Calendar } from 'lucide-react';
import { Comment } from '../types';

interface CommentSectionProps {
  comments: Comment[];
  onComment: (content: string) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({ comments, onComment }) => {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onComment(newComment.trim());
      setNewComment('');
    }
  };

  return (
    <div className="mt-4 pt-4 border-t border-gray-100">
      <div className="space-y-3 mb-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-bold">{comment.author[0]}</span>
            </div>
            <div className="flex-1">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="font-medium text-gray-800 text-sm">{comment.author}</p>
                <p className="text-gray-700 text-sm mt-1">{comment.content}</p>
              </div>
              <div className="flex items-center space-x-1 text-xs text-gray-500 mt-1">
                <Calendar className="h-3 w-3" />
                <span>{new Date(comment.createdAt).toLocaleDateString('bn-BD')}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="এটা মন্তব্য লিখক..."
          className="flex-1 px-3 py-2 bg-gray-50 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all"
        />
        <button
          type="submit"
          disabled={!newComment.trim()}
          className="p-2 bg-gradient-to-r from-amber-500 to-rose-500 text-white rounded-full hover:from-amber-600 hover:to-rose-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
};

export default CommentSection;