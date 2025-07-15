import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import axios from "axios";
import { USER_API_POINT } from "../../utils/Apicall";
import { toast } from "sonner";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "customer",
  });

  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRoleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      role: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const res = await axios.post($`{USER_API_POINT}/register`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.data.success) {
        toast.success("Registered successfully!");
        navigate("/login");
      }
    } catch (error) {
      if (error.response) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg("An unexpected error occurred");
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] px-4">
        <div
          className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl w-full max-w-md 
          shadow-[0_0_40px_#64dd17,0_0_60px_#00C853]
          transition-all duration-300 ease-in-out 
          hover:scale-105"
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-[#8BC34A]">
            Create an Account 🌱
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-1 font-medium text-[#e0f2f1]">Full Name</label>
              <input
                type="text"
                name="fullname"
                className="w-full px-4 py-3 border rounded-xl bg-white/20 text-white placeholder:text-[#e0f2f1] focus:outline-none focus:ring-2 focus:ring-[#64dd17]"
                placeholder="John Doe"
                value={formData.fullname}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-[#e0f2f1]">Email</label>
              <input
                type="email"
                name="email"
                className="w-full px-4 py-3 border rounded-xl bg-white/20 text-white placeholder:text-[#e0f2f1] focus:outline-none focus:ring-2 focus:ring-[#64dd17]"
                placeholder="example@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-[#e0f2f1]">Password</label>
              <input
                type="password"
                name="password"
                className="w-full px-4 py-3 border rounded-xl bg-white/20 text-white placeholder:text-[#e0f2f1] focus:outline-none focus:ring-2 focus:ring-[#64dd17]"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-[#e0f2f1]">Role</label>
              <div className="flex items-center space-x-6">
                <label className="flex items-center text-white">
                  <input
                    type="radio"
                    name="role"
                    value="customer"
                    checked={formData.role === "customer"}
                    onChange={handleRoleChange}
                    className="mr-2"
                  />
                  Customer
                </label>
                <label className="flex items-center text-white">
                  <input
                    type="radio"
                    name="role"
                    value="retailer"
                    checked={formData.role === "retailer"}
                    onChange={handleRoleChange}
                    className="mr-2"
                  />
                  Retailer
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-[#00C853] to-[#64dd17] text-white font-bold rounded-xl hover:scale-105 transition-transform duration-300"
            >
              Sign Up
            </button>

            {errorMsg && (
              <p className="text-red-400 text-center mt-2">{errorMsg}</p>
            )}
          </form>

          <p className="mt-6 text-sm text-center text-white">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-[#8BC34A] font-medium cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;