import { Users, TrendingUp, Award, Truck, ShieldCheck, Clock } from 'lucide-react';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-16 rounded-xl mb-16 shadow-xl">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About ShopHub</h1>
            <p className="text-xl opacity-90 mb-8">
              We're on a mission to make online shopping simpler, more enjoyable, and accessible to everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="mb-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Our Story</h2>
            <div className="w-20 h-1 bg-indigo-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-gray-600 mb-4">
                Founded in 2018, ShopHub began with a simple idea: to create an online marketplace where quality meets affordability. Our founders, having experienced the frustrations of online shopping firsthand, set out to build something better.
              </p>
              <p className="text-gray-600 mb-4">
                What started as a small operation with just a handful of products has grown into a thriving e-commerce platform offering thousands of items across multiple categories. Despite our growth, our core values remain unchanged – customer satisfaction, product quality, and ethical business practices.
              </p>
              <p className="text-gray-600">
                Today, ShopHub serves customers worldwide, connecting them with the products they love through a seamless, enjoyable shopping experience. We're proud of how far we've come, but we're even more excited about where we're going.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-indigo-200 rounded-full"></div>
              <img 
                src="/image.jpg" 
                alt="ShopHub team" 
                className="rounded-lg shadow-xl relative z-10" 
              />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-200 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-gray-50 py-16 px-4 rounded-xl mb-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Our Values</h2>
            <div className="w-20 h-1 bg-indigo-600 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These core principles guide everything we do at ShopHub, from product selection to customer service
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="bg-indigo-100 text-indigo-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Quality</h3>
              <p className="text-gray-600">
                We carefully select products that meet our high standards, ensuring you receive only the best.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="bg-purple-100 text-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Trust</h3>
              <p className="text-gray-600">
                Building lasting relationships through transparency, reliability, and honest business practices.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="bg-pink-100 text-pink-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Community</h3>
              <p className="text-gray-600">
                Creating connections between buyers, sellers, and our team to foster a supportive shopping environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="mb-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Meet Our Team</h2>
            <div className="w-20 h-1 bg-indigo-600 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The passionate people behind ShopHub who work tirelessly to provide you with the best shopping experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Team Member 1 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden group">
              <div className="h-64 bg-gray-100 relative overflow-hidden">
                <img 
                  src="/personimg1.jpg" 
                  alt="Team member" 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300" 
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="font-bold text-xl mb-1 text-gray-800">Sarah Johnson</h3>
                <p className="text-indigo-600 font-medium mb-3">Founder & CEO</p>
                <p className="text-gray-600 text-sm">
                  With over 15 years in retail, Sarah leads our vision and strategy.
                </p>
              </div>
            </div>
            
            {/* Team Member 2 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden group">
              <div className="h-64 bg-gray-100 relative overflow-hidden">
                <img 
                  src="/personimg2.jpg" 
                  alt="Team member" 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300" 
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="font-bold text-xl mb-1 text-gray-800">Michael Rodriguez</h3>
                <p className="text-indigo-600 font-medium mb-3">CTO</p>
                <p className="text-gray-600 text-sm">
                  Mike oversees our tech infrastructure and innovation initiatives.
                </p>
              </div>
            </div>
            
            {/* Team Member 3 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden group">
              <div className="h-64 bg-gray-100 relative overflow-hidden">
                <img 
                  src="/personimg3.jpg" 
                  alt="Team member" 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300" 
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="font-bold text-xl mb-1 text-gray-800">Emily Chen</h3>
                <p className="text-indigo-600 font-medium mb-3">Head of Operations</p>
                <p className="text-gray-600 text-sm">
                  Emily ensures smooth operations from warehouse to delivery.
                </p>
              </div>
            </div>
            
            {/* Team Member 4 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden group">
              <div className="h-64 bg-gray-100 relative overflow-hidden">
                <img 
                  src="/personimage.jpg" 
                  alt="Team member" 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300" 
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="font-bold text-xl mb-1 text-gray-800">David Nguyen</h3>
                <p className="text-indigo-600 font-medium mb-3">Customer Experience</p>
                <p className="text-gray-600 text-sm">
                  David leads our customer service team with passion and care.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-16 rounded-xl mb-16 shadow-xl">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Why Choose ShopHub</h2>
            <div className="w-20 h-1 bg-white mx-auto mb-6"></div>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              We're committed to providing you with the best online shopping experience possible
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl text-center">
              <div className="bg-white/20 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Truck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Fast Shipping</h3>
              <p className="text-white/80">
                Most orders are processed and shipped within 24 hours, with real-time tracking available.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl text-center">
              <div className="bg-white/20 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Best Prices</h3>
              <p className="text-white/80">
                We work directly with manufacturers to bring you competitive prices on quality products.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl text-center">
              <div className="bg-white/20 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">24/7 Support</h3>
              <p className="text-white/80">
                Our customer service team is available around the clock to assist with any questions or concerns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mb-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">What Our Customers Say</h2>
            <div className="w-20 h-1 bg-indigo-600 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it - here's what shoppers have to say about their experience with ShopHub
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-8 rounded-xl shadow-md relative">
              <div className="text-indigo-600 text-5xl font-serif absolute top-4 left-4 opacity-20">"</div>
              <div className="relative z-10">
                <p className="text-gray-600 mb-6 italic">
                  "ShopHub has completely changed how I shop online. The website is easy to navigate, shipping is incredibly fast, and their customer service is top-notch!"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden mr-4">
                    <img src="/personimg1.jpg" alt="Customer" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Rebecca T.</h4>
                    <p className="text-sm text-gray-500">Loyal Customer</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-white p-8 rounded-xl shadow-md relative">
              <div className="text-indigo-600 text-5xl font-serif absolute top-4 left-4 opacity-20">"</div>
              <div className="relative z-10">
                <p className="text-gray-600 mb-6 italic">
                  "I appreciate the quality control ShopHub maintains. Every product I've purchased has exceeded my expectations, and returns are hassle-free when needed."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden mr-4">
                    <img src="/personimg3.jpg" alt="Customer" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">James W.</h4>
                    <p className="text-sm text-gray-500">Verified Buyer</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-white p-8 rounded-xl shadow-md relative">
              <div className="text-indigo-600 text-5xl font-serif absolute top-4 left-4 opacity-20">"</div>
              <div className="relative z-10">
                <p className="text-gray-600 mb-6 italic">
                  "As a busy parent, I value convenience and reliability. ShopHub delivers on both fronts, making it my go-to for everything from household essentials to gifts."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden mr-4">
                    <img src="/personimg2.jpg" alt="Customer" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Maria L.</h4>
                    <p className="text-sm text-gray-500">Happy Shopper</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16 px-4 rounded-xl text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Ready to Experience ShopHub?</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Join thousands of satisfied customers and discover why ShopHub is the smart choice for online shopping.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="/menu" 
              className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-8 rounded-lg font-semibold inline-block transition-colors"
            >
              Start Shopping
            </a>
            <a 
              href="/contact" 
              className="bg-transparent border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 py-3 px-8 rounded-lg font-semibold inline-block transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;