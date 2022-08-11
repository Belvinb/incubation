import React, { useEffect, useState } from "react";
import './LoginPage.css'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import {Link} from 'react-router-dom'
import axios from 'axios'
import Loading from "../Loading";
import ErrorMessage from "../ErrorMessage";
import {useNavigate} from "react-router-dom"
import {useForm} from 'react-hook-form'


const Loginpage = () => {
  const navigate = useNavigate()
    const[email,setEmail] = useState('')
    const [password, setpassword] = useState('')
    const [error, seterror] = useState(false)
    const [loading, setloading] = useState(false)
    



   useEffect(() => {
     const userinfo = localStorage.getItem("userInfo");
     if (userinfo) {
       navigate("/home");
     }
   }, [navigate]);
    
   const {
     register,
     handleSubmit,
     formState: { errors },
   } = useForm();
   const onSubmit = (data) => {
     setloading(true);

     axios
       .post("/login", data, {
         headers: { "Content-Type": "application/json" },
       })
       .then((response) => {
         console.log(response.data);
         localStorage.setItem("userInfo", JSON.stringify(response.data));
         navigate("/home");
       })
       .catch((error) => {
         console.log(error.data);
         seterror(error.response.data.message);
         setloading(false);
       });
   };

    // const submitHandler = async(e)=>{
    //     e.preventDefault()
    //     try {
    //         const config = {
    //             headers:{
    //                 "Content-type":"application/json"
    //             }
    //         }
    //         setloading(true)
    //         const {data} = await axios.post("/login",
    //         {
    //             email,
    //             password
    //         },config);

    //         console.log(data);
    //         localStorage.setItem('userInfo',JSON.stringify(data))
    //         setloading(false)
    //         navigate("/home")
    //     } catch (error) {
    //         seterror(error.response.data.message)
    //         setloading(false);
           
    //     }
    // }

  return (
    <Container className="loginContainer" style={{ width: "400px" }}>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      <div style={{ border: "3px solid black", padding: "20px" }}>
        <h1>Login Now</h1>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className=" mt-5" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              {...register("email", { required: "true" })}
              // value={email}
              // placeholder="Enter email"
              // onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-danger">Please enter your email</p>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              // value={password}
              // placeholder="Password"
              // onChange={(e) => setpassword(e.target.value)}
              {...register("password", { required: "true" })}
            />
            {errors.password && (
              <p className="text-danger">Please enter your password</p>
            )}
          </Form.Group>

          <Button variant="primary" type="submit" style={{ display: "flex" }}>
            Login
            {loading && <Loading />}
          </Button>
        </Form>
        <Form.Label className="mt-3">New User?</Form.Label>
        <Link to="/signup">
          <Form.Label> Register here</Form.Label>
        </Link>
      </div>
    </Container>
  );
};

export default Loginpage;
