// Navbar.jsx
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        <Link to="/" className="text-green-600 text-2xl font-bold">
          EcoCart 🌿
        </Link>

        
        <ul className="flex space-x-6 text-gray-700 font-medium">
          <li><Link to="/" className="hover:text-green-600">Home</Link></li>
          <li><Link to="/products" className="hover:text-green-600">Products</Link></li>
          <li><Link to="/eco-score" className="hover:text-green-600">Eco Score</Link></li>
          <li><Link to="/calculator" className="hover:text-green-600">Carbon Calculator</Link></li>
          <li><Link to="/suggestions" className="hover:text-green-600">Suggestions</Link></li>
          <li><Link to="/profile" className="hover:text-green-600">Profile</Link></li>
          <li><Link to="/login" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Login</Link></li>

        <li><Link to="/signup" className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900">Signup</Link></li>
          
       
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
