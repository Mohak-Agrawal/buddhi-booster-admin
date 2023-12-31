// subjectsApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const subjectsApi = createApi({
  reducerPath: 'subjectsApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }), // Replace with your API endpoint
  endpoints: (builder) => ({
    getSubjects: builder.query({
      query: () => 'subjects',
    }),
    getSubjectById: builder.query({
      query: (subjectId) => `subjects/${subjectId}`,
    }),
    createSubject: builder.mutation({
      query: (newSubject) => ({
        url: 'subjects',
        method: 'POST',
        body: newSubject,
      }),
    }),
    updateSubject: builder.mutation({
      query: ({ id, ...updatedSubject }) => ({
        url: `subjects/${id}`,
        method: 'PUT',
        body: updatedSubject,
      }),
    }),
    deleteSubject: builder.mutation({
      query: (subjectId) => ({
        url: `subjects/${subjectId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetSubjectsQuery,
  useGetSubjectByIdQuery,
  useCreateSubjectMutation,
  useUpdateSubjectMutation,
  useDeleteSubjectMutation,
} = subjectsApi;

export default subjectsApi;
