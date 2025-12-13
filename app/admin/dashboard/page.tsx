'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { getProducts } from '@/lib/api';
import { Package, Plus, TrendingUp, DollarSign, ShoppingBag } from 'lucide-react';

export default function AdminDashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const stats = [
    {
      label: 'Total Products',
      value: products.length,
      icon: Package,
      color: 'from-blue-500 to-blue-600',
    },
    {
      label: 'Available',
      value: products.filter((p) => p.isAvailable).length,
      icon: TrendingUp,
      color: 'from-green-500 to-green-600',
    },
    {
      label: 'Sold Out',
      value: products.filter((p) => !p.isAvailable).length,
      icon: ShoppingBag,
      color: 'from-red-500 to-red-600',
    },
    {
      label: 'Avg. Price',
      value: products.length > 0
        ? `₹${Math.round(products.reduce((a, b) => a + b.price, 0) / products.length)}`
        : '₹0',
      icon: DollarSign,
      color: 'from-amber-500 to-orange-600',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome to your admin panel</p>
        </div>
        <Link
          href="/admin/dashboard/products/new"
          className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg"
        >
          <Plus className="h-5 w-5" />
          Add Product
        </Link>
      </div>

      {/* Stats Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-6 border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-800 mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Recent Products */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">Recent Products</h2>
          <Link
            href="/admin/dashboard/products"
            className="text-orange-600 hover:text-orange-700 font-medium text-sm"
          >
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i}>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-200 rounded w-32 animate-pulse" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-200 rounded w-20 animate-pulse" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-200 rounded w-16 animate-pulse" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-200 rounded w-16 animate-pulse" />
                    </td>
                  </tr>
                ))
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                    No products yet. Add your first product!
                  </td>
                </tr>
              ) : (
                products.slice(0, 5).map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                          <span className="text-xl">🍬</span>
                        </div>
                        <span className="font-medium text-gray-800">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-800">
                      ₹{product.price}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          product.isAvailable
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {product.isAvailable ? 'Available' : 'Sold Out'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
