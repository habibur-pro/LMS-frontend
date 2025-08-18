import { Course } from "@/types/course";

export const sampleCourses: Course[] = [
  {
    id: "1",
    title: "JavaScript Fundamentals",
    price: "$49",
    thumbnail: "/placeholder-xeerg.png",
    description:
      "Master the fundamentals of JavaScript programming from variables to advanced concepts.",
    modules: [
      {
        id: "m1",
        title: "Introduction to JavaScript",
        moduleNumber: 1,
        lectures: [
          {
            id: "l1",
            title: "Welcome to JavaScript",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            pdfNotes: ["/pdfs/js-intro-1.pdf", "/pdfs/js-intro-2.pdf"],
          },
          {
            id: "l2",
            title: "Variables and Data Types",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            pdfNotes: ["/pdfs/js-variables.pdf"],
          },
        ],
      },
      {
        id: "m2",
        title: "Functions and Scope",
        moduleNumber: 2,
        lectures: [
          {
            id: "l3",
            title: "Function Declarations",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            pdfNotes: ["/pdfs/js-functions.pdf"],
          },
        ],
      },
    ],
  },
  {
    id: "2",
    title: "React Development",
    price: "$79",
    thumbnail: "/react-course-thumbnail.png",
    description:
      "Build modern web applications with React, hooks, and component architecture.",
    modules: [
      {
        id: "m3",
        title: "React Basics",
        moduleNumber: 1,
        lectures: [
          {
            id: "l4",
            title: "Introduction to React",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            pdfNotes: ["/pdfs/react-intro.pdf"],
          },
        ],
      },
    ],
  },
  {
    id: "3",
    title: "Node.js Backend",
    price: "$69",
    thumbnail: "/nodejs-backend-course.png",
    description:
      "Learn server-side development with Node.js, Express, and database integration.",
    modules: [
      {
        id: "m4",
        title: "Node.js Fundamentals",
        moduleNumber: 1,
        lectures: [
          {
            id: "l5",
            title: "Setting up Node.js",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            pdfNotes: ["/pdfs/nodejs-setup.pdf"],
          },
        ],
      },
    ],
  },
  {
    id: "4",
    title: "Python for Beginners",
    price: "$39",
    thumbnail: "/python-for-beginners.png",
    description:
      "Start your programming journey with Python, the most beginner-friendly language.",
    modules: [
      {
        id: "m5",
        title: "Python Basics",
        moduleNumber: 1,
        lectures: [
          {
            id: "l6",
            title: "Hello Python",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            pdfNotes: ["/pdfs/python-hello.pdf"],
          },
        ],
      },
    ],
  },
];
