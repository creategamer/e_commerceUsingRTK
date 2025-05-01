import { apiSlice } from '../api';

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all orders (admin)
    getOrders: builder.query({
      query: () => 'orders',
      providesTags: ['Orders'],
    }),
    
    // Get a specific user's orders
    getUserOrders: builder.query({
      query: (userId) => `orders/user/${userId}`,
      providesTags: (result, error, userId) => [{ type: 'Orders', id: userId }],
    }),
    
    // Get a single order by ID
    getOrderById: builder.query({
      query: (id) => `orders/${id}`,
      providesTags: (result, error, id) => [{ type: 'Orders', id }],
    }),
    
    // Create a new order
    createOrder: builder.mutation({
      query: (order) => ({
        url: 'orders',
        method: 'POST',
        body: order,
      }),
      invalidatesTags: ['Orders'],
    }),
    
    // Update an order
    updateOrder: builder.mutation({
      query: ({ id, ...order }) => ({
        url: `orders/${id}`,
        method: 'PUT',
        body: order,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Orders', id }],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetUserOrdersQuery,
  useGetOrderByIdQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
} = orderApi;c