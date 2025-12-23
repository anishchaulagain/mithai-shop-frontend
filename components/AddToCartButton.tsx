'use client';

import { useState } from 'react';
import { useCart } from '@/lib/CartContext';
import { Product } from '@/lib/types';
import { ShoppingBag, Check } from 'lucide-react';

interface AddToCartButtonProps {
  product: Product;
  quantity?: number;
  className?: string; // Allow custom styling
  showIcon?: boolean;
}

export default function AddToCartButton({ 
  product, 
  quantity = 1,
  className = '',
  showIcon = true
}: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation if inside a Link
    e.stopPropagation();
    
    addToCart(product, quantity);
    setIsAdded(true);
    
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdded || !product.isAvailable}
      className={`${className} transition-all duration-300 flex items-center justify-center gap-2 ${
        isAdded 
          ? 'bg-green-500 hover:bg-green-600 text-white' 
          : ''
      }`}
    >
      {isAdded ? (
        <>
          <Check className="h-5 w-5" />
          {showIcon && <span>Added</span>}
        </>
      ) : (
        <>
          {showIcon && <ShoppingBag className="h-5 w-5" />}
          <span>Add to Cart</span>
        </>
      )}
    </button>
  );
}
