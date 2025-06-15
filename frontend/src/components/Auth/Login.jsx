import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Navbar from "../Navbar";
import { toast } from "sonner";
import axios from "axios";
import {USER_API_POINT} from "../../utils/Apicall"
function Login(){
    const navigate= useNavigate();
    const [formData, setFormData] = useState({
        email:"",
        password:"",
    })


const handleChange= (e)=>{
    setFormData((prev)=>({
        ...prev,
        [e.target.name] : e.target.value,
    }));
}

const handleSubmit = async(e)=>{
    e.preventDefault();
    console.log("login Data", formData);


try{
    const res= await axios.post(`${USER_API_POINT}/login`,formData,{
         headers:{
        "Content-Type":"application/json",
     
    },
        withCredentials:true,
   
    });
    if(res.data.success){
        navigate("/");
        toast.success(`welcome back , ${res.data.user.fullname}!`)

    }
   
}catch(error){
    if(error.response && error.response.data.message){
      toast.error(error.response.data.message)
    }else{
      toast.error("something went wrong. please try again")
    }
}
}

return (
    <div>
        <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-green-600">Welcome Back 🌿</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="example@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              name="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

            <div className="mt-4">
            <label className="block mb-1 font-medium">Role</label>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="customer"
                  name="role"
                  value="customer"
                  checked={formData.role === "customer"}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="customer" className="text-gray-700">Customer</label>
              </div>
       
              <div className="flex items-center">
                <input
                  type="radio"
                  id="ratailer"
                  name="role"
                  value="retailer"
                  checked={formData.role === "retailer"}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="retailer" className="text-gray-700">Retailer</label>
              </div>

             
            </div>
          </div>
     
          
          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
          >
            Login
          </button>

       
        </form>
        <p className="mt-4 text-sm text-center">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-green-600 cursor-pointer hover:underline"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
 

    </div>
    
  );
}

export default Login;

