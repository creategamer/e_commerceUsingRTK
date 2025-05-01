import { apiSlice } from '../api';
import { CartItem } from '../../types'; // Ensure CartItem is defined in types.ts

export const cartApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCarts: builder.query<CartItem[], void>({
      query: () => 'carts',
      providesTags: ['Cart'],
    }),
    getUserCart: builder.query<CartItem[], string>({
      query: (userId) => `carts/user/${userId}`,
      providesTags: (_, __, userId) => [{ type: 'Cart', id: userId }],
    }),
    getCartById: builder.query<CartItem[], number>({
      query: (id) => `carts/${id}`,
      providesTags: (_, __, id) => [{ type: 'Cart', id }],
    }),
    addCart: builder.mutation<void, CartItem[]>({
      query: (cart) => ({
        url: 'carts',
        method: 'POST',
        body: cart,
      }),
      invalidatesTags: ['Cart'],
    }),
    updateCart: builder.mutation<void, { id: number; cart: Partial<CartItem[]> }>({
      query: ({ id, ...cart }) => ({
        url: `carts/${id}`,
        method: 'PUT',
        body: cart,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: 'Cart', id }],
    }),
    deleteCart: builder.mutation<void, number>({
      query: (id) => ({
        url: `carts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, __, id) => [{ type: 'Cart', id }],
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