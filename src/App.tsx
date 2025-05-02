// src/App.tsx
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn,SignUp, SignIn } from '@clerk/clerk-react';

// Layout
// Pages (These will be implemented later)
// import Home from './app/pages/Home';
// import Menu from './app/pages/Menu';
// import Cart from './app/pages/Cart';
// import About from './app/pages/About';
// import Contact from './app/pages/Contact';
// import NotFound from './app/pages/NotFound';
import MainLayout from './app/components/layout/MainLayout';
// import Checkout from './app/pages/Checkout';
// import Orders from './app/pages/Orders';
// import ProductDetail from './app/pages/ProductDetail';


const Home = lazy(() => import('./app/pages/Home'));
const Menu = lazy(() => import('./app/pages/Menu'));
const Cart = lazy(() => import('./app/pages/Cart'));
const About = lazy(() => import('./app/pages/About'));
const Contact = lazy(() => import('./app/pages/Contact'));
const NotFound = lazy(() => import('./app/pages/NotFound'));
const Checkout = lazy(() => import('./app/pages/Checkout'));
const Orders = lazy(() => import('./app/pages/Orders'));
const ProductDetail = lazy(() => import('./app/pages/ProductDetail'));

// Import your Publishable Key
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
  throw new Error("Missing Clerk Publishable Key");
}

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

function App() {
  return (
    <Provider store={store}>
      <ClerkProvider publishableKey={clerkPubKey} afterSignOutUrl="/">
      <BrowserRouter>
      <Suspense
            fallback={
              <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-600">Loading...</p>
              </div>
            }
          >
          <Routes>
            <Route path="/" element={<MainLayout />}>
              {/* Public routes */}
              <Route index element={<Home />} />
              <Route
                path="signup"
                element={<SignUp routing="path" path="/signup" redirectUrl="/menu" />}
              />
              <Route
                path="signin"
                element={<SignIn routing="path" path="/signin" redirectUrl="/menu" />}
              />
              <Route path="menu" element={<Menu />} />
              <Route path="product/:id" element={<ProductDetail />} />
              <Route path="cart" element={<Cart />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              
              {/* Protected routes */}
              <Route 
                path="checkout" 
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="orders" 
                element={
                  <ProtectedRoute>
                    <Orders />
                  </ProtectedRoute>
                } 
              />
              
              {/* Catch all route */}
              <Route path="404" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
      </ClerkProvider>
    </Provider>
  );
}

export default App;