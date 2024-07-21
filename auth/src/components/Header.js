import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
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
  const [expand, updateExpanded] = useState(false);
  const [navColour, updateNavbar] = useState(false);
  const { user, isAuth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  function scrollHandler() {
    if (window.scrollY >= 20) {
      updateNavbar(true);
    } else {
      updateNavbar(false);
    }
  }

  window.addEventListener("scroll", scrollHandler);

  const handleLogout = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/users/logout`, {}, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <StyledNavbar
      expanded={expand}
      fixed="top"
      expand="md"
      navColour={navColour}
    >
      <Container>
        <Navbar.Brand href="/" className="d-flex">
          <StyledNavbarBrandText>MERN Auth</StyledNavbarBrandText>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => {
            updateExpanded(expand ? false : "expanded");
          }}
        />
        <StyledCollapse id="responsive-navbar-nav" expand={expand}>
          <Nav className="ms-auto" defaultActiveKey="#home">
            <Nav.Item>
              <StyledNavLink as={Link} to="/" onClick={() => updateExpanded(false)}>
                Home
              </StyledNavLink>
            </Nav.Item>

            {!isAuth && (
              <>
                <Nav.Item>
                  <StyledNavLink as={Link} to="/login" onClick={() => updateExpanded(false)}>
                    Login
                  </StyledNavLink>
                </Nav.Item>
                <Nav.Item>
                  <StyledNavLink as={Link} to="/register" onClick={() => updateExpanded(false)}>
                    Register
                  </StyledNavLink>
                </Nav.Item>
              </>
            )}

            {isAuth && user && (
              <>
                <Nav.Item>
                  <StyledNavLink as={Link} to="/profile" onClick={() => updateExpanded(false)}>
                    Profile
                  </StyledNavLink>
                </Nav.Item>
                
                <Nav.Item>
                  <StyledButton className="btn btn-outline-light" onClick={handleLogout}>
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
