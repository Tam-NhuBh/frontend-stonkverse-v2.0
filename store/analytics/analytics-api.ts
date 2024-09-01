import { apiSlice } from "../api-slice";

export const analyticsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCoursesAnalytics: builder.query({
      query: () => ({
        url: "get-courses-analytics",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getUsersAnalytics: builder.query({
      query: () => ({
        url: "get-users-analytics",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getOrderssAnalytics: builder.query({
      query: () => ({
        url: "get-orders-analytics",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useGetCoursesAnalyticsQuery,
  useGetUsersAnalyticsQuery,
  useGetOrderssAnalyticsQuery,
} = analyticsApi;
