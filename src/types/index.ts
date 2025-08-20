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
