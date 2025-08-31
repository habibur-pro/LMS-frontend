import { ArrowRight, BookOpen, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Badge } from "./ui/badge";

const Blogs = () => {
  const blogPosts = [
    {
      title: "10 Essential JavaScript Concepts Every Developer Should Know",
      excerpt:
        "Master these fundamental JavaScript concepts to become a more effective developer...",
      date: "Dec 15, 2024",
      readTime: "5 min read",
      category: "JavaScript",
      image: "/images/blog-1.png",
    },
    {
      title: "The Future of Web Development: Trends to Watch in 2025",
      excerpt:
        "Explore the emerging technologies and frameworks that will shape web development...",
      date: "Dec 12, 2024",
      readTime: "8 min read",
      category: "Web Development",
      image: "/images/blog-2.png",
    },
    {
      title: "Building Secure Applications: A Developer's Guide",
      excerpt:
        "Learn essential security practices to protect your applications from common vulnerabilities...",
      date: "Dec 10, 2024",
      readTime: "6 min read",
      category: "Security",
      image: "/images/blog-3.png",
    },
  ];
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Latest from Our Blog
            </h2>
            <p className="text-xl text-gray-600">
              Stay updated with the latest trends and insights
            </p>
          </div>
          <Button
            variant="outline"
            className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            View All Posts
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-shadow cursor-pointer bg-white pb-6 pt-0"
            >
              <div className="relative h-48">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              <CardContent className="p-6">
                <Badge
                  variant="secondary"
                  className="mb-3 bg-purple-100 text-purple-700"
                >
                  {post.category}
                </Badge>
                <h3 className="font-bold text-lg mb-3 line-clamp-2 text-gray-900">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-4 h-4" />
                    <span>{post.readTime}</span>
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

export default Blogs;
