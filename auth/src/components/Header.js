import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { AuthContext } from "../context/AuthContext";
import styled from "styled-components";

const StyledNavbar = styled(Navbar)`
  transition: background-color 0.3s;
  background-color: ${(props) => (props.navColour ? "#0056b3" : "#007bff")};
`;

const StyledCollapse = styled(Navbar.Collapse)`
  background-color: ${(props) => (props.expand ? "rgba(0, 0, 0, 0.5)" : "transparent")};
`;

const StyledNavLink = styled(Nav.Link)`
  color: #ffffff !important;
  margin: 20px;
  &:hover {
    color: #cccccc !important;
  }
`;

const StyledButton = styled.button`
  color: #ffffff !important;
  border-color: #ffffff !important;
  margin-left: 10px;
  &:hover {
    color: #007bff !important;
    background-color: #ffffff !important;
    border-color: #ffffff !important;
  }
`;

const StyledNavbarBrandText = styled.span`
  color: #ffffff;
`;

function Header() {
  const { user, isAuth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <StyledNavbar expand="md" fixed="top" navColour={true}>
      <Container>
        <Navbar.Brand href="/" className="d-flex">
          <StyledNavbarBrandText>AuthApp</StyledNavbarBrandText>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <StyledCollapse id="responsive-navbar-nav">
          <Nav className="ms-auto" defaultActiveKey="#home">
            <Nav.Item>
              <StyledNavLink as={Link} to="/">
                Home
              </StyledNavLink>
            </Nav.Item>

            {!isAuth && (
              <>
                <Nav.Item>
                  <StyledNavLink as={Link} to="/login">
                    Login
                  </StyledNavLink>
                </Nav.Item>
                <Nav.Item>
                  <StyledNavLink as={Link} to="/register">
                    Register
                  </StyledNavLink>
                </Nav.Item>
              </>
            )}

            {isAuth && user && (
              <>
                <Nav.Item>
                  <StyledNavLink as={Link} to="/profile">
                    Profile
                  </StyledNavLink>
                </Nav.Item>
                <Nav.Item>
                  <StyledButton onClick={handleLogout} className="btn btn-outline-light">
                    Logout
                  </StyledButton>
                </Nav.Item>
              </>
            )}
          </Nav>
        </StyledCollapse>
      </Container>
    </StyledNavbar>
  );
}

export default Header;
