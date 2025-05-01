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
      providesTags: (_, __, id) => [{ type: 'Products', id }],
    }),
    getCategories: builder.query<string[], void>({
      query: () => 'products/categories',
      providesTags: ['Categories'],
    }),
    getProductsByCategory: builder.query<Product[], string>({
      query: (category) => `products/category/${category}`,
      providesTags: (_, __, category) => [{ type: 'Products', id: category }],
    }),
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
  useSearchProductsQuery,
} = productsApi;