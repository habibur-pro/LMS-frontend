import Login from "@/components/pages/Login";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Login | Minimal LLM",
};

const page = () => {
  return (
    <div>
      <Login />
    </div>
  );
};

export default page;
