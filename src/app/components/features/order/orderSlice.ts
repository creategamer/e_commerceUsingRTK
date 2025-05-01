import { Order } from '@/app/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OrderState {
  currentOrder: Order | null;
}

const initialState: OrderState = {
  currentOrder: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setCurrentOrder: (state, action: PayloadAction<Order | null>) => {
      state.currentOrder = action.payload;
    },
  },
});

export const { setCurrentOrder } = orderSlice.actions;
export default orderSlice.reducer;