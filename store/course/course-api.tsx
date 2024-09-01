import { apiSlice } from "../api-slice";

export const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (data) => ({
        url: "create-course",
        method: "POST",
        body: { data },
        credentials: "include" as const,
      }),
    }),
    getAllCourses: builder.query({
      query: () => ({
        url: "get-courses",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `delete-course/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
    getSingleCourse: builder.query({
      query: (id) => ({
        url: `get-course-by-admin/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    editCourse: builder.mutation({
      query: ({ id, data }) => ({
        url: `edit-course/${id}`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),
    getCourseContent: builder.query({
      query: (id: string) => ({
        url: `get-course-content/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    updateLessonCompletion: builder.mutation({
      query: ({ courseId, courseDataId }) => ({
        url: `user/progress/${courseId}/${courseDataId}`,
        method: "POST",
        body: { courseId, courseDataId },
        credentials: "include" as const,
      }),
    }),
    getLessonCompletion: builder.query({
      query: (courseId: string) => ({
        url: `user/progress/${courseId}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetAllCoursesQuery,
  useDeleteCourseMutation,
  useGetSingleCourseQuery,
  useEditCourseMutation,
  useGetCourseContentQuery,
  useUpdateLessonCompletionMutation,
  useGetLessonCompletionQuery,
} = courseApi;
