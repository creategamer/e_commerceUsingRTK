// Product types
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

// Cart types
export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  category?: string;
}

// Order types
export interface OrderItem {
  productId: number;
  quantity: number;
}

export interface Order {
  id?: number;
  userId: number;
  date?: string;
  products: OrderItem[];
  status?: 'pending' | 'processing' | 'completed' | 'cancelled';
}

// User types
export interface User {
  id: number;
  email: string;
  username: string;
  name?: {
    firstname: string;
    lastname: string;
  };
  address?: {
    city: string;
    street: string;
    number: number;
    zipcode: string;
    geolocation: {
      lat: string;
      long: string;
    };
  };
  phone?: string;
}