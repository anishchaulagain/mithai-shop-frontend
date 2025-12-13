'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import { 
  LayoutDashboard, 
  Package, 
  LogOut, 
  ShoppingBag,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { admin, logout, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !admin) {
      router.push('/admin/login');
    }
  }, [admin, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500" />
      </div>
    );
  }

  if (!admin) {
    return null;
  }

  const navItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/dashboard/products', label: 'Products', icon: Package },
  ];

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShoppingBag className="h-6 w-6 text-orange-500" />
          <span className="font-bold text-amber-900">Admin Panel</span>
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2">
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 
          transform transition-transform lg:transform-none
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          {/* Sidebar Header */}
          <div className="p-6 border-b border-gray-200">
            <Link href="/" className="flex items-center gap-2">
              <ShoppingBag className="h-8 w-8 text-orange-500" />
              <div>
                <span className="font-bold text-amber-900 block">Mithai Shop</span>
                <span className="text-xs text-gray-500">Admin Panel</span>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    isActive
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white'
                      : 'text-gray-700 hover:bg-orange-50'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Section */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-orange-600 font-semibold">
                  {admin.username.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="font-medium text-gray-800">{admin.username}</p>
                <p className="text-xs text-gray-500">{admin.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </aside>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}
