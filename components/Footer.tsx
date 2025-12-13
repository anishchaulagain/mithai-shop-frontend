import Link from 'next/link';
import { ShoppingBag, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-amber-900 to-orange-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <ShoppingBag className="h-8 w-8 text-amber-400" />
              <span className="text-2xl font-bold">Mithai Shop</span>
            </div>
            <p className="text-amber-100/80 text-sm leading-relaxed">
              Bringing you the finest traditional Indian sweets made with love
              and authentic recipes passed down through generations.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-400">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-amber-100/80 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-amber-100/80 hover:text-white transition-colors"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=Traditional"
                  className="text-amber-100/80 hover:text-white transition-colors"
                >
                  Traditional Sweets
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=Special"
                  className="text-amber-100/80 hover:text-white transition-colors"
                >
                  Special Items
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-400">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-amber-100/80">
                <Phone className="h-5 w-5 text-amber-400" />
                <span>+977 9866335500</span>
              </li>
              <li className="flex items-center gap-3 text-amber-100/80">
                <Mail className="h-5 w-5 text-amber-400" />
                <span>info@mithaishop.com</span>
              </li>
              <li className="flex items-center gap-3 text-amber-100/80">
                <MapPin className="h-5 w-5 text-amber-400" />
                <span>Kathmandu, Nepal</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-amber-800 mt-8 pt-8 text-center text-amber-100/60 text-sm">
          <p>© {new Date().getFullYear()} Mithai Shop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
