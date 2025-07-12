import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
export default function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    recyclablePercent: "",
    supplierRating: "",
     transportDistanceKm: "",
    packagingType: "",
    image: null,
  });
  const [wasteSuggestions, setWasteSuggestions] = useState([]);
  const [advisorLoading, setAdvisorLoading] = useState(false);

  const [imagePreview, setImagePreview] = useState(null);
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();
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
      packagingType: formData.packagingType,
       transportDistanceKm: formData.transportDistanceKm,
      imageUrl,
    };

    try {
      const res = await fetch("http://localhost:3000/api/products/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
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
        packagingType: "",
         transportDistanceKm: "",
        image: null,
      });
      setImagePreview(null);
      navigate("/retailer/products");
    } catch (err) {
      console.error(err);
      setMessage("❌ Error adding product. Please try again.");
    }
  };

  const fetchWasteAdvisorSuggestions = async () => {
    setAdvisorLoading(true);
    setWasteSuggestions([]);
    try {
      const res = await fetch("http://localhost:3000/api/advisor/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packagingType: formData.packagingType,
          carbonFootprint: formData.carbonFootprint,
          recyclablePercent: formData.recyclablePercent,
          supplierRating: formData.supplierRating,
        }),
      });
      const data = await res.json();
      setWasteSuggestions(data.suggestions || []);
    } catch (err) {
      console.error("AI Advisor failed:", err);
      setWasteSuggestions(["⚠️ Failed to fetch suggestions. Try again later."]);
    } finally {
      setAdvisorLoading(false);
    }
  };

  return (
    <Card className="max-w-xl mx-auto mt-6">
      <CardContent className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            className="w-full border p-2 rounded"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            className="w-full border p-2 rounded"
            value={formData.category}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="recyclablePercent"
            placeholder="Recyclable (%)"
            className="w-full border p-2 rounded"
            value={formData.recyclablePercent}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="supplierRating"
            placeholder="Supplier Rating (1-10)"
            className="w-full border p-2 rounded"
            value={formData.supplierRating}
            onChange={handleChange}
            required
          />
          <select
            name="packagingType"
            value={formData.packagingType}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          >
            <option value="">Select Packaging Type</option>
            <option value="Plastic-Free">Plastic-Free</option>
            <option value="Compostable">Compostable</option>
            <option value="Biodegradable">Biodegradable</option>
            <option value="Recyclable">Recyclable</option>
          </select>

          <input
  type="number"
  name="transportDistanceKm"
  placeholder="Transport Distance (in km)"
  className="w-full border p-2 rounded"
  value={formData.transportDistanceKm}
  onChange={handleChange}
  required
/>


          <input
            type="file"
            name="image"
            className="w-full"
            accept="image/*"
            onChange={handleChange}
            required
          />

          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-32 h-32 object-cover rounded"
            />
          )}
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={fetchWasteAdvisorSuggestions}
            disabled={advisorLoading}
          >
            {advisorLoading
              ? "Analyzing..."
              : "Get AI Sustainability Suggestions"}
          </Button>
          {wasteSuggestions.length > 0 && (
            <div className="mt-4 bg-green-100 p-4 rounded">
              <h3 className="font-semibold text-green-800 mb-2">
                ♻️ AI Waste Advisor Tips:
              </h3>
              <ul className="list-disc pl-5 text-green-700 text-sm">
                {wasteSuggestions.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isUploading}>
            {isUploading ? "Uploading..." : "Submit"}
          </Button>
        </form>

        {message && <p className="mt-4 text-center text-sm">{message}</p>}
      </CardContent>
    </Card>
  );
}
