import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/types';
import { Check, X } from 'lucide-react';
import AddToCartButton from './AddToCartButton';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000';

  return (
    <Link href={`/products/${product._id}`}>
      <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-amber-100 hover:border-amber-300 hover:-translate-y-1">
        {/* Image Container */}
        <div className="relative h-48 bg-gradient-to-br from-amber-50 to-orange-50 overflow-hidden">
          {product.image ? (
            <Image
              src={product.image.startsWith('http') ? product.image : `${API_BASE}${product.image}`}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-6xl">🍬</span>
            </div>
          )}
          
          {/* Availability Badge */}
          <div
            className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
              product.isAvailable
                ? 'bg-green-500 text-white'
                : 'bg-red-500 text-white'
            }`}
          >
            {product.isAvailable ? (
              <>
                <Check className="h-3 w-3" /> Available
              </>
            ) : (
              <>
                <X className="h-3 w-3" /> Sold Out
              </>
            )}
          </div>

          {/* Category Badge */}
          <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500 text-white">
            {product.category}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-lg font-bold text-amber-900 group-hover:text-orange-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between mt-4">
            <div>
              <span className="text-2xl font-bold text-orange-600">
                ₹{product.price}
              </span>
              <span className="text-sm text-gray-500 ml-1">
                /{product.unit.replace('per ', '')}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <AddToCartButton 
                product={product} 
                quantity={product.minQuantity}
                className="bg-orange-100 text-orange-600 px-3 py-2 rounded-full hover:bg-orange-200"
                showIcon={true} 
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
