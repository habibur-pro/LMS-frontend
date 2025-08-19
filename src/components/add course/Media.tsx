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

export default function Media({ form }: { form: UseFormReturn<any> }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Media</CardTitle>
        <CardDescription>
          Thumbnail and cover images for the course
        </CardDescription>
      </CardHeader>
      <CardContent className="grid md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="thumbnail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thumbnail</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => field.onChange(e.target.files?.[0] ?? null)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="coverPhoto"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover Photo</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => field.onChange(e.target.files?.[0] ?? null)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
