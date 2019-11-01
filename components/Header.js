import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <header>
    <span className="icn-logo"><i className="material-icons">code</i></span>
    <ul className="main-nav">
      <li><NavLink exact to="/">Home</NavLink></li>
      <li><NavLink exact to="/users">Users</NavLink></li>
      <li><NavLink exact to="/games">Games</NavLink></li>
      <li><NavLink exact to="/payments">Payments</NavLink></li>
    </ul>    
  </header>
);

export default Header;