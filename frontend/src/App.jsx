import './App.css'
import Navbar from "./components/Navbar"
import Login from "./components/Auth/Login"
import Signup from "./components/Auth/Signup"
import Home from "./components/Home"
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

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
  
     <RouterProvider router={appRouter}/>
     
    </>
  )
}

export default App
