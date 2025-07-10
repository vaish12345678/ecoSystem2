import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Link } from "react-router-dom";

export default function CusProductsList() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [commentInputs, setCommentInputs] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetchProducts();
  }, []);

  const getEcoScoreBadge = (score) => {
    if (score >= 80) {
      return { color: "bg-green-600", label: "Excellent" };
    } else if (score >= 50) {
      return { color: "bg-yellow-500", label: "Moderate" };
    } else {
      return { color: "bg-red-500", label: "Poor" };
    }
  };

  const getBadgeColor = (type) => {
    switch (type) {
      case "Plastic-Free":
        return "bg-green-200 text-green-800";
      case "Compostable":
        return "bg-yellow-200 text-yellow-800";
      case "Biodegradable":
        return "bg-blue-200 text-blue-800";
      case "Recyclable":
        return "bg-gray-200 text-gray-800";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/products");
      setProducts(res.data);
      setFilteredProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
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

  const handleCommentSubmit = async (id) => {
    const text = commentInputs[id];
    if (!text) return;

    try {
      await axios.post(`http://localhost:3000/api/products/${id}/comment`, {
        text,
      });
      setCommentInputs((prev) => ({ ...prev, [id]: "" }));
      fetchProducts();
      toast.success("Comment added!");
    } catch (err) {
      console.error("Comment failed:", err);
      toast.error("Something went wrong.");
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    applyFilters(e.target.value, selectedCategory);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    applyFilters(searchTerm, e.target.value);
  };

  const applyFilters = (search, category) => {
    const filtered = products.filter((product) => {
      const matchesName = product.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory =
        category === "All" || product.category === category;
      return matchesName && matchesCategory;
    });
    setFilteredProducts(filtered);
  };

  const uniqueCategories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  return (
    <div className="px-4 py-6">
      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="border px-3 py-2 rounded-md w-full md:w-1/3"
        />

        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="border px-3 py-2 rounded-md w-full md:w-1/4"
        >
          {uniqueCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.length === 0 ? (
          <p className="text-center col-span-full text-gray-500">
            No products found.
          </p>
        ) : (
          filteredProducts.map((product) => (
            <Card
              key={product._id}
              className="shadow-md rounded-xl overflow-hidden"
            >
              <CardContent className="p-4">
                {product.imageUrl && (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-48 w-full object-cover rounded mb-4"
                  />
                )}
                <h3 className="text-xl font-bold text-gray-800">
                  {product.name}
                </h3>
                <p className="text-gray-600">{product.category}</p>
                {(() => {
                  const { color, label } = getEcoScoreBadge(
                    product.sustainabilityScore || 80
                  );
                  return (
                    <div
                      className={`inline-block px-3 py-1 text-xs font-semibold text-white rounded-full ${color} mt-2`}
                    >
                      ♻️ {label}: {product.sustainabilityScore || 80}/100
                    </div>
                  );
                })()}
                <span
                  className={`px-2 py-1 rounded text-xs ${getBadgeColor(
                    product.packagingType
                  )}`}
                >
                  {product.packagingType}
                </span>

                <div className="flex justify-between items-center mt-4 text-sm">
                  <Button
                    onClick={() => handleLike(product._id)}
                    variant="outline"
                  >
                    ❤️ {product.likes || 0}
                  </Button>
                </div>

                {/* Comment Input */}
                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    value={commentInputs[product._id] || ""}
                    onChange={(e) =>
                      setCommentInputs((prev) => ({
                        ...prev,
                        [product._id]: e.target.value,
                      }))
                    }
                    className="border p-2 rounded text-sm w-full"
                  />
                  <Button
                    onClick={() => handleCommentSubmit(product._id)}
                    className="mt-2"
                  >
                    Post Comment
                  </Button>
                  <div className="mt-3">
                    <Link to={`/products/${product._id}`}>
                      <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Show Comments */}
                {product.comments?.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-semibold text-sm mb-1">Comments:</h4>
                    <ul className="space-y-1 max-h-24 overflow-y-auto text-sm text-gray-700">
                      {product.comments.map((c, i) => (
                        <li key={i} className="border-b pb-1">
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
