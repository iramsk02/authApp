import React from 'react'

import './Navbar.css'
import { NavLink } from 'react-router-dom'



const Navbar = () => {
  return (
    <div className='navdiv'>
        <h3 className="navlogo">authAPP</h3>
        <ul className='navul'>
            <li><a href="/">Home</a></li>
            <li><a href="/">About</a></li>
            <li><a href="/">Contact</a></li>
        </ul>

        
    </div>
//     <div>
//     <nav>
//       <NavLink to="/"><li>Home</li></NavLink>
//       <NavLink to="/about"><li>About</li></NavLink>
//       <NavLink  to="/contact"><li>Contact</li></NavLink>
//     </nav>
//   </div>
  )
}

export default Navbar