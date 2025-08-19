"use client";

import type React from "react";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Users,
  BookOpen,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import AdminHeader from "@/components/AdminHeader";
import AdminSidebar from "@/components/AdminSidebar";

const sidebarItems = [
  { name: "Courses", href: "/admin/courses", icon: BookOpen },
  { name: "Students", href: "/admin/students", icon: Users },
  { name: "Watch History", href: "/admin/watch-history", icon: BarChart3 },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top bar */}
        <AdminHeader />
        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
