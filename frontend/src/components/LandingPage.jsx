

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaLeaf, FaRecycle, FaGlobe } from "react-icons/fa";
import ecoEarth from "../assets/eco-cart.jpeg"

const LandingPage = () => {
  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-green-100 via-green-50 to-white py-24">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-7xl mx-auto px-6 text-center z-10 relative"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold text-green-700 mb-6">
            <span className="text-green-500">EcoCart</span>: Shop with Impact 🌍
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-10 max-w-2xl mx-auto">
            Track carbon footprints, get greener alternatives, and make every purchase count for the planet.
          </p>
          <Link
            to="/products"
            className="bg-green-600 text-white px-8 py-4 rounded-full text-lg hover:bg-green-700 transition"
          >
            Start Shopping Sustainably
          </Link>
        </motion.div>
        <motion.div
          className="absolute right-0 bottom-0 w-1/3 opacity-30 hidden md:block"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 0.3 }}
          transition={{ duration: 1.2 }}
        >
          <img src={ecoEarth} alt="Eco Shopping" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10 text-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-green-100 p-6 rounded-2xl shadow-lg"
          >
            <FaLeaf className="text-green-700 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-green-800 mb-2">Eco Score</h3>
            <p className="text-gray-600">Measure the environmental impact of each product you browse.</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-green-100 p-6 rounded-2xl shadow-lg"
          >
            <FaRecycle className="text-green-700 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-green-800 mb-2">Smart Suggestions</h3>
            <p className="text-gray-600">Get green alternatives to reduce your footprint and shop wisely.</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-green-100 p-6 rounded-2xl shadow-lg"
          >
            <FaGlobe className="text-green-700 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-green-800 mb-2">Carbon Calculator</h3>
            <p className="text-gray-600">Understand your carbon output and track how you can offset it.</p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-600 text-white py-6 text-center">
        <p>&copy; 2025 EcoCart | Designed for a Greener Tomorrow 🌿</p>
      </footer>
    </div>
  );
};

export default LandingPage;

