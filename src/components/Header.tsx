"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Menu,
  BookOpen,
  User,
  LogOut,
  Settings,
  GraduationCap,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { UserRole } from "@/enum";

export default function Header() {
  const session = useSession();
  const user = session?.data?.user;
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    signOut();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6 " />
              <span className="text-xl font-bold">Minimal LMS</span>
            </Link>
          </div>

          {/* Desktop User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        {user?.name?.charAt(0)?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user.name}</p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  {user?.role === UserRole.Student && (
                    <DropdownMenuItem asChild>
                      <Link href="/my-class">
                        <GraduationCap className="mr-2 h-4 w-4" />
                        My Class
                      </Link>
                    </DropdownMenuItem>
                  )}
                  {user?.role === UserRole.Admin && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin">
                        <Settings className="mr-2 h-4 w-4" />
                        Admin Panel
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" asChild>
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Get Started</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] pl-5 sm:w-[400px]">
              <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
              <div className="flex flex-col space-y-4 mt-4">
                <Link
                  href="/"
                  className="flex items-center space-x-2"
                  onClick={() => setIsOpen(false)}
                >
                  <BookOpen className="h-6 w-6 text-primary" />
                  <span className="text-xl font-bold">LMS Platform</span>
                </Link>

                {user ? (
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex items-center space-x-2 mb-4">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {user?.name?.charAt(0)?.toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{user?.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      asChild
                    >
                      <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                        <User className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </Button>
                    {user?.role === UserRole.Student && (
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        asChild
                      >
                        <Link
                          href="/my-courses"
                          onClick={() => setIsOpen(false)}
                        >
                          <GraduationCap className="mr-2 h-4 w-4" />
                          My Courses
                        </Link>
                      </Button>
                    )}
                    {user?.role === UserRole.Admin && (
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        asChild
                      >
                        <Link href="/admin" onClick={() => setIsOpen(false)}>
                          <Settings className="mr-2 h-4 w-4" />
                          Admin Panel
                        </Link>
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </Button>
                  </div>
                ) : (
                  <div className="border-t pt-4 space-y-2">
                    <Button variant="ghost" className="w-full" asChild>
                      <Link href="/login" onClick={() => setIsOpen(false)}>
                        Sign In
                      </Link>
                    </Button>
                    <Button className="w-full" asChild>
                      <Link href="/register" onClick={() => setIsOpen(false)}>
                        Get Started
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
