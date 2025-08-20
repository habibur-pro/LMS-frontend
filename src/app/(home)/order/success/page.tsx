import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

const page = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <Card className="max-w-md w-full shadow-lg rounded-2xl">
        <CardHeader className="text-center">
          <CheckCircle2 className="mx-auto h-16 w-16 text-green-600" />
          <CardTitle className="text-2xl mt-2 text-green-700">
            Payment Successful 🎉
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">
            Your order has been placed successfully. We’ve sent you a
            confirmation email with your order details.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/dashboard">
              <Button variant="default">Go to Courses</Button>
            </Link>
            <Link href="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default page;
