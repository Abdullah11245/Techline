import React, { useEffect, useState, useMemo } from 'react';
import { authenticatedFetch, buildUrl } from '@/utils/api';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface Product {
  _id: string;
  title: string;
  description: string;
  image: string;
  category: { _id: string; name: string };
  subcategory?: string;
  subSubcategory?: string;
}

const ProductsManager: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<{ title: string; description: string } | null>(null);
  const [saving, setSaving] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(buildUrl('/api/products'));
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error('Failed to fetch products', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch(buildUrl('/api/categories'));
      const data = await res.json();
      const catNames = data.map((c: any) => c.name);
      setCategories(catNames);
    } catch (err) {
      console.error('Failed to fetch categories', err);
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchCategory = selectedCategory === 'all' || product.category?.name === selectedCategory;
      const matchSearch =
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [products, selectedCategory, searchTerm]);

  const handleEdit = (product: Product) => {
    setEditingId(product._id);
    setEditData({ title: product.title, description: product.description });
  };

  const handleSave = async () => {
    if (!editingId || !editData?.title || !editData?.description) return;
    setSaving(true);

    try {
      const res = await authenticatedFetch(`/api/products/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: editData.title, description: editData.description }),
      });

      if (!res.ok) throw new Error('Failed to update product');

      setProducts((prev) =>
        prev.map((p) =>
          p._id === editingId ? { ...p, title: editData.title, description: editData.description } : p
        )
      );
      setEditingId(null);
      setEditData(null);
    } catch (err) {
      console.error('Error saving product', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this product?')) return;

    try {
      const res = await authenticatedFetch(`/api/products/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete product');
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error('Error deleting product', err);
    }
  };

  if (loading) return <div className="text-center py-10">Loading products...</div>;

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 mt-24">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Manage Products</h1>
        <p className="text-gray-600 mb-8">Edit product titles and descriptions. Categories cannot be changed.</p>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 mb-8">
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Filter by Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Search Products</label>
              <input
                type="text"
                placeholder="Search by title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-sm text-gray-600 mb-4">
          Showing {filteredProducts.length} of {products.length} products
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-100 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Image</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Title</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Description</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product._id} className="border-b border-gray-200 hover:bg-slate-50 transition">
                    {editingId === product._id ? (
                      <>
                        <td colSpan={5} className="px-6 py-4">
                          <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium text-gray-700">Title</label>
                                <input
                                  type="text"
                                  value={editData?.title || ''}
                                  onChange={(e) =>
                                    setEditData((prev) => (prev ? { ...prev, title: e.target.value } : prev))
                                  }
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 mt-1"
                                />
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-700">Category Path (Locked)</label>
                                <div className="px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg mt-1">
                                  <p className="font-medium text-blue-900">{product.category?.name}</p>
                                  {product.subcategory && (
                                    <p className="text-sm text-blue-800 mt-1">Subcategory: {product.subcategory}</p>
                                  )}
                                  {product.subSubcategory && (
                                    <p className="text-sm text-blue-700">Sub Subcategory: {product.subSubcategory}</p>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-gray-700">Description</label>
                              <textarea
                                value={editData?.description || ''}
                                onChange={(e) =>
                                  setEditData((prev) =>
                                    prev ? { ...prev, description: e.target.value } : prev
                                  )
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 mt-1 resize-none h-20"
                              />
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={handleSave}
                                disabled={saving}
                                className="flex-1 bg-primary-600 text-white py-2 rounded-lg font-semibold hover:bg-primary-700 disabled:opacity-60"
                              >
                                {saving ? 'Saving...' : 'Save'}
                              </button>
                              <button
                                onClick={() => {
                                  setEditingId(null);
                                  setEditData(null);
                                }}
                                className="flex-1 bg-gray-300 text-gray-900 py-2 rounded-lg font-semibold hover:bg-gray-400"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-6 py-4">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="h-16 w-16 object-cover rounded-lg"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-semibold text-gray-900 truncate">{product.title}</p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-2">
                            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                              {product.category?.name}
                            </span>
                            {product.subcategory && (
                              <div className="text-sm text-gray-700">Subcategory: {product.subcategory}</div>
                            )}
                            {product.subSubcategory && (
                              <div className="text-sm text-gray-600">Sub Subcategory: {product.subSubcategory}</div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-gray-600 truncate text-sm max-w-xs">{product.description}</p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(product)}
                              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 text-sm"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(product._id)}
                              className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 text-sm"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12 text-gray-600">
              <p>No products found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsManager;
