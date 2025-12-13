'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/lib/types';
import { getProducts } from '@/lib/api';
import ProductCard from './ProductCard';
import { Search, Filter } from 'lucide-react';

interface ProductGridProps {
  initialCategory?: string;
}

const categories = ['all', 'Traditional', 'Dry Sweets', 'Milk-Based', 'Seasonal', 'Special'];

export default function ProductGrid({ initialCategory }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(initialCategory || 'all');
  const [search, setSearch] = useState('');
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [category, showAvailableOnly]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts({
        category: category !== 'all' ? category : undefined,
        available: showAvailableOnly ? 'true' : undefined,
      });
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Filters Section */}
      <div className="bg-white rounded-xl shadow-md p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search sweets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>

          {/* Availability Toggle */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showAvailableOnly}
              onChange={(e) => setShowAvailableOnly(e.target.checked)}
              className="w-4 h-4 accent-orange-500"
            />
            <span className="text-sm text-gray-700">Available only</span>
          </label>
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse"
            >
              <div className="h-48 bg-gray-200" />
              <div className="p-4 space-y-3">
                <div className="h-5 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-8 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-16">
          <span className="text-6xl block mb-4">🍬</span>
          <h3 className="text-xl font-semibold text-gray-700">No sweets found</h3>
          <p className="text-gray-500 mt-2">
            Try adjusting your search or filter criteria
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
