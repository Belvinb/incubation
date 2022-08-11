import React from 'react'
import { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Nav from "react-bootstrap/Nav";


const AdminHeader = () => {
  const navigate = useNavigate();
  
  let admin = JSON.parse(localStorage.getItem("adminInfo"));

  return (
    <>
      <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
        <Container>
          <Link style={{ textDecoration: "none" }} to="/admin">
            <Navbar.Brand style={{ color: "white" }}>Incubation</Navbar.Brand>
          </Link>
          {admin ? (
            <Link style={{ textDecoration: "none" }} to="/adminHome">
              <Navbar.Brand style={{ color: "white", marginLeft: "26px" }}>
                Dashboard
              </Navbar.Brand>
            </Link>
          ) : (
            ""
          )}
          {admin ? (
            <Link style={{ textDecoration: "none" }} to="/recordList">
              <Navbar.Brand 
                style={{ color: "white", marginLeft: "26px" }}
              >
                Record Track
              </Navbar.Brand>
            </Link>
          ) : (
            ""
          )}
          {/* <Navbar.Brand href="/recordList" style={{ color: "white", marginLeft: "26px" }}>
            Record Track
          </Navbar.Brand> */}
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            {admin ? (
              <NavDropdown
                title={admin ? "Admin" : null}
                id="basic-nav-dropdown"
                style={{ color: "white" }}
              >
                <NavDropdown.Item
                  onClick={() => {
                    if (admin) {
                      localStorage.removeItem("adminInfo");
                      navigate("/admin");
                    } else {
                      localStorage.removeItem("userInfo");
                      navigate("/");
                    }
                  }}
                >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              ""
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default AdminHeader