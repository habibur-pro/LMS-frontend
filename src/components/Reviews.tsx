import { Star } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";

const Reviews = () => {
  return (
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
              image: "/images/user.jpg",
            },
            {
              name: "Jessica Chen",
              role: "Product Manager",
              content:
                "I landed my dream job after completing the product management course. The practical projects were invaluable.",
              image: "/images/user.jpg",
            },
            {
              name: "David Thompson",
              role: "Data Scientist",
              content:
                "The quality of education here is exceptional. I've recommended this platform to all my colleagues.",
              image: "/images/user.jpg",
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
                <p className="text-gray-600 mb-4">
                  &apos;{testimonial.content}&apos;
                </p>
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
  );
};

export default Reviews;
