import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useGetProductQuery } from '../services/endpoints/productsApi';
import { ShoppingBag, Star, ArrowLeft } from 'lucide-react';
import { addToCart } from '../components/features/cart/cartSlice';


const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const { data: product, isLoading, error, refetch } = useGetProductQuery(Number(id));

  const handleAddToCart = () => {
    if (product) {
      dispatch(
        addToCart({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          category: product.category,
        })
      );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading product details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-red-500 text-lg">Failed to load product details.</p>
        <button
          onClick={refetch}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <Link
          to="/menu"
          className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Menu
        </Link>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Image Section */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <img
                src={product.image}
                alt={`Product: ${product.title}`}
                className="w-full h-[300px] sm:h-[400px] object-contain p-6"
              />
            </div>
          </div>
          {/* Details Section */}
          <div className="lg:w-1/2 flex flex-col gap-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.title}</h1>
              <p className="text-gray-600 capitalize mb-2">{product.category}</p>
              <div className="flex items-center mb-4">
                <Star className="h-5 w-5 text-yellow-400 mr-1" />
                <span className="text-gray-600">
                  {product.rating.rate} ({product.rating.count} reviews)
                </span>
              </div>
              <p className="text-2xl font-semibold text-indigo-600 mb-4">
                ${product.price.toFixed(2)}
              </p>
              <p className="text-gray-600 mb-6 line-clamp-3">{product.description}</p>
              <button
                onClick={handleAddToCart}
                aria-label={`Add ${product.title} to cart`}
                className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                <ShoppingBag className="h-5 w-5 mr-2" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;