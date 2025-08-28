"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Home, BookOpen, LogOut, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { signOut, useSession } from "next-auth/react";

interface NavigationProps {
  type: "admin" | "user";
}

export function Navigation({ type }: NavigationProps) {
  const pathname = usePathname();
  const router = useRouter();
  const session = useSession();
  const user = session?.data?.user;

  const handleLogout = () => {
    signOut();
    router.push("/");
  };

  const adminLinks = [
    { href: "/admin/courses", label: "Courses", icon: BookOpen },
    { href: "/", label: "Home", icon: Home },
  ];

  const userLinks = [
    { href: "/student/dashboard", label: "Dashboard", icon: Home },
    { href: "/courses", label: "Courses", icon: BookOpen },
  ];

  const links = type === "admin" ? adminLinks : userLinks;

  return (
    <nav className="bg-card shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-xl font-bold">
              LMS {type === "admin" ? "Admin" : "Student"}
            </Link>
          </div>

          <div className="flex items-center space-x-2">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;

              return (
                <Link key={link.href} href={link.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className={cn("flex items-center space-x-2")}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </Button>
                </Link>
              );
            })}

            {user && (
              <>
                <div className="flex items-center space-x-2 px-3 py-2 text-sm">
                  <User className="w-4 h-4" />
                  <span>{user.name}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
