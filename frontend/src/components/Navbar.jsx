import { Link } from "react-router-dom";
import { USER_API_POINT } from "../utils/Apicall";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const getUserData = async () => {
    try {
      const res = await axios.get(`${USER_API_POINT}/me`, {
        withCredentials: true,
      });
      if (res.data.success) {
        setUser(res.data.user);
        setRole(res.data.user.role);
      }
    } catch (err) {
      console.log("User not logged in");
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get(`${USER_API_POINT}/logout`, {
        withCredentials: true,
      });
      setUser(null);
      setRole("");
      navigate("/");
    } catch (error) {
      console.log("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] backdrop-blur-md bg-opacity-60 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#8BC34A] to-[#00C853]">
          GreenHive 🌿
        </Link>

        {/* Navigation Links */}
        <ul className="flex flex-wrap items-center space-x-6 text-white font-medium">
          {user && role === "retailer" ? (
            <>
              <li><Link to="/retailer/add" className="hover:text-[#8BC34A]">Add Product</Link></li>
              <li><Link to="/retailer/products" className="hover:text-[#8BC34A]">Products</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/" className="hover:text-[#8BC34A]">Home</Link></li>
              
            </>
          )}

          {user ? (
            <>
              <li><Link to="/retailer" className="hover:text-[#8BC34A]">Profile</Link></li>
              <li>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full transition"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
             
              <li>
                <Link
                  to="/login"
                  className="bg-emerald-600 hover:bg-[#64dd17] text-black px-4 py-2 rounded-full font-semibold transition"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="bg-white/10 border border-white/20 hover:bg-white/20 text-white px-4 py-2 rounded-full font-semibold transition backdrop-blur-sm"
                >
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