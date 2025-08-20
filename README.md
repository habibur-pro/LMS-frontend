# LMS Platform

A **simple and powerful Learning Management System (LMS)** built with **Next.js**.  
This platform allows admins to create courses, manage users, track progress, and process payments securely.

---

## 🌟 Key Features

### 🔐 Authentication & Security
- Secure **user authentication** with **Next.js** and **JWT access/refresh tokens**.
- Role-based access control: Admin, Teacher, Student, etc.
- Protected routes and secure API endpoints.

### 📚 Course Management
- Add, edit, and delete courses with multiple modules and lectures.
- **Image and video upload** for course content.
- Track course progress for students.

### 👥 User & Order Management
- Manage users, assign courses, and track progress.
- Students can enroll in courses.
- Admins can manage orders and view payment history.

### 💳 Payment System
- Integrated **SSL-enabled payment gateway** for course purchases.
- Secure transaction handling and receipts.

### 📈 Course Progress Tracking
- Unlock lectures only after completing previous ones.
- Complete modules to unlock next modules.
- Track overall course completion.

---

## 🧩 Challenges Solved
- Create a **Scalable and efficient Database schema** for store data.
- Implement **Course watch tracker with lock unlock**.


---

## 🚀 Run Project Locally

1. Clone the repository:  
```bash
git clone https://github.com/habibur-pro/LMS-frontend
cd LMS-frontend

2. Install dependencies:
yarn install

3. Configure environment variables (.env):
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1
API_BASE_URL=http://localhost:5000/api/v1
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=f3ff4d05e170bc343869bfd0bad12cbded7aff1b105b23526dbdf3782582ee74

4. Run the development server:
yarn dev
```
5. Open your browser: http://localhost:3000

LMS Platform Live URL
https://llm-minimal.vercel.app/

backend github repo : https://github.com/habibur-pro/LLM-backend


🛠️ Technologies Used

Frontend: Typescript, Next.js, React, Tailwind CSS, Redux, Shadecn, zod

Backend: Nodejs, expressJs, jwt, bcrypt, cloudinary, 

Database: MongoDB, Mongoose

Payments:  SSLCommerz

Others: React Player for video lectures, Email Notifications