'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createProduct, uploadImage } from '@/lib/api';
import { ProductFormData } from '@/lib/types';
import { ArrowLeft, Upload, Save, X } from 'lucide-react';

const categories = ['Traditional', 'Dry Sweets', 'Milk-Based', 'Seasonal', 'Special'];
const units = ['per kg', 'per piece', 'per box', 'per dozen'];

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    price: 0,
    image: '',
    category: 'Traditional',
    isAvailable: true,
    unit: 'per kg',
    minQuantity: 0.5,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadImage(file);
      setFormData((prev) => ({ ...prev, image: url }));
      setImagePreview(URL.createObjectURL(file));
    } catch (err) {
      setError('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await createProduct(formData);
      router.push('/admin/dashboard/products');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin/dashboard/products"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Products
        </Link>
        <h1 className="text-3xl font-bold text-gray-800">Add New Product</h1>
        <p className="text-gray-600 mt-1">Create a new sweet product</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700">
            {error}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Product Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="e.g., Laddu, Jalebi"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
              placeholder="Describe your sweet product..."
            />
          </div>

          {/* Price & Unit */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Price (₹) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Unit
              </label>
              <select
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
              >
                {units.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Category & Min Quantity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                required
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Minimum Quantity
              </label>
              <input
                type="number"
                name="minQuantity"
                value={formData.minQuantity}
                onChange={handleChange}
                min="0.1"
                step="0.1"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Product Image
            </label>
            <div className="flex items-start gap-4">
              {imagePreview || formData.image ? (
                <div className="relative w-32 h-32 rounded-xl overflow-hidden border border-gray-200">
                  <img
                    src={imagePreview || formData.image}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview('');
                      setFormData((prev) => ({ ...prev, image: '' }));
                    }}
                    className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <label className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-orange-500 transition-colors">
                  <Upload className="h-8 w-8 text-gray-400" />
                  <span className="text-sm text-gray-500 mt-1">Upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
              {uploading && (
                <div className="flex items-center gap-2 text-gray-500">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-orange-500" />
                  <span>Uploading...</span>
                </div>
              )}
            </div>
          </div>

          {/* Availability Toggle */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="isAvailable"
              id="isAvailable"
              checked={formData.isAvailable}
              onChange={handleCheckboxChange}
              className="w-5 h-5 accent-orange-500"
            />
            <label htmlFor="isAvailable" className="font-medium text-gray-700">
              Product is available for sale
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Link
            href="/admin/dashboard/products"
            className="flex-1 py-3 px-6 border border-gray-200 rounded-xl text-gray-700 font-semibold text-center hover:bg-gray-50 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-6 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-amber-600 transition-all disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-5 w-5" />
                Create Product
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
