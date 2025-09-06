import { ICourse, ILecture, IModule } from "@/types";
import { useState } from "react";
import { Input } from "./ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "./ui/button";
import { Edit, Loader, Plus, Trash2, Video } from "lucide-react";
import { Label } from "./ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LectureContentType } from "@/enum";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  useAddLectureMutation,
  useDeleteModuleMutation,
} from "@/redux/api/moduleApi";
import { toast } from "sonner";
import { useAddModuleMutation } from "@/redux/api/courseApi";
import Link from "next/link";
import { useDeleteLectureMutation } from "@/redux/api/lectureApi";

const ModulesAndLectures = ({ course }: { course: ICourse }) => {
  const [addLecture] = useAddLectureMutation();
  const [addModule] = useAddModuleMutation();
  const [deleteModule, { isLoading: moduleDeleting }] =
    useDeleteModuleMutation();
  const [deleteLecture, { isLoading: lectureDeleting }] =
    useDeleteLectureMutation();
  const [isAddModuleOpen, setIsAddModuleOpen] = useState(false);
  const [isAddLectureOpen, setIsAddLectureOpen] = useState(false);
  const [isDeleteModuleOpen, setIsDeleteModuleOpen] = useState(false);
  const [activeLectureId, setActiveLectureId] = useState<string | null>(null);
  const [isDeleteLectureOpen, setIsDeleteLectureOpen] = useState(false);
  const [selectedModuleId, setSelectedModuleId] = useState<string>("");
  const [newModule, setNewModule] = useState<null | string>(null);
  const [newLecture, setNewLecture] = useState({
    title: "",
    content: "",
    contentType: LectureContentType.Video,
    notes: "",
  });

  const handleAddModule = async () => {
    try {
      if (!newModule) return;
      const lastIndex = course.modules.length;
      const newModuleData: Partial<IModule> = {
        moduleNumber: lastIndex + 1,
        title: newModule,
      };
      await addModule({ courseId: course.id, data: newModuleData }).unwrap();
      setNewModule(null);
      setIsAddModuleOpen(false);
    } catch (error) {
      console.log("error", error);
      toast.error("something went wrong!");
    }
  };

  const handleAddLecture = async (module: IModule) => {
    try {
      const lastIndex = module.lectures.length;
      const newLectureData: any = {
        ...newLecture,
        lectureNumber: lastIndex + 1,
      };
      if (newLecture.notes) {
        const notesArray: Array<string> = newLecture.notes.split(",");
        newLectureData.notes = notesArray;
      }
      await addLecture({ moduleId: module.id, data: newLectureData }).unwrap();
      setIsAddLectureOpen(false);
      setNewLecture({
        title: "",
        content: "",
        contentType: LectureContentType.Video,
        notes: "",
      });
    } catch (error) {
      console.log("error", error);
      toast.error("something went wrong!");
    }
  };

  const handleDeleteModule = async (moduleId: string) => {
    try {
      await deleteModule({ courseId: course.id, moduleId }).unwrap();
      setIsDeleteModuleOpen(false);
    } catch (error) {
      console.log("error", error);
      toast.error("something went wrong!");
    }
  };

  const handleDeleteLecture = async (moduleId: string, lectureId: string) => {
    try {
      await deleteLecture({ lectureId: lectureId, moduleId }).unwrap();
    } catch (error) {
      console.log("error", error);
      toast.error("something went wrong!");
    }
  };

  return (
    <div className="space-y-6 pt-10">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold ">Modules & Lectures</h2>
        <Dialog open={isAddModuleOpen} onOpenChange={setIsAddModuleOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Module
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Module</DialogTitle>
              <DialogDescription>
                Create a new module for this course. Module number will be
                assigned automatically.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="module-title">Module Title</Label>
                <Input
                  id="module-title"
                  value={newModule || ""}
                  onChange={(e) => setNewModule(e.target.value)}
                  placeholder="e.g., Advanced Concepts"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddModuleOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleAddModule} disabled={!newModule}>
                Add Module
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {course.modules.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <div className="text-gray-400 dark:text-gray-600 mb-4">
              <Plus className="w-16 h-16 mx-auto mb-4" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No modules yet
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Start by adding your first module
            </p>
            <Button onClick={() => setIsAddModuleOpen(true)}>
              Add First Module
            </Button>
          </CardContent>
        </Card>
      ) : (
        course.modules.map((module, index) => (
          <Card key={module.id}>
            <CardHeader>
              <div className="lg:flex space-y-3 lg:space-y-0 justify-between items-start ">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Badge variant="secondary">Module {index + 1}</Badge>
                    <span>{module.title}</span>
                  </CardTitle>
                  <CardDescription>
                    {module.lectures.length} lecture
                    {module.lectures.length !== 1 ? "s" : ""}
                  </CardDescription>
                </div>
                {/* lecture add modal  */}
                <div className="flex space-x-2">
                  <Dialog
                    open={isAddLectureOpen && selectedModuleId === module.id}
                    onOpenChange={(open) => {
                      setIsAddLectureOpen(open);
                      if (open) setSelectedModuleId(module.id);
                      else setSelectedModuleId("");
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Plus className="w-4 h-4 mr-1" />
                        Add Lecture
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Lecture</DialogTitle>
                        <DialogDescription>
                          Add a new lecture to {module.title}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="lecture-title">Lecture Title</Label>
                          <Input
                            id="lecture-title"
                            value={newLecture.title}
                            onChange={(e) =>
                              setNewLecture({
                                ...newLecture,
                                title: e.target.value,
                              })
                            }
                            placeholder="e.g., Introduction to Variables"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="lecture-title">Content Type</Label>
                          <Select
                            defaultValue={newLecture.contentType}
                            onValueChange={(value: LectureContentType) =>
                              setNewLecture({
                                ...newLecture,
                                contentType: value,
                              })
                            }
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select content type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value={LectureContentType.Video}>
                                Video
                              </SelectItem>

                              <SelectItem value={LectureContentType.Text}>
                                Text
                              </SelectItem>
                              <SelectItem value={LectureContentType.Pdf}>
                                Pdf
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        {newLecture.contentType === LectureContentType.Video ? (
                          <div className="grid gap-2">
                            <Label htmlFor="video-url">Video URL</Label>
                            <Input
                              id="video-url"
                              value={newLecture.content}
                              onChange={(e) =>
                                setNewLecture({
                                  ...newLecture,
                                  content: e.target.value,
                                })
                              }
                              placeholder="https://www.youtube.com/embed/..."
                            />
                          </div>
                        ) : newLecture.contentType ===
                          LectureContentType.Text ? (
                          <div className="grid gap-2">
                            <Label htmlFor="video-url">Text Content</Label>
                            <Textarea
                              id="video-url"
                              value={newLecture.content}
                              onChange={(e) =>
                                setNewLecture({
                                  ...newLecture,
                                  content: e.target.value,
                                })
                              }
                              placeholder="Type your content"
                            />
                          </div>
                        ) : (
                          <div className="grid gap-2">
                            <Label htmlFor="pdf-notes">
                              PDF Notes (comma-separated)
                            </Label>
                            <Textarea
                              id="pdf-notes"
                              value={newLecture.notes}
                              onChange={(e) =>
                                setNewLecture({
                                  ...newLecture,
                                  content: "pdf notes",
                                  notes: e.target.value,
                                })
                              }
                              placeholder="/pdfs/lecture1.pdf, /pdfs/lecture1-exercises.pdf"
                              rows={3}
                            />
                          </div>
                        )}
                      </div>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setIsAddLectureOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={() => handleAddLecture(module)}
                          disabled={!newLecture.title}
                        >
                          Add Lecture
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  {/* module delete <dialog> </dialog> */}
                  <AlertDialog
                    open={isDeleteModuleOpen}
                    onOpenChange={setIsDeleteModuleOpen}
                  >
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          remove your data from our database.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteModule(module.id)}
                        >
                          {moduleDeleting ? (
                            <span className="flex items-center gap-2">
                              <Loader className="animate-spin" /> Deleting...
                            </span>
                          ) : (
                            <span>Continue</span>
                          )}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {module.lectures.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <Video className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No lectures in this module yet</p>
                </div>
              ) : (
                <ScrollArea className="grid h-full w-full grid-cols-1">
                  <Table className="mb-3 md:mb-auto">
                    <TableHeader>
                      <TableRow>
                        <TableHead>No</TableHead>
                        <TableHead>Lecture Title</TableHead>
                        <TableHead>Content Type</TableHead>
                        <TableHead>Content</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {module.lectures.map((lecture) => (
                        <TableRow key={lecture.id}>
                          <TableCell className="font-medium">
                            Lecture - {lecture.lectureNumber}
                          </TableCell>
                          <TableCell className="font-medium">
                            {lecture.title}
                          </TableCell>
                          <TableCell className="font-medium">
                            {lecture.contentType}
                          </TableCell>
                          <TableCell title={lecture.content}>
                            {lecture.contentType ===
                            LectureContentType.Video ? (
                              <Link
                                href={lecture.content}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                              >
                                {lecture.content}
                              </Link>
                            ) : lecture.contentType ===
                              LectureContentType.Text ? (
                              <span className="text-wrap">
                                {lecture.content}
                              </span>
                            ) : (
                              <span>
                                {lecture.notes?.length > 0 &&
                                  lecture.notes.map((item, i) => (
                                    <Link
                                      key={item + i + "lecture"}
                                      href={item}
                                      target="_blank"
                                      className="text-blue-500 block"
                                    >
                                      {item}
                                    </Link>
                                  ))}
                              </span>
                            )}
                          </TableCell>

                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button variant="outline" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>

                              <AlertDialog
                                open={activeLectureId === lecture.id}
                                onOpenChange={(open) =>
                                  setActiveLectureId(open ? lecture.id : null)
                                }
                              >
                                <AlertDialogTrigger asChild>
                                  <Button variant="destructive" size="sm">
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </AlertDialogTrigger>

                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Are you absolutely sure?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This action cannot be undone. This will
                                      permanently remove your data.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>

                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={async () => {
                                        await handleDeleteLecture(
                                          module.id,
                                          lecture.id
                                        );

                                        setActiveLectureId(null); // close modal
                                      }}
                                    >
                                      {lectureDeleting ? (
                                        <span className="flex items-center gap-2">
                                          <Loader className="animate-spin" />{" "}
                                          Deleting...
                                        </span>
                                      ) : (
                                        <span>Continue</span>
                                      )}
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default ModulesAndLectures;
