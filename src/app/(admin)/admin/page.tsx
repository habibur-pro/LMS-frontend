import { redirect } from "next/navigation";

const page = () => {
  redirect("/admin/courses");
  // return <div>Admin page</div>;
};

export default page;
