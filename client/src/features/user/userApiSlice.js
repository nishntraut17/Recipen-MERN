import { apiSlice } from "../../redux/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/user",
      providesTags: ["users"],
    }),
    updateUser: builder.mutation({
      query: (args) => {
        const { userId, ...userData } = args;
        return {
          url: `/user/${userId}`,
          method: "PUT",
          body: { ...userData },
        };
      },
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useUpdateUserMutation,
} = userApiSlice;
