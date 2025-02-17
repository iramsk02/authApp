import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Todo from './components/Todo'
import './components/Home.css'
import Signup from './components/Signup'
import Signin from './components/Signin'
// import Contact from './components/Signin'
// import About from './components/About'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { HashRouter } from "react-router-dom";


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/signin",
      element: <Signin />,
    },
    {
      path: "/todos",
      element: (
        <>
          <Navbar />
          <Todo />
        </>
      ),
    },
  ]);
    
  return (
    <>
      
     {/* <Navbar/> */}
     <RouterProvider router={router}/>

    </>
  )
}

export default App