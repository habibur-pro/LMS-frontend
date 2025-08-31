import { Award, Target, Users } from "lucide-react";
import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

const WhyUs = () => {
  return (
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
                Master skills that matter in today&apos;s job market. Our
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
  );
};

export default WhyUs;
