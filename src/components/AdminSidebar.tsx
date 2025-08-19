import { BarChart3, BookOpen, Settings, Users, X } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { closeSidebar } from "@/redux/features/sidebarSlice";

const AdminSidebar = () => {
  const isOpenSidebar = useAppSelector((state) => state.sidebarToggle.isOpen);
  const dispatch = useAppDispatch();
  const sidebarItems = [
    { name: "Courses", href: "/admin/courses", icon: BookOpen },
    { name: "Students", href: "/admin/students", icon: Users },
    { name: "Watch History", href: "/admin/watch-history", icon: BarChart3 },
    { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div>
      {/* Mobile sidebar overlay */}
      {isOpenSidebar && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => dispatch(closeSidebar())}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpenSidebar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => dispatch(closeSidebar())}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="mt-6">
          <div className="px-3">
            {sidebarItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center px-3 py-2 mt-1 text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors"
                onClick={() => dispatch(closeSidebar())}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default AdminSidebar;
