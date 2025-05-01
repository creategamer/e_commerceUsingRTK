import { Link } from 'react-router-dom';
import { ShoppingBag, Clock, Check, CreditCard, Star } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { 
  useGetProductsQuery, 
  useGetCategoriesQuery,
} from '../services/endpoints/productsApi';
import { addToCart } from '../components/features/cart/cartSlice';
import { Product } from '../types';

const Home = () => {
  const dispatch = useDispatch();
  const { data: products, isLoading: productsLoading } = useGetProductsQuery();
  const { data: categories, isLoading: categoriesLoading } = useGetCategoriesQuery();
  
  const handleAddToCart = (product:Product) => {
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      category: product.category
    }));
  };

  // Get featured products (just the first 4 for now)
  const featuredProducts = products?.slice(0, 4) || [];
  
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-16 md:py-28 rounded-xl mb-12 shadow-xl">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 flex flex-col justify-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Shop the Latest <span className="text-yellow-300">Trends</span> Online
              </h1>
              <p className="text-lg md:text-xl mb-8 opacity-90">
                Discover our curated collection of premium products with fast shipping and hassle-free returns. 
                New arrivals every week!
              </p>
              <div className="flex space-x-4">
                <Link 
                  to="/menu" 
                  className="bg-white text-indigo-700 hover:bg-gray-100 py-3 px-8 rounded-lg font-semibold text-lg inline-block transition-all shadow-lg hover:shadow-xl"
                >
                  Shop Now
                </Link>
                <Link 
                  to="/about" 
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-indigo-700 py-3 px-8 rounded-lg font-semibold text-lg inline-block transition-all"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-yellow-400 rounded-full opacity-50"></div>
                <img 
                  src="/personimg1.jpg" 
                  alt="Featured products" 
                  className="rounded-xl shadow-2xl relative z-10" 
                />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-pink-500 rounded-full opacity-40"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Explore Our Categories</h2>
          <p className="text-gray-600 md:text-lg max-w-2xl mx-auto">Browse our wide selection of products by category</p>
        </div>
        
        {categoriesLoading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : !categories ? (
          <div className="text-center text-red-500">
            Failed to load categories. Please try again later.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link 
                key={index} 
                to={`/menu?category=${category}`} 
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all group"
              >
                <div className="h-32 md:h-40 overflow-hidden rounded-lg mb-4 bg-gray-100 flex items-center justify-center">
                  <div className="w-16 h-16 text-indigo-600 group-hover:scale-110 transition-transform">
                    <ShoppingBag size={64} />
                  </div>
                </div>
                <h3 className="font-semibold text-lg text-gray-800 text-center capitalize">
                  {category.replace("'s", "")}
                </h3>
              </Link>
            ))}
          </div>
        )}
        
        <div className="mt-10 text-center">
          <Link 
            to="/menu" 
            className="text-indigo-600 hover:text-indigo-800 font-semibold inline-flex items-center text-lg"
          >
            View All Products
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </Link>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Why Shop With Us</h2>
          <p className="text-gray-600 md:text-lg max-w-2xl mx-auto">We provide the best online shopping experience</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow border-t-4 border-indigo-600">
            <div className="bg-indigo-100 text-indigo-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-semibold mb-4">Fast Shipping</h3>
            <p className="text-gray-600">
              Get your items delivered quickly with our expedited shipping options and real-time tracking.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow border-t-4 border-purple-600">
            <div className="bg-purple-100 text-purple-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-semibold mb-4">Quality Products</h3>
            <p className="text-gray-600">
              We source only the highest quality products and perform rigorous quality checks.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow border-t-4 border-pink-600">
            <div className="bg-pink-100 text-pink-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CreditCard className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-semibold mb-4">Secure Payment</h3>
            <p className="text-gray-600">
              Multiple payment options with secure processing and fraud protection for your peace of mind.
            </p>
          </div>
        </div>
      </section>
      
      {/* Featured Products Section */}
      <section className="mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Featured Products</h2>
          <p className="text-gray-600 md:text-lg max-w-2xl mx-auto">Customer favorites you don't want to miss</p>
        </div>
        
        {productsLoading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : !featuredProducts.length ? (
          <div className="text-center text-red-500">
            Failed to load products. Please try again later.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <Link to={`/product/${product.id}`}>
                  <div className="h-56 bg-gray-100">
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className="w-full h-full object-contain p-4" 
                    />
                  </div>
                </Link>
                <div className="p-5">
                  <div className="text-sm font-semibold text-indigo-600 mb-1 capitalize">{product.category}</div>
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-bold text-xl mb-2 text-gray-800 hover:text-indigo-600 transition-colors truncate">{product.title}</h3>
                  </Link>
                  <div className="flex items-center mb-3">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={16} 
                          fill={i < Math.round(product.rating.rate) ? "currentColor" : "none"}
                        />
                      ))}
                    </div>
                    <span className="text-gray-500 text-sm ml-2">({product.rating.count} reviews)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-800">${product.price.toFixed(2)}</span>
                    <button 
                      onClick={() => handleAddToCart(product)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg text-sm font-medium"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-10 text-center">
          <Link 
            to="/menu" 
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-8 rounded-lg font-semibold inline-block transition-all"
          >
            View All Products
          </Link>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-8 md:p-12 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Newsletter</h2>
          <p className="text-lg mb-8 opacity-90">
            Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
          </p>
          <div className="flex flex-col sm:flex-row sm:justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 text-gray-800 w-full sm:w-96"
            />
            <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 px-6 rounded-lg transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;