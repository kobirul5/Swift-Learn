export interface IUser {
  _id:string
  name: string;
  email: string;
  password?: string;
  image?: string;
  role?: 'admin' | 'student';
  createdAt?: Date
}
