// export interface ICourse {
//   _id: string;
//   title: string;
//   description?: string;
//   price?: number;
//   thumbnail?: string;
//   modules?: string[];
//   createdAt?: string;
//   updatedAt?: string;
// }

export interface ICourse {
  title: string;
  description?: string;
  price?: number;
  thumbnail?: string;
  modules: string[];
  createdAt?: string;
  updatedAt?: string;
}

