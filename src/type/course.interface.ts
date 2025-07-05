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
  _id:string
  title: string;
  description?: string;
  price?: number;
  thumbnail?: string;
  rating:number;
  modules: string[];
  createdAt?: string;
  updatedAt?: string;
}

