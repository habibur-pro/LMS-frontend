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
      query: (data: { classId: string; lectureId?: string }) => ({
        url: `${ENDPOINT}/${data.classId}/next`,
        method: "POST",
        body: { lecture: data.lectureId },
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
    setCurrentLecture: build.mutation({
      query: (data: { classId: string; lectureId?: string }) => ({
        url: `${ENDPOINT}/${data.classId}/set-current`,
        method: "PATCH",
        body: { lecture: data.lectureId },
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
  useSetCurrentLectureMutation
} = myClassApi;
