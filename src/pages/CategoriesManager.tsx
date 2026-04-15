import React, { useEffect, useState } from 'react';
import { authenticatedFetch, buildUrl } from '@/utils/api';

interface Subcategory {
  name: string;
  subSubcategories?: { name: string }[];
}

interface Category {
  _id: string;
  name: string;
  subcategories: Subcategory[];
}

const CategoriesManager: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<{ name: string; subcategories: Subcategory[] } | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch(buildUrl('/api/categories'));
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error('Failed to fetch categories', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (category: Category) => {
    setEditingId(category._id);
    setEditData({
      name: category.name,
      subcategories: category.subcategories.map((sub) => ({
        name: sub.name,
        subSubcategories: sub.subSubcategories || [],
      })),
    });
  };

  const handleSave = async () => {
    if (!editingId || !editData) return;
    setSaving(true);

    try {
      const res = await authenticatedFetch(`/api/categories/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: editData.name, subcategories: editData.subcategories }),
      });

      if (!res.ok) throw new Error('Failed to update category');

      setCategories(
        categories.map((c) =>
          c._id === editingId ? { ...c, name: editData.name, subcategories: editData.subcategories } : c
        )
      );
      setEditingId(null);
      setEditData(null);
    } catch (err) {
      console.error('Error saving category', err);
    } finally {
      setSaving(false);
    }
  };

  const handleAddSubcategory = () => {
    if (!editData) return;
    setEditData({
      ...editData,
      subcategories: [...editData.subcategories, { name: '', subSubcategories: [] }],
    });
  };

  const handleRemoveSubcategory = (index: number) => {
    if (!editData) return;
    setEditData({
      ...editData,
      subcategories: editData.subcategories.filter((_, i) => i !== index),
    });
  };

  const handleSubcategoryChange = (index: number, name: string) => {
    if (!editData) return;
    const updated = [...editData.subcategories];
    updated[index].name = name;
    setEditData({ ...editData, subcategories: updated });
  };

  const handleAddSubSubcategory = (subcategoryIndex: number) => {
    if (!editData) return;
    const updated = [...editData.subcategories];
    updated[subcategoryIndex].subSubcategories = [
      ...(updated[subcategoryIndex].subSubcategories || []),
      { name: '' },
    ];
    setEditData({ ...editData, subcategories: updated });
  };

  const handleRemoveSubSubcategory = (subcategoryIndex: number, subSubcategoryIndex: number) => {
    if (!editData) return;
    const updated = [...editData.subcategories];
    updated[subcategoryIndex].subSubcategories = (updated[subcategoryIndex].subSubcategories || []).filter(
      (_, i) => i !== subSubcategoryIndex
    );
    setEditData({ ...editData, subcategories: updated });
  };

  const handleSubSubcategoryChange = (subcategoryIndex: number, subSubcategoryIndex: number, name: string) => {
    if (!editData) return;
    const updated = [...editData.subcategories];
    const subSubs = [...(updated[subcategoryIndex].subSubcategories || [])];
    subSubs[subSubcategoryIndex] = { name };
    updated[subcategoryIndex].subSubcategories = subSubs;
    setEditData({ ...editData, subcategories: updated });
  };

  if (loading) return <div className="text-center py-10">Loading categories...</div>;

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 mt-24">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Manage Categories</h1>
        <p className="text-gray-600 mb-8">Edit category names, subcategories, and sub subcategories. Deletion is disabled.</p>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-100 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Category Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Subcategories</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category._id} className="border-b border-gray-200 hover:bg-slate-50 transition">
                    {editingId === category._id ? (
                      <td colSpan={3} className="px-6 py-6">
                        <div className="space-y-4">
                          {/* Category Name */}
                          <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">Category Name</label>
                            <input
                              type="text"
                              value={editData?.name || ''}
                              onChange={(e) =>
                                setEditData((prev) =>
                                  prev ? { ...prev, name: e.target.value } : prev
                                )
                              }
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                          </div>

                          {/* Subcategories */}
                          <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">Subcategories</label>
                            <div className="space-y-2 mb-3">
                              {editData?.subcategories?.map((sub, idx) => (
                                <div key={idx} className="space-y-3 rounded-xl border border-gray-200 p-4">
                                  <div className="flex gap-2">
                                    <input
                                      type="text"
                                      value={sub.name}
                                      onChange={(e) => handleSubcategoryChange(idx, e.target.value)}
                                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                      placeholder={`Subcategory ${idx + 1}`}
                                    />
                                    <button
                                      onClick={() => handleRemoveSubcategory(idx)}
                                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 font-semibold"
                                    >
                                      Remove
                                    </button>
                                  </div>

                                  <div className="space-y-2">
                                    <label className="block text-xs font-semibold text-gray-700">Sub Subcategories</label>
                                    {(sub.subSubcategories || []).length > 0 ? (
                                      (sub.subSubcategories || []).map((subSub, subIdx) => (
                                        <div key={subIdx} className="flex gap-2">
                                          <input
                                            type="text"
                                            value={subSub.name}
                                            onChange={(e) => handleSubSubcategoryChange(idx, subIdx, e.target.value)}
                                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                            placeholder={`Sub Subcategory ${subIdx + 1}`}
                                          />
                                          <button
                                            onClick={() => handleRemoveSubSubcategory(idx, subIdx)}
                                            className="bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 font-semibold"
                                          >
                                            Remove
                                          </button>
                                        </div>
                                      ))
                                    ) : (
                                      <p className="text-sm text-gray-500 italic">No sub subcategories</p>
                                    )}

                                    <button
                                      onClick={() => handleAddSubSubcategory(idx)}
                                      className="text-primary-600 font-semibold hover:underline text-sm"
                                    >
                                      + Add Sub Subcategory
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                            <button
                              onClick={handleAddSubcategory}
                              className="text-primary-600 font-semibold hover:underline text-sm"
                            >
                              + Add Subcategory
                            </button>
                          </div>

                          {/* Buttons */}
                          <div className="flex gap-2 pt-4 border-t">
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
                    ) : (
                      <>
                        <td className="px-6 py-4">
                          <p className="font-semibold text-gray-900">{category.name}</p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-2">
                            {category.subcategories.length > 0 ? (
                              category.subcategories.map((sub, idx) => (
                                <div
                                  key={idx}
                                  className="rounded-lg border border-green-200 bg-green-50 px-3 py-2"
                                >
                                  <p className="text-sm font-semibold text-green-900">{sub.name}</p>
                                  <div className="mt-2 flex flex-wrap gap-2">
                                    {(sub.subSubcategories || []).length > 0 ? (
                                      (sub.subSubcategories || []).map((subSub, subIdx) => (
                                        <span
                                          key={subIdx}
                                          className="inline-block px-2 py-1 bg-white text-green-800 rounded-full text-xs border border-green-200"
                                        >
                                          {subSub.name}
                                        </span>
                                      ))
                                    ) : (
                                      <span className="text-gray-500 text-xs italic">No sub subcategories</span>
                                    )}
                                  </div>
                                </div>
                              ))
                            ) : (
                              <span className="text-gray-500 text-sm italic">No subcategories</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleEdit(category)}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700"
                          >
                            Edit
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {categories.length === 0 && (
            <div className="text-center py-12 text-gray-600">
              <p>No categories yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoriesManager;
