import Courses from "@/components/Cources";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const page = () => {
  return (
    <div className="">
      <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 ">
              Transform Your Future with Expert-Led Learning
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of learners advancing their careers through our
              comprehensive, industry-focused courses taught by world-class
              instructors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/register">
                <Button size="lg" className="text-lg px-8 py-6">
                  Start Learning Today
                </Button>
              </Link>
              <Link href="/#courses">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 bg-transparent"
                >
                  Explore Courses
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="container mx-auto py-20 ">
        <div>
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Explore Our Courses
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
              Discover high-quality courses designed to help you master new
              skills and advance your career
            </p>
          </div>
        </div>
        <Courses />
      </section>
    </div>
  );
};

export default page;
