'use client';

import { useState, useEffect, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { getProduct } from '@/lib/api';
import QuantitySelector from '@/components/QuantitySelector';
import WhatsAppButton from '@/components/WhatsAppButton';
import { ArrowLeft, Check, X, Tag, Package } from 'lucide-react';

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const API_BASE = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000';

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProduct(id);
        setProduct(data);
        setQuantity(data.minQuantity);
      } catch (err) {
        setError('Product not found');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="aspect-square bg-gray-200 rounded-3xl animate-pulse" />
          <div className="space-y-6">
            <div className="h-10 bg-gray-200 rounded-lg w-3/4 animate-pulse" />
            <div className="h-6 bg-gray-200 rounded-lg w-1/4 animate-pulse" />
            <div className="h-24 bg-gray-200 rounded-lg animate-pulse" />
            <div className="h-12 bg-gray-200 rounded-lg w-1/2 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <span className="text-8xl block mb-6">😕</span>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-8">The sweet you&apos;re looking for doesn&apos;t exist.</p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Products
        </Link>
      </div>
    );
  }

  const totalPrice = product.price * quantity;
  const unitName = product.unit.replace('per ', '');
  const step = unitName === 'kg' ? 0.5 : 1;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Products
        </Link>
      </nav>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="relative aspect-square bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl overflow-hidden shadow-xl">
          {product.image ? (
            <Image
              src={product.image.startsWith('http') ? product.image : `${API_BASE}${product.image}`}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-9xl">🍬</span>
            </div>
          )}
          
          {/* Badges */}
          <div className="absolute top-6 left-6 flex flex-col gap-2">
            <span className="bg-amber-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
              {product.category}
            </span>
            <span
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
                product.isAvailable
                  ? 'bg-green-500 text-white'
                  : 'bg-red-500 text-white'
              }`}
            >
              {product.isAvailable ? (
                <>
                  <Check className="h-4 w-4" /> In Stock
                </>
              ) : (
                <>
                  <X className="h-4 w-4" /> Sold Out
                </>
              )}
            </span>
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-amber-900">{product.name}</h1>
            <p className="text-gray-600 mt-4 text-lg leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Price */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-orange-600">₹{product.price}</span>
              <span className="text-gray-500 text-lg">{product.unit}</span>
            </div>
          </div>

          {/* Product Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3">
              <Tag className="h-6 w-6 text-orange-500" />
              <div>
                <p className="text-sm text-gray-500">Category</p>
                <p className="font-semibold text-gray-800">{product.category}</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3">
              <Package className="h-6 w-6 text-orange-500" />
              <div>
                <p className="text-sm text-gray-500">Min. Order</p>
                <p className="font-semibold text-gray-800">
                  {product.minQuantity} {unitName}
                </p>
              </div>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700">
              Select Quantity
            </label>
            <QuantitySelector
              quantity={quantity}
              setQuantity={setQuantity}
              min={product.minQuantity}
              max={100}
              unit={unitName}
              step={step}
            />
          </div>

          {/* Total Price */}
          <div className="bg-orange-50 rounded-2xl p-6 border border-orange-200">
            <div className="flex items-center justify-between">
              <span className="text-gray-700 font-medium">Total Amount</span>
              <span className="text-3xl font-bold text-orange-600">
                ₹{totalPrice.toFixed(2)}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {quantity} {unitName} × ₹{product.price}/{unitName}
            </p>
          </div>

          {/* WhatsApp Button */}
          <WhatsAppButton product={product} quantity={quantity} />

          {/* Additional Info */}
          <p className="text-center text-sm text-gray-500">
            Click above to place your order via WhatsApp. We&apos;ll confirm your order shortly!
          </p>
        </div>
      </div>
    </div>
  );
}
