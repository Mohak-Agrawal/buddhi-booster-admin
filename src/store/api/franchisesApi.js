import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const franchisesApi = createApi({
  reducerPath: 'franchisesApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }), // Replace with your actual API endpoint
  endpoints: (builder) => ({
    getFranchises: builder.query({
      query: () => 'franchises', // Adjust the endpoint based on your API structure
    }),
    getFranchiseById: builder.query({
      query: (franchiseId) => `franchises/${franchiseId}`,
    }),

    createFranchise: builder.mutation({
      query: (newFranchise) => ({
        url: 'franchises',
        method: 'POST',
        body: newFranchise,
      }),
    }),
    updateFranchise: builder.mutation({
      query: ({ franchiseId, updatedFranchiseData }) => ({
        url: `franchises/${franchiseId}`,
        method: 'PUT',
        body: updatedFranchiseData,
      }),
    }),
    deleteFranchise: builder.mutation({
      query: (franchiseId) => ({
        url: `franchises/${franchiseId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetFranchisesQuery,
  useGetFranchiseByIdQuery,
  useCreateFranchiseMutation,
  useUpdateFranchiseMutation,
  useDeleteFranchiseMutation,
} = franchisesApi;

export default franchisesApi;
