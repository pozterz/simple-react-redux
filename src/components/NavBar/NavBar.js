import React from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
  import navigationModel        from '../../config/navigation.json';

const NavBar = ({
  brand,
  toggle,
  currentView,
  isOpen
}) => {
  return (
    <Navbar color="faded" light expand="md">
      <NavbarBrand href="/">{brand}</NavbarBrand>
      <NavbarToggler onClick={() => toggle()} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          {
            navigationModel.Menu.map(menu => 
              <NavItem key={menu.label} active={menu.view === currentView}>
                <NavLink href={menu.link}>{menu.label}</NavLink>
              </NavItem>
            )
          }
        </Nav>
      </Collapse>
    </Navbar>
  )
}

export default NavBar