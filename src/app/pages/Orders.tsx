import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

interface Order {
  id: number;
  userId: string;
  date: string;
  total: number;
  status: string;
  items: { productId: number; productName: string; quantity: number; price: number }[];
  shippingDetails: { name: string; email: string; mobile: string; address: string };
}

const Orders = () => {
  const { user } = useUser();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (user) {
      // Load orders from local storage
      const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      setOrders(storedOrders.filter((order: Order) => order.userId === user.id));
    }
  }, [user]);

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-gray-600 text-xl mt-16">
          Please sign in to view your orders.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Orders</h1>
      {orders.length === 0 ? (
        <div className="text-center text-gray-500 text-xl mt-16">
          <p>You have no orders yet.</p>
          <Link to="/menu" className="text-indigo-600 hover:underline mt-2 inline-block">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Order #{order.id}</h2>
                <p className="text-sm text-gray-500">{order.date}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Shipping Details</h3>
                <p>Name: {order.shippingDetails.name}</p>
                <p>Email: {order.shippingDetails.email}</p>
                <p>Mobile: {order.shippingDetails.mobile}</p>
                <p>Address: {order.shippingDetails.address}</p>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Subtotal
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {order.items.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">{item.productName}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
                        <td className="px-6 py-4 whitespace-nowrap">${item.price.toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">${(item.price * item.quantity).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <p className="text-lg font-bold">Total: ${order.total.toFixed(2)}</p>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.status === 'Completed'
                      ? 'bg-green-100 text-green-800'
                      : order.status === 'Pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;