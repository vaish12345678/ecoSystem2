import './App.css'
import Navbar from "./components/Navbar"
import Login from "./components/Auth/Login"
import Signup from "./components/Auth/Signup"
import Home from "./components/Home"
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RetailerDashboard from "./components/RetailerDashboard"

import AddProduct from "./components/AddProduct"
import ProductsList from "./components/ProductsList"
import ProductDetails from './components/ProductDetails'
import CusProductList from './components/Customer/CusProductList';
import CusProductDetails from './components/Customer/CusProductDetails'

{/* <Toaster position="top-center" reverseOrder={false} /> */}


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
  {
    path:"retailer/dashboard",
    element:<RetailerDashboard/>
  },
  {
    path:"retailer/add",
    element :<AddProduct/>
  },
  {
    path:"retailer/products",
  element:<ProductsList/>
},
{
  path:"retailer/products/:id",
  element : <ProductDetails/>
},
{
  path:"/products",
  element : <CusProductList/>
},
{
  path:"/products/:id",
  element:<CusProductDetails/>
},
{
  path:"/retailer",
  element:<RetailerDashboard/>
},

  
  
]);

function App() {
  

  return (
    
    <>
  
     <RouterProvider router={appRouter}/> 
    
      {/* <Router>
      <Routes>
        <Route path="/retailer" element={<RetailerDashboard />} />
        <Route path="/add" element={<AddProduct />} />
        <Route path="/product" element={<ProductsList />} />
        
         <Route path="/signup" element={<ProductsList />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword />} /> 
      </Routes>
    </Router> */}
     
    </>
  )
}

export default App
