import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<'general' | 'shipping' | 'returns'>('general');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };
  
  // FAQ data
  const faqs = {
    general: [
      {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and Apple Pay. All payments are processed securely."
      },
      {
        question: "How can I track my order?",
        answer: "You can track your order by logging into your account and visiting the 'My Orders' section. You will also receive email updates with tracking information once your order has been shipped."
      },
      {
        question: "Are my personal details secure?",
        answer: "Yes, we use industry-standard encryption and security measures to protect your personal information. Please refer to our Privacy Policy for more details."
      }
    ],
    shipping: [
      {
        question: "How long will delivery take?",
        answer: "Standard delivery typically takes 3-5 business days within the continental US. Express shipping options are available at checkout for 1-2 day delivery."
      },
      {
        question: "Do you ship internationally?",
        answer: "Yes, we ship to most countries worldwide. International shipping times vary between 7-14 business days depending on the destination."
      },
      {
        question: "Is shipping free?",
        answer: "We offer free standard shipping on all orders over $50. Orders below this amount have a flat shipping fee of $4.99."
      }
    ],
    returns: [
      {
        question: "What is your return policy?",
        answer: "We offer a 30-day return policy for most items. Products must be in their original condition and packaging to be eligible for a full refund."
      },
      {
        question: "How do I initiate a return?",
        answer: "To initiate a return, log into your account, find the order, and select 'Return Items'. Follow the instructions to generate a return shipping label."
      },
      {
        question: "How long do refunds take to process?",
        answer: "Once we receive your return, refunds typically take 5-7 business days to process and appear on your original payment method."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-indigo-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-indigo-100 text-lg max-w-2xl mx-auto">
            Have questions or feedback? We're here to help. Reach out to our team and we'll get back to you as soon as possible.
          </p>
        </div>
      </div>

      {/* Contact Information Cards */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Address Card */}
          <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center hover:shadow-lg transition-shadow">
            <div className="bg-indigo-100 p-3 rounded-full mb-4">
              <MapPin className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Visit Us</h3>
            <p className="text-gray-600">123 Commerce Street, Shopping District, NY 10001</p>
          </div>

          {/* Phone Card */}
          <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center hover:shadow-lg transition-shadow">
            <div className="bg-indigo-100 p-3 rounded-full mb-4">
              <Phone className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Call Us</h3>
            <p className="text-gray-600">(123) 456-7890</p>
            <p className="text-gray-600">Customer Service</p>
          </div>

          {/* Email Card */}
          <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center hover:shadow-lg transition-shadow">
            <div className="bg-indigo-100 p-3 rounded-full mb-4">
              <Mail className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Email Us</h3>
            <p className="text-gray-600">support@shophub.com</p>
            <p className="text-gray-600">For general inquiries</p>
          </div>

          {/* Hours Card */}
          <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center hover:shadow-lg transition-shadow">
            <div className="bg-indigo-100 p-3 rounded-full mb-4">
              <Clock className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Working Hours</h3>
            <p className="text-gray-600">Monday - Friday: 9AM - 9PM</p>
            <p className="text-gray-600">Weekends: 10AM - 6PM</p>
          </div>
        </div>

        {/* Map and Contact Form Section */}
        <div className="flex flex-col lg:flex-row gap-8 mb-16">
          {/* Map */}
          <div className="lg:w-1/2 bg-white rounded-xl shadow-md overflow-hidden">
            <div className="aspect-video bg-gray-300 w-full">
              {/* Real map would be implemented here, using placeholder for now */}
              <div className="w-full h-full flex items-center justify-center bg-indigo-50 p-6">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-indigo-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Our Location</h3>
                  <p className="text-gray-600">
                    123 Commerce Street,<br />
                    Shopping District, NY 10001<br />
                    United States
                  </p>
                  <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                    Get Directions
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:w-1/2 bg-white rounded-xl shadow-md p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                <h3 className="text-xl font-medium text-gray-800 mb-2">Message Sent!</h3>
                <p className="text-gray-600">
                  Thank you for reaching out. We'll get back to you as soon as possible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
                >
                  Send Message <Send className="h-4 w-4 ml-2" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-xl shadow-md p-6 md:p-8 mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
          
          {/* FAQ Tabs */}
          <div className="flex flex-wrap justify-center mb-8 border-b">
            <button
              onClick={() => setActiveTab('general')}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'general'
                  ? 'border-b-2 border-indigo-600 text-indigo-600'
                  : 'text-gray-500 hover:text-indigo-600'
              }`}
            >
              General
            </button>
            <button
              onClick={() => setActiveTab('shipping')}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'shipping'
                  ? 'border-b-2 border-indigo-600 text-indigo-600'
                  : 'text-gray-500 hover:text-indigo-600'
              }`}
            >
              Shipping
            </button>
            <button
              onClick={() => setActiveTab('returns')}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'returns'
                  ? 'border-b-2 border-indigo-600 text-indigo-600'
                  : 'text-gray-500 hover:text-indigo-600'
              }`}
            >
              Returns & Refunds
            </button>
          </div>
          
          {/* FAQ Content */}
          <div className="space-y-4">
            {faqs[activeTab].map((faq, index) => (
              <details
                key={index}
                className="group bg-gray-50 rounded-lg overflow-hidden"
              >
                <summary className="flex justify-between items-center cursor-pointer p-4 text-gray-800 font-medium">
                  {faq.question}
                  <span className="transition-transform group-open:rotate-180">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-indigo-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </summary>
                <div className="px-4 pb-4 text-gray-600">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* Newsletter Subscribe */}
        <div className="bg-indigo-600 rounded-xl p-6 md:p-8 shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold text-white">Get Our Latest Updates</h3>
              <p className="text-indigo-100 mt-2">
                Subscribe to our newsletter for the latest news and exclusive offers
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:w-1/2">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 text-gray-800 flex-grow"
              />
              <button className="bg-white hover:bg-gray-100 text-indigo-600 font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center">
                Subscribe <Send className="h-4 w-4 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;