import baseApi from "../baseApi";
import { tagTypes } from "../taglist";

const ENDPOINT = "/orders";

export const orderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all users
    getAllOrders: build.query({
      query: () => ({
        url: `${ENDPOINT}`,
        method: "GET",
      }),
      providesTags: [tagTypes.ORDERS],
    }),
  }),
});

export const { useGetAllOrdersQuery } = orderApi;
