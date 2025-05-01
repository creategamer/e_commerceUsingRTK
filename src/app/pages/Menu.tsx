// import { useGetProductsQuery } from '../services/endpoints/productApi';
import { useDispatch } from 'react-redux';
// import { addToCart } from '../../features/cart/cartSlice';
import { Link } from 'react-router-dom';
import { useGetProductsQuery } from '../services/endpoints/productsApi';
import { addToCart } from '../components/features/cart/cartSlice';
import { Product } from '../types';

const Menu = () => {
  const dispatch = useDispatch();
  const { data: products, isLoading } = useGetProductsQuery();

  const handleAddToCart = (product: Product) => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        category: product.category,
      })
    );
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products?.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md p-4">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-contain mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
            <p className="text-gray-600 mb-2">${product.price.toFixed(2)}</p>
            <div className="flex justify-between items-center">
              <Link
                to={`/product/${product.id}`}
                className="text-indigo-600 hover:text-indigo-800"
              >
                View Details
              </Link>
              <button
                onClick={() => handleAddToCart(product)}
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;