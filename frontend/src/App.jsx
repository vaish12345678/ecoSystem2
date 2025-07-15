import './App.css'
import LandingPage from './components/LandingPage'
import Login from "./components/Auth/Login"
import Signup from "./components/Auth/Signup"
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AddProduct from "./components/AddProduct"
import ProductsList from "./components/ProductsList"
import ProductDetails from './components/ProductDetails'
import CusProductList from './components/Customer/CusProductList';
import CusProductDetails from './components/Customer/CusProductDetails'
import CustomerDashboard from './components/Customer/Dashboard1'
import RetailerDashboard from './components/retailer'
import ChatBot from './components/Chatbox'


const appRouter = createBrowserRouter([
  {
    path:"/",
    element :<LandingPage/>

  },{
    path:"/Dashboard1",
    element:<CustomerDashboard/>
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
{
  path:"/Chatbox",
  element:<ChatBot/>
}

  
  
]);

function App() {
  

  return (
    
    <>
     <RouterProvider router={appRouter}/> 
    </>
  )
}

export default App
