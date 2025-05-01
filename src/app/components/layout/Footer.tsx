import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin, Clock, Send } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Newsletter Banner */}
        <div className="bg-indigo-600 rounded-xl p-6 md:p-8 mb-12 shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold">Join Our Newsletter</h3>
              <p className="text-indigo-100 mt-2">Get the latest updates, deals and exclusive offers</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:w-1/2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 text-gray-800 flex-grow"
              />
              <button className="bg-white hover:bg-gray-100 text-indigo-600 font-semibold py-3 px-6 rounded-lg transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand Column */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <svg className="w-8 h-8 text-indigo-500" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" />
                <path d="M2 17L12 22L22 17" />
                <path d="M2 12L12 17L22 12" />
              </svg>
              <span className="text-indigo-500 font-bold text-2xl">ShopHub</span>
            </Link>
            <p className="text-gray-400 mb-6">
              Your one-stop destination for high-quality products at affordable prices. Shop with confidence with our secure payment and fast delivery.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-gray-800 hover:bg-indigo-600 p-2 rounded-full transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-gray-800 hover:bg-indigo-600 p-2 rounded-full transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-gray-800 hover:bg-indigo-600 p-2 rounded-full transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center">
                  <span className="mr-2">→</span> Home
                </Link>
              </li>
              <li>
                <Link to="/menu" className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center">
                  <span className="mr-2">→</span> Shop
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center">
                  <span className="mr-2">→</span> About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center">
                  <span className="mr-2">→</span> Contact
                </Link>
              </li>
              <li>
                <Link to="/orders" className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center">
                  <span className="mr-2">→</span> My Orders
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center">
                  <span className="mr-2">→</span> Wishlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Customer Service</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-indigo-400 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-400 hover:text-indigo-400 transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-indigo-400 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-indigo-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/track-order" className="text-gray-400 hover:text-indigo-400 transition-colors">
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="mr-3 text-indigo-400 mt-1 flex-shrink-0" size={18} />
                <span className="text-gray-400">123 Commerce Street, Shopping District, NY 10001</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-3 text-indigo-400 flex-shrink-0" size={18} />
                <span className="text-gray-400">(123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-3 text-indigo-400 flex-shrink-0" size={18} />
                <span className="text-gray-400">support@shophub.com</span>
              </li>
              <li className="flex items-center">
                <Clock className="mr-3 text-indigo-400 flex-shrink-0" size={18} />
                <span className="text-gray-400">Mon - Fri: 9AM - 9PM</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Payment Methods & Copyright */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-500">© {currentYear} ShopHub. All rights reserved.</p>
            </div>
            {/* <div className="flex space-x-6">
              <img src="/api/placeholder/40/25" alt="Visa" className="h-8" />
              <img src="/api/placeholder/40/25" alt="Mastercard" className="h-8" />
              <img src="/api/placeholder/40/25" alt="Amex" className="h-8" />
              <img src="/api/placeholder/40/25" alt="PayPal" className="h-8" />
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;