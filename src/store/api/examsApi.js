import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const examsApi = createApi({
  reducerPath: 'examsApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }), // Replace with your actual API endpoint
  endpoints: (builder) => ({
    getExams: builder.query({
      query: () => 'exams', // Adjust the endpoint based on your API structure
    }),
    createExam: builder.mutation({
      query: (newExam) => ({
        url: 'exams',
        method: 'POST',
        body: newExam,
      }),
    }),
    updateExam: builder.mutation({
      query: ({ examId, updatedExamData }) => ({
        url: `exams/${examId}`,
        method: 'PUT',
        body: updatedExamData,
      }),
    }),
    deleteExam: builder.mutation({
      query: (examId) => ({
        url: `exams/${examId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetExamsQuery,
  useCreateExamMutation,
  useUpdateExamMutation,
  useDeleteExamMutation,
} = examsApi;
export default examsApi;
