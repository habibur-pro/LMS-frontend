import baseApi from "../baseApi";
import { tagTypes } from "../taglist";

const ENDPOINT = "/auth";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // user sign-up api endpoint
    signUp: build.mutation({
      query: (signUpData) => ({
        url: `${ENDPOINT}/sign-up`,
        method: "POST",
        body: signUpData,
      }),
      invalidatesTags: [tagTypes.AUTH],
    }),
    // user sign-in api
    verifySignin: build.mutation({
      query: (signinData) => ({
        url: `${ENDPOINT}/verify-signin`,
        method: "POST",
        body: signinData,
      }),
      invalidatesTags: [tagTypes.AUTH],
    }),
    // change password api endpoint
    changePassword: build.mutation({
      query: ({ userId, ...data }) => ({
        url: `/auth/change-password/${userId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.AUTH],
    }),
    // forgot password api endpoint
    forgotPassword: build.mutation({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.AUTH],
    }),
    // reset password api endpoint
    resetPassword: build.mutation({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.AUTH],
    }),
  }),
});

export const {
  useSignUpMutation,
  useVerifySigninMutation,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
