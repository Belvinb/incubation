import {useEffect} from 'react'
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import React from "react";
import axios from "axios"
import {Link} from "react-router-dom"
import {useNavigate} from "react-router-dom"

const Header = ({children}) => {

  const navigate = useNavigate()
  let user = JSON.parse(localStorage.getItem("userInfo"));
  let admin = JSON.parse(localStorage.getItem("adminInfo"))
 
  return (
    <>
      <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
        <Container>
          <Link style={{textDecoration:"none"}} to="/">
            <Navbar.Brand style={{ color: "white" }}>
              Incubation
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            {user||admin?
            <NavDropdown
              title={user?user.companyname:admin?"Admin":null}
              id="basic-nav-dropdown"
              style={{ color: "white" }}
            >
              <NavDropdown.Item onClick={()=>{
                if(admin){
                  localStorage.removeItem("adminInfo");
                  navigate("/admin");
                }else{

                  localStorage.removeItem("userInfo")
                  navigate("/")
                }
              }}>Logout</NavDropdown.Item>
            </NavDropdown>:""}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div>
        {children}
      </div>
      
    </>
  );
};

export default Header;
