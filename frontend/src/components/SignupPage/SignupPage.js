import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import { Link } from "react-router-dom";
import { setRandomFallback } from "bcryptjs";
import axios from "axios";
import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";
import {useNavigate} from "react-router-dom"
import {useForm} from 'react-hook-form'


const SignupPage = () => {
  const navigate = useNavigate()
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [password, setpassword] = useState("");
  const [message, setmessage] = useState(null);
  const [error, seterror] = useState(false);
  const [loading, setloading] = useState(false);

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
    setloading(true)

    axios
      .post(
        "/register",
        data,
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("userInfo", JSON.stringify(data));
        navigate("/")
      })
      .catch((error) => {
        console.log(error.data);
        seterror(error.response.data.message);
        setloading(false)
      });
  };





  // const submitHandler = async (e) => {
  //   e.preventDefault();
  //     try {
  //       const config = {
  //         headers: {
  //           "Content-type": "application/json",
  //         },
  //       };
  //       setloading(true);
  //       const { data } = await axios.post(
  //         "/register",
  //         {
  //           name,
  //           email,
  //           phone,
  //           password,
  //         },
  //         config
  //       );
  //       console.log(data);
  //       setloading(false);
  //       localStorage.setItem("userInfo", JSON.stringify(data));
  //       seterror(false)
  //       navigate("/login")

  //     } catch (error) {
  //       seterror(error.response.data.message);
  //       setloading(false);
  //     }
   
  //   console.log(email);
  // };

  return (
    <Container className="loginContainer" style={{ width: "400px" }}>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {message && <ErrorMessage>{message}</ErrorMessage>}
      <div style={{ border: "1px solid black", padding: "20px" }}>
        <h1>Company registration</h1>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className=" mb-3" controlId="formBasicUsername">
            <Form.Label>Company name</Form.Label>

            <Form.Control
              type="text"
              placeholder="Enter your company name"
              name="companyname"
              // value={name}
              // onChange={(e) => setname(e.target.value)}
              {...register("companyname", { required: "true" })}
            />
            {errors.companyname && (
              <p className="text-danger">Please enter your company name</p>
            )}
          </Form.Group>

          <Form.Group className=" mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              // value={email}
              // onChange={(e) => setemail(e.target.value)}
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="text-danger">Please enter your email</p>
            )}
          </Form.Group>

          <Form.Group className=" mb-3" controlId="formBasicPhone">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter phone number"
              name="phone"
              // value={phone}
              // onChange={(e) => setphone(e.target.value)}
              {...register("phone", { required: true })}
            />
            {errors.phone && (
              <p className="text-danger">Please enter your phone number</p>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              name="password"
              // value={password}
              // onChange={(e) => setpassword(e.target.value)}
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="text-danger">Please enter a password</p>
            )}
          </Form.Group>

          <Button variant="primary" type="submit" style={{ display: "flex" }}>
            Register
            {loading && <Loading />}
          </Button>
        </Form>
        <Form.Label className="mt-3">Already have an account ?</Form.Label>
        <Link to="/">
          <Form.Label> Login now</Form.Label>
        </Link>
      </div>
    </Container>
  );
};

export default SignupPage;
