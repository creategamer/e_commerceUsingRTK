import { apiSlice } from '../api';
import { Product } from '../../types';

// Extend the apiSlice with endpoints for products
export const productsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all products
    getProducts: builder.query<Product[], void>({
      query: () => 'products',
      providesTags: ['Products'],
    }),

    // Get a single product by ID
    getProduct: builder.query<Product, number>({
      query: (id) => `products/${id}`,
      providesTags: (result, error, id) => [{ type: 'Products', id }],
    }),

    // Get all categories
    getCategories: builder.query<string[], void>({
      query: () => 'products/categories',
      providesTags: ['Categories'],
    }),

    // Get products by category
    getProductsByCategory: builder.query<Product[], string>({
      query: (category) => `products/category/${category}`,
      providesTags: (result, error, category) => [
        { type: 'Products', id: category },
      ],
    }),
  }),
});

// Export the auto-generated hooks
export const {
  useGetProductsQuery,
  useGetProductQuery,
  useGetCategoriesQuery,
  useGetProductsByCategoryQuery,
} = productsApi;