import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const TopNavBar= function(props) {
    return (
    <div style={{zIndex:1}}>
    <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="#home">COVID-19 Utility Guide</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#features">Features</Nav.Link>
      <Nav.Link href="#pricing">Pricing</Nav.Link>
    </Nav>
  </Navbar>
  
  </div>


    );




}
export default TopNavBar;