import { Product, CartItem } from '../types';

/**
 * Format price with currency symbol
 */
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

/**
 * Truncate text to specified length and add ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

/**
 * Transform a Product to CartItem for adding to cart
 */
export const productToCartItem = (product: Product): Omit<CartItem, 'quantity'> => {
  return {
    id: product.id,
    title: product.title,
    price: product.price,
    image: product.image,
    category: product.category,
  };
};

/**
 * Filter and sort products by various criteria
 */
export const filterProducts = (
  products: Product[],
  {
    category,
    minPrice,
    maxPrice,
    sortBy,
  }: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: 'price-asc' | 'price-desc' | 'rating' | 'name';
  }
): Product[] => {
  let filtered = [...products];

  // Filter by category
  if (category && category !== 'all') {
    filtered = filtered.filter(product => product.category === category);
  }

  // Filter by price range
  if (minPrice !== undefined) {
    filtered = filtered.filter(product => product.price >= minPrice);
  }
  if (maxPrice !== undefined) {
    filtered = filtered.filter(product => product.price <= maxPrice);
  }

  // Sort
  if (sortBy) {
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      case 'name':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }
  }

  return filtered;
};