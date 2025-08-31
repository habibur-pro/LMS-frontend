import HeroSection from "@/components/HeroSection";
import FeaturedCourse from "@/components/FeaturedCourse";
import Categories from "@/components/Categories";
import NewestCourses from "@/components/NewestCourses";
import Instructors from "@/components/Instructors";
import Stats from "@/components/Stats";
import WhyUs from "@/components/WhyUs";
import Blogs from "@/components/Blogs";
import Reviews from "@/components/Reviews";
import CallBack from "@/components/CallBack";
import { getCourses } from "@/utils/getCourses";
import { ICourse } from "@/types";

const page = async () => {
  const { courses } = await getCourses();

  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <FeaturedCourse />
      <Categories />
      <NewestCourses courses={courses} />
      <Instructors />
      <Stats />
      <WhyUs />
      <Blogs />

      <Reviews />
      <CallBack />
    </div>
  );
};
export default page;
