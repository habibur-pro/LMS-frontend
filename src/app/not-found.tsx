import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileSearch } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center text-center px-6 bg-background">
      {/* Icon */}
      <div className="flex items-center justify-center w-28 h-28 rounded-full bg-muted mb-6">
        <FileSearch className="w-14 h-14 text-muted-foreground" />
      </div>

      {/* Heading */}
      <h1 className="text-5xl font-bold mb-2">Page Not Found</h1>

      {/* Subtext */}
      <p className="text-muted-foreground mb-6 max-w-md">
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </p>

      {/* CTA Button */}
      <Link href="/">
        <Button size="lg" className="rounded-2xl shadow-lg">
          Go Back Home
        </Button>
      </Link>
    </div>
  );
}
