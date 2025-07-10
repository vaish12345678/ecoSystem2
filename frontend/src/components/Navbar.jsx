// Navbar.jsx
import { Link } from "react-router-dom";
import { USER_API_POINT } from "../utils/Apicall";
import {useState, useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const [user,setUser] = useState(null);
  const [role,setRole]= useState("");
  const navigate= useNavigate();
  
  const getUserData = async () => {
    try {
      const res = await axios.get(`${USER_API_POINT}/me`, {
        withCredentials: true,
      });
      console.log(res.data.user);

      if (res.data.success) {
        setUser(res.data.user);
        setRole(res.data.user.role);
      }
    } catch (err) {
      console.log("User not logged in");
    }
  };
  useEffect(()=>{
    getUserData();
  },[]);

  const handleLogout = async () => {
  try {
    await axios.get(`${USER_API_POINT}/logout`, {
      withCredentials: true,
    });
    setUser(null);
    setRole("");
    navigate("/") // or use navigate()
  } catch (error) {
    console.log("Logout failed:", error);
  }
};


  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        <Link to="/" className="text-green-600 text-2xl font-bold">
          EcoCart 🌿
        </Link>

        
        <ul className="flex space-x-6 text-gray-700 font-medium">
          {
            user && user.role === "retailer" ? (
              <>
              <li>
                <Link to="/retailer/dashboard" className="hover:text-green-600">Dashboard</Link>
              </li>
              <li>
                <Link to="retailer/add" className="hover:text-green-600">Add Product</Link>
              </li>
              <li>
                <Link to="retailer/products" className="hover:text-green-600">Products</Link>
              </li>
              <li>
                <Link to="retailer/orders" className="hover:text-green-600">Orders</Link>
              </li>
              </>
            ):(
              <>
          <li><Link to="/" className="hover:text-green-600">Home</Link></li>
          <li><Link to="/products" className="hover:text-green-600">Products</Link></li>
          <li><Link to="/eco-score" className="hover:text-green-600">Eco Score</Link></li>
          <li><Link to="/calculator" className="hover:text-green-600">Carbon Calculator</Link></li>
          <li><Link to="/suggestions" className="hover:text-green-600">Suggestions</Link></li>
       
              </>
        
            )
          }
          
  {user ? (
    <>
      <li><Link to="/profile" className="hover:text-green-600">Profile</Link></li>
      <li>
        <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
          Logout
        </button>
      </li>
    </>
  ) : (
    <>
      <li>
        <Link to="/login" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Login
        </Link>
      </li>
      <li>
        <Link to="/signup" className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900">
          Signup
        </Link>
      </li>
    </>
  )}


         
          
       
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
