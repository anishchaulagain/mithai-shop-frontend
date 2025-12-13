'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-orange-600 to-amber-500 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <ShoppingBag className="h-8 w-8 text-white" />
            <span className="text-2xl font-bold text-white tracking-wide">
              Mithai Shop
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-white/90 hover:text-white transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-white/90 hover:text-white transition-colors font-medium"
            >
              Products
            </Link>
            <Link
              href="/admin/login"
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full transition-colors font-medium backdrop-blur-sm"
            >
              Admin
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col gap-2">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="text-white/90 hover:text-white transition-colors font-medium py-2"
              >
                Home
              </Link>
              <Link
                href="/products"
                onClick={() => setIsOpen(false)}
                className="text-white/90 hover:text-white transition-colors font-medium py-2"
              >
                Products
              </Link>
              <Link
                href="/admin/login"
                onClick={() => setIsOpen(false)}
                className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full transition-colors font-medium text-center mt-2"
              >
                Admin
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
