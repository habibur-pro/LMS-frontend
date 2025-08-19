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
  }),
});

export const { useAddCourseMutation } = courseApi;
