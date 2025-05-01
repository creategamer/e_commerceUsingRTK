import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Base API setup with centralized configuration
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    // Using the Fake Store API
    baseUrl: 'https://fakestoreapi.com/',
  }),
  tagTypes: ['Products', 'Categories', 'Cart', 'Orders'],
  endpoints: () => ({}),
});