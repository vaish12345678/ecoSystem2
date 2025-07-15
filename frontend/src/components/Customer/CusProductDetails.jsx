import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaRecycle,
  FaStar,
  FaLeaf,
  FaComments,
  FaHeart,
  FaShare,
  FaChevronLeft,
} from "react-icons/fa";
import ChatBot from "../Chatbox";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/products/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch product: ${response.status}`);
        }
        const data = await response.json();

        if (!data.name || !data.category || !data.imageUrl) {
          throw new Error("Invalid product data");
        }

        setProduct(data);
        setComments(data.comments || []);
      } catch (error) {
        console.error("Error fetching product:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      const newComment = {
        id: Date.now(),
        text: comment,
        user: "Current User",
        timestamp: new Date().toISOString(),
      };

      setComments([...comments, newComment]);
      setComment("");
    }
  };

  const getEcoScoreColor = (score) => {
    if (score >= 80) return "from-[#00C853] to-[#64dd17]";
    if (score >= 50) return "from-[#FBC02D] to-[#FF9800]";
    return "from-[#E53935] to-[#FF5252]";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-t-4 border-[#00C853] border-solid rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-[#8BC34A] font-medium">Loading Eco Product...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] flex items-center justify-center">
        <div className="text-center p-8 bg-[#0f2027]/90 rounded-2xl border border-[#E53935]/30 max-w-md">
          <h2 className="text-2xl font-bold text-[#E53935] mb-4">Product Not Found</h2>
          <p className="text-[#e0f2f1] mb-6">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="bg-gradient-to-r from-[#00C853] to-[#64dd17] text-white px-6 py-3 rounded-full font-medium"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-[#e0f2f1] font-sans pb-20">
      {/* Navigation */}
      <nav className="py-4 px-6 flex items-center justify-between bg-[#0f2027]/90 backdrop-blur-sm">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-[#8BC34A] hover:text-[#00C853] transition-colors"
        >
          <FaChevronLeft className="mr-2" />
          <span>Back to Products</span>
        </button>
        <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00C853] to-[#8BC34A]">
          EcoMarket
        </div>
      </nav>

<ChatBot/>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="flex flex-col">
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-auto max-h-[500px] object-contain"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between mt-6">
              <button
                onClick={handleLike}
                className={`flex items-center px-6 py-3 rounded-full font-medium transition-all ${
                  liked
                    ? "bg-[#E53935]/20 text-[#E53935] border border-[#E53935]/30"
                    : "bg-[#203a43] text-[#9E9E9E] hover:bg-[#2c5364]"
                }`}
              >
                <FaHeart className={`mr-2 ${liked ? "text-[#E53935]" : ""}`} />
                {liked ? "Liked" : "Like"} {product.likes + (liked ? 1 : 0)}
              </button>

              <button className="flex items-center px-6 py-3 rounded-full font-medium bg-[#203a43] text-[#9E9E9E] hover:bg-[#2c5364] transition-colors">
                <FaShare className="mr-2" />
                Share
              </button>
            </div>
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#00C853] to-[#8BC34A]">
              {product.name}
            </h1>

            <p className="text-[#8BC34A] mb-6">{product.category}</p>

            {product.description && (
              <p className="text-[#e0f2f1] mb-8 leading-relaxed">
                {product.description}
              </p>
            )}

            {/* Sustainability Badge */}
            {product.sustainabilityScore !== undefined && (
              <div className="mb-8">
                <div
                  className={`bg-gradient-to-r ${getEcoScoreColor(
                    product.sustainabilityScore
                  )} rounded-xl p-1 inline-block`}
                >
                  <div className="bg-[#0f2027] rounded-lg px-6 py-3">
                    <div className="flex items-center">
                      <FaLeaf className="text-[#00C853] mr-2" />
                      <span className="font-bold">Sustainability Score:</span>
                      <span className="ml-2 font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00C853] to-[#8BC34A]">
                        {product.sustainabilityScore}/100
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Specifications */}
            {(product.material ||
              product.dimensions ||
              product.capacity ||
              product.weight) && (
              <div className="bg-[rgba(255,255,255,0.1)] backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/10">
                <h3 className="text-xl font-bold mb-4 text-[#8BC34A]">
                  Product Specifications
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {product.material && (
                    <div>
                      <p className="text-[#9E9E9E]">Material</p>
                      <p className="font-medium">{product.material}</p>
                    </div>
                  )}
                  {product.dimensions && (
                    <div>
                      <p className="text-[#9E9E9E]">Dimensions</p>
                      <p className="font-medium">{product.dimensions}</p>
                    </div>
                  )}
                  {product.capacity && (
                    <div>
                      <p className="text-[#9E9E9E]">Capacity</p>
                      <p className="font-medium">{product.capacity}</p>
                    </div>
                  )}
                  {product.weight && (
                    <div>
                      <p className="text-[#9E9E9E]">Weight</p>
                      <p className="font-medium">{product.weight}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Eco Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {product.recyclablePercent !== undefined && (
                <div className="bg-gradient-to-br from-[#0f2027] to-[#203a43] rounded-xl p-4 border border-[#203a43] text-center">
                  <FaRecycle className="text-[#00C853] text-2xl mx-auto mb-2" />
                  <p className="text-[#9E9E9E]">Recyclable</p>
                  <p className="text-xl font-bold">{product.recyclablePercent}%</p>
                </div>
              )}

              {product.supplierRating !== undefined && (
                <div className="bg-gradient-to-br from-[#0f2027] to-[#203a43] rounded-xl p-4 border border-[#203a43] text-center">
                  <FaStar className="text-[#FBC02D] text-2xl mx-auto mb-2" />
                  <p className="text-[#9E9E9E]">Supplier Rating</p>
                  <p className="text-xl font-bold">{product.supplierRating}/5</p>
                </div>
              )}

              {product.carbonFootprint !== undefined && (
                <div className="bg-gradient-to-br from-[#0f2027] to-[#203a43] rounded-xl p-4 border border-[#203a43] text-center">
                  <div className="w-8 h-8 mx-auto mb-2 flex items-center justify-center">
                    <span className="text-xs">CO²</span>
                  </div>
                  <p className="text-[#9E9E9E]">Carbon Footprint</p>
                  <p className="text-xl font-bold">{product.carbonFootprint} kg</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-12 bg-[rgba(255,255,255,0.1)] backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center">
              <FaComments className="text-[#8BC34A] mr-3" />
              Community Comments
            </h2>
            <span className="bg-[#8BC34A] text-[#0f2027] px-3 py-1 rounded-full text-sm font-bold">
              {comments.length} {comments.length === 1 ? "comment" : "comments"}
            </span>
          </div>

          <form onSubmit={handleCommentSubmit} className="mb-6">
            <div className="flex">
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts..."
                className="flex-1 bg-[#0f2027] border border-[#203a43] rounded-l-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00C853]"
                required
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-[#00C853] to-[#64dd17] px-6 py-3 rounded-r-xl font-medium hover:opacity-90 transition-opacity"
              >
                Post
              </button>
            </div>
          </form>

          <div className="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
            {comments.length > 0 ? (
              comments.map((c) => (
                <div
                  key={c.id || c.text}
                  className="bg-[#0f2027]/70 p-4 rounded-xl border border-[#203a43]"
                >
                  <div className="flex items-start">
                    <div className="bg-[#8BC34A] w-8 h-8 rounded-full flex items-center justify-center text-[#0f2027] font-bold mr-3">
                      {c.user?.charAt(0) || "U"}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="font-medium">{c.user || "Anonymous User"}</p>
                        {c.timestamp && (
                          <span className="text-xs text-[#9E9E9E]">
                            {new Date(c.timestamp).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                      <p className="text-[#e0f2f1] mt-1">{c.text || c}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-[#9E9E9E]">
                No comments yet. Be the first to share your thoughts!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
