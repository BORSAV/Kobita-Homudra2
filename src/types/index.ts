export interface Poem {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  likes: number;
  comments: Comment[];
  isLiked: boolean;
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
}