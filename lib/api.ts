import { Product, ProductFormData, Admin } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Helper to get auth token
const getAuthHeader = (): HeadersInit => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('adminToken');
    if (token) {
      return { Authorization: `Bearer ${token}` };
    }
  }
  return {};
};

// Products API
export const getProducts = async (params?: {
  category?: string;
  available?: string;
  search?: string;
}): Promise<Product[]> => {
  const searchParams = new URLSearchParams();
  if (params?.category) searchParams.append('category', params.category);
  if (params?.available) searchParams.append('available', params.available);
  if (params?.search) searchParams.append('search', params.search);

  const url = `${API_URL}/products${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  
  return response.json();
};

export const getProduct = async (id: string): Promise<Product> => {
  const response = await fetch(`${API_URL}/products/${id}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }
  
  return response.json();
};

export const createProduct = async (data: ProductFormData): Promise<Product> => {
  const response = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create product');
  }

  return response.json();
};

export const updateProduct = async (
  id: string,
  data: Partial<ProductFormData>
): Promise<Product> => {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update product');
  }

  return response.json();
};

export const deleteProduct = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'DELETE',
    headers: {
      ...getAuthHeader(),
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to delete product');
  }
};

// Auth API
export const login = async (
  username: string,
  password: string
): Promise<Admin> => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Invalid credentials');
  }

  return response.json();
};

export const getMe = async (): Promise<Admin> => {
  const response = await fetch(`${API_URL}/auth/me`, {
    headers: {
      ...getAuthHeader(),
    },
  });

  if (!response.ok) {
    throw new Error('Not authenticated');
  }

  return response.json();
};

// Upload API
export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await fetch(`${API_URL}/upload`, {
    method: 'POST',
    headers: {
      ...getAuthHeader(),
    },
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to upload image');
  }

  const data = await response.json();
  return data.url;
};
