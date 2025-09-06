import baseApi from "../baseApi";
import { tagTypes } from "../taglist";

const ENDPOINT = "/modules";

export const orderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addLecture: build.mutation({
      query: (data: { moduleId: string; data: any }) => ({
        url: `${ENDPOINT}/${data.moduleId}/lectures`,
        method: "POST",
        body: data.data,
      }),
      invalidatesTags: [tagTypes.MODULE, tagTypes.COURSE],
    }),
    deleteModule: build.mutation({
      query: (data: { courseId: string; moduleId: string }) => ({
        url: `${ENDPOINT}/${data.moduleId}?course=${data.courseId}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.MODULE, tagTypes.COURSE],
    }),
  }),
});

export const { useAddLectureMutation, useDeleteModuleMutation } = orderApi;
