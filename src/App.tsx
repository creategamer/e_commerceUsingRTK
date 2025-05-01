// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn,SignUp, SignIn } from '@clerk/clerk-react';

// Layout
// Pages (These will be implemented later)
import Home from './app/pages/Home';
import Menu from './app/pages/Menu';
import DishDetails from './app/pages/DishDetails';
import Cart from './app/pages/Cart';
import About from './app/pages/About';
import Contact from './app/pages/Contact';
import NotFound from './app/pages/NotFound';
import MainLayout from './app/components/layout/MainLayout';
import Checkout from './app/pages/Checkout';
import Orders from './app/pages/Orders';


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
        <Routes>
          <Route path="/" element={<MainLayout />}>
            {/* Public routes */}
            <Route index element={<Home />} />
            <Route path="signup" element={<SignUp routing="path" />} />
            <Route path="signin" element={<SignIn routing="path" />} />
            <Route path="menu" element={<Menu />} />
            <Route path="menu/:id" element={<DishDetails />} />
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
      </BrowserRouter>
      </ClerkProvider>
    </Provider>
  );
}

export default App;