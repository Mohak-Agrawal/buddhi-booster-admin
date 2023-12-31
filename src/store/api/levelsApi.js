import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const levelsApi = createApi({
  reducerPath: 'levelsApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }), // Replace with your actual API endpoint
  endpoints: (builder) => ({
    getLevels: builder.query({
      query: () => 'levels',
    }),
  }),
});

export const { useGetLevelsQuery } = levelsApi;
