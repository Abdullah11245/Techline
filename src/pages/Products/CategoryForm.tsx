import { useState } from "react";
import { motion } from "framer-motion";
import { authenticatedFetch } from '@/utils/api';

interface CategoryFormProps {
  onSuccess?: () => void;
}

interface SubcategoryForm {
  name: string;
  subSubcategories: string[];
}

const createEmptySubcategory = (): SubcategoryForm => ({
  name: "",
  subSubcategories: [""],
});

const CategoryForm: React.FC<CategoryFormProps> = ({ onSuccess }) => {
  const [name, setName] = useState("");
  const [subcategories, setSubcategories] = useState<SubcategoryForm[]>([createEmptySubcategory()]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubcategoryChange = (index: number, value: string) => {
    setSubcategories((prev) =>
      prev.map((sub, subIndex) => (subIndex === index ? { ...sub, name: value } : sub))
    );
  };

  const handleSubSubcategoryChange = (subcategoryIndex: number, subSubcategoryIndex: number, value: string) => {
    setSubcategories((prev) =>
      prev.map((sub, subIndex) =>
        subIndex === subcategoryIndex
          ? {
              ...sub,
              subSubcategories: sub.subSubcategories.map((item, itemIndex) =>
                itemIndex === subSubcategoryIndex ? value : item
              ),
            }
          : sub
      )
    );
  };

  const addSubcategoryField = () => {
    setSubcategories((prev) => [...prev, createEmptySubcategory()]);
  };

  const removeSubcategoryField = (index: number) => {
    setSubcategories((prev) => prev.filter((_, i) => i !== index));
  };

  const addSubSubcategoryField = (subcategoryIndex: number) => {
    setSubcategories((prev) =>
      prev.map((sub, subIndex) =>
        subIndex === subcategoryIndex
          ? { ...sub, subSubcategories: [...sub.subSubcategories, ""] }
          : sub
      )
    );
  };

  const removeSubSubcategoryField = (subcategoryIndex: number, subSubcategoryIndex: number) => {
    setSubcategories((prev) =>
      prev.map((sub, subIndex) => {
        if (subIndex !== subcategoryIndex) return sub;

        const nextSubSubs = sub.subSubcategories.filter((_, itemIndex) => itemIndex !== subSubcategoryIndex);
        return {
          ...sub,
          subSubcategories: nextSubSubs.length > 0 ? nextSubSubs : [""],
        };
      })
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await authenticatedFetch('/api/categories', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          subcategories: subcategories
            .filter((sub) => sub.name.trim() !== "")
            .map((sub) => ({
              name: sub.name.trim(),
              subSubcategories: sub.subSubcategories
                .filter((item) => item.trim() !== "")
                .map((item) => ({ name: item.trim() })),
            })),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to create category");
      }

      setSuccess(true);
      setName("");
      setSubcategories([createEmptySubcategory()]);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-16 overflow-hidden mt-12">

      {/* ===== Background Animation ===== */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(30)].map((_, i) => {
          const size = 40 + Math.random() * 40;
          const top = Math.random() * 100;
          const left = Math.random() * 100;
          const duration = 20 + Math.random() * 20;

          return (
            <div
              key={i}
              className="absolute rounded-xl bg-gradient-to-r from-[#004b6a]/20 via-[#004b6a]/40 to-[#004b6a]/20 p-[1px] opacity-20"
              style={{
                width: size,
                height: size,
                top: `${top}%`,
                left: `${left}%`,
                animation: `spin ${duration}s linear infinite`,
              }}
            >
              <div className="w-full h-full rounded-xl"></div>
            </div>
          );
        })}
      </div>

      {/* ===== Form Card ===== */}
      <motion.form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-lg bg-white/70 backdrop-blur-lg p-8 rounded-2xl border border-gray-200 shadow-xl flex flex-col gap-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold text-gray-900 text-center">
          Add Category
        </h2>

        {/* Category Name */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-900">
            Category <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
            placeholder="Enter main category"
          />
        </div>

        {/* Subcategories */}
        <div className="flex flex-col gap-3">
          <label className="text-sm font-semibold text-gray-900">
            Subcategories (optional)
          </label>

          {subcategories.map((sub, idx) => (
            <motion.div
              key={idx}
              className="rounded-xl border border-gray-200 bg-white/60 p-4 space-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="flex gap-2 items-center">
              <input
                type="text"
                value={sub.name}
                onChange={(e) =>
                  handleSubcategoryChange(idx, e.target.value)
                }
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
                placeholder={`Subcategory ${idx + 1}`}
              />

              {subcategories.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSubcategoryField(idx)}
                  className="text-red-500 font-bold px-3 py-1 hover:bg-red-50 rounded-md transition"
                >
                  ×
                </button>
              )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-700">Sub Subcategories (optional)</label>
                {sub.subSubcategories.map((item, subIdx) => (
                  <div key={subIdx} className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => handleSubSubcategoryChange(idx, subIdx, e.target.value)}
                      className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
                      placeholder={`Sub Subcategory ${subIdx + 1}`}
                    />

                    {sub.subSubcategories.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSubSubcategoryField(idx, subIdx)}
                        className="text-red-500 font-bold px-3 py-1 hover:bg-red-50 rounded-md transition"
                      >
                        x
                      </button>
                    )}
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => addSubSubcategoryField(idx)}
                  className="text-primary-600 font-semibold hover:underline text-sm"
                >
                  + Add Sub Subcategory
                </button>
              </div>
            </motion.div>
          ))}

          <button
            type="button"
            onClick={addSubcategoryField}
            className="text-primary-600 font-semibold hover:underline text-sm mt-1"
          >
            + Add Subcategory
          </button>
        </div>

        {/* Status Messages */}
        {error && (
          <motion.div
            className="p-3 rounded-lg bg-red-50 text-red-700 text-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {error}
          </motion.div>
        )}

        {success && (
          <motion.div
            className="p-3 rounded-lg bg-green-50 text-green-700 text-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            ✅ Category created successfully!
          </motion.div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
        >
          {loading ? "Saving..." : "Create Category"}
        </button>
      </motion.form>

      {/* Animation Keyframes */}
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default CategoryForm;
