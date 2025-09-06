import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Star } from "lucide-react";
import { Button } from "./ui/button";

const Instructors = () => {
  const instructors = [
    {
      name: "Sarah Johnson",
      expertise: "Full Stack Developer",
      experience: "8+ years",
      students: "12,000+",
      rating: 4.9,
      image: "/images/user.jpg",
    },
    {
      name: "Michael Chen",
      expertise: "Data Scientist",
      experience: "10+ years",
      students: "8,500+",
      rating: 4.8,
      image: "/images/user.jpg",
    },
    {
      name: "Emily Davis",
      expertise: "Cybersecurity Expert",
      experience: "12+ years",
      students: "6,200+",
      rating: 4.9,
      image: "/images/user.jpg",
    },
  ];

  return (
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
  );
};

export default Instructors;
