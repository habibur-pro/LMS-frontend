export interface Lecture {
  id: string;
  title: string;
  videoUrl: string;
  pdfNotes: string[];
  completed?: boolean;
}

export interface Module {
  id: string;
  title: string;
  moduleNumber: number;
  lectures: Lecture[];
}

export interface Course {
  id: string;
  title: string;
  price: string;
  thumbnail: string;
  description: string;
  modules: Module[];
  instructor: { name: string; photo: string; bio: string };
}

export interface CourseProgress {
  courseId: string;
  completedLectures: string[];
  currentLecture?: string;
}
