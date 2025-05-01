import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useGetProductsQuery } from '../services/endpoints/productsApi';
import { Product } from '../types';
import { addToCart } from '../components/features/cart/cartSlice';


const Menu = () => {
  const dispatch = useDispatch();
  const { data: products, isLoading, error } = useGetProductsQuery();

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

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Our Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
              <div className="w-full h-48 bg-gray-200 rounded mb-4"></div>
              <div className="h-6 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-4"></div>
              <div className="flex justify-between">
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
                <div className="h-10 w-32 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-red-500 text-lg">Failed to load products. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products?.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
          >
            <img
              src={product.image}
              alt={`Product: ${product.title}`}
              className="w-full h-48 sm:h-56 md:h-64 object-contain mb-4"
            />
            <h2 className="text-xl font-semibold mb-2 line-clamp-2">{product.title}</h2>
            <p className="text-gray-600 mb-4">${product.price.toFixed(2)}</p>
            <div className="flex justify-between items-center">
              <Link
                to={`/product/${product.id}`}
                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
              >
                View Details
              </Link>
              <button
                onClick={() => handleAddToCart(product)}
                aria-label={`Add ${product.title} to cart`}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
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