'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { useCart } from '@/lib/CartContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { getCartCount } = useCart();

  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-orange-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-gradient-to-br from-orange-500 to-amber-400 p-2 rounded-xl shadow-md">
              <ShoppingBag className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-wide text-orange-700 group-hover:text-orange-600 transition">
              Mithai Shop
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {['Home', 'Products'].map((item) => (
              <Link
                key={item}
                href={item === 'Home' ? '/' : '/products'}
                className="relative font-medium text-orange-700 hover:text-orange-600 transition after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-orange-500 after:transition-all hover:after:w-full"
              >
                {item}
              </Link>
            ))}

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 rounded-xl hover:bg-orange-50 transition"
            >
              <ShoppingBag className="h-6 w-6 text-orange-700" />
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold min-w-[20px] h-5 px-1 rounded-full flex items-center justify-center animate-pulse">
                  {getCartCount()}
                </span>
              )}
            </Link>

            {/* Admin */}
            {/* <Link
              href="/admin/login"
              className="rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-5 py-2 text-sm font-semibold text-white shadow-md hover:shadow-lg hover:scale-[1.02] transition"
            >
              Admin
            </Link> */}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-orange-50 transition"
          >
            {isOpen ? (
              <X className="h-6 w-6 text-orange-700" />
            ) : (
              <Menu className="h-6 w-6 text-orange-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-2 rounded-2xl bg-white shadow-lg border border-orange-100 p-4 space-y-2 animate-in slide-in-from-top-2">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="block py-2 px-3 rounded-lg font-medium text-orange-700 hover:bg-orange-50 transition"
            >
              Home
            </Link>

            <Link
              href="/products"
              onClick={() => setIsOpen(false)}
              className="block py-2 px-3 rounded-lg font-medium text-orange-700 hover:bg-orange-50 transition"
            >
              Products
            </Link>

            <Link
              href="/cart"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between py-2 px-3 rounded-lg font-medium text-orange-700 hover:bg-orange-50 transition"
            >
              <span>Cart</span>
              {getCartCount() > 0 && (
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {getCartCount()}
                </span>
              )}
            </Link>

            <Link
              href="/admin/login"
              onClick={() => setIsOpen(false)}
              className="block text-center mt-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 py-2 text-white font-semibold shadow hover:shadow-md transition"
            >
              Admin
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
