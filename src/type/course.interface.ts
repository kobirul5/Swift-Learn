export interface ICourse {
  _id: string;
  title: string;
  description?: string;
  price?: number;
  thumbnail?: string;
  modules?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface IICourse  {
  id: number;
  title: string;
  instructor: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  students: number;
  rating: number; 
  price: number;
  image: string;
  featured?: boolean;
};