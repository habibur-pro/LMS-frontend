"use client";

import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription as CardDesc,
} from "@/components/ui/card";

import { CourseStatus } from "@/enum";

export default function BasicInfo({ form }: { form: UseFormReturn<any> }) {
  // helper to wire shadcn Select with RHF field
  const StatusSelect = ({
    field,
  }: {
    field: ControllerRenderProps<any, "status">;
  }) => (
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <SelectTrigger>
        <SelectValue placeholder="Select status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={CourseStatus.DRAFTED}>Draft</SelectItem>
        <SelectItem value={CourseStatus.UPCOMING}>Upcoming</SelectItem>
        <SelectItem value={CourseStatus.PUBLISHED}>Active</SelectItem>
        <SelectItem value={CourseStatus.UNPUBLISHED}>Completed</SelectItem>
      </SelectContent>
    </Select>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
        <CardDesc>Essential course details and identification</CardDesc>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., Complete Web Development Bootcamp"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  rows={4}
                  placeholder="Detailed description of the course..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course Status</FormLabel>
              <FormControl>
                <StatusSelect field={field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
