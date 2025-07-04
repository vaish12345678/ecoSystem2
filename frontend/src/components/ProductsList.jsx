import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import {toast} from "sonner";
import { Link } from "react-router-dom";



export default function ProductsList() {
  const [products, setProducts] = useState([]);
  const [commentInputs, setCommentInputs] = useState({});
  const [role,setRole]=useState("");
  useEffect(() => {
    fetchProducts();
  }, []);
  
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/products/my-products",{
        withCredentials:true,
      });
      const userRole = res.data?.user?.role;
      setRole(userRole);
      
      if(userRole === "retailer"){

        Navigate("/retailer/products");
        return;
      }
      const productRes= await axios.get("http://localhost:3000/api/products");
      setProducts(productRes.data);
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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };


  const handleCommentSubmit = async (id) => {
    const text = commentInputs[id];
    if (!text) return;

    try {
      await axios.post(`http://localhost:3000/api/products/${id}/comment`, { text });
      setCommentInputs((prev) => ({ ...prev, [id]: "" }));
      fetchProducts();
      
      toast.success("Comment added!");
    } catch (err) {
      console.error("Comment failed:", err);
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-6">
      {products.map((product) => (
        <Card key={product._id} className="shadow-md rounded-xl overflow-hidden">
          <CardContent className="p-4">
            {product.imageUrl && (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="h-48 w-full object-cover rounded mb-4"
              />
            )}
            <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
            <p className="text-gray-600">{product.category}</p>
            <p className="text-sm text-green-600 mt-1">
              ♻️ Sustainability Score: {product.sustainabilityScore || 80}/100
            </p>

            <div className="flex justify-between items-center mt-4 text-sm">
              <Button onClick={() => handleLike(product._id)} variant="outline">
                ❤️ {product.likes || 0}
              </Button>
              <Button onClick={() => handleDelete(product._id)} variant="destructive">
                🗑️ Delete
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
                className=" border p-2 rounded text-sm"
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
                    <li key={i} className="border-b pb-1">{c}</li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
