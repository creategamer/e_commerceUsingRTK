import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Star, ShoppingBag, ChevronLeft, Truck, RefreshCcw, Heart } from 'lucide-react';
import { useGetProductByIdQuery, useGetProductsByCategoryQuery } from '../services/endpoints/productsApi';
import { addToCart } from '../features/cart/cartSlice';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  
  const { data: product, isLoading, error } = useGetProductByIdQuery(Number(id));
  
  // Fetch related products from the same category
  const { data: relatedProducts } = useGetProductsByCategoryQuery(
    product?.category || '', 
    { skip: !product }
  );
  
  // Filter out the current product and limit to 4 related products
  const filteredRelatedProducts = relatedProducts?.filter(p => p.id !== Number(id)).slice(0, 4) || [];
  
  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        category: product.category
      }));
      // You could show a notification here that the item was added
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600"></div>
      </div>
    );
  }
  
  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Product Not Found</h2>
        <p className="text-gray-600 mb-6">Sorry, we couldn't find the product you're looking for.</p>
        <Link 
          to="/menu" 
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-semibold"
        >
          <ChevronLeft className="mr-2" />
          Back to Products
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link 
          to="/menu" 
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-semibold"
        >
          <ChevronLeft className="mr-2" />
          Back to Products
        </Link>
      </div>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          {/* Product Image */}
          <div className="bg-gray-50 rounded-lg p-8 flex items-center justify-center">
            <img 
              src={product.image} 
              alt={product.title}
              className="max-h-80 object-contain" 
            />
          </div>
          
          {/* Product Details */}
          <div className="flex flex-col">
            <div className="text-sm font-semibold text-indigo-600 mb-1 capitalize">
              {product.category}
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-3">
              {product.title}
            </h1>
            
            {/* Ratings */}
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={20} 
                    fill={i < Math.round(product.rating.rate) ? "currentColor" : "none"}
                  />
                ))}
              </div>
              <span className="text-gray-600 ml-2 text-sm">
                {product.rating.rate} ({product.rating.count} reviews)
              </span>
            </div>
            
            {/* Price */}
            <div className="text-3xl font-bold text-gray-800 mb-6">
              ${product.price.toFixed(2)}
            </div>
            
            {/* Description */}
            <p className="text-gray-600 mb-6">
              {product.description}
            </p>
            
            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Quantity</label>
              <div className="flex items-center border rounded w-32">
                <button 
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="px-3 py-2 hover:bg-gray-100"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full text-center border-0 focus:ring-0"
                />
                <button 
                  onClick={() => setQuantity(prev => prev + 1)}
                  className="px-3 py-2 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>
            
            {/* Add to Cart Button */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center"
              >
                <ShoppingBag className="mr-2" size={20} />
                Add to Cart
              </button>
              <button
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-semibold flex items-center justify-center"
              >
                <Heart className="mr-2" size={20} />
                Add to Wishlist
              </button>
            </div>
            
            {/* Shipping & Return Info */}
            <div className="border-t pt-6">
              <div className="flex items-center mb-3">
                <Truck className="text-indigo-600 mr-3" size={20} />
                <span className="text-gray-700">Free shipping on orders over $50</span>
              </div>
              <div className="flex items-center">
                <RefreshCcw className="text-indigo-600 mr-3" size={20} />
                <span className="text-gray-700">30-day easy returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related Products */}
      {filteredRelatedProducts.length > 0 && (
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredRelatedProducts.map((relatedProduct) => (
              <Link 
                key={relatedProduct.id}
                to={`/product/${relatedProduct.id}`}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="h-48 bg-gray-100 p-4">
                  <img 
                    src={relatedProduct.image} 
                    alt={relatedProduct.title}
                    className="w-full h-full object-contain" 
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-800 mb-2 truncate">{relatedProduct.title}</h3>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-800">${relatedProduct.price.toFixed(2)}</span>
                    <div className="flex text-yellow-400">
                      <Star size={16} fill="currentColor" />
                      <span className="text-gray-600 ml-1 text-sm">{relatedProduct.rating.rate}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;