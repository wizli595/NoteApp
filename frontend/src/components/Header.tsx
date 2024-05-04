import { Link } from "@tanstack/react-router";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { FaUser ,FaTachometerAlt} from "react-icons/fa";
import { IoPersonCircle } from 'react-icons/io5';
import styles from "../assets/global.module.css";
import { useAuth } from "../app/hooks/useAuth";

const Header = () => {
  const {isAuthenticated,user}=useAuth();
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
            {isAuthenticated ? (<NavDropdown title={user?.username} id="username">
                                    <NavDropdown.Item as={Link} to={"/profile"}>
                                     <IoPersonCircle /> Profile
                                    </NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to={"/dashboard"}>
                                     <FaTachometerAlt /> dashboard
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <Nav.Link as={Link} to={'/login'}>
                                    <FaUser /> Sign In
                                </Nav.Link>
                            )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
