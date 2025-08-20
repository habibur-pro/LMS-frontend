import {
  CourseStatus,
  LectureContentType,
  OrderStatus,
  PaymentStatus,
  UserRole,
} from "@/enum";

export interface IUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface IModule {
  id: string;
  title: string;
  moduleNumber: number;
  lectures: Array<ILecture>;
  isFree: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ILecture {
  id: string;
  title: string;
  content: string;
  contentType: LectureContentType;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICourse {
  _id: string;
  id: string;
  title: string;
  slug: string;
  price: number;
  discountedPrice: number;
  description: string;
  thumbnail: string;
  coverPhoto: string;
  duration: number;
  totalSeat: number;
  availableSeat: number;
  modules: Array<IModule>;
  tags: string[];
  learningPoints: string[];
  requirements: string[];
  faqs: { question: string; answer: string }[];
  instructor: IUser;
  status: CourseStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrder {
  id: string;
  amount: number;
  status: OrderStatus;
  payment: IPayment; // ObjectId (Payment)
  user: IUser; // ObjectId (User)
  course: ICourse; // ObjectId[] (Course)
  createdAt: Date;
  updatedAt: Date;
}

export interface IPayment {
  id: string;
  amount: number;
  status: PaymentStatus;
  gateway: string;
  transactionId: string;
  user: IUser; // ObjectId (User)
  order: IOrder; // ObjectId (Order)
  createdAt: Date;
  updatedAt: Date;
}

export interface IWatchedLecture {
  lecture: ILecture; // FK → Lecture.id
  watchedAt: Date;
}

export interface ICompletedModules {
  module: IModule; // FK → Module.id
  lecturesWatched: IWatchedLecture[];
  isCompleted: boolean;
  completedAt?: Date;
}

export interface IMyClass {
  id: string;
  user: IUser; // FK → User.id
  course: ICourse; // FK → Course.id
  completedModules: ICompletedModules[];
  overallProgress: number; // %
  isCompleted: boolean;
  prevLecture: ILecture;
  currentLecture: ILecture;
  completedAt?: Date;
  createdAt?: Date; // from { timestamps: true }
  updatedAt?: Date; // from { timestamps: true }
}

// Lecture interface
export interface ILecture {
  _id: string;
  title: string;
  duration: number;
  contentType: LectureContentType; // e.g., 'video', 'pdf'
  content: string; // URL or text
  resources?: string[];
  quizzes?: any[]; // or define a Quiz type
  isCompleted: boolean;
  isUnlocked: boolean;
}

// Module interface
export interface IModule {
  id: string;
  title: string;
  isCompleted: boolean;
  lectures: ILecture[];
}

// Completed lecture record
export interface ILecturesWatched {
  lecture: string; // Lecture ID
  watchedAt: Date;
}

// Completed module record
export interface ICompletedModule {
  module: string; // Module ID
  lecturesWatched: ILecturesWatched[];
  isCompleted: boolean;
  completedAt: Date | null;
}

// MyClass response type
export interface IMyClassWithProgress {
  id: string;
  user: string; // User ID
  course: {
    id: string;
    title: string;
    modules: IModule[];
  };
  completedModules: ICompletedModule[];
  progress: number; // overall % progress
  currentLecture: ILecture | null;
  nextLecture: ILecture | null;
}
