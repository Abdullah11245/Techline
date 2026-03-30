import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Section } from '@components/Section';
import { Typewriter } from '@/components/TypeWriter';
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
  const [newSubcategory, setNewSubcategory] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://techline-backend-1.onrender.com/api/categories");
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
      data.append("subcategory", newSubcategory || formData.subcategory);
      data.append("image", file);

      const res = await fetch("https://techline-backend-1.onrender.com/api/products", {
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
    <div>
      <Section className="relative overflow-hidden pt-20 md:pt-32 pb-20" noAnimation>

  {/* ===== Mobile Background Image ===== */}
  <div className="absolute inset-0 lg:hidden">
    <img
      src="/ai-nuclear.jpg"
      alt="Tech background"
      className="w-full h-full object-cover"
    />
  </div>

  {/* ===== Dark Overlay ===== */}
  <div className="absolute inset-0 bg-black/70"></div>

  <div className="relative z-10 max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">

    {/* ===== Images (Desktop Only) ===== */}
    <div className="hidden lg:grid sm:grid-cols-2 gap-6">
      
      <div className="pt-20 flex justify-end sm:justify-center">
        <img
          src="/firewall.jpg"
          alt="Tech team"
          className="rounded-xl object-cover shadow-2xl"
        />
      </div>

      <img
        src="/product_service.jpg"
        alt="Tech work"
        className="rounded-xl object-cover shadow-2xl"
      />

    </div>

    {/* ===== Content ===== */}
    <motion.div
      className="flex flex-col gap-2 md:gap-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >

      <motion.h1
        className="mt-2 md:mt-8 max-w-4xl text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.05 }}
      >
       
        <p className="text-3xl md:text-5xl font-bold text-white">Upload Products</p>
      </motion.h1>

    <p className="text-white/70 text-lg max-w-xl">
  At Tech Line, we supply trusted IT products from leading global brands.
  We carefully select reliable hardware and software solutions to meet modern business needs,
  ensuring quality, performance, and long-term value for your organization.
</p>

      {/* Stats */}
      {/* <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 flex gap-10 w-fit shadow-[0_20px_60px_rgba(0,0,0,0.4)]">

        <div>
          <h3 className="text-4xl font-bold text-white">15+</h3>
          <p className="text-white/70 text-sm">Years Experience</p>
        </div>

        <div>
          <h3 className="text-4xl font-bold text-white">100+</h3>
          <p className="text-white/70 text-sm">Happy Clients</p>
        </div>

        <div>
          <h3 className="text-4xl font-bold text-white">80+</h3>
          <p className="text-white/70 text-sm">Projects Completed</p>
        </div>

      </div> */}

    </motion.div>

  </div>
</Section>

    <div className="relative min-h-screen flex items-center justify-center px-4 py-16 overflow-x-hidden overflow-y-hidden">

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
        className="relative z-10 w-full max-w-2xl bg-white/70 backdrop-blur-lg p-8 rounded-2xl border border-gray-200 shadow-xl flex flex-col gap-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >

      

        {/* Title */}
        <div>
          <p className="text-sm font-medium text-gray-700 px-2 py-1">Title</p>
           <input
          type="text"
          name="title"
          placeholder="Product Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
        />

        </div>
       
        {/* Description */}
        <div>
       <p className="text-sm font-medium text-gray-700 px-2 py-1">Description</p>
        <textarea
          name="description"
          placeholder="Product Description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
          className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 transition resize-none"
        />
        </div>
        

        {/* Category */}
        <div>
        <p className="text-sm font-medium text-gray-700 px-2 py-1">Category</p>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>
        </div>
        

        {/* Subcategory Dropdown */}
        <div>
          <p className="text-sm font-medium text-gray-700 px-2 py-1">Subcategory</p>
 {selectedCategory && selectedCategory.subcategories.length > 0 && (
          <select
            name="subcategory"
            value={formData.subcategory}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
          >
            <option value="">Select Subcategory (or type below)</option>
            {selectedCategory.subcategories.map((sub, idx) => (
              <option key={idx} value={sub.name}>{sub.name}</option>
            ))}
          </select>
        )}

        {/* New Subcategory */}
        <input
          type="text"
          placeholder="Or type a new subcategory"
          value={newSubcategory}
          onChange={(e) => setNewSubcategory(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
        />
        </div>
       

        {/* File Upload */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-primary-500 transition">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full"
            required
          />
        </div>

        {/* Status Message */}
        {status && (
          <motion.div
            className={`p-4 rounded-lg text-center ${
              status === "success"
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-700"
            }`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {status === "success" ? "✅ Uploaded!" : "❌ Error uploading"}
          </motion.div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition font-semibold"
        >
          {loading ? "Uploading..." : "Add Product"}
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
    </div>
   
  );
};

export default ProductForm;