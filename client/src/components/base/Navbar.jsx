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
  <div className="flex-none gap-2">
    <div className="form-control">
      <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
    </div>
   
  </div>
</div>
  )
}

export default Navbar