import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

export default function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    recyclablePercent: "",
    supplierRating: "",
    carbonFootprint: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const uploadToCloudinary = async () => {
    if (!formData.image) return null;

    setIsUploading(true);
    const data = new FormData();
    data.append("file", formData.image);
    data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

    try {
      const res = await fetch(import.meta.env.VITE_CLOUDINARY_UPLOAD_URL, {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      return json.secure_url;
    } catch (err) {
      console.error("Cloudinary upload failed:", err);
      setMessage("❌ Failed to upload image.");
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const imageUrl = await uploadToCloudinary();
    if (!imageUrl) return;

    const payload = {
      name: formData.name,
      category: formData.category,
      recyclablePercent: formData.recyclablePercent,
      supplierRating: formData.supplierRating,
      carbonFootprint: formData.carbonFootprint,
      imageUrl,
    };

    try {
      const res = await fetch("http://localhost:3000/api/products/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials:"include",
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Backend failed");

      setMessage("✅ Product added successfully!");
      setFormData({
        name: "",
        category: "",
        recyclablePercent: "",
        supplierRating: "",
        carbonFootprint: "",
        image: null,
      });
      setImagePreview(null);
    } catch (err) {
      console.error(err);
      setMessage("❌ Error adding product. Please try again.");
    }
  };

  return (
    <Card className="max-w-xl mx-auto mt-6">
      <CardContent className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" placeholder="Product Name" className="w-full border p-2 rounded" value={formData.name} onChange={handleChange} required />
          <input type="text" name="category" placeholder="Category" className="w-full border p-2 rounded" value={formData.category} onChange={handleChange} required />
          <input type="number" name="recyclablePercent" placeholder="Recyclable (%)" className="w-full border p-2 rounded" value={formData.recyclablePercent} onChange={handleChange} required />
          <input type="number" name="supplierRating" placeholder="Supplier Rating (1-10)" className="w-full border p-2 rounded" value={formData.supplierRating} onChange={handleChange} required />
          <input type="number" name="carbonFootprint" placeholder="Carbon Footprint (kg CO₂)" className="w-full border p-2 rounded" value={formData.carbonFootprint} onChange={handleChange} required />
          <input type="file" name="image" className="w-full" accept="image/*" onChange={handleChange} required />

          {imagePreview && <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded" />}
          <Button type="submit" className="w-full" disabled={isUploading}>
            {isUploading ? "Uploading..." : "Submit"}
          </Button>
        </form>

        {message && <p className="mt-4 text-center text-sm">{message}</p>}
      </CardContent>
    </Card>
  );
}
