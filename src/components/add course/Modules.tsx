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
import { Textarea } from "@/components/ui/textarea";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { CourseFormValues } from "@/validation/addCourse.validation";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LectureContentType } from "@/enum";
import { Switch } from "@/components/ui/switch";

export default function Modules({ form }: { form: UseFormReturn<any> }) {
  const {
    fields: moduleFields,
    append: addModule,
    remove: removeModule,
  } = useFieldArray({
    control: form.control,
    name: "modules",
  });

  return (
    <Card>
      <CardHeader className="flex-row justify-between items-center space-y-0">
        <div>
          <CardTitle>Modules & Lectures</CardTitle>
          <CardDescription>
            Structure your course content into modules and lectures
          </CardDescription>
        </div>
        <Button
          type="button"
          onClick={() =>
            addModule({
              title: "",
              lectures: [],
              isFree: false,
            })
          }
        >
          <Plus className="w-4 h-4 mr-2" /> Add Module
        </Button>
      </CardHeader>

      <CardContent className="space-y-6">
        {moduleFields.length === 0 ? (
          <div className="text-center text-muted-foreground py-10 border border-dashed rounded">
            No modules yet — add your first module.
          </div>
        ) : (
          moduleFields.map((module, moduleIndex) => (
            <div key={module.id} className="rounded border p-4 space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="secondary">Module {moduleIndex + 1}</Badge>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => removeModule(moduleIndex)}
                >
                  <Trash2 className="w-4 h-4 mr-1" /> Remove Module
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name={`modules.${moduleIndex}.title`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Module Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Introduction to React"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Is Free Switch */}
              <div className="flex items-center gap-4">
                <FormField
                  control={form.control}
                  name={`modules.${moduleIndex}.isFree`}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                      <FormLabel className="mb-0">Is Free?</FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <LecturesField form={form} moduleIndex={moduleIndex} />
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}

function LecturesField({
  form,
  moduleIndex,
}: {
  form: UseFormReturn<CourseFormValues>;
  moduleIndex: number;
}) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: `modules.${moduleIndex}.lectures`,
  });

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium">Lectures</h4>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            append({
              title: "",
              content: "",
              contentType: LectureContentType.Video,
            })
          }
        >
          <Plus className="w-4 h-4 mr-2" /> Add Lecture
        </Button>
      </div>

      {fields.length === 0 ? (
        <div className="text-sm text-muted-foreground py-6 border border-dashed rounded">
          No lectures in this module yet
        </div>
      ) : (
        fields.map((lecture, lectureIndex) => (
          <div
            key={lecture.id}
            className="rounded bg-muted/40 p-4 border space-y-4"
          >
            <div className="flex items-center justify-between">
              <Badge variant="outline">Lecture {lectureIndex + 1}</Badge>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => remove(lectureIndex)}
              >
                <Trash2 className="w-4 h-4 mr-1" /> Remove Lecture
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name={`modules.${moduleIndex}.lectures.${lectureIndex}.title`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lecture Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Components and Props"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`modules.${moduleIndex}.lectures.${lectureIndex}.contentType`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content Type</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select content type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={LectureContentType.Video}>
                            Video
                          </SelectItem>

                          <SelectItem value={LectureContentType.Text}>
                            Text
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name={`modules.${moduleIndex}.lectures.${lectureIndex}.content`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content URL/Text</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={3}
                      placeholder="Enter video URL, PDF URL, or text content..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ))
      )}
    </div>
  );
}
