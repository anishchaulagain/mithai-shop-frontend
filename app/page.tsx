'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/lib/types';
import { getProducts } from '@/lib/api';
import { ArrowRight, Star, Truck, Shield, Clock } from 'lucide-react';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    { name: 'All', emoji: '🏪' },
    { name: 'Traditional', emoji: '🍬' },
    { name: 'Dry Sweets', emoji: '🥜' },
    { name: 'Milk-Based', emoji: '🥛' },
    { name: 'Special', emoji: '✨' },
  ];

  useEffect(() => {
    const fetchFeatured = async () => {
      setLoading(true);
      try {
        const params: any = { available: 'true' };
        if (selectedCategory !== 'All') {
          params.category = selectedCategory;
        }
        const products = await getProducts(params);
        setFeaturedProducts(products.slice(0, 4));
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, [selectedCategory]);

  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Products Section with Category Filter */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-amber-900">Our Collection</h2>
            <p className="text-gray-600 mt-2 mb-8">Filter by category to find your perfect sweet</p>
            
            {/* Category Badges */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`
                    inline-flex items-center gap-2 px-6 py-2 rounded-full text-sm font-semibold transition-all
                    ${selectedCategory === category.name 
                      ? 'bg-orange-600 text-white shadow-lg scale-105' 
                      : 'bg-orange-50 text-orange-900 hover:bg-orange-100'
                    }
                  `}
                >
                  <span className="text-lg">{category.emoji}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-amber-900">
              {selectedCategory === 'All' ? 'Featured Sweets' : `${selectedCategory} Sweets`}
            </h3>
            <Link
              href="/products"
              className="hidden md:flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium transition-colors"
            >
              View Full Menu
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-amber-50 rounded-2xl h-80 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.length > 0 ? (
                featuredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))
              ) : (
                <div className="col-span-full text-center py-12 text-gray-500">
                  No products found in this category.
                </div>
              )}
            </div>
          )}

          <div className="mt-12 text-center md:hidden">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-3 rounded-full font-semibold"
            >
              View Full Menu
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-amber-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Order?
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Browse our collection and order your favorite sweets directly via WhatsApp!
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-full font-semibold hover:bg-orange-50 transition-colors shadow-lg"
          >
            Browse Products
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
