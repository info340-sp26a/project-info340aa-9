import { NavLink } from "react-router";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

function NavBar() {
  return (
    <Navbar expand="lg" className="nav-header py-3">
      <Container fluid className="px-4">
        <Navbar.Brand as={NavLink} to="/" className="fs-4 fw-bold px-lg-4">
          FitHea
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto gap-3 mx-4 pb-2 pb-lg-0">
            <Nav.Link as={NavLink} to="/dashboard" className="nav-button">
              Dashboard
            </Nav.Link>
            <Nav.Link as={NavLink} to="/log" className="nav-button">
              Activity Log
            </Nav.Link>
            <Nav.Link as={NavLink} to="/plan" className="nav-button">
              Fitness Plan
            </Nav.Link>
            <Nav.Link as={NavLink} to="/community" className="nav-button">
              Community
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
