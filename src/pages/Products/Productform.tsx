import React, { useState } from 'react';

export const LeadForm: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  const [image, setImage] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      alert("Image is required");
      return;
    }

    setLoading(true);
    setStatus('idle');

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('image', image);

      const res = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        body: data, // ⚠️ IMPORTANT: no headers here
      });

      if (!res.ok) throw new Error('Upload failed');

      setStatus('success');
      setFormData({ title: '', description: '' });
      setImage(null);

    } catch (err) {
      console.error(err);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
  onSubmit={handleSubmit}
  className="min-h-screen flex items-center justify-center px-4"
>
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