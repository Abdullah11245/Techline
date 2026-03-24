import { useState } from "react";

interface CategoryFormProps {
  onSuccess?: () => void; // optional callback after successful submit
}

const CategoryForm: React.FC<CategoryFormProps> = ({ onSuccess }) => {
  const [name, setName] = useState("");
  const [subcategories, setSubcategories] = useState<string[]>([""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubcategoryChange = (index: number, value: string) => {
    const newSubs = [...subcategories];
    newSubs[index] = value;
    setSubcategories(newSubs);
  };

  const addSubcategoryField = () => {
    setSubcategories([...subcategories, ""]);
  };

  const removeSubcategoryField = (index: number) => {
    setSubcategories(subcategories.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("http://localhost:5000/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          subcategories: subcategories.filter((s) => s.trim() !== "").map((s) => ({ name: s.trim() })),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to create category");
      }

      setSuccess(true);
      setName("");
      setSubcategories([""]);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 min-h-screen  flex flex-col gap-4  justify-center">
      <h2 className="text-2xl font-bold">Add Category</h2>

      <div className="flex flex-col gap-1">
        <label className="font-semibold">Category Name *</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="p-2 border rounded"
          placeholder="Enter main category"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-semibold">Subcategories (optional)</label>
        {subcategories.map((sub, idx) => (
          <div key={idx} className="flex gap-2 items-center">
            <input
              type="text"
              value={sub}
              onChange={(e) => handleSubcategoryChange(idx, e.target.value)}
              className="p-2 border rounded flex-grow"
              placeholder={`Subcategory ${idx + 1}`}
            />
            {subcategories.length > 1 && (
              <button type="button" onClick={() => removeSubcategoryField(idx)} className="text-red-500 font-bold px-2">
                ×
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={addSubcategoryField} className="text-blue-600 font-semibold mt-1">
          + Add Subcategory
        </button>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-primary-600 text-white py-2 rounded font-semibold hover:bg-primary-700 transition"
      >
        {loading ? "Saving..." : "Create Category"}
      </button>

      {error && <p className="text-red-600">{error}</p>}
      {success && <p className="text-green-600">✅ Category created successfully!</p>}
    </form>
  );
};

export default CategoryForm;