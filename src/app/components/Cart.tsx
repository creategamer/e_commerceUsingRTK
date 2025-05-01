import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RootState } from '../../app/store';
import {  removeFromCart, updateQuantity, clearCart, toggleCart } from './features/cart/cartSlice';
import { CartItem } from '../components/features/cart/cartSlice'

const Cart = () => {
  const dispatch = useDispatch();
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const { items, totalItems, totalAmount, isCartOpen } = useAppSelector((state) => state.cart);

  const handleUpdateQuantity = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart(id));
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold flex items-center">
            <ShoppingBag className="mr-2" />
            Your Cart ({totalItems})
          </h2>
          <button
            onClick={() => dispatch(toggleCart())}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="text-center py-10">
              <ShoppingBag className="mx-auto mb-4 text-gray-400" size={48} />
              <p className="text-gray-500">Your cart is empty</p>
              <button
                onClick={() => dispatch(toggleCart())}
                className="mt-4 text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item: CartItem) => (
                <div key={item.id} className="flex border rounded-lg overflow-hidden">
                  <div className="w-24 h-24 bg-gray-100 p-2">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 p-3 flex flex-col">
                    <div className="flex justify-between">
                      <Link
                        to={`/product/${item.id}`}
                        className="font-medium text-gray-800 hover:text-indigo-600 line-clamp-2"
                      >
                        {item.title}
                      </Link>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X size={18} />
                      </button>
                    </div>
                    {item.category && (
                      <span className="text-sm text-gray-500 capitalize">{item.category}</span>
                    )}
                    <div className="flex justify-between items-center mt-auto">
                      <div className="flex items-center border rounded">
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 hover:bg-gray-100"
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-3">{item.quantity}</span>
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 hover:bg-gray-100"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t p-4">
            <div className="flex justify-between mb-4">
              <span className="font-semibold">Subtotal</span>
              <span className="font-bold">${totalAmount.toFixed(2)}</span>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              Shipping and taxes calculated at checkout
            </p>
            <Link
              to="/checkout"
              onClick={() => dispatch(toggleCart())}
              className="block bg-indigo-600 hover:bg-indigo-700 text-white text-center py-3 rounded-lg font-semibold mb-2"
            >
              Checkout
            </Link>
            <button
              onClick={() => dispatch(clearCart())}
              className="block w-full text-red-500 hover:text-red-700 text-center py-2 font-medium"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;