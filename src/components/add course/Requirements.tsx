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
import { Plus, X, AlertCircle } from "lucide-react";
import { CourseFormValues } from "@/validation/addCourse.validation";

export default function Requirements({ form }: { form: UseFormReturn<any> }) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "requirements",
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Requirements</CardTitle>
        <CardDescription>
          What do students need before taking this course?
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append("")}
        >
          <Plus className="w-4 h-4 mr-2" /> Add Requirement
        </Button>
        <div className="space-y-2">
          {fields.map((field, index) => (
            <FormField
              key={field.id}
              control={form.control}
              name={`requirements.${index}`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">
                    Requirement {index + 1}
                  </FormLabel>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-yellow-600" />
                    <FormControl>
                      <Input placeholder="Basic knowledge of…" {...field} />
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
