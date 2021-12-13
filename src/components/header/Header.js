import React from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className='component-Header'>
      <h1>Everyone's A Critic</h1>
      <nav>
        <NavLink to='/'>Home</NavLink> | &nbsp;
        <NavLink to='/search'>Search</NavLink>
      </nav>
    </header>
  );
}
