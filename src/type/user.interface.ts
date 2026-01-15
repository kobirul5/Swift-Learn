export interface IUser {
  _id: string
  name: string;
  email: string;
  password?: string;
  image?: string;
  education?: string;
  role?: 'admin' | 'student';
  createdAt?: string;
}
