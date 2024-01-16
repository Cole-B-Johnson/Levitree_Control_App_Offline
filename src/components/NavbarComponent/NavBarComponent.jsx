import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import './NavBarComponent.css';

const NavBarComponent = () => {
  return (
    <Navbar variant="light" className="sticky-top justify-content-center">
      <Container className='elevation text-center w-auto'>
        <Nav className="me-auto">
          <NavLink className="link" activeClassName="active" exact to="/peripherals">Dashboard</NavLink>
          <NavLink className="link" activeClassName="active" exact to="/chip-injection-system">Autopilot</NavLink>
          <NavLink className="link" activeClassName="active" exact to="/fracking">Controls</NavLink>
          {/* <NavLink className="link" activeClassName="active" exact to="/pulp">Pulp</NavLink> */}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBarComponent;
