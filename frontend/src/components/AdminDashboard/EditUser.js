import React,{useEffect, useState} from 'react'
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/esm/Container';
import { useNavigate,useParams } from 'react-router-dom';
import Loading from '../Loading';
import axios from "axios";
import { useForm } from "react-hook-form";


const EditUser = () => {
    const navigate = useNavigate();
    const [error, seterror] = useState(false);
    const [loading, setloading] = useState(false);
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [phone, setphone] = useState('')
    const userId = useParams();

    useEffect(() => {
        try {
          (async function() {
            const { data } = await axios.get(
              `/admin/edit/${userId.userId}`
            );
            setname(data.name);
            setemail(data.email);
            setphone(data.phone);
          })();
        } catch (error) {
          throw new error(error.response.data.message);
        }
     
    }, [])
    
    
    
     const {
       register,
       handleSubmit,
       formState: { errors },
     } = useForm();
     const onSubmit = (data) => {
       setloading(true);

       axios
         .patch(`/admin/edit/${userId.userId}`,
         {
          name,
          email,
          phone,
         }, 
         {
           headers: { "Content-Type": "application/json" },
         })
         .then((response) => {
           console.log(response.data);
           navigate("/admindashboard");
         })
         .catch((error) => {
           console.log(error.data);
           seterror(error.response.data.message);
           setloading(false);
         });
     };

  return (
    <Container className="loginContainer" style={{ width: "400px" }}>
      <h1>User Details</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className=" mt-5" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={name}
            required
            onChange={(e) => {
              setname(e.target.value);
            }}
            // {...register("name", { required: "true" })}
          />
          {errors.name && <p className="text-danger">Please enter the name</p>}
        </Form.Group>

        <Form.Group className=" mt-5" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={email}
            required
            onChange={(e) => {
              setemail(e.target.value);
            }}
            // {...register("email", { required: "true" })}
          />
          {errors.email && (
            <p className="text-danger">Please enter the email</p>
          )}
        </Form.Group>
        <Form.Group className=" mt-5" controlId="formBasicPhone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            name="phone"
            value={phone}
            required
            onChange={(e) => {
              setphone(e.target.value);
            }}
            // {...register("phone", { required: "true" })}
          />
          {errors.phone && (
            <p className="text-danger">Please enter the phone number</p>
          )}
        </Form.Group>

        <Button
          className="mt-3"
          variant="primary"
          type="submit"
          style={{ display: "flex" }}
        >
          Submit
          {loading && <Loading />}
        </Button>
      </Form>
    </Container>
  );
}

export default EditUser