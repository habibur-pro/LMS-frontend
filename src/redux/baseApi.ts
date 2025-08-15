import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { tagTypeList } from "./taglist";
import { getSession } from "next-auth/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL as string,
    prepareHeaders: async (headers) => {
      const session = await getSession();
      if (session?.user?.accessToken) {
        headers.set("authorization", `Bearer ${session?.user?.accessToken}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: tagTypeList,
});
export default baseApi;
