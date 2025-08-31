"use client";
import { sampleCourses } from "@/data/sampleCourses";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Clock12,
  Star,
} from "lucide-react";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Badge } from "./ui/badge";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useRef, useState, useEffect } from "react";
import { ICourse } from "@/types";

const NewestCourses = ({ courses }: { courses: Array<ICourse> }) => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  const [activeBullet, setActiveBullet] = useState(0);

  // Update active bullet on slide change
  const handleSlideChange = (swiper: any) => {
    const spv = swiper.params.slidesPerView;
    const currentGroup = Math.floor(swiper.activeIndex / spv);
    setActiveBullet(currentGroup);
  };

  // Attach navigation buttons after Swiper is initialized
  useEffect(() => {
    if (swiperInstance && prevRef.current && nextRef.current) {
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance]);

  // Calculate number of pagination bullets dynamically
  const getPaginationLength = () => {
    if (!swiperInstance) return Math.ceil(sampleCourses.length / 3);
    const spv = swiperInstance.params.slidesPerView;
    return Math.ceil(sampleCourses.length / spv);
  };

  return (
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
          {/* Prev button */}
          <Button
            ref={prevRef}
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white shadow-xl border-2 border-gray-200 hover:bg-gray-50 transition-all duration-300 w-12 h-12 z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>

          {/* Next button */}
          <Button
            ref={nextRef}
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white shadow-xl border-2 border-gray-200 hover:bg-gray-50 transition-all duration-300 w-12 h-12 z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>

          <Swiper
            modules={[Navigation, Autoplay]}
            onSwiper={setSwiperInstance}
            onSlideChange={handleSlideChange}
            spaceBetween={20}
            slidesPerView={1}
            autoplay={{
              delay: 1000, // 3 seconds
              disableOnInteraction: false, // continue autoplay after user interaction
            }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {courses?.length > 0 &&
              courses.map((course) => (
                <SwiperSlide key={course.id}>
                  <Card className="hover:shadow-lg transition-shadow bg-white pt-0 pb-6">
                    <div className="relative h-56">
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
                      <div className="flex items-center gap-3">
                        <Image
                          alt="instruction photo"
                          // src={course.instructor.}
                          src="/images/user.jpg"
                          width={100}
                          height={100}
                          className="size-12 rounded-full object-cover"
                        />
                        <p>{course?.instructor?.name}</p>
                      </div>
                      <h3 className="font-bold text-lg mb-2 text-gray-900 mt-3">
                        {course.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {course.description}
                      </p>
                      <div className="flex items-center gap-2 pb-3">
                        <Clock12 className="h-5 w-5 text-text-gray-600" />
                        <p>18:00 Hours</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-xl text-purple-600">
                          {course.price}
                        </span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm text-gray-500">4.8</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </SwiperSlide>
              ))}
          </Swiper>

          {/* Custom pagination bullets */}
          <div className="flex justify-center mt-8 space-x-3">
            {Array.from({ length: getPaginationLength() }, (_, index) => (
              <button
                key={index}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  activeBullet === index
                    ? "bg-purple-600 scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                onClick={() =>
                  swiperInstance?.slideTo(
                    index * (swiperInstance?.params.slidesPerView || 1)
                  )
                }
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewestCourses;
