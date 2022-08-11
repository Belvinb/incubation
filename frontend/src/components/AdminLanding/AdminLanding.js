import React, { useEffect, useState } from "react";
import "./AdminLanding.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading";
import ErrorMessage from "../ErrorMessage";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const AdminLanding = () => {

    const navigate = useNavigate()
    const [error, seterror] = useState(false)
    const [loading, setloading] = useState(false)

    useEffect(() => {
      const admininfo = localStorage.getItem("adminInfo")
      if(admininfo){
        navigate("/adminHome");

      }
    }, [navigate])

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
      setloading(true);

      axios
        .post("/admin", data, {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          console.log(response.data);
          localStorage.setItem("adminInfo", JSON.stringify(response.data));
          navigate("/adminHome");
        })
        .catch((error) => {
          console.log(error.data);
          seterror(error.response.data.message);
          setloading(false);
        });
    };
    
  return (
    <Container className="loginContainer" style={{ width: "400px" }}>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      <h1>Admin Login</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className=" mt-5" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            {...register("email", { required: "true" })}
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
            {...register("password", { required: "true" })}
          />
          {errors.email && (
            <p className="text-danger">Please enter your password</p>
          )}
        </Form.Group>

        <Button variant="primary" type="submit" style={{ display: "flex" }}>
          Login
          {loading && <Loading />}
        </Button>
      </Form>
    </Container>
  );
};

export default AdminLanding;
