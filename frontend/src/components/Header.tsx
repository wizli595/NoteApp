import { Link } from "@tanstack/react-router";
import { Container, Nav, Navbar } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import styles from "../assets/global.module.css";

const Header = () => {
  return (
    <header className={styles.bgSlate}>
      <Navbar variant="dark" expand="md" collapseOnSelect>
        <Container>
          <Navbar.Brand as={Link} to={"/"}>
            {/* <img src={logo} alt="The-shop" className='shop-logo' />
             */}
            Note App
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-nav" />
          <Navbar.Collapse id="basic-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to={"/"}>
                <FaUser /> Sign In
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
