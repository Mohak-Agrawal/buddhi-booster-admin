import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const examsApi = createApi({
  reducerPath: 'examsApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }), // Replace with your actual API endpoint
  endpoints: (builder) => ({
    getExams: builder.query({
      query: () => 'exams', // Adjust the endpoint based on your API structure
    }),
    getExamById: builder.query({
      query: (examId) => `exams/${examId}`,
    }),
    getQuestionsForExam: builder.query({
      query: (examId) => `exams/${examId}/questions`, // Adjust the endpoint based on your API structure
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
    getQuestionByIdForExam: builder.query({
      query: ({ examId, questionId }) => `exams/${examId}/questions/${questionId}`,
    }),
    createQuestionForExam: builder.mutation({
      query: ({ examId, questions }) => ({
        url: `exams/${examId}/questions`,
        method: 'POST',
        body: { questions },
      }),
    }),
    updateQuestionForExam: builder.mutation({
      query: ({ examId, questionId, updatedQuestion }) => ({
        url: `exams/${examId}/questions/${questionId}`,
        method: 'PUT',
        body: updatedQuestion,
      }),
    }),
    deleteQuestionForExam: builder.mutation({
      query: ({ examId, questionId }) => ({
        url: `exams/${examId}/questions/${questionId}`,
        method: 'DELETE',
      }),
    }),
    getAllUsersScores: builder.query({
      query: (examId) => `examSessions/getAllUsersScores/${examId}`,
    }),
  }),
});

export const {
  useGetExamsQuery,
  useGetExamByIdQuery,
  useGetQuestionByIdForExamQuery,
  useGetQuestionsForExamQuery,
  useCreateExamMutation,
  useUpdateExamMutation,
  useDeleteExamMutation,
  useCreateQuestionForExamMutation,
  useUpdateQuestionForExamMutation,
  useDeleteQuestionForExamMutation,
  useGetAllUsersScoresQuery,
} = examsApi;

export default examsApi;
