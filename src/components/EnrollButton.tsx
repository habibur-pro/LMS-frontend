"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const EnrollButton = ({ slug }: { slug: string }) => {
  const router = useRouter();
  const handleGoCheckout = () => {
    localStorage.setItem("selectedItem", slug);
    router.push(`/checkout/?course=${slug}`);
  };

  return (
    <Button onClick={handleGoCheckout} size="lg" className="w-full mb-4">
      <ShoppingCart className="w-4 h-4 mr-2" />
      Enroll on course
    </Button>
  );
};

export default EnrollButton;
