"use client";
import { sampleCourses } from "@/data/sampleCourses";
import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useRef, useState, useEffect } from "react";
import { ICourse } from "@/types";
import CourseCard from "./CourseCard";

const NewestCourses = ({ courses }: { courses: Array<ICourse> }) => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  const [activeBullet, setActiveBullet] = useState(0);

  // Update active bullet on slide change
  const handleSlideChange = (swiper: any) => {
    setActiveBullet(swiper.realIndex); // realIndex ensures one-by-one tracking
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
    if (!swiperInstance) return courses.length;
    return courses.length; // One bullet per course for one-by-one scrolling
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4 md:gap-0">
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
            className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white shadow-xl border-2 border-gray-200 hover:bg-gray-50 transition-all duration-300 w-10 sm:w-12 h-10 sm:h-12 z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>

          {/* Next button */}
          <Button
            ref={nextRef}
            variant="outline"
            size="icon"
            className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white shadow-xl border-2 border-gray-200 hover:bg-gray-50 transition-all duration-300 w-10 sm:w-12 h-10 sm:h-12 z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>

          <Swiper
            modules={[Navigation, Autoplay]}
            onSwiper={setSwiperInstance}
            onSlideChange={handleSlideChange}
            spaceBetween={20}
            slidesPerView={1} // Always start with 1
            slidesPerGroup={1} // Scroll one by one
            loop={false}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: { slidesPerView: 1, slidesPerGroup: 1 },
              768: { slidesPerView: 2, slidesPerGroup: 1 },
              1024: { slidesPerView: 3, slidesPerGroup: 1 },
            }}
          >
            {courses?.length > 0 &&
              courses.map((course) => (
                <SwiperSlide key={course.id}>
                  <CourseCard course={course} />
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
                onClick={() => swiperInstance?.slideTo(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewestCourses;
