import baseApi from "../baseApi";
import { tagTypes } from "../taglist";

const ENDPOINT = "/my-classes";

export const myClassApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get my courses
    getMyClasses: build.query({
      query: () => ({
        url: `${ENDPOINT}`,
        method: "GET",
      }),
      providesTags: [tagTypes.MYCLASS],
    }),
    getSingleClass: build.query({
      query: (classId: string) => ({
        url: `${ENDPOINT}/${classId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.MYCLASS],
    }),
    nextLecture: build.mutation({
      query: (classId: string) => ({
        url: `${ENDPOINT}/${classId}/next`,
        method: "POST",
      }),
      invalidatesTags: [tagTypes.MYCLASS],
    }),
    previousLecture: build.mutation({
      query: (classId: string) => ({
        url: `${ENDPOINT}/${classId}/prev`,
        method: "POST",
      }),
      invalidatesTags: [tagTypes.MYCLASS],
    }),
  }),
});

export const {
  useGetMyClassesQuery,
  useGetSingleClassQuery,
  useNextLectureMutation,
  usePreviousLectureMutation,
} = myClassApi;
