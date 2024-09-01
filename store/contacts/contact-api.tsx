import { apiSlice } from "../api-slice";

export const contactApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllContacts: builder.query({
      query: () => ({
        url: "get-contacts",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    deleteContact: builder.mutation({
      query: (id) => ({
        url: `delete-contact/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
    
   
  }),
});

export const {
    useGetAllContactsQuery,
    useDeleteContactMutation,
} = contactApi;
