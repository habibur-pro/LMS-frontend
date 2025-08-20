import baseApi from "../baseApi";
import { tagTypes } from "../taglist";

const ENDPOINT = "/users";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all users
    getAllStudents: build.query({
      query: () => ({
        url: `${ENDPOINT}`,
        method: "GET",
      }),
      providesTags: [tagTypes.USERS],
    }),
  }),
});

export const { useGetAllStudentsQuery } = userApi;
