import baseApi from "../baseApi";
import { tagTypes } from "../taglist";

const ENDPOINT = "/lectures";

export const lectureApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    deleteLecture: build.mutation({
      query: (data: { lectureId: string; moduleId: string }) => ({
        url: `${ENDPOINT}/${data.lectureId}?module=${data.moduleId}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.MODULE, tagTypes.COURSE],
    }),
    getLectures: build.query({
      query: ({ courseId, moduleId }) => {
        const params = new URLSearchParams();

        if (courseId && courseId !== "all") params.append("courseId", courseId);
        if (moduleId && moduleId !== "all") params.append("moduleId", moduleId);

        return {
          url: `/lectures?${params.toString()}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useDeleteLectureMutation, useGetLecturesQuery } = lectureApi;
