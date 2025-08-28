"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Award,
  Star,
  ChevronLeft,
  ChevronRight,
  Code,
  Database,
  Shield,
  Smartphone,
  BookOpen,
  Calendar,
  ArrowRight,
  Play,
  Zap,
  Globe,
  Target,
} from "lucide-react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { sampleCourses } from "@/data/sampleCourses";

export default function HomePage() {
  const session = useSession();
  const user = session?.data?.user;
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentCategorySlide, setCurrentCategorySlide] = useState(0);
  const [currentNewestSlide, setCurrentNewestSlide] = useState(0);

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sampleCourses.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentCategorySlide(
        (prev) => (prev + 1) % Math.ceil(categories.length / 4)
      );
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentNewestSlide(
        (prev) => (prev + 1) % Math.ceil(sampleCourses.length / 4)
      );
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sampleCourses.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + sampleCourses.length) % sampleCourses.length
    );
  };

  const nextCategorySlide = () => {
    setCurrentCategorySlide(
      (prev) => (prev + 1) % Math.ceil(categories.length / 4)
    );
  };

  const prevCategorySlide = () => {
    setCurrentCategorySlide(
      (prev) =>
        (prev - 1 + Math.ceil(categories.length / 4)) %
        Math.ceil(categories.length / 4)
    );
  };

  const nextNewestSlide = () => {
    setCurrentNewestSlide(
      (prev) => (prev + 1) % Math.ceil(sampleCourses.length / 4)
    );
  };

  const prevNewestSlide = () => {
    setCurrentNewestSlide(
      (prev) =>
        (prev - 1 + Math.ceil(sampleCourses.length / 4)) %
        Math.ceil(sampleCourses.length / 4)
    );
  };

  const categories = [
    { name: "Web Development", icon: Code, count: 45, color: "bg-purple-500" },
    { name: "Data Science", icon: Database, count: 32, color: "bg-blue-500" },
    { name: "Cybersecurity", icon: Shield, count: 28, color: "bg-pink-500" },
    {
      name: "Mobile Development",
      icon: Smartphone,
      count: 24,
      color: "bg-indigo-500",
    },
    {
      name: "Python Programming",
      icon: Code,
      count: 38,
      color: "bg-violet-500",
    },
    {
      name: "Ethical Hacking",
      icon: Shield,
      count: 22,
      color: "bg-fuchsia-500",
    },
    {
      name: "Machine Learning",
      icon: Database,
      count: 29,
      color: "bg-purple-600",
    },
    { name: "Cloud Computing", icon: Globe, count: 31, color: "bg-blue-600" },
  ];

  const instructors = [
    {
      name: "Sarah Johnson",
      expertise: "Full Stack Developer",
      experience: "8+ years",
      students: "12,000+",
      rating: 4.9,
      image: "/professional-headshot-alex.png",
    },
    {
      name: "Michael Chen",
      expertise: "Data Scientist",
      experience: "10+ years",
      students: "8,500+",
      rating: 4.8,
      image: "/professional-headshot-jessica.png",
    },
    {
      name: "Emily Davis",
      expertise: "Cybersecurity Expert",
      experience: "12+ years",
      students: "6,200+",
      rating: 4.9,
      image: "/professional-headshot-david.png",
    },
  ];

  const blogPosts = [
    {
      title: "10 Essential JavaScript Concepts Every Developer Should Know",
      excerpt:
        "Master these fundamental JavaScript concepts to become a more effective developer...",
      date: "Dec 15, 2024",
      readTime: "5 min read",
      category: "JavaScript",
      image: "/react-course-thumbnail.png",
    },
    {
      title: "The Future of Web Development: Trends to Watch in 2025",
      excerpt:
        "Explore the emerging technologies and frameworks that will shape web development...",
      date: "Dec 12, 2024",
      readTime: "8 min read",
      category: "Web Development",
      image: "/nodejs-backend-course.png",
    },
    {
      title: "Building Secure Applications: A Developer's Guide",
      excerpt:
        "Learn essential security practices to protect your applications from common vulnerabilities...",
      date: "Dec 10, 2024",
      readTime: "6 min read",
      category: "Security",
      image: "/python-for-beginners.png",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* ... existing hero section ... */}
      <section className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 py-24 overflow-hidden text-white">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-5xl mx-auto text-center">
            <Badge className="mb-6 bg-purple-700/50 text-purple-100 border-purple-600 px-4 py-2 text-sm font-medium">
              ⚡ New courses launching weekly!
            </Badge>
            <h1 className="text-6xl md:text-7xl font-black mb-8 leading-tight">
              Transform Your
              <span className="gradient-text block"> Future Today</span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed text-purple-100">
              Join 50,000+ learners mastering cutting-edge skills through our
              immersive, expert-led courses designed for the modern
              professional.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/auth/register">
                <Button
                  size="lg"
                  className="gradient-button text-lg px-10 py-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  ⚡ Start Your Journey
                </Button>
              </Link>
              <Link href="/courses">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-10 py-6 border-2 border-purple-300 text-purple-100 hover:bg-purple-700/30 transition-all duration-300 bg-transparent"
                >
                  🔍 Explore Courses
                </Button>
              </Link>
            </div>
            <div className="mt-12 flex items-center justify-center space-x-8 text-sm text-purple-200">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Certified Content</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Global Community</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Industry Recognition</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ... existing featured courses section ... */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-100 text-purple-700 border-purple-200">
              Featured Content
            </Badge>
            <h2 className="text-5xl font-bold mb-6 text-gray-900">
              Most Popular Courses
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of students in our top-rated courses designed by
              industry experts
            </p>
          </div>

          <div className="relative max-w-6xl mx-auto">
            <div className="overflow-hidden rounded-2xl shadow-2xl">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {sampleCourses.map((course, index) => (
                  <div key={course.id} className="w-full flex-shrink-0">
                    <Card className="mx-4 overflow-hidden hover:shadow-2xl transition-all duration-500 border-0 bg-white">
                      <div className="md:flex">
                        <div className="md:w-1/2">
                          <div className="relative h-80 md:h-full">
                            <Image
                              src={course.thumbnail || "/placeholder.svg"}
                              alt={course.title}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                            <div className="absolute inset-0 bg-purple-600/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-all duration-300">
                              <Button
                                size="lg"
                                className="gradient-button rounded-full shadow-lg transform hover:scale-110 transition-transform text-white"
                              >
                                <Play className="w-6 h-6 mr-2" />
                                Preview Course
                              </Button>
                            </div>
                            <Badge className="absolute top-6 left-6 bg-purple-600 text-white shadow-lg">
                              🔥 Trending
                            </Badge>
                          </div>
                        </div>
                        <div className="md:w-1/2 p-10">
                          <div className="flex items-center space-x-2 mb-4">
                            <Badge
                              variant="secondary"
                              className="bg-purple-100 text-purple-700"
                            >
                              Best Seller
                            </Badge>
                            <Badge
                              variant="outline"
                              className="border-gray-300 text-gray-600"
                            >
                              Updated 2024
                            </Badge>
                          </div>
                          <h3 className="text-3xl font-bold mb-4 text-gray-900 leading-tight">
                            {course.title}
                          </h3>
                          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                            {course.description}
                          </p>
                          <div className="flex items-center justify-between mb-8">
                            <div>
                              <span className="text-4xl font-black text-purple-600">
                                {course.price}
                              </span>
                              <span className="text-lg text-gray-500 line-through ml-2">
                                $199
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className="w-5 h-5 fill-yellow-400 text-yellow-400"
                                />
                              ))}
                              <span className="text-sm text-gray-500 ml-2">
                                (4.9 • 2,847 reviews)
                              </span>
                            </div>
                          </div>
                          <Link href={`/courses/${course.id}`}>
                            <Button className="gradient-button w-full text-lg py-6 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                              Enroll Now - Limited Time
                              <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white shadow-xl border-2 border-gray-200 hover:bg-gray-50 transition-all duration-300 w-12 h-12"
              onClick={prevSlide}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white shadow-xl border-2 border-gray-200 hover:bg-gray-50 transition-all duration-300 w-12 h-12"
              onClick={nextSlide}
            >
              <ChevronRight className="w-6 h-6" />
            </Button>

            <div className="flex justify-center mt-8 space-x-3">
              {sampleCourses.map((_, index) => (
                <button
                  key={index}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "bg-purple-600 scale-125"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-100 text-purple-700 border-purple-200">
              Explore Topics
            </Badge>
            <h2 className="text-5xl font-bold mb-6 text-gray-900">
              Popular Categories
            </h2>
            <p className="text-xl text-gray-600">
              Discover your passion and start your learning journey
            </p>
          </div>

          <div className="relative max-w-6xl mx-auto">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{
                  transform: `translateX(-${currentCategorySlide * 100}%)`,
                }}
              >
                {Array.from(
                  { length: Math.ceil(categories.length / 4) },
                  (_, slideIndex) => (
                    <div key={slideIndex} className="w-full flex-shrink-0">
                      <div className="grid grid-cols-4 gap-6 px-4">
                        {categories
                          .slice(slideIndex * 4, slideIndex * 4 + 4)
                          .map((category, index) => (
                            <Card
                              key={slideIndex * 4 + index}
                              className="group hover:shadow-xl transition-all duration-500 hover:scale-105 cursor-pointer bg-white border-0 shadow-lg"
                            >
                              <CardContent className="p-8 text-center">
                                <div
                                  className={`w-20 h-20 ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                                >
                                  <category.icon className="w-10 h-10 text-white" />
                                </div>
                                <h3 className="font-bold text-xl mb-3 text-gray-900 group-hover:text-purple-600 transition-colors">
                                  {category.name}
                                </h3>
                                <p className="text-gray-600 font-medium">
                                  {category.count} courses available
                                </p>
                                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-purple-600"
                                  >
                                    Explore{" "}
                                    <ArrowRight className="w-4 h-4 ml-1" />
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white shadow-xl border-2 border-gray-200 hover:bg-gray-50 transition-all duration-300 w-12 h-12"
              onClick={prevCategorySlide}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white shadow-xl border-2 border-gray-200 hover:bg-gray-50 transition-all duration-300 w-12 h-12"
              onClick={nextCategorySlide}
            >
              <ChevronRight className="w-6 h-6" />
            </Button>

            <div className="flex justify-center mt-8 space-x-3">
              {Array.from(
                { length: Math.ceil(categories.length / 4) },
                (_, index) => (
                  <button
                    key={index}
                    className={`w-4 h-4 rounded-full transition-all duration-300 ${
                      index === currentCategorySlide
                        ? "bg-purple-600 scale-125"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    onClick={() => setCurrentCategorySlide(index)}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold mb-4 text-gray-900">
                Newest Courses
              </h2>
              <p className="text-xl text-gray-600">
                Stay updated with our latest course offerings
              </p>
            </div>
            <Link href="/courses">
              <Button
                variant="outline"
                className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                View All Courses
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="relative max-w-6xl mx-auto">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{
                  transform: `translateX(-${currentNewestSlide * 100}%)`,
                }}
              >
                {Array.from(
                  { length: Math.ceil(sampleCourses.length / 4) },
                  (_, slideIndex) => (
                    <div key={slideIndex} className="w-full flex-shrink-0">
                      <div className="grid grid-cols-4 gap-6 px-4">
                        {sampleCourses
                          .slice(slideIndex * 4, slideIndex * 4 + 4)
                          .map((course) => (
                            <Card
                              key={course.id}
                              className="hover:shadow-lg transition-shadow bg-white"
                            >
                              <div className="relative h-48">
                                <Image
                                  src={course.thumbnail || "/placeholder.svg"}
                                  alt={course.title}
                                  fill
                                  className="object-cover rounded-t-lg"
                                />
                                <Badge className="absolute top-4 left-4 bg-green-500 text-white">
                                  New
                                </Badge>
                              </div>
                              <CardContent className="p-4">
                                <h3 className="font-bold mb-2 text-gray-900">
                                  {course.title}
                                </h3>
                                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                  {course.description}
                                </p>
                                <div className="flex justify-between items-center">
                                  <span className="font-bold text-purple-600">
                                    {course.price}
                                  </span>
                                  <div className="flex items-center space-x-1">
                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    <span className="text-sm text-gray-500">
                                      4.8
                                    </span>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white shadow-xl border-2 border-gray-200 hover:bg-gray-50 transition-all duration-300 w-12 h-12"
              onClick={prevNewestSlide}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white shadow-xl border-2 border-gray-200 hover:bg-gray-50 transition-all duration-300 w-12 h-12"
              onClick={nextNewestSlide}
            >
              <ChevronRight className="w-6 h-6" />
            </Button>

            <div className="flex justify-center mt-8 space-x-3">
              {Array.from(
                { length: Math.ceil(sampleCourses.length / 4) },
                (_, index) => (
                  <button
                    key={index}
                    className={`w-4 h-4 rounded-full transition-all duration-300 ${
                      index === currentNewestSlide
                        ? "bg-purple-600 scale-125"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    onClick={() => setCurrentNewestSlide(index)}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ... existing code for remaining sections ... */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Meet Our Expert Instructors
            </h2>
            <p className="text-xl text-gray-600">
              Learn from industry professionals with proven track records
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {instructors.map((instructor, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow bg-white"
              >
                <CardContent className="p-6">
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <Image
                      src={instructor.image || "/placeholder.svg"}
                      alt={instructor.name}
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                  <h3 className="font-bold text-xl mb-2 text-gray-900">
                    {instructor.name}
                  </h3>
                  <p className="text-purple-600 font-semibold mb-2">
                    {instructor.expertise}
                  </p>
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <p>{instructor.experience} experience</p>
                    <p>{instructor.students} students taught</p>
                  </div>
                  <div className="flex items-center justify-center space-x-1 mb-4">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{instructor.rating}</span>
                    <span className="text-gray-500">rating</span>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    View Profile
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Trusted by Learners Worldwide
            </h2>
            <p className="text-xl opacity-90">
              Join our growing community of successful students
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-5xl font-black mb-3 group-hover:scale-110 transition-transform duration-300">
                50,000+
              </div>
              <div className="text-lg opacity-90">Active Students</div>
            </div>
            <div className="group">
              <div className="text-5xl font-black mb-3 group-hover:scale-110 transition-transform duration-300">
                200+
              </div>
              <div className="text-lg opacity-90">Expert Courses</div>
            </div>
            <div className="group">
              <div className="text-5xl font-black mb-3 group-hover:scale-110 transition-transform duration-300">
                95%
              </div>
              <div className="text-lg opacity-90">Success Rate</div>
            </div>
            <div className="group">
              <div className="text-5xl font-black mb-3 group-hover:scale-110 transition-transform duration-300">
                24/7
              </div>
              <div className="text-lg opacity-90">Support</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <Badge className="mb-4 bg-purple-100 text-purple-700 border-purple-200">
              Why Choose Us
            </Badge>
            <h2 className="text-5xl font-bold mb-6 text-gray-900">
              Experience Learning Excellence
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform combines cutting-edge technology with proven teaching
              methods to deliver an unmatched learning experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group text-center hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-white border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="mx-auto w-20 h-20 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-2xl group-hover:text-purple-600 transition-colors text-gray-900">
                  Expert Instructors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg leading-relaxed text-gray-600">
                  Learn from industry professionals with years of real-world
                  experience and proven track records in their fields.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group text-center hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-white border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="mx-auto w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Target className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-2xl group-hover:text-purple-600 transition-colors text-gray-900">
                  Career Focused
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg leading-relaxed text-gray-600">
                  Master skills that matter in today's job market. Our
                  curriculum is designed with input from leading employers.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group text-center hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-white border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="mx-auto w-20 h-20 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Award className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-2xl group-hover:text-purple-600 transition-colors text-gray-900">
                  Certified Learning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg leading-relaxed text-gray-600">
                  Earn industry-recognized certificates that showcase your
                  expertise and help advance your career prospects.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold mb-4 text-gray-900">
                Latest from Our Blog
              </h2>
              <p className="text-xl text-gray-600">
                Stay updated with the latest trends and insights
              </p>
            </div>
            <Button
              variant="outline"
              className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              View All Posts
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow cursor-pointer bg-white"
              >
                <div className="relative h-48">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
                <CardContent className="p-6">
                  <Badge
                    variant="secondary"
                    className="mb-3 bg-purple-100 text-purple-700"
                  >
                    {post.category}
                  </Badge>
                  <h3 className="font-bold text-lg mb-3 line-clamp-2 text-gray-900">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <BookOpen className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              What Our Students Say
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of satisfied learners worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Alex Rodriguez",
                role: "Software Developer",
                content:
                  "This platform completely transformed my career. The courses are comprehensive and the instructors are top-notch.",
                image: "/professional-headshot-alex.png",
              },
              {
                name: "Jessica Chen",
                role: "Product Manager",
                content:
                  "I landed my dream job after completing the product management course. The practical projects were invaluable.",
                image: "/professional-headshot-jessica.png",
              },
              {
                name: "David Thompson",
                role: "Data Scientist",
                content:
                  "The quality of education here is exceptional. I've recommended this platform to all my colleagues.",
                image: "/professional-headshot-david.png",
              },
            ].map((testimonial, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow bg-white"
              >
                <CardContent className="p-6">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
                  <div className="flex items-center space-x-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20"></div>
        <div className="container mx-auto px-4 text-center relative">
          <Badge className="mb-6 bg-white/20 text-white border-white/30 px-6 py-3 text-lg">
            🎉 Limited Time Offer
          </Badge>
          <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl md:text-2xl mb-10 opacity-90 max-w-2xl mx-auto leading-relaxed">
            Join our community of learners and unlock your potential with
            expert-led courses and hands-on projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/auth/register">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-10 py-6 bg-white text-purple-700 hover:bg-white/90 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <Zap className="w-5 h-5 mr-2" />
                Start Free Trial
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-10 py-6 border-2 border-white text-white hover:bg-white hover:text-purple-700 bg-transparent transition-all duration-300"
              >
                Sign In
              </Button>
            </Link>
          </div>
          <p className="mt-8 text-sm opacity-75">
            No credit card required • Cancel anytime • 30-day money-back
            guarantee
          </p>
        </div>
      </section>

      <footer className="bg-white border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4 text-gray-900">
                LMS Platform
              </h3>
              <p className="text-gray-600">
                Empowering learners worldwide with quality education.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-gray-900">Platform</h4>
              <div className="space-y-2 text-gray-600">
                <div>Courses</div>
                <div>Instructors</div>
                <div>Certificates</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-gray-900">Support</h4>
              <div className="space-y-2 text-gray-600">
                <div>Help Center</div>
                <div>Contact Us</div>
                <div>Community</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-gray-900">Company</h4>
              <div className="space-y-2 text-gray-600">
                <div>About</div>
                <div>Careers</div>
                <div>Privacy</div>
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-gray-500">
            <p>&copy; 2024 LMS Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
