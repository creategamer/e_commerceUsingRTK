import { apiSlice } from '../api';

export const cartApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all carts
    getCarts: builder.query({
      query: () => 'carts',
      providesTags: ['Cart'],
    }),
    
    // Get a specific user's cart
    getUserCart: builder.query({
      query: (userId) => `carts/user/${userId}`,
      providesTags: (result, error, userId) => [{ type: 'Cart', id: userId }],
    }),
    
    // Get a single cart by ID
    getCartById: builder.query({
      query: (id) => `carts/${id}`,
      providesTags: (result, error, id) => [{ type: 'Cart', id }],
    }),
    
    // Add a new cart
    addCart: builder.mutation({
      query: (cart) => ({
        url: 'carts',
        method: 'POST',
        body: cart,
      }),
      invalidatesTags: ['Cart'],
    }),
    
    // Update a cart
    updateCart: builder.mutation({
      query: ({ id, ...cart }) => ({
        url: `carts/${id}`,
        method: 'PUT',
        body: cart,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Cart', id }],
    }),
    
    // Delete a cart
    deleteCart: builder.mutation({
      query: (id) => ({
        url: `carts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Cart', id }],
    }),
  }),
});

export const {
  useGetCartsQuery,
  useGetUserCartQuery,
  useGetCartByIdQuery,
  useAddCartMutation,
  useUpdateCartMutation,
  useDeleteCartMutation,
} = cartApi;