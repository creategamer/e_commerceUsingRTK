import { apiSlice } from '../api';

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => 'orders',
      providesTags: ['Orders'],
    }),
    getUserOrders: builder.query({
      query: (userId) => `orders/user/${userId}`,
      providesTags: (_, __, userId) => [{ type: 'Orders', id: userId }],
    }),
    getOrderById: builder.query({
      query: (id) => `orders/${id}`,
      providesTags: (_, __, id) => [{ type: 'Orders', id }],
    }),
    createOrder: builder.mutation({
      query: (order) => ({
        url: 'orders',
        method: 'POST',
        body: order,
      }),
      invalidatesTags: ['Orders'],
    }),
    updateOrder: builder.mutation({
      query: ({ id, ...order }) => ({
        url: `orders/${id}`,
        method: 'PUT',
        body: order,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: 'Orders', id }],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetUserOrdersQuery,
  useGetOrderByIdQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
} = orderApi;