export interface ILecture {
  _id: string;
  module: string;
  course: string;
  title: string;
  videoUrl?: string;
  notes: string[];
}

export interface IModule {
  _id: string;
  course: string;
  title: string;
  description: string;
  isActive: true;
  lectures: ILecture[];
  createdAt: Date;
  updatedAt: Date;
  moduleNumber: number;
}
