import React, { useEffect } from 'react'
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'

const LandingPage = () => {
  const navigate = useNavigate()
  useEffect(() => {
   const userinfo = localStorage.getItem("userInfo")
   if(userinfo){
    navigate("/home")
   }
  }, [navigate])
  
  return (
    <div>
      <Card className="text-center">
        <Card.Body>
          <Card.Title>Incubation Management</Card.Title>
          <Link to="/login">
            <Button variant="primary" style={{ marginLeft: "12px" }}>
              Login
            </Button>
          </Link>
          <Link to ="/signup">
            <Button variant="primary" style={{ marginLeft: "20px" }}>
              Signup
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
}

export default LandingPage