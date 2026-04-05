import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const AdminDashboard: React.FC = () => {
  const { adminEmail, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 mt-24">
      <div className="max-w-5xl mx-auto bg-white border border-gray-200 rounded-3xl shadow-xl p-8">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Admin Panel</h1>
            <p className="text-gray-600 mt-2">
              Welcome back, {adminEmail || 'admin'}. Use the links below to manage product and category content.
            </p>
          </div>
          <button
            onClick={logout}
            className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-5 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            Logout
          </button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <Link
            to="/admin/products"
            className="group block rounded-3xl border border-gray-200 bg-slate-50 p-8 transition hover:-translate-y-1 hover:border-primary-300"
          >
            <h2 className="text-xl font-semibold text-gray-900">Manage Products</h2>
            <p className="mt-3 text-sm text-gray-600">
              Edit product titles and descriptions. View and delete existing products.
            </p>
          </Link>

          <Link
            to="/admin/categories"
            className="group block rounded-3xl border border-gray-200 bg-slate-50 p-8 transition hover:-translate-y-1 hover:border-primary-300"
          >
            <h2 className="text-xl font-semibold text-gray-900">Manage Categories</h2>
            <p className="mt-3 text-sm text-gray-600">
              Edit existing categories and subcategories. Add new subcategories to existing categories.
            </p>
          </Link>

          <Link
            to="/productForm"
            className="group block rounded-3xl border border-gray-200 bg-slate-50 p-8 transition hover:-translate-y-1 hover:border-primary-300"
          >
            <h2 className="text-xl font-semibold text-gray-900">Upload Product</h2>
            <p className="mt-3 text-sm text-gray-600">
              Add a new product with image upload and category assignment.
            </p>
          </Link>

          <Link
            to="/categoryForm"
            className="group block rounded-3xl border border-gray-200 bg-slate-50 p-8 transition hover:-translate-y-1 hover:border-primary-300"
          >
            <h2 className="text-xl font-semibold text-gray-900">Create Category</h2>
            <p className="mt-3 text-sm text-gray-600">
              Create categories and subcategories that are used throughout the product upload experience.
            </p>
          </Link>
        </div>

        <div className="mt-10 rounded-3xl bg-primary-600 p-8 text-white">
          <h2 className="text-2xl font-semibold">Protected admin routes</h2>
          <p className="mt-3 text-sm leading-7">
            Only authenticated admin users can access these pages and submit changes. If you want to change backend
            servers, update <code className="rounded bg-slate-900 px-2 py-1 text-xs">VITE_API_BASE_URL</code> in your
            frontend env file.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
