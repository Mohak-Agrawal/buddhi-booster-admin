// categoryApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }), // Replace with your API endpoint
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => 'categories',
    }),
    getCategoriesBySubject: builder.query({
      query: (subjectId) => `categories/subject/${subjectId}`,
    }),
    createCategory: builder.mutation({
      query: (newCategory) => ({
        url: 'categories',
        method: 'POST',
        body: newCategory,
      }),
    }),
    updateCategory: builder.mutation({
      query: ({ id, ...category }) => ({
        url: `categories/${id}`,
        method: 'PUT',
        body: category,
      }),
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `categories/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useGetCategoriesBySubjectQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;

export default categoryApi;
