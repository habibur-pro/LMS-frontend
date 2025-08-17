import { LectureContentType } from "@/enum";

export interface ICourse {
  id: string;
  title: string;
  slug: string;
  price: number;
  description: string;
  thumbnail: string;
  totalSeat: number;
  availableSeat: number;
  modules: Array<IModule>;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IModule {
  id: string;
  title: string;
  courseId: string;
  moduleNumber: number;
  lectures: Array<ILecture>;
  isFree: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ILecture {
  id: string;
  moduleId: string;
  title: string;
  content: string;
  contentType: LectureContentType;
  createdAt: Date;
  updatedAt: Date;
}
