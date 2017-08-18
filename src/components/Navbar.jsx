import React from 'react'
import { NavLink } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'

import logo from '../images/logo.svg'

const Navbar = () => (
  <nav>
    <img src={logo} alt=""/>
    <ul className="page-menu">

      <NavLink to="/" exact activeClassName="selected">
        <li><Icon name='calendar'/></li>
      </NavLink>

      <NavLink to="/selected/" activeClassName="selected">
        <li><Icon name='list'/></li>
      </NavLink>

      <NavLink to="/search/" activeClassName="selected">
        <li><Icon name='search'/></li>
      </NavLink>

      <NavLink to="/detail/" activeClassName="selected">
        <li><Icon name='settings'/></li>
      </NavLink>

    </ul>
  </nav>
)

export default Navbar
