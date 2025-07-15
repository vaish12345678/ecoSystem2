import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";

export default function ProductsList() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const getEcoScoreBadge = (score) => {
    if (score >= 80) {
      return { color: "bg-gradient-to-r from-[#00C853] to-[#64dd17] text-white", label: "Excellent" };
    } else if (score >= 50) {
      return { color: "bg-gradient-to-r from-[#FBC02D] to-[#FF9800] text-white", label: "Moderate" };
    } else {
      return { color: "bg-gradient-to-r from-[#E53935] to-[#FF5252] text-white", label: "Poor" };
    }
  };

  const getCO2Badge = (co2) => {
    if (co2 <= 20) {
      return { color: "bg-[#00C853] text-white", label: "Low CO₂" };
    } else if (co2 <= 50) {
      return { color: "bg-[#FBC02D] text-white", label: "Moderate CO₂" };
    } else {
      return { color: "bg-[#E53935] text-white", label: "High CO₂" };
    }
  };

  const getBadgeColor = (type) => {
    switch (type) {
      case "Plastic-Free":
        return "bg-[#8BC34A] text-white";
      case "Compostable":
        return "bg-[#FF9800] text-white";
      case "Biodegradable":
        return "bg-[#64dd17] text-white";
      case "Recyclable":
        return "bg-[#00C853] text-white";
      default:
        return "bg-[#9E9E9E] text-white";
    }
  };

  useEffect(() => {
    applyFilter();
  }, [searchTerm, products]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/products/my-products",
        {
          withCredentials: true,
        }
      );
      setProducts(res.data.products);
    } catch (err) {
      console.error("Failed to fetch my products:", err);
    }
  };

  const handleLike = async (id) => {
    try {
      await axios.post(`http://localhost:3000/api/products/${id}/like`);
      fetchProducts();
    } catch (err) {
      console.error("Like failed:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const applyFilter = () => {
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="px-4 py-6 bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] min-h-screen">
      {/* Search Bar */}
      <div className="mb-6 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search by name or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border border-[#9E9E9E] rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00C853] placeholder-[#e0f2f1] bg-[rgba(255,255,255,0.1)] text-[#e0f2f1]"
        />
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <p className="text-center text-[#e0f2f1] text-lg">🚫 No products added yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card
              key={product._id}
              className="bg-transparent rounded-2xl overflow-hidden transition-transform transform hover:scale-[1.02] hover:shadow-[0_0_30px_#64dd17] duration-300"
            >
              <CardContent className="p-4">
                {/* Product Image */}
                {product.imageUrl && (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-48 w-full object-cover rounded-md mb-4 transition-transform duration-300 hover:scale-105"
                  />
                )}

                {/* Name & Category */}
                <h3 className="text-xl font-semibold from-[#0f2027] via-[#203a43] to-[#2c5364] mb-1">
                  {product.name}
                </h3>
                <p className="text-[#9E9E9E] mb-2">🏷 {product.category}</p>

                {/* Eco Score Badge */}
                {(() => {
                  const { color, label } = getEcoScoreBadge(
                    product.sustainabilityScore || 80
                  );
                  return (
                    <div
                      className={`${color} inline-block px-3 py-1 text-xs font-semibold rounded-full mb-1`}
                    >
                      ♻ {label} EcoScore: {product.sustainabilityScore || 80}/100
                    </div>
                  );
                })()}

                {/* Packaging Type */}
                <div className="mt-1">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getBadgeColor(
                      product.packagingType
                    )}`}
                  >
                    📦 {product.packagingType}
                  </span>
                </div>

                {/* Carbon Footprint */}
                {(() => {
                  const co2 =
                    parseFloat(product.carbonFootprint?.toFixed(2)) || 0;
                  const { color, label } = getCO2Badge(co2);
                  return (
                    <div
                      className={`${color} inline-block px-3 py-1 text-xs font-semibold rounded-full mt-2`}
                    >
                      🌍 {label}: {co2} kg CO₂
                    </div>
                  );
                })()}

                {/* Like & Delete Buttons */}
                <div className="flex justify-between items-center mt-4 gap-2">
                  <Button
                    onClick={() => handleLike(product._id)}
                    variant="outline"
                    className="w-full text-[#e0f2f1] border-[#64dd17] hover:bg-[#64dd17] hover:text-white transition"
                  >
                    ❤ {product.likes || 0}
                  </Button>
                  <Button
                    onClick={() => handleDelete(product._id)}
                    variant="destructive"
                    className="w-full transition"
                  >
                    🗑 Delete
                  </Button>
                </div>

                {/* View Details */}
                <div className="mt-3">
                  <Link to={`/products/${product._id}`}>
                    <button className="w-full bg-gradient-to-r from-[#00C853] to-[#64dd17] text-white px-4 py-2 rounded-md hover:opacity-90 transition">
                      View Details
                    </button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
