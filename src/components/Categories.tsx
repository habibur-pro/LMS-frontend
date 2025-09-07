"use client";
import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Code,
  Database,
  Globe,
  Shield,
  Smartphone,
} from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

const Categories = () => {
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

  const [currentCategorySlide, setCurrentCategorySlide] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(4);

  // Dynamically set items per slide based on screen width
  useEffect(() => {
    const updateItemsPerSlide = () => {
      if (window.innerWidth < 640) setItemsPerSlide(1); // mobile
      else if (window.innerWidth < 1024) setItemsPerSlide(2); // tablet
      else setItemsPerSlide(4); // desktop
    };

    updateItemsPerSlide();
    window.addEventListener("resize", updateItemsPerSlide);

    return () => window.removeEventListener("resize", updateItemsPerSlide);
  }, []);

  // Auto-slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentCategorySlide(
        (prev) => (prev + 1) % Math.ceil(categories.length / itemsPerSlide)
      );
    }, 4000);
    return () => clearInterval(timer);
  }, [itemsPerSlide]);

  const nextCategorySlide = () => {
    setCurrentCategorySlide(
      (prev) => (prev + 1) % Math.ceil(categories.length / itemsPerSlide)
    );
  };

  const prevCategorySlide = () => {
    setCurrentCategorySlide(
      (prev) =>
        (prev - 1 + Math.ceil(categories.length / itemsPerSlide)) %
        Math.ceil(categories.length / itemsPerSlide)
    );
  };

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
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

        {/* Slider */}
        <div className="relative max-w-6xl mx-auto">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${currentCategorySlide * 100}%)`,
              }}
            >
              {Array.from(
                { length: Math.ceil(categories.length / itemsPerSlide) },
                (_, slideIndex) => (
                  <div key={slideIndex} className="w-full flex-shrink-0">
                    <div
                      className={`grid gap-6 px-4 ${
                        itemsPerSlide === 1
                          ? "grid-cols-1"
                          : itemsPerSlide === 2
                          ? "grid-cols-2"
                          : "grid-cols-4"
                      }`}
                    >
                      {categories
                        .slice(
                          slideIndex * itemsPerSlide,
                          slideIndex * itemsPerSlide + itemsPerSlide
                        )
                        .map((category, index) => (
                          <Card
                            key={slideIndex * itemsPerSlide + index}
                            className="group hover:shadow-xl transition-all duration-500 hover:scale-105 cursor-pointer bg-white border-0 shadow-lg"
                          >
                            <CardContent className="p-8 text-center">
                              <div
                                className={`w-20 h-20 ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                              >
                                <category.icon className="w-10 h-10 text-white" />
                              </div>
                              <h3 className="font-bold text-xl text-gray-900 group-hover:text-purple-600 transition-colors">
                                {category.name}
                              </h3>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white shadow-xl border-2 border-gray-200 hover:bg-gray-50 transition-all duration-300 w-10 sm:w-12 h-10 sm:h-12"
            onClick={prevCategorySlide}
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white shadow-xl border-2 border-gray-200 hover:bg-gray-50 transition-all duration-300 w-10 sm:w-12 h-10 sm:h-12"
            onClick={nextCategorySlide}
          >
            <ChevronRight className="w-6 h-6" />
          </Button>

          {/* Dots */}
          <div className="flex justify-center mt-8 space-x-3">
            {Array.from(
              { length: Math.ceil(categories.length / itemsPerSlide) },
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
  );
};

export default Categories;
