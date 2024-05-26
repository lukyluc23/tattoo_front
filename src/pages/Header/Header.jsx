import "./Header.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, logout } from "../../app/slices/userSlice";
import { useNavigate } from "react-router-dom";
function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const myPassport = useSelector(getUserData);
  const token = myPassport?.token;

  const logMeOut = () => {
    dispatch(logout());
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary ">
      <Container>
        <Navbar.Brand className="title" href="/">
          TATOO GARAGE
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Sobre Nosotros</Nav.Link>
            <Nav.Link href="#link">Artistas</Nav.Link>
            <Nav.Link href="#link">Contactanos</Nav.Link>
            <NavDropdown title="Iniciar Sesión" id="basic-nav-dropdown">
              {token ? (
                <NavDropdown.Item onClick={() => logMeOut()}>
                  Salir
                </NavDropdown.Item>
              ) : (
                <p></p>
              )}
              <NavDropdown.Item
                href="/login"
                className={location.pathname === "/login" ? "elementTest" : ""}
              >
                Iniciar Sesión
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                href="/register"
                className={
                  location.pathname === "/register" ? "elementTest" : ""
                }
              >
                Registrarme
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
