'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductGrid from '@/components/ProductGrid';
import { ShoppingBag } from 'lucide-react';

function ProductsContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category') || undefined;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
          <ShoppingBag className="h-4 w-4" />
          <span>Our Collection</span>
        </div>
        <h1 className="text-4xl font-bold text-amber-900">
          {category ? `${category} Sweets` : 'All Our Sweets'}
        </h1>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
          Explore our delicious range of authentic Indian sweets, crafted with love and tradition.
        </p>
      </div>

      {/* Product Grid */}
      <ProductGrid initialCategory={category} />
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="animate-pulse space-y-8">
          <div className="h-32 bg-gray-200 rounded-xl" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-80 bg-gray-200 rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
