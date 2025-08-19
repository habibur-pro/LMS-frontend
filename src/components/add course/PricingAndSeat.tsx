"use client";

import { UseFormReturn } from "react-hook-form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CourseFormValues } from "@/validation/addCourse.validation";

export default function PricingCapacitySection({
  form,
}: {
  form: UseFormReturn<any>;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pricing & Capacity</CardTitle>
        <CardDescription>Set pricing and enrollment limits</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="1"
                    {...field}
                    value={field.value || ""}
                    onChange={(e) => field.onChange(+e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="discountedPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Discounted Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="1"
                    {...field}
                    value={field.value || ""}
                    onChange={(e) => field.onChange(+e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration (minutes)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    value={field.value || ""}
                    onChange={(e) => field.onChange(+e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="totalSeat"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Seats</FormLabel>
                <FormControl>
                  {/* <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(+e.target.value)}
                  /> */}
                  <Input
                    type="number"
                    {...field}
                    value={field.value || ""}
                    onChange={(e) => field.onChange(+e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
