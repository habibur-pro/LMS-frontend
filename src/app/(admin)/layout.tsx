import AdminHeader from "@/components/AdminHeader";
import AdminSidebar from "@/components/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
