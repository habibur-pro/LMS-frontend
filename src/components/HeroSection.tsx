import { Badge } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 py-24 overflow-hidden text-white">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>
      <div className="container mx-auto px-4 relative">
        <div className="max-w-5xl mx-auto text-center">
          <Badge className="mb-6 bg-purple-700/50 text-purple-100 border-purple-600 px-4 py-2 text-sm font-medium">
            ⚡ New courses launching weekly!
          </Badge>
          <h1 className="text-6xl md:text-7xl font-black mb-8 leading-tight">
            Transform Your
            <span className="text-purple-400 block"> Future Today</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed text-purple-100">
            Join 50,000+ learners mastering cutting-edge skills through our
            immersive, expert-led courses designed for the modern professional.
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
  );
};

export default HeroSection;
