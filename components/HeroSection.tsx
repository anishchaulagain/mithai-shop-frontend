import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-200/30 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              <span>Authentic Indian Sweets</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-amber-900 leading-tight">
              Sweet Traditions,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">
                Timeless Taste
              </span>
            </h1>
            
            <p className="mt-6 text-lg text-amber-800/80 max-w-xl mx-auto lg:mx-0">
              Discover our exquisite collection of handcrafted Indian sweets. 
              Made with love, premium ingredients, and recipes passed down through generations.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-4 rounded-full font-semibold hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg hover:shadow-xl"
              >
                Browse Products
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/products?category=Special"
                className="inline-flex items-center justify-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-full font-semibold border-2 border-orange-200 hover:border-orange-300 hover:bg-orange-50 transition-all"
              >
                View Specials
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-12 flex items-center justify-center lg:justify-start gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">50+</div>
                <div className="text-sm text-amber-700">Sweet Varieties</div>
              </div>
              <div className="w-px h-12 bg-amber-200" />
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">100%</div>
                <div className="text-sm text-amber-700">Pure Ingredients</div>
              </div>
              <div className="w-px h-12 bg-amber-200" />
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">25+</div>
                <div className="text-sm text-amber-700">Years Legacy</div>
              </div>
            </div>
          </div>

          {/* Visual Section */}
          <div className="relative h-80 lg:h-[500px] flex items-center justify-center">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-orange-400 to-amber-300 w-32 h-32 sm:w-40 sm:h-40 rounded-2xl shadow-lg flex items-center justify-center text-5xl sm:text-6xl animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}>
                  🧁
                </div>
                <div className="bg-gradient-to-br from-amber-400 to-yellow-300 w-32 h-32 sm:w-40 sm:h-40 rounded-2xl shadow-lg flex items-center justify-center text-5xl sm:text-6xl animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '3s' }}>
                  🍩
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="bg-gradient-to-br from-yellow-400 to-orange-300 w-32 h-32 sm:w-40 sm:h-40 rounded-2xl shadow-lg flex items-center justify-center text-5xl sm:text-6xl animate-bounce" style={{ animationDelay: '1s', animationDuration: '3s' }}>
                  🍬
                </div>
                <div className="bg-gradient-to-br from-orange-500 to-red-400 w-32 h-32 sm:w-40 sm:h-40 rounded-2xl shadow-lg flex items-center justify-center text-5xl sm:text-6xl animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '3s' }}>
                  🍪
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
