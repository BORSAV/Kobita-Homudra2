import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import PoemCard from './components/PoemCard';
import PoemForm from './components/PoemForm';
import FloatingActionButton from './components/FloatingActionButton';
import { Poem } from './types';

const initialPoems: Poem[] = [
  {
    id: '1',
    title: 'আকাশৰ গান',
    content: 'নীল আকাশত মেঘৰ খেলা,\nবতাহত ভাহে সুৰৰ মেলা।\nচৰাইবোৰে গায় মধুৰ গান,\nমনত জাগে অনন্ত প্ৰাণ।\n\nসূৰ্যৰ পোহৰ সোণালী ৰশ্মি,\nফুলৰ বাৰীত মধুৰ স্মৃতি।\nজীৱন যেন এক সপোন,\nভালপোৱাত হৃদয় মগন।',
    author: 'ৰাহুল শৰ্মা',
    createdAt: '2024-01-15T10:30:00Z',
    likes: 24,
    comments: [
      {
        id: '1',
        author: 'প্ৰিয়া দেৱী',
        content: 'অসাধাৰণ! বৰ ধুনীয়া লাগিছে।',
        createdAt: '2024-01-15T11:00:00Z'
      }
    ],
    isLiked: false
  },
  {
    id: '2',
    title: 'বৰষুণৰ ৰাতি',
    content: 'ক\'লা মেঘত ঢকা আকাশ,\nবৰষুণৰ ছন্দত হৃদয় উদাস।\nমাটিৰ গোন্ধত মন ভৰি যায়,\nপুৰণি কথা মনত পৰে আজি।\n\nঘৰৰ চালত বৰষুণৰ শব্দ,\nমনৰ গভীৰত জাগে অনুভৱ।\nএনে ৰাতিত কোনে যেন মাতে,\nস্মৃতিৰ পাতত নাম লিখা থাকে।',
    author: 'মিতা বৰুৱা',
    createdAt: '2024-01-14T18:45:00Z',
    likes: 31,
    comments: [
      {
        id: '2',
        author: 'অনিল কুমাৰ',
        content: 'বৰষুণৰ অনুভূতি বৰ ধুনীয়াকৈ ফুটি উঠিছে।',
        createdAt: '2024-01-14T19:00:00Z'
      },
      {
        id: '3',
        author: 'সুমিত্ৰা দাস',
        content: 'প্ৰতিটো শাৰী হৃদয় চুই গৈছে।',
        createdAt: '2024-01-14T19:30:00Z'
      }
    ],
    isLiked: true
  },
  {
    id: '3',
    title: 'মাকৰ ভালপোৱা',
    content: 'মাকৰ দৰে কোনো নাই জগতত,\nভালপোৱাৰ এনে ৰূপ।\nকষ্টত দুখত কাষত থাকে,\nজীৱনৰ প্ৰতিটো ৰূপ।\n\nৰাতিৰ আন্ধাৰত জাগি থাকে,\nসন্তানৰ কল্যাণত।\nমাকৰ আশীৰ্বাদ, মাকৰ দোৱা,\nজীৱনৰ আটাইতকৈ দামী সম্পদ।',
    author: 'দীপক শৰ্মা',
    createdAt: '2024-01-13T15:20:00Z',
    likes: 47,
    comments: [
      {
        id: '4',
        author: 'ৰীতা বেগম',
        content: 'মাকৰ প্ৰতি এনে শ্ৰদ্ধা দেখি ভাল লাগিল।',
        createdAt: '2024-01-13T16:00:00Z'
      }
    ],
    isLiked: false
  }
];

function App() {
  const [poems, setPoems] = useState<Poem[]>(initialPoems);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [filteredPoems, setFilteredPoems] = useState<Poem[]>(poems);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = poems.filter(poem =>
        poem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        poem.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        poem.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPoems(filtered);
    } else {
      setFilteredPoems(poems);
    }
  }, [searchQuery, poems]);

  const handleLike = (id: string) => {
    setPoems(prevPoems =>
      prevPoems.map(poem =>
        poem.id === id
          ? {
              ...poem,
              likes: poem.isLiked ? poem.likes - 1 : poem.likes + 1,
              isLiked: !poem.isLiked
            }
          : poem
      )
    );
  };

  const handleComment = (poemId: string, content: string) => {
    const newComment = {
      id: Date.now().toString(),
      author: 'আপুনি',
      content,
      createdAt: new Date().toISOString()
    };

    setPoems(prevPoems =>
      prevPoems.map(poem =>
        poem.id === poemId
          ? { ...poem, comments: [...poem.comments, newComment] }
          : poem
      )
    );
  };

  const handleShare = (id: string) => {
    const poem = poems.find(p => p.id === id);
    if (poem) {
      navigator.clipboard.writeText(
        `${poem.title}\n\n${poem.content}\n\n- ${poem.author}`
      );
      alert('কবিতা কপি হ\'ল!');
    }
  };

  const handleSubmitPoem = (title: string, content: string, author: string) => {
    const newPoem: Poem = {
      id: Date.now().toString(),
      title,
      content,
      author,
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: [],
      isLiked: false
    };

    setPoems(prevPoems => [newPoem, ...prevPoems]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-blue-50">
      <Header onSearch={setSearchQuery} searchQuery={searchQuery} />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            অসমীয়া কবিতাৰ জগত
          </h2>
          <p className="text-gray-600 text-lg">
            আপোনাৰ মনৰ কথা কবিতাত প্ৰকাশ কৰক আৰু আনৰ সৈতে ভাগ বতৰা কৰক
          </p>
        </div>

        {filteredPoems.length > 0 ? (
          <div className="grid gap-8 md:gap-12">
            {filteredPoems.map((poem) => (
              <PoemCard
                key={poem.id}
                poem={poem}
                onLike={handleLike}
                onComment={handleComment}
                onShare={handleShare}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">কোনো কবিতা পোৱা নগ'ল</p>
            <p className="text-gray-400 mt-2">আন কিবা বিচাৰি চাওক</p>
          </div>
        )}
      </main>

      <FloatingActionButton onClick={() => setIsFormOpen(true)} />
      
      <PoemForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSubmitPoem}
      />
    </div>
  );
}

export default App;