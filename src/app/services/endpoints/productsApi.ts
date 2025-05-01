// src/app/services/endpoints/productsApi.ts
import { apiSlice } from '../api';
import { Product } from '../../types';

export const productsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => 'products',
      providesTags: ['Products'],
    }),
    getProduct: builder.query<Product, number>({
      query: (id) => `products/${id}`,
      providesTags: (result, error, id) => [{ type: 'Products', id }],
    }),
    getCategories: builder.query<string[], void>({
      query: () => 'products/categories',
      providesTags: ['Categories'],
    }),
    getProductsByCategory: builder.query<Product[], string>({
      query: (category) => `products/category/${category}`,
      providesTags: (result, error, category) => [
        { type: 'Products', id: category },
      ],
    }),
    // Add search endpoint
    searchProducts: builder.query<Product[], string>({
      query: (searchTerm) => `products/search?q=${encodeURIComponent(searchTerm)}`,
      providesTags: ['Products'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useGetCategoriesQuery,
  useGetProductsByCategoryQuery,
  useSearchProductsQuery, // Export the new hook
} = productsApi;