import { useEffect, useState } from "react";

interface Category {
  _id: string;
  name: string;
  subcategories: { name: string }[];
}

interface FormData {
  title: string;
  description: string;
  category: string;
  subcategory: string;
}

const ProductForm = () => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    category: "",
    subcategory: "",
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"success" | "error" | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [newSubcategory, setNewSubcategory] = useState(""); // typed subcategory

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories", err);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setFile(e.target.files[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      if (!file) throw new Error("Image is required");

      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("category", formData.category);
      // If user typed a new subcategory, use it, otherwise use dropdown
      data.append("subcategory", newSubcategory || formData.subcategory);
      data.append("image", file);

      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        body: data
      });
      if (!res.ok) throw new Error("Failed to upload product");

      setStatus("success");
      setFormData({ title: "", description: "", category: "", subcategory: "" });
      setNewSubcategory("");
      setFile(null);
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const selectedCategory = categories.find((c) => c._id === formData.category);

  return (
    <form onSubmit={handleSubmit} className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-2xl flex flex-col gap-6">

        <input
          type="text"
          name="title"
          placeholder="Product Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
        />

        <textarea
          name="description"
          placeholder="Product Description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
          className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
        />

        {/* Category Select */}
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>

        {/* Subcategory */}
        {selectedCategory && selectedCategory.subcategories.length > 0 && (
          <select
            name="subcategory"
            value={formData.subcategory}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">Select Subcategory (or type your own below)</option>
            {selectedCategory.subcategories.map((sub, idx) => (
              <option key={idx} value={sub.name}>{sub.name}</option>
            ))}
          </select>
        )}

        {/* Allow user to type a new subcategory always */}
        <input
          type="text"
          placeholder="Or type a new subcategory"
          value={newSubcategory}
          onChange={(e) => setNewSubcategory(e.target.value)}
          className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full p-2 border rounded-lg"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition"
        >
          {loading ? 'Uploading...' : 'Add Product'}
        </button>

        {status === 'success' && (
          <p className="text-green-600 text-center">✅ Uploaded!</p>
        )}
        {status === 'error' && (
          <p className="text-red-600 text-center">❌ Error uploading</p>
        )}

      </div>
    </form>
  );
};

export default ProductForm;