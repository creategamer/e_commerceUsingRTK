import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { Menu, X, ShoppingCart, Search, Heart } from 'lucide-react';
import { useAppSelector } from '@/app/hooks';
import { RootState } from '@/app/store';
// import { useAppSelector } from '@/app/hooks';
// import { RootState } from '@/app/store';
// import { useAppSelector } from '../../hooks';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const { totalItems } = useAppSelector((state: RootState) => state.cart);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navigateToCart = () => {
    navigate('/cart');
    closeMenu();
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        {showSearch && (
          <div className="mb-4 relative">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <button
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-indigo-600"
              onClick={toggleSearch}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}

        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
            <svg
              className="w-8 h-8 text-indigo-600"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2L2 7L12 12L22 7L12 2Z" />
              <path d="M2 17L12 22L22 17" />
              <path d="M2 12L12 17L22 12" />
            </svg>
            <span className="text-indigo-600 font-bold text-2xl">ShopHub</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`font-medium transition-colors ${
                isActive('/') ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'
              }`}
            >
              Home
            </Link>
            <Link
              to="/menu"
              className={`font-medium transition-colors ${
                isActive('/menu') ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'
              }`}
            >
              Shop
            </Link>
            <Link
              to="/about"
              className={`font-medium transition-colors ${
                isActive('/about') ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'
              }`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`font-medium transition-colors ${
                isActive('/contact') ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'
              }`}
            >
              Contact
            </Link>
            <SignedIn>
              <Link
                to="/orders"
                className={`font-medium transition-colors ${
                  isActive('/orders') ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'
                }`}
              >
                My Orders
              </Link>
            </SignedIn>
          </nav>

          <div className="flex items-center space-x-5">
            <button
              onClick={toggleSearch}
              className="hidden md:flex p-2 hover:text-indigo-600 transition-colors"
              aria-label="Search"
            >
              <Search className="h-6 w-6 text-gray-700 hover:text-indigo-600" />
            </button>
            <button
              className="hidden md:flex p-2 hover:text-indigo-600 transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="h-6 w-6 text-gray-700 hover:text-indigo-600" />
            </button>
            <button
              onClick={navigateToCart}
              className="relative p-2 hover:text-indigo-600 transition-colors"
              aria-label="Cart"
            >
              <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-indigo-600" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <div className="hidden md:block">
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors">
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </div>
            <button className="md:hidden p-2" onClick={toggleMenu} aria-label="Menu">
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-700" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4">
            <div className="mb-4 relative">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className={`font-medium py-2 ${
                  isActive('/') ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'
                }`}
                onClick={closeMenu}
              >
                Home
              </Link>
              <Link
                to="/menu"
                className={`font-medium py-2 ${
                  isActive('/menu') ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'
                }`}
                onClick={closeMenu}
              >
                Shop
              </Link>
              <Link
                to="/about"
                className={`font-medium py-2 ${
                  isActive('/about') ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'
                }`}
                onClick={closeMenu}
              >
                About
              </Link>
              <Link
                to="/contact"
                className={`font-medium py-2 ${
                  isActive('/contact') ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'
                }`}
                onClick={closeMenu}
              >
                Contact
              </Link>
              <SignedIn>
                <Link
                  to="/orders"
                  className={`font-medium py-2 ${
                    isActive('/orders') ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'
                  }`}
                  onClick={closeMenu}
                >
                  My Orders
                </Link>
              </SignedIn>
              <Link
                to="/wishlist"
                className="flex items-center text-gray-700 hover:text-indigo-600 font-medium py-2"
                onClick={closeMenu}
              >
                <Heart className="h-5 w-5 mr-2" />
                Wishlist
              </Link>
              <div className="pt-2">
                <SignedOut>
                  <SignInButton mode="modal">
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-lg w-full transition-colors">
                      Sign In
                    </button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <div className="flex items-center">
                    <span className="text-gray-700 mr-2">Account</span>
                    <UserButton afterSignOutUrl="/" />
                  </div>
                </SignedIn>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;