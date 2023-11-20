import React from 'react'
import { NavLink } from 'react-router-dom'
const Navbar = () => {
 
  return (
   <div className="navbar bg-base-300">
  <div className="flex-1">
    <NavLink to='/' className="btn btn-ghost text-xl">Home</NavLink>
    <div className="flex-1">
    <NavLink to='/team' className="btn btn-ghost text-xl">Team</NavLink>
  </div>
  </div>
 
   
  </div>
  )
}

export default Navbar