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

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const products = await getProducts({ available: 'true' });
        setFeaturedProducts(products.slice(0, 4));
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  const categories = [
    { name: 'Traditional', emoji: '🍬', description: 'Classic favorites' },
    { name: 'Dry Sweets', emoji: '🥜', description: 'Nutty delights' },
    { name: 'Milk-Based', emoji: '🥛', description: 'Creamy treats' },
    { name: 'Special', emoji: '✨', description: 'Premium selection' },
  ];

  const features = [
    { icon: Star, title: 'Premium Quality', description: 'Made with finest ingredients' },
    { icon: Truck, title: 'Fresh Delivery', description: 'Delivered fresh to you' },
    { icon: Shield, title: 'Pure & Authentic', description: '100% traditional recipes' },
    { icon: Clock, title: 'Made Fresh', description: 'Prepared fresh daily' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100">
                <div className="w-14 h-14 mx-auto bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center mb-4">
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="font-semibold text-amber-900">{feature.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-amber-900">Browse by Category</h2>
            <p className="text-gray-600 mt-2">Find your favorite sweets</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/products?category=${category.name}`}
                className="group bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all text-center hover:-translate-y-1"
              >
                <span className="text-5xl block mb-4 group-hover:scale-110 transition-transform">
                  {category.emoji}
                </span>
                <h3 className="font-semibold text-amber-900 group-hover:text-orange-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{category.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-amber-900">Featured Sweets</h2>
              <p className="text-gray-600 mt-2">Our most loved delicacies</p>
            </div>
            <Link
              href="/products"
              className="hidden md:flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium transition-colors"
            >
              View All Products
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
              {featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}

          <div className="mt-8 text-center md:hidden">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-3 rounded-full font-semibold"
            >
              View All Products
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
