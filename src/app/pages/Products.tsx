import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Star, ShoppingBag, Filter, X } from 'lucide-react';
import { 
  useGetProductsQuery, 
  useGetCategoriesQuery,
  useGetProductsByCategoryQuery,
  useSearchProductsQuery
} from '../services/endpoints/productsApi';
// import { addToCart } from '../features/cart/cartSlice';
import { addToCart } from '../components/features/cart/cartSlice';
import { Product } from '../types';

const Products = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const searchParam = searchParams.get('search');
  
  // Local state
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [sortBy, setSortBy] = useState('featured');
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  
  // Queries
  const { data: categories } = useGetCategoriesQuery();
  const { data: allProducts, isLoading: allProductsLoading } = useGetProductsQuery();
  const { data: categoryProducts, isLoading: categoryProductsLoading } = useGetProductsByCategoryQuery(
    categoryParam || '', 
    { skip: !categoryParam }
  );
  const { data: searchResults, isLoading: searchLoading } = useSearchProductsQuery(
    searchParam || '',
    { skip: !searchParam }
  );
  
  // Use the appropriate products data based on filters
  const products = categoryParam ? categoryProducts : searchParam ? searchResults : allProducts;
  const isLoading = categoryParam ? categoryProductsLoading : searchParam ? searchLoading : allProductsLoading;
    
  // Filter and sort products
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    if (products) {
      let result = [...products];
      
      // Apply price filter
      result = result.filter(
        product => product.price >= priceRange.min && product.price <= priceRange.max
      );
      
      // Apply rating filter
      if (selectedRating > 0) {
        result = result.filter(product => Math.round(product.rating.rate) >= selectedRating);
      }
      
      // Apply sorting
      if (sortBy === 'price-low') {
        result.sort((a, b) => a.price - b.price);
      } else if (sortBy === 'price-high') {
        result.sort((a, b) => b.price - a.price);
      } else if (sortBy === 'rating') {
        result.sort((a, b) => b.rating.rate - a.rating.rate);
      }
      
      setFilteredProducts(result);
    }
  }, [products, priceRange, selectedRating, sortBy]);
  
  const handleAddToCart = (product:Product) => {
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      category: product.category
    }));
  };
  
  const handleCategoryChange = (category: string) => {
    if (category) {
      searchParams.set('category', category);
      if (searchParams.has('search')) searchParams.delete('search');
    } else {
      searchParams.delete('category');
    }
    setSearchParams(searchParams);
  };
  
  const clearFilters = () => {
    setPriceRange({ min: 0, max: 1000 });
    setSelectedRating(0);
    setSortBy('featured');
    setSearchParams({});
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        {categoryParam ? `${categoryParam.replace("'s", "")} Products` : searchParam ? `Search Results: "${searchParam}"` : "All Products"}
      </h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setFilterOpen(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <Filter className="mr-2" size={20} />
            Filter Products
          </button>
        </div>
        
        {/* Sidebar Filters - Desktop */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-md p-6 sticky top-20">
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">Categories</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => handleCategoryChange('')}
                    className={`w-full text-left py-1 px-2 rounded hover:bg-indigo-50 ${!categoryParam ? 'bg-indigo-100 text-indigo-700 font-medium' : ''}`}
                  >
                    All Products
                  </button>
                </li>
                {categories?.map((category) => (
                  <li key={category}>
                    <button
                      onClick={() => handleCategoryChange(category)}
                      className={`w-full text-left py-1 px-2 rounded hover:bg-indigo-50 capitalize ${categoryParam === category ? 'bg-indigo-100 text-indigo-700 font-medium' : ''}`}
                    >
                      {category.replace("'s", "")}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">Price Range</h3>
              <div className="flex items-center justify-between mb-2">
                <div className="w-full">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({...priceRange, max: Number(e.target.value)})}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>${priceRange.min}</span>
                    <span>${priceRange.max}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">Rating</h3>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setSelectedRating(rating === selectedRating ? 0 : rating)}
                    className={`w-full flex items-center py-1 px-2 rounded hover:bg-indigo-50 ${selectedRating === rating ? 'bg-indigo-100 text-indigo-700 font-medium' : ''}`}
                  >
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={16} 
                          fill={i < rating ? "currentColor" : "none"}
                        />
                      ))}
                    </div>
                    <span className="ml-2">{rating === 1 ? '& Up' : `& Up`}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <button
              onClick={clearFilters}
              className="text-indigo-600 hover:text-indigo-800 font-medium text-sm flex items-center"
            >
              <X size={16} className="mr-1" />
              Clear All Filters
            </button>
          </div>
        </div>
        
        {/* Mobile Filters - Slide Over */}
        {filterOpen && (
          <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-start">
            <div className="bg-white w-80 h-full overflow-y-auto p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-xl">Filters</h3>
                <button onClick={() => setFilterOpen(false)}>
                  <X size={20} />
                </button>
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">Categories</h3>
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => {
                        handleCategoryChange('');
                        setFilterOpen(false);
                      }}
                      className={`w-full text-left py-1 px-2 rounded hover:bg-indigo-50 ${!categoryParam ? 'bg-indigo-100 text-indigo-700 font-medium' : ''}`}
                    >
                      All Products
                    </button>
                  </li>
                  {categories?.map((category) => (
                    <li key={category}>
                      <button
                        onClick={() => {
                          handleCategoryChange(category);
                          setFilterOpen(false);
                        }}
                        className={`w-full text-left py-1 px-2 rounded hover:bg-indigo-50 capitalize ${categoryParam === category ? 'bg-indigo-100 text-indigo-700 font-medium' : ''}`}
                      >
                        {category.replace("'s", "")}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">Price Range</h3>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-full">
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({...priceRange, max: Number(e.target.value)})}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>${priceRange.min}</span>
                      <span>${priceRange.max}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">Rating</h3>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setSelectedRating(rating === selectedRating ? 0 : rating)}
                      className={`w-full flex items-center py-1 px-2 rounded hover:bg-indigo-50 ${selectedRating === rating ? 'bg-indigo-100 text-indigo-700 font-medium' : ''}`}
                    >
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={16} 
                            fill={i < rating ? "currentColor" : "none"}
                          />
                        ))}
                      </div>
                      <span className="ml-2">{rating === 1 ? '& Up' : `& Up`}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-4">
                <button
                  onClick={() => setFilterOpen(false)}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium"
                >
                  Apply Filters
                </button>
                <button
                  onClick={() => {
                    clearFilters();
                    setFilterOpen(false);
                  }}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-medium"
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Products Grid */}
        <div className="flex-1">
          {/* Sorting and Results Count */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 bg-white p-4 rounded-lg shadow-sm">
            <div className="mb-4 sm:mb-0">
              <p className="text-gray-600">
                Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
              </p>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600 mr-2">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border rounded-lg py-1 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
              </select>
            </div>
          </div>
          
          {/* Products */}
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <ShoppingBag className="mx-auto text-gray-400 mb-4" size={48} />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No Products Found</h3>
              <p className="text-gray-600 mb-6">
                We couldn't find any products matching your criteria. Try adjusting your filters.
              </p>
              <button
                onClick={clearFilters}
                className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-lg font-medium"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <Link to={`/product/${product.id}`}>
                    <div className="h-56 bg-gray-100 p-4">
                      <img 
                        src={product.image} 
                        alt={product.title}
                        className="w-full h-full object-contain" 
                      />
                    </div>
                  </Link>
                  <div className="p-4">
                    <div className="text-sm font-semibold text-indigo-600 mb-1 capitalize">{product.category}</div>
                    <Link to={`/product/${product.id}`}>
                      <h3 className="font-bold text-gray-800 mb-2 hover:text-indigo-600 transition-colors line-clamp-2">{product.title}</h3>
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
                      <span className="text-gray-500 text-sm ml-2">({product.rating.count})</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-800">${product.price.toFixed(2)}</span>
                      <button 
                        onClick={() => handleAddToCart(product)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-3 rounded-lg text-sm"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;