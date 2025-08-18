"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { sampleModules } from "@/lib/moduleData";
import { ChevronDown, Clock, Lock, Play, FileText, Search } from "lucide-react";
import { useState } from "react";
import ReactPlayer from "react-player";

const activeLectureId = "lec-1-1"; // demo
const isLocked = true;

const Page = () => {
  const modules = sampleModules;
  const [currentModule, setCurrentModule] = useState(modules[0]);
  const [currentLecture, setCurrentLecture] = useState(
    currentModule.lectures[0]
  );
  return (
    <div className="container mx-auto py-8 flex flex-col lg:flex-row gap-8">
      {/* Video Player */}
      <div className="flex-1 w-full">
        <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
          {/* 16:9 aspect ratio */}
          <ReactPlayer
            src="https://www.youtube.com/watch?v=LXb3EKWsInQ"
            width="100%"
            height="100%"
            className="absolute top-0 left-0"
            controls
          />
        </div>
        <div className="flex justify-end pt-3">
          <div className="flex gap-x-3">
            <Button size="lg" variant="secondary" className="border">
              Previous
            </Button>
            <Button size="lg" variant="default" className="bg-primary">
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* Modules List */}
      <div className="flex-1 w-full lg:max-w-md">
        <Card className="py-5 mb-5 w-full lg:w-[97%]">
          <CardContent>
            <Progress value={50} className="h-3" />
            <div className="relative mt-5">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                id="lecture-search"
                type="text"
                placeholder="Search lectures..."
                // value={query}
                // onChange={(e) => {
                //   setQuery(e.target.value);
                //   onSearch(e.target.value);
                // }}
                className="pl-9"
              />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6 overflow-y-auto max-h-[80vh] pr-2">
          {modules.map((module) => {
            const totalDuration = 5; // placeholder

            return (
              <Card
                key={module.id}
                className="transition-all duration-200 hover:shadow-lg border border-border py-0"
              >
                <Collapsible defaultOpen={currentModule?.id === module.id}>
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
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{totalDuration} min</span>
                        </div>
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <CardContent className="pt-0 pb-6 px-6">
                      <div className="space-y-3">
                        {module.lectures.map((lecture, index) => {
                          const isActive = currentLecture === lecture;
                          return (
                            <div
                              key={lecture.id}
                              // onClick={() => setCurrentLecture(lecture)}
                              className={`group flex items-center gap-4 p-4 rounded-lg border transition-all duration-200 ${
                                isActive
                                  ? "bg-primary/10 border-primary"
                                  : !isLocked
                                  ? "hover:bg-muted/30 hover:border-border border-border/50 cursor-pointer"
                                  : "bg-muted/20 border-border/50 cursor-not-allowed"
                              }`}
                            >
                              <div
                                className={`flex-shrink-0 ${
                                  isLocked && !isActive
                                    ? "text-muted-foreground"
                                    : "text-primary"
                                }`}
                              >
                                {isLocked && !isActive ? (
                                  <Lock className="w-5 h-5" />
                                ) : (
                                  <Play className="w-5 h-5" />
                                )}
                              </div>

                              <div className="flex-1 min-w-0">
                                <h4
                                  className={`text-base font-medium truncate ${
                                    isLocked && !isActive
                                      ? "text-muted-foreground"
                                      : isActive
                                      ? "text-primary font-semibold"
                                      : "text-foreground group-hover:text-primary"
                                  }`}
                                >
                                  {index + 1}. {lecture.title}
                                </h4>
                              </div>

                              <span
                                className={`text-sm px-2 py-1 rounded-md ${
                                  isActive
                                    ? "bg-primary/20 text-primary"
                                    : "text-muted-foreground bg-muted"
                                }`}
                              >
                                5 min
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Page;
