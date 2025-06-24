import './App.css'
import Navbar from "./components/Navbar"
import Login from "./components/Auth/Login"
import Signup from "./components/Auth/Signup"
import Home from "./components/Home"
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RetailerDashboard from "./components/RetailerDashboard"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddProduct from "./components/AddProduct"
import ProductsList from "./components/ProductsList"
import { Toaster } from "react-hot-toast";


<Toaster position="top-center" reverseOrder={false} />


const appRouter = createBrowserRouter([
  {
    path:"/",
    element :<Home/>

  }, 
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/signup",
    element:<Signup/>

  },
  
]);

function App() {
  

  return (
    
    <>
  
     {/* <RouterProvider router={appRouter}/> */}
      <Router>
      <Routes>
        <Route path="/" element={<RetailerDashboard />} />
        <Route path="/add" element={<AddProduct />} />
        <Route path="/product" element={<ProductsList />} />
        {/* <Route path="/signup" element={<ProductsList />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword />} /> */}
      </Routes>
    </Router>
     
    </>
  )
}

export default App
