"use client";

import { UseFormReturn, useFieldArray } from "react-hook-form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";

import { Plus, X, CheckCircle } from "lucide-react";
import { CourseFormValues } from "@/validation/addCourse.validation";

export default function LearningPoints({ form }: { form: UseFormReturn<any> }) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "learningPoints",
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Learning Points</CardTitle>
        <CardDescription>
          What will students learn from this course?
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append("")}
        >
          <Plus className="w-4 h-4 mr-2" /> Add Learning Point
        </Button>
        <div className="space-y-2">
          {fields.map((field, index) => (
            <FormField
              key={field.id}
              control={form.control}
              name={`learningPoints.${index}`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">
                    Learning Point {index + 1}
                  </FormLabel>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <FormControl>
                      <Input placeholder="Students will learn…" {...field} />
                    </FormControl>
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => remove(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
