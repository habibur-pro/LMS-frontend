"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ReactPlayer from "react-player";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Search,
  ChevronDown,
  Lock,
  Play,
  FileText,
  Text,
  Type,
} from "lucide-react";
import {
  useGetSingleClassQuery,
  useNextLectureMutation,
  usePreviousLectureMutation,
  useSetCurrentLectureMutation,
} from "@/redux/api/myClassApi";
import { IMyClass, IModule, ILecture } from "@/types";
import { toast } from "sonner";
import Link from "next/link";

const LectureWatchPage = () => {
  const params = useParams();
  const classId = params.id as string;

  const { data: myClassRes, isLoading } = useGetSingleClassQuery(classId, {
    skip: !classId,
  });

  const [nextLectureMutation, { isLoading: nextLoading }] =
    useNextLectureMutation();
  const [prevLectureMutation, { isLoading: prevLoading }] =
    usePreviousLectureMutation();
  const [setCurrentMutation, { isLoading: currentLoading }] =
    useSetCurrentLectureMutation();

  const myClass: IMyClass | undefined = myClassRes?.data;

  const [currentModule, setCurrentModule] = useState<IModule | null>(null);
  const [currentModuleId, setCurrentModuleId] = useState<string | null>(null);
  const [currentLecture, setCurrentLecture] = useState<ILecture | null>(null);

  // Set default lecture when data loads
  useEffect(() => {
    if (myClass?.currentLecture) {
      setCurrentLecture(myClass.currentLecture);
    }

    if (myClass?.currentModuleId) {
      setCurrentModuleId(myClass.currentModuleId);
    }
  }, [myClass]);

  console.log({ currentModuleId });

  const handleNextLecture = async () => {
    if (!classId) return;
    try {
      const res = await nextLectureMutation({
        classId: classId,
        lectureId: currentLecture?._id,
      }).unwrap();
      if (res?.data?.currentLecture) {
        setCurrentModule(res.data.currentModule);
        setCurrentLecture(res.data.currentLecture);
      }
    } catch (err: any) {
      console.log("Next lecture error:", err);
      toast.error(
        err?.data?.message || err?.message || "something went wrong!"
      );
    }
  };

  const handlePrevLecture = async () => {
    if (!classId) return;
    try {
      await prevLectureMutation(classId).unwrap();
    } catch (err: any) {
      console.log("Previous lecture error:", err);
      toast.error(
        err?.data?.message || err?.message || "something went wrong!"
      );
    }
  };

  const handleSetCurrentLecture = async (lectureId: string) => {
    try {
      await setCurrentMutation({ classId: classId, lectureId }).unwrap();
    } catch (error: any) {
      console.log("Previous lecture error:", error);
      toast.error(
        error?.data?.message || error?.message || "something went wrong!"
      );
    }
  };
  const isPlayerLoading = nextLoading || prevLoading || currentLoading;

  if (isLoading || !myClass)
    return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="container mx-auto py-8 flex flex-col lg:flex-row gap-8">
      {/* Video Player */}
      <div className="flex-1 w-full">
        {isPlayerLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="h-10 w-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        {currentLecture && (
          <>
            <h2 className="text-xl font-semibold mb-4 text-foreground">
              {currentLecture.title}
            </h2>

            <div
              className="relative w-full shadow-lg"
              style={{ paddingTop: "56.25%" }}
            >
              {/* Video */}
              {currentLecture.contentType === "video" && (
                <ReactPlayer
                  src={currentLecture.content}
                  width="100%"
                  height="100%"
                  className="absolute top-0 left-0"
                  controls
                />
              )}

              {/* Text */}
              {currentLecture.contentType === "text" && (
                <div className="absolute top-0 left-0 w-full h-full overflow-y-auto p-6">
                  <p className="text-base leading-relaxed whitespace-pre-line">
                    {currentLecture.content}
                  </p>
                </div>
              )}

              {/* PDF */}
              {currentLecture.contentType === "pdf" && (
                <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center p-6">
                  {/* <p className="mb-4 text-lg font-medium">PDF Document</p>
                  <a
                    href={currentLecture.content}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline"
                  >
                    View PDF
                  </a>
                  <a
                    href={currentLecture.content}
                    target="_blank"
                    download
                    className="mt-3 inline-block bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/80"
                  >
                    Download PDF
                  </a> */}

                  {currentLecture?.notes?.length > 0 &&
                    currentLecture?.notes?.map((item, index) => (
                      <div
                        key={item + index}
                        className="flex flex-col justify-center items-center"
                      >
                        <Link className="block text-blue-400" href={item}>
                          {item}
                        </Link>
                        <a
                          href={item}
                          target="_blank"
                          download
                          className="mt-3 inline-block bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/80 w-fit"
                        >
                          Download PDF
                        </a>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </>
        )}
        <div className="flex justify-end pt-3 gap-x-3">
          <Button size="lg" variant="secondary" onClick={handlePrevLecture}>
            Previous
          </Button>
          <Button
            size="lg"
            variant="default"
            className="bg-primary"
            onClick={handleNextLecture}
          >
            Next
          </Button>
        </div>
      </div>

      {/* Modules List */}
      <div className="flex-1 w-full lg:max-w-md">
        <Card className="py-5 mb-5 w-full lg:w-[97%]">
          <CardContent>
            <span className=" flex justify-end mb-2">
              {Math.round(myClass.overallProgress)}%
            </span>
            <div>
              <Progress
                value={Math.round(myClass.overallProgress)}
                className="h-3"
              />
            </div>
            <div className="relative mt-5">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                id="lecture-search"
                type="text"
                placeholder="Search lectures..."
                className="pl-9"
              />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6 overflow-y-auto max-h-[80vh] pr-2">
          {myClass.course.modules.map((module) => (
            <Card
              key={module.id}
              className="transition-all duration-200 hover:shadow-lg border border-border py-0"
            >
              <Collapsible
                onOpenChange={() =>
                  setCurrentModuleId(
                    currentModuleId === module._id ? null : module._id
                  )
                }
                open={module._id == currentModuleId}
              >
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors duration-200 p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-foreground">
                        {module.title}
                      </h3>
                      <ChevronDown className="w-5 h-5 text-muted-foreground transition-transform duration-200 ml-4" />
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                      <div className="flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        <span>{module.lectures.length} Lectures</span>
                      </div>
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <CardContent className="pt-0 pb-6 px-6">
                    <div className="space-y-3">
                      {module.lectures.map((lecture, index) => {
                        const isActive = currentLecture?._id === lecture._id;
                        console.log({ isActive });
                        return (
                          <div
                            key={lecture._id}
                            onClick={() => {
                              if (!lecture.isLocked) {
                                handleSetCurrentLecture(lecture.id);
                              }
                            }}
                            className={`group flex items-center gap-4 p-4 rounded-lg border transition-all duration-200 ${
                              isActive
                                ? "bg-primary/10 border-primary"
                                : !lecture.isLocked
                                ? "hover:bg-muted/30 hover:border-border cursor-pointer"
                                : "bg-muted/20 border-border cursor-not-allowed"
                            }`}
                          >
                            {/* Icon */}
                            {!lecture.isLocked ? (
                              lecture.contentType === "text" ? (
                                <Type className="w-5 h-5" />
                              ) : lecture.contentType === "pdf" ? (
                                <FileText className="w-5 h-5" />
                              ) : lecture.contentType === "video" ? (
                                <Play className="w-5 h-5" />
                              ) : (
                                <FileText className="w-5 h-5" /> // default icon
                              )
                            ) : (
                              <Lock className="w-5 h-5" />
                            )}

                            {/* Title */}
                            <div className="flex-1 min-w-0">
                              <h4
                                className={`text-base font-medium truncate ${
                                  isActive
                                    ? "text-primary font-semibold"
                                    : !lecture.isLocked
                                    ? "text-foreground group-hover:text-primary"
                                    : "text-muted-foreground"
                                }`}
                              >
                                {index + 1}. {lecture.title}
                              </h4>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LectureWatchPage;
