import React from 'react'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap'
import { Link } from 'react-router-dom'
import navigationModel from '../../config/navigation'

const NavBar = ({ brand, toggle, currentView, logoutAlert, user, isOpen }) => {
  console.log('NavBar user', user)
  return (
    <Navbar className="nav-top text-white" light expand="md">
      <NavbarBrand href="/">{brand}</NavbarBrand>
      <NavbarToggler onClick={() => toggle()} />
      <Collapse isOpen={isOpen} navbar>
        <Nav navbar>
          {navigationModel.Menu.map(menu => {
            if (!menu.role || menu.role === (user && user.role)) {
              return (
                <NavItem key={menu.label} active={menu.view === currentView}>
                  <Link className="nav-link" to={menu.link}>
                    {menu.label}
                  </Link>
                </NavItem>
              )
            }
            return null
          })}
        </Nav>
        <Nav navbar className="ml-auto">
          <NavItem>
            <span className="d-flex align-items-center nav-text">
              {user && <div>Welcome, {user.username}</div>}
              {!user && <div>Please login before using application</div>}
              <NavLink onClick={e => logoutAlert(e)}>
                <i className="fa fa-sign-out" />
              </NavLink>
            </span>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  )
}

export default NavBar
