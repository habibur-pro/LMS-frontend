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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { Course, Module, Lecture } from "@/types/course";
import {
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  FileText,
  Video,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { ICourse } from "@/types";
import CourseInfo from "@/components/CourseInfo";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useGetCourseQuery } from "@/redux/api/courseApi";
import ModulesAndLectures from "@/components/ModulesAndLectures";

const AdminCourseDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const { data: courseRes } = useGetCourseQuery(slug, { skip: !slug });
  const course: ICourse = courseRes?.data;

  const handleAddModule = (course: ICourse) => {
    if (!course || !newModule.title) return;

    const module: Module = {
      id: `m${Date.now()}`,
      title: newModule.title,
      moduleNumber: course.modules.length + 1,
      lectures: [],
    };

    setCourse({
      ...course,
      modules: [...course.modules, module],
    });

    setNewModule({ title: "" });
    setIsAddModuleOpen(false);
  };

  const handleAddLecture = () => {
    if (!course || !newLecture.title || !selectedModuleId) return;

    const lecture: Lecture = {
      id: `l${Date.now()}`,
      title: newLecture.title,
      videoUrl: newLecture.videoUrl,
      pdfNotes: newLecture.pdfNotes
        .split(",")
        .map((note) => note.trim())
        .filter((note) => note.length > 0),
    };

    setCourse({
      ...course,
      modules: course.modules.map((module) =>
        module.id === selectedModuleId
          ? { ...module, lectures: [...module.lectures, lecture] }
          : module
      ),
    });

    setNewLecture({ title: "", videoUrl: "", pdfNotes: "" });
    setSelectedModuleId("");
    setIsAddLectureOpen(false);
  };

  const handleDeleteModule = (moduleId: string) => {
    if (!course) return;
    setCourse({
      ...course,
      modules: course.modules.filter((module) => module.id !== moduleId),
    });
  };

  const handleDeleteLecture = (moduleId: string, lectureId: string) => {
    if (!course) return;
    setCourse({
      ...course,
      modules: course.modules.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              lectures: module.lectures.filter(
                (lecture) => lecture.id !== lectureId
              ),
            }
          : module
      ),
    });
  };

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex items-center space-x-4 mb-8 justify-between">
        <div>
          <h1 className="text-3xl font-bold ">{course.title}</h1>
          <p className="text-gray-700 mt-1">Manage modules and lectures</p>
        </div>
        <Button className="flex items-center">
          <ExternalLink className="w-4 h-4" />
          <span>Preview</span>
        </Button>
      </div>

      <div className="grid gap-8">
        {/* Course Info */}
        <CourseInfo course={course} />
        {/* Modules and Lectures */}
        <hr />
        <ModulesAndLectures course={course} />
      </div>
    </div>
  );
};
export default AdminCourseDetailPage;
