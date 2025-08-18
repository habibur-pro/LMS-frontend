"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";

import type { Course } from "@/types/course";
import {
  ArrowLeft,
  CreditCard,
  Lock,
  Loader2,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { sampleCourses } from "@/lib/sample-course-data";

export default function PurchasePage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id as string;

  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");

  // ✅ Load custom course data
  useEffect(() => {
    async function fetchCourse() {
      try {
        // if you have API / lib
        const data = sampleCourses[0];

        // or custom mock data fallback
        if (!data) {
          setCourse({
            id: courseId,
            title: "React Mastery Bootcamp",
            description: "Learn React.js, Next.js, and modern web development.",
            price: "$99",
            thumbnail:
              "https://img-c.udemycdn.com/course/750x422/2314160_8d61_6.jpg",
            modules: [
              {
                id: "m1",
                moduleNumber: 1,
                title: "Introduction",
                lectures: [],
              },
              { id: "m2", moduleNumber: 2, title: "Components", lectures: [] },
            ],
          });
        } else {
          setCourse(data);
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchCourse();
  }, [courseId]);

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    return parts.length ? parts.join(" ") : v;
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  // ✅ Fake submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    setTimeout(() => {
      if (cardNumber.length < 16 || !expiryDate || !cvv || !cardName) {
        setError("Please enter valid payment details.");
        setIsLoading(false);
        return;
      }
      setSuccess(true);
      setIsLoading(false);

      setTimeout(() => {
        router.push(`/dashboard`);
      }, 2000);
    }, 1500);
  };

  if (!course) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <div className="mx-auto w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Purchase Successful!</h2>
            <p className="text-muted-foreground mb-4">
              Redirecting to confirmation page...
            </p>
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 px-4 py-8">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center space-x-4 mb-8">
          <Link href={`/courses/${course.id}`}>
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Course
            </Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Course Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Course Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-4">
                <div className="relative w-24 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src="https://img-c.udemycdn.com/course/750x422/2314160_8d61_6.jpg"
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold line-clamp-2">{course.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {course.description}
                  </p>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Course Price</span>
                  <span className="font-semibold">{course.price}</span>
                </div>
                <div className="flex justify-between">
                  <span>Processing Fee</span>
                  <span className="font-semibold">$0.00</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>{course.price}</span>
                </div>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <div className="flex items-center space-x-2 text-sm">
                  <Lock className="w-4 h-4 text-green-500" />
                  <span>Secure payment with 30-day money-back guarantee</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CreditCard className="w-5 h-5" />
                <span>Payment Details</span>
              </CardTitle>
              <CardDescription>
                Enter your payment information to complete the purchase
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardName">Cardholder Name</Label>
                  <Input
                    id="cardName"
                    placeholder="John Doe"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={(e) =>
                      setCardNumber(formatCardNumber(e.target.value))
                    }
                    maxLength={19}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      placeholder="MM/YY"
                      value={expiryDate}
                      onChange={(e) =>
                        setExpiryDate(formatExpiryDate(e.target.value))
                      }
                      maxLength={5}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      value={cvv}
                      onChange={(e) =>
                        setCvv(e.target.value.replace(/\D/g, ""))
                      }
                      maxLength={4}
                      required
                    />
                  </div>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      <Lock className="mr-2 h-4 w-4" />
                      Complete Purchase {course.price}
                    </>
                  )}
                </Button>

                <div className="text-center">
                  <p className="text-xs text-muted-foreground">
                    By completing this purchase, you agree to our Terms of
                    Service and Privacy Policy
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Demo Payment Info */}
        <Card className="mt-8 bg-muted/50">
          <CardHeader>
            <CardTitle className="text-sm">Demo Payment Information</CardTitle>
          </CardHeader>
          <CardContent className="text-xs space-y-2">
            <p>
              <strong>This is a demo payment system.</strong> Use any valid
              format:
            </p>
            <div>Card Number: 1234 5678 9012 3456</div>
            <div>Expiry: Any future date (MM/YY)</div>
            <div>CVV: Any 3-4 digits</div>
            <div>Name: Any name</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
