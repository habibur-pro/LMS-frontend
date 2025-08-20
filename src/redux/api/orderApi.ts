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
    placeOrder: build.mutation({
      query: (data) => ({
        url: `${ENDPOINT}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.ORDERS],
    }),
  }),
});

export const { useGetAllOrdersQuery, usePlaceOrderMutation } = orderApi;
