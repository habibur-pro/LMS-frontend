import Link from "next/link";
import { Button } from "./ui/button";
import { Zap } from "lucide-react";

const CallBack = () => {
  return (
    <section className="py-24 bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20"></div>
      <div className="container mx-auto px-4 text-center relative">
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
              Start Your Journey
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallBack;
