import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { XCircle } from "lucide-react";

const page = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-red-50">
      <Card className="max-w-md w-full shadow-lg rounded-2xl">
        <CardHeader className="text-center">
          <XCircle className="mx-auto h-16 w-16 text-red-600" />
          <CardTitle className="text-2xl mt-2 text-red-700">
            Payment Failed ❌
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">
            Oops! Something went wrong while processing your payment. Please try
            again.
          </p>
          <div className="flex gap-4 justify-center">
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
