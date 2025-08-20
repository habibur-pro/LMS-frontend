import baseApi from "../baseApi";
import { tagTypes } from "../taglist";

const ENDPOINT = "/courses";

export const courseApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // add new course
    addCourse: build.mutation({
      query: (data) => ({
        url: `${ENDPOINT}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.COURSE],
    }),
    // get all course
    getAllCourse: build.query({
      query: () => ({
        url: `${ENDPOINT}`,
        method: "GET",
      }),
      providesTags: [tagTypes.COURSE],
    }),
    getCourse: build.query({
      query: (slugOrdId: string) => ({
        url: `${ENDPOINT}/${slugOrdId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.COURSE],
    }),
  }),
});

export const { useAddCourseMutation, useGetAllCourseQuery, useGetCourseQuery } =
  courseApi;
