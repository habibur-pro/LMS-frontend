import type { Course } from "@/types/course";

export const sampleCourses: Course[] = [
  {
    id: "1",
    title: "JavaScript Fundamentals",
    price: 49,
    thumbnail: "/images/course.jpg",
    description:
      "Master the fundamentals of JavaScript programming from variables to advanced concepts.",
    instructor: {
      name: "John Doe",
      photo: "/images/user.jpg",
      bio: "Senior JavaScript Developer with 10 years of experience.",
    },
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
    price: 79,
    thumbnail: "/images/course.jpg",
    description:
      "Build modern web applications with React, hooks, and component architecture.",
    instructor: {
      name: "Jane Smith",
      photo: "/images/user.jpg",
      bio: "Fullstack Developer specializing in React and modern web technologies.",
    },
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
    price: 69,
    thumbnail: "/images/course.jpg",
    description:
      "Learn server-side development with Node.js, Express, and database integration.",
    instructor: {
      name: "Michael Johnson",
      photo: "/images/user.jpg",
      bio: "Backend Developer with extensive experience in Node.js and databases.",
    },
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
    price: 39,
    thumbnail: "/images/course.jpg",
    description:
      "Start your programming journey with Python, the most beginner-friendly language.",
    instructor: {
      name: "Emily Davis",
      photo: "/images/user.jpg",
      bio: "Python Developer and Educator, passionate about teaching beginners.",
    },
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
  {
    id: "5",
    title: "Python Beginner to Advance",
    price: 39,
    thumbnail: "/images/course.jpg",
    description:
      "Start your programming journey with Python, the most beginner-friendly language.",
    instructor: {
      name: "Emily Davis",
      photo: "/images/user.jpg",
      bio: "Python Developer and Educator, passionate about teaching beginners.",
    },
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
