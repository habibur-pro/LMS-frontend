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
  }),
});

export const { useDeleteLectureMutation } = lectureApi;
