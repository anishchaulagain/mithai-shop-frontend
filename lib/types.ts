// Product type
export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'Traditional' | 'Dry Sweets' | 'Milk-Based' | 'Seasonal' | 'Special';
  isAvailable: boolean;
  unit: 'per kg' | 'per piece' | 'per box' | 'per dozen';
  minQuantity: number;
  createdAt: string;
  updatedAt: string;
}

// Admin user type
export interface Admin {
  _id: string;
  username: string;
  email: string;
  token: string;
}

// Cart item type
export interface CartItem {
  product: Product;
  quantity: number;
}

// Auth context type
export interface AuthContextType {
  admin: Admin | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

// API response types
export interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
}

// Product form data
export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isAvailable: boolean;
  unit: string;
  minQuantity: number;
}
