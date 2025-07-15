import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, Filter, Star, Leaf, Package, CreditCard, QrCode, Truck, Award, History, Heart, TrendingUp, Recycle } from 'lucide-react';
import axios from "axios";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Link } from "react-router-dom";


const CustomerDashboard = () => {
  const [activeTab, setActiveTab] = useState('browse');
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('sustainability');
  const [userScore, setUserScore] = useState(0);
  const [showPaymentQR, setShowPaymentQR] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [commentInputs, setCommentInputs] = useState({});

  // Mock data
  useEffect(() => {
    fetchProducts();
  }, []);
 const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/products");
      setProducts(res.data);
      // setFilteredProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
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
  
  const calculateUserScore = () => {
    const totalOrders = mockOrders.length;
    const avgSustainabilityScore = mockOrders.reduce((sum, order) => {
      const orderScore = order.items.reduce((itemSum, item) => itemSum + item.sustainabilityScore, 0) / order.items.length;
      return sum + orderScore;
    }, 0) / totalOrders;
    
    const score = Math.round(avgSustainabilityScore * 0.7 + (totalOrders * 5));
    setUserScore(score);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    if (sortBy === 'sustainability') return b.sustainabilityScore - a.sustainabilityScore;
    if (sortBy === 'price') return a.price - b.price;
    if (sortBy === 'rating') return b.supplierRating - a.supplierRating;
    return 0;
  });

  const addToCart = (product) => {
    const existingItem = cart.find(item => item._id === product._id);
    if (existingItem) {
      setCart(cart.map(item => 
        item._id === product._id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item._id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity === 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item => 
        item._id === productId 
          ? { ...item, quantity }
          : item
      ));
    }
  };

  const toggleWishlist = (product) => {
    const isInWishlist = wishlist.find(item => item._id === product._id);
    if (isInWishlist) {
      setWishlist(wishlist.filter(item => item._id !== product._id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'text-green-600 bg-green-100';
      case 'shipped': return 'text-blue-600 bg-blue-100';
      case 'processing': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSustainabilityColor = (score) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };
const renderProductCard = (product) => (
    <div key={product._id} className="bg-gradient-to-b from-green-50 to-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-green-100">
      <div className="relative">
        <img 
          src={product.imageUrl} 
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <button
          onClick={() => toggleWishlist(product)}
          className={`absolute top-2 right-2 p-2 rounded-full backdrop-blur-sm ${
            wishlist.find(item => item._id === product._id) 
              ? 'bg-green-600 text-white' 
              : 'bg-white/80 text-gray-600'
          } transition-colors`}
        >
          <Heart size={16} />
        </button>
        <div className="absolute top-2 left-2 bg-gradient-to-r from-green-500 to-teal-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
          <Leaf size={12} className="inline mr-1" />
          {product.sustainabilityScore}
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="font-bold text-lg mb-2 text-gray-800">{product.name}</h3>
        <div className="flex items-center mb-2">
          <Star className="text-yellow-400 mr-1" size={16} fill="#facc15" />
          <span className="text-sm text-gray-600">{product.supplierRating}</span>
          <span className="text-sm text-gray-500 ml-2">({product.likes} likes)</span>
        </div>
        
        <div className="flex justify-between items-center mb-3">
          <span className="text-2xl font-bold text-green-600">${product.price}</span>
          <span className={`text-sm font-semibold px-2 py-1 rounded-full ${getSustainabilityColor(product.sustainabilityScore)}`}>
            {product.sustainabilityScore}% Sustainable
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-3">
          <div>Recyclable: {product.recyclablePercent}%</div>
          <div>CO2: {product.carbonFootprint}kg</div>
          <div>Packaging: {product.packagingType}</div>
          <div>Transport: {product.transportDistanceKm}km</div>
        </div>
        
        <button
          onClick={() => addToCart(product)}
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center"
        >
          <ShoppingCart size={16} className="mr-2" />
          Add to Cart
        </button>
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
                    Post Feedback
                  </Button>
                  
                </div>

                {/* Show Comments */}
                {product.comments?.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-semibold text-sm mb-1">Feedback</h4>
                    <ul className="space-y-1 max-h-24 overflow-y-auto text-sm text-gray-700">
                      {product.comments.map((c, i) => (
                        <li key={i} className="border-b pb-1">
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
      

        <div className="mt-3">
                <Link to={`/products/${product._id}`}>
                  <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
                    View Details
                  </button>
                </Link>
              </div>
      </div>
    </div>
  );

  const renderBrowseTab = () => (
    <div>
      <div className="mb-6 flex flex-wrap gap-4 items-center">
        <div className="flex-1 min-w-64">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="all">All Categories</option>
          <option value="Cotton">Cotton</option>
          <option value="Bamboo">Bamboo</option>
          <option value="Paper">Paper</option>
          <option value="Plastic">Plastic</option>
          <option value="Aluminum">Aluminum</option>
        </select>
        
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="sustainability">Sustainability Score</option>
          <option value="price">Price</option>
          <option value="rating">Rating</option>
        </select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(renderProductCard)}
      </div>
    </div>
  );

  const renderCartTab = () => (
  <div>
    <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
    
    {cart.length === 0 ? (
      <p className="text-gray-500 text-center py-8">Your cart is empty</p>
    ) : (
      <>
        <div className="space-y-4 mb-6">
          {cart.map(item => (
            <div key={item._id} className="flex items-center bg-white p-4 rounded-lg shadow">
              <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded" />
              <div className="flex-1 ml-4">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">${item.price}</p>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => updateQuantity(item._id, item.quantity - 1)}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  -
                </button>
                <span className="mx-3">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeFromCart(item._id)}
                className="ml-4 text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xl font-bold">
              Total: ${getCartTotal().toFixed(2)}
            </span>
            <span className="text-green-600 font-semibold">
              Avg Sustainability: {Math.round(cart.reduce((sum, item) => sum + item.sustainabilityScore, 0) / cart.length)}%
            </span>
          </div>
          <button
            onClick={() => setShowPaymentQR(true)}
            className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center"
          >
            <QrCode size={20} className="mr-2" />
            Pay with QR Code
          </button>
        </div>
      </>
    )}
  </div>
);
const renderPaymentModal = () =>
  showPaymentQR && (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      aria-modal="true"
      role="dialog"
    >
      <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4 text-center">
        <h3 className="text-lg font-bold mb-4">QR Payment</h3>

        <div className="w-48 h-48 bg-gray-200 mx-auto mb-4 flex items-center justify-center rounded-lg">
          <QrCode size={120} className="text-gray-600" />
        </div>

        <p className="text-sm text-gray-600 mb-4">
          Scan this QR code with your payment app
        </p>

        <div className="text-xl font-bold mb-4">
          Total: ${getCartTotal().toFixed(2)}
        </div>
<button
  onClick={() => {
    const newOrder = {
      _id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      paymentMethod: 'QR Payment',
      status: 'processing',
      trackingNumber: 'TRACK' + Math.floor(100000 + Math.random() * 900000),
      total: getCartTotal(),
      items: [...cart],
      sustainabilityImpact: `${Math.round(cart.reduce((sum, item) => sum + item.sustainabilityScore, 0) / cart.length)}%`
    };

    setOrders(prevOrders => [newOrder, ...prevOrders]);
    setShowPaymentQR(false);
    setCart([]);
    alert('✅ Payment successful! Order placed.');
  }}
  className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 mb-2"
>
  ✅ Complete Payment
</button>


        <button
          onClick={() => setShowPaymentQR(false)}
          className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );


 const renderOrdersTab = () => (
  <div>
    <h2 className="text-2xl font-bold mb-6">Order History</h2>

    {orders.length === 0 ? (
      <p className="text-gray-500 text-center py-8">No orders yet</p>
    ) : (
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order._id} className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-shadow">
            {/* Order Header */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-lg">Order #{order._id}</h3>
                <p className="text-gray-600 text-sm">Date: {order.date}</p>
                <p className="text-gray-600 text-sm">Payment: {order.paymentMethod}</p>
              </div>
              <div className="text-right">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
                <p className="text-xl font-bold mt-2 text-green-700">${order.total.toFixed(2)}</p>
              </div>
            </div>

            {/* Order Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              {/* Items List */}
              <div>
                <h4 className="font-semibold mb-2 text-gray-700">Items:</h4>
                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div key={item._id} className="flex items-center">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-10 h-10 object-cover rounded mr-3 border"
                      />
                      <span className="text-sm text-gray-800">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sustainability Info */}
              <div>
                <h4 className="font-semibold mb-2 text-gray-700">Sustainability Impact:</h4>
                <div className="flex items-center text-green-600 text-sm">
                  <Leaf size={18} className="mr-2" />
                  <span>{order.sustainabilityImpact}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mt-4">
              <button
                onClick={() => setSelectedOrder(order)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center"
              >
                <Truck size={16} className="mr-2" />
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);


  const renderTrackingModal = () =>
  selectedOrder && (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      aria-modal="true"
      role="dialog"
    >
      <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
        <h3 className="text-lg font-bold mb-4">Order Tracking</h3>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span>Order ID:</span>
            <span className="font-semibold">{selectedOrder._id}</span>
          </div>
          <div className="flex justify-between">
            <span>Tracking Number:</span>
            <span className="font-semibold">
              {selectedOrder.trackingNumber || 'Not yet assigned'}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Status:</span>
            <span
              className={`px-2 py-1 rounded text-sm font-semibold ${getStatusColor(
                selectedOrder.status
              )}`}
            >
              {selectedOrder.status}
            </span>
          </div>

          <div className="mt-4">
            <h4 className="font-semibold mb-2">Tracking Timeline:</h4>
            <div className="space-y-2 text-sm">
              <TrackingStep
                label="Order placed"
                active={true}
                date={selectedOrder.date}
              />
              <TrackingStep
                label="Processing"
                active={true}
                date={selectedOrder.date}
              />
              <TrackingStep
                label="Shipped"
                active={["shipped", "delivered"].includes(selectedOrder.status)}
                date={
                  ["shipped", "delivered"].includes(selectedOrder.status)
                    ? selectedOrder.shippedDate || "2025-01-13"
                    : null
                }
              />
              <TrackingStep
                label="Delivered"
                active={selectedOrder.status === "delivered"}
                date={
                  selectedOrder.status === "delivered"
                    ? selectedOrder.deliveredDate || "2025-01-15"
                    : null
                }
              />
            </div>
          </div>
        </div>

        <button
          onClick={() => setSelectedOrder(null)}
          className="mt-6 w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
        >
          Close
        </button>
      </div>
    </div>
  );

// Small reusable component for timeline step
const TrackingStep = ({ label, active, date }) => (
  <div className="flex items-center">
    <div
      className={`w-3 h-3 rounded-full mr-3 ${
        active ? "bg-green-500" : "bg-gray-300"
      }`}
    ></div>
    <span>
      {label} – {active && date ? date : "Pending"}
    </span>
  </div>
);

  const renderProfileTab = () => (
  <div>
    <h2 className="text-2xl font-bold mb-6">My Profile</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      {/* Sustainability Score */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Sustainability Score</h3>
        <div className="flex items-center justify-center mb-4">
          <div className="relative w-32 h-32">
            <div className="absolute inset-0 bg-green-100 rounded-full"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{userScore}</div>
                <div className="text-sm text-gray-600">Eco Points</div>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Orders placed:</span>
            <span>{orders.length}</span>
          </div>
          <div className="flex justify-between">
            <span>CO₂ saved:</span>
            <span className="text-green-600">5.4 kg</span>
          </div>
          <div className="flex justify-between">
            <span>Sustainable purchases:</span>
            <span>85%</span>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Achievements</h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-center">
            <Award className="text-yellow-500 mr-3" size={20} />
            <span>Eco Warrior – 10 sustainable purchases</span>
          </div>
          <div className="flex items-center">
            <Recycle className="text-green-500 mr-3" size={20} />
            <span>Recycling Champion – 90% recyclable items</span>
          </div>
          <div className="flex items-center">
            <Leaf className="text-green-600 mr-3" size={20} />
            <span>Carbon Saver – 5kg CO₂ saved</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);


 return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-gray-50">
     

       <nav className="bg-gradient-to-r from-green-600 to-teal-700 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-1">
            {[
              { id: 'browse', label: 'Browse', icon: Search },
              { id: 'cart', label: 'Cart', icon: ShoppingCart },
              { id: 'orders', label: 'Orders', icon: Package },
              { id: 'wishlist', label: 'Wishlist', icon: Heart },
              { id: 'profile', label: 'Profile', icon: Award }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-4 border-b-2 transition-all ${
                  activeTab === tab.id 
                    ? 'border-green-300 bg-white/10 text-white' 
                    : 'border-transparent text-green-100 hover:bg-white/5'
                }`}
              >
                <tab.icon size={20} className="mr-2" />
                {tab.label}
                {tab.id === 'cart' && cart.length > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
                {tab.id === 'wishlist' && wishlist.length > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === 'browse' && renderBrowseTab()}
        {activeTab === 'cart' && renderCartTab()}
        {activeTab === 'orders' && renderOrdersTab()}
        {activeTab === 'wishlist' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Wishlist</h2>
            {wishlist.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Your wishlist is empty</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlist.map(renderProductCard)}
              </div>
            )}
          </div>
        )}
        {activeTab === 'profile' && renderProfileTab()}
      </main>

      {renderPaymentModal()}
      {renderTrackingModal()}
    </div>
  );
};

export default CustomerDashboard;

