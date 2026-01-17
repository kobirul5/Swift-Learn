export interface IUser {
  _id: string
  name: string;
  email: string;
  status?: 'active' | 'inactive' | 'banned' | 'deleted';
  
  password?: string;
  image?: string;
  education?: string;
  role?: 'admin' | 'student';
  createdAt?: string;
}
