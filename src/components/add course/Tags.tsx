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

import { X, Plus } from "lucide-react";

export default function TagsSection({ form }: { form: UseFormReturn<any> }) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "tags",
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tags</CardTitle>
        <CardDescription>
          Add relevant tags to help students find your course
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append("")}
        >
          <Plus className="w-4 h-4 mr-2" /> Add Tag
        </Button>
        <div className="space-y-2">
          {fields.map((field, index) => (
            <FormField
              key={field.id}
              control={form.control}
              name={`tags.${index}`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Tag {index + 1}</FormLabel>
                  <div className="flex items-center gap-2">
                    <FormControl>
                      <Input placeholder="e.g., react" {...field} />
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
