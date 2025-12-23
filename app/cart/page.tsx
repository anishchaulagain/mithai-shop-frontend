'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/CartContext';
import CartItemComponent from '@/components/CartItem';
import WhatsAppCartButton from '@/components/WhatsAppCartButton';
import { ArrowLeft, ShoppingBag, Trash2 } from 'lucide-react';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Initialize selection when cart items change or on mount
  useEffect(() => {
    // Select all new items by default if not already tracked? 
    // Or just keep track of selected IDs. 
    // Let's initially select all items when they are added to cart? 
    // For now, let's just make sure we clean up IDs that are no longer in cart.
    setSelectedIds(prev => {
      const newSet = new Set(prev);
      // Remove IDs that are no longer in cart
      const currentIds = new Set(cartItems.map(item => item.product._id));
      for (const id of newSet) {
        if (!currentIds.has(id)) {
          newSet.delete(id);
        }
      }
      return newSet;
    });
  }, [cartItems]);
  
  // Select all by default on first load if cart has items
  useEffect(() => {
     if (cartItems.length > 0 && selectedIds.size === 0) {
        // Only if we haven't manually deselected everything? 
        // Simpler: Just initialize with all selected on mount.
        // But doing it in effect might reset user choice. 
        // Let's just rely on user action, but maybe auto-select newly added items?
        // For simplicity: User selects manually or we select all on first visit.
        // Let's select all initially.
        setSelectedIds(new Set(cartItems.map(item => item.product._id)));
     }
  }, []); // Run once on mount? No, cartItems might be empty on mount then load from localstorage.
  
  // Better approach: Synchronize with localStorage load.
  // We can just add a button "Select All".

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === cartItems.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(cartItems.map(item => item.product._id)));
    }
  };

  const selectedCartItems = cartItems.filter(item => selectedIds.has(item.product._id));
  const selectedTotal = selectedCartItems.reduce(
    (total, item) => total + item.product.price * item.quantity, 
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="h-12 w-12 text-orange-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-8">Looks like you haven&apos;t added any sweets yet.</p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
        >
          <ArrowLeft className="h-5 w-5" />
          Browse Sweets
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-amber-900">Your Cart ({cartItems.length})</h1>
        <button
          onClick={clearCart}
          className="text-red-500 hover:text-red-700 font-medium flex items-center gap-2 transition-colors"
        >
          <Trash2 className="h-4 w-4" />
          Clear Cart
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3 mb-4 p-4 bg-orange-50 rounded-xl border border-orange-100">
            <input
              type="checkbox"
              checked={selectedIds.size === cartItems.length && cartItems.length > 0}
              onChange={toggleSelectAll}
              className="w-5 h-5 accent-orange-500 cursor-pointer rounded"
            />
            <span className="font-semibold text-orange-900">Select All Items</span>
          </div>

          {cartItems.map((item) => (
            <CartItemComponent
              key={item.product._id}
              product={item.product}
              quantity={item.quantity}
              isSelected={selectedIds.has(item.product._id)}
              onSelect={() => toggleSelect(item.product._id)}
              onUpdateQuantity={(qty) => updateQuantity(item.product._id, qty)}
              onRemove={() => removeFromCart(item.product._id)}
            />
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 sticky top-24">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Selected Items</span>
                <span>{selectedCartItems.length}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-gray-800 pt-4 border-t">
                <span>Total Amount</span>
                <span className="text-orange-600">₹{selectedTotal.toFixed(2)}</span>
              </div>
            </div>

            <WhatsAppCartButton 
              selectedItems={selectedCartItems}
              totalAmount={selectedTotal}
            />

            <p className="text-xs text-center text-gray-400 mt-4">
              Order will be sent via WhatsApp for confirmation and payment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
