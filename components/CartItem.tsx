'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/types';
import QuantitySelector from './QuantitySelector';
import { Trash2 } from 'lucide-react';

interface CartItemProps {
  product: Product;
  quantity: number;
  isSelected: boolean;
  onSelect: (selected: boolean) => void;
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
}

export default function CartItem({
  product,
  quantity,
  isSelected,
  onSelect,
  onUpdateQuantity,
  onRemove,
}: CartItemProps) {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000';
  const unitName = product.unit.replace('per ', '');
  const step = unitName === 'kg' ? 0.5 : 1;
  const totalPrice = product.price * quantity;

  return (
    <div className={`bg-white rounded-xl p-4 shadow-sm border transaction-all duration-200 ${isSelected ? 'border-orange-500 ring-1 ring-orange-500' : 'border-gray-100'}`}>
      <div className="flex items-start gap-4">
        {/* Checkbox */}
        <div className="pt-2">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => onSelect(e.target.checked)}
            className="w-5 h-5 accent-orange-500 cursor-pointer rounded"
          />
        </div>

        {/* Image */}
        <Link href={`/products/${product._id}`} className="shrink-0">
          <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
            {product.image ? (
              <Image
                src={product.image.startsWith('http') ? product.image : `${API_BASE}${product.image}`}
                alt={product.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-2xl">🍬</div>
            )}
          </div>
        </Link>

        {/* Content */}
        <div className="flex-grow min-w-0">
          <div className="flex justify-between items-start gap-2">
            <div>
              <Link href={`/products/${product._id}`} className="hover:text-orange-600 transition-colors">
                <h3 className="font-semibold text-gray-800 truncate">{product.name}</h3>
              </Link>
              <p className="text-sm text-gray-500">₹{product.price} / {unitName}</p>
            </div>
            <button
              onClick={onRemove}
              className="text-gray-400 hover:text-red-500 transition-colors p-1"
              title="Remove item"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
            <QuantitySelector
              quantity={quantity}
              setQuantity={onUpdateQuantity}
              min={product.minQuantity}
              max={100}
              unit={unitName}
              step={step}
            />
            <div className="text-right">
              <p className="font-bold text-orange-600">₹{totalPrice.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
