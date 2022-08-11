import React, { useEffect, useState } from "react";
import "./HomePage.css";
import { useNavigate,useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading";
import ErrorMessage from "../ErrorMessage";
import { useForm } from "react-hook-form";

const HomePage = () => {
  const navigate = useNavigate();
  const [error, seterror] = useState(false);
  const [loading, setloading] = useState(false);
  const [previewSource, setpreviewSource] = useState();
  const [underProcess, setunderProcess] = useState(false);
  const companyname = useParams();

  const user = JSON.parse(localStorage.getItem("userInfo"));
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    (async function() {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const { underProcessing } = await axios.get(
          `/checkStatus/${user.email}`,
          {
            config,
          }
        );
       
        if (underProcessing) {
          console.log("something");
          console.log(underProcessing, "processing");
          setunderProcess(!underProcess);
        }
      } catch (error) {
        console.log(error)
      }
    })();
  });

  const logoPreview = (e) => {
    console.log("lgogogogo");
    const file = e.target.files[0];
    logoDemo(file);
  };
  const logoDemo = (file) => {
    console.log("dfsfsfdsf");
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setpreviewSource(reader.result);
    };
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (datas) => {
    setloading(true);
    // console.log(datas)
    // console.log(datas);
    // console.log(datas.logo[0])

    if (
      datas.logo[0].type === "image/jpeg" ||
      datas.logo[0].type === "image/png"
    ) {
      const formData = new FormData();
      console.log(formData, "form data");
      formData.append("file", datas.logo[0]);
      formData.append("upload_preset", "incubation");
      formData.append("cloud_name", "doxthu5pb");
      const { data } = await axios.post(
        "https://api.cloudinary.com/v1_1/doxthu5pb/image/upload",
        formData
      );

      if (data) {
        datas.image = data.secure_url.toString();
        // console.log(datas, "dataasssss");
        // console.log(data, "clod fdata");
        axios
          .post("/submitApplication", datas, {
            headers: { "Content-Type": "application/json" },
          })
          .then((response) => {
            console.log(response.data);
            setloading(false);
          })
          .catch((error) => {
            console.log(error.data);
            seterror(error.response.data.message);
            setloading(false);
          });
      } else {
        console.log("cld error");
      }
    } else {
      console.log("not file");
    }

    // axios
    //   .post("/login", data, {
    //     headers: { "Content-Type": "application/json" },
    //   })
    //   .then((response) => {
    //     console.log(response.data);
    //     localStorage.setItem("userInfo", JSON.stringify(response.data));
    //     navigate("/home");
    //   })
    //   .catch((error) => {
    //     console.log(error.data);
    //     seterror(error.response.data.message);
    //     setloading(false);
    //   });
  };

  return (
    <div>
      <h4>Welcome {user ? user.companyname : ""}</h4>
      <h2 className="home">Application For Incubation</h2>
    
        <Container className="loginContainer" style={{ width: "800px" }}>
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
          <div style={{ border: "3px solid black", padding: "20px" }}>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="col-6 d-flex">
                  <Form.Group controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      {...register("name", { required: "true" })}
                      // value={email}
                      // placeholder="Enter email"
                      // onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.name && (
                      <p className="text-danger">Please enter your email</p>
                    )}
                  </Form.Group>
                </div>
                <div className="col-6 d-flex">
                  <Form.Group className="mb-3" controlId="formBasicAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      // value={password}
                      // placeholder="Password"
                      // onChange={(e) => setpassword(e.target.value)}
                      {...register("address", { required: "true" })}
                    />
                    {errors.address && (
                      <p className="text-danger">Please enter your address</p>
                    )}
                  </Form.Group>
                </div>
                <div className="col-6 d-flex">
                  <Form.Group className="mb-3" controlId="formBasicCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      name="city"
                      // value={password}
                      // placeholder="Password"
                      // onChange={(e) => setpassword(e.target.value)}
                      {...register("city", { required: "true" })}
                    />
                    {errors.city && (
                      <p className="text-danger">Please enter your city</p>
                    )}
                  </Form.Group>
                </div>
                <div className="col-6 d-flex">
                  <Form.Group className="mb-3" controlId="formBasiState">
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      type="text"
                      name="state"
                      // value={password}
                      // placeholder="Password"
                      // onChange={(e) => setpassword(e.target.value)}
                      {...register("state", { required: "true" })}
                    />
                    {errors.state && (
                      <p className="text-danger">Please enter your state</p>
                    )}
                  </Form.Group>
                </div>
                <div className="col-6 d-flex">
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      // value={password}
                      // placeholder="Password"
                      // onChange={(e) => setpassword(e.target.value)}
                      {...register("email", { required: "true" })}
                    />
                    {errors.email && (
                      <p className="text-danger">Please enter your email</p>
                    )}
                  </Form.Group>
                </div>
                <div className="col-6 d-flex">
                  <Form.Group className="mb-3" controlId="formBasicPhone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="text"
                      name="phone"
                      // value={password}
                      // placeholder="Password"
                      // onChange={(e) => setpassword(e.target.value)}
                      {...register("phone", { required: "true" })}
                    />
                    {errors.phone && (
                      <p className="text-danger">Please enter your phone</p>
                    )}
                  </Form.Group>
                </div>
                <div className="col-6 d-flex">
                  <Form.Group className="mb-3" controlId="formBasicCompanyname">
                    <Form.Label>Company name</Form.Label>
                    <Form.Control
                      type="text"
                      name="companyname"
                      // value={password}
                      // placeholder="Password"
                      // onChange={(e) => setpassword(e.target.value)}
                      {...register("companyname", { required: "true" })}
                    />
                    {errors.companyname && (
                      <p className="text-danger">
                        Please enter your company name
                      </p>
                    )}
                  </Form.Group>
                </div>

                <div className="col-6 d-flex">
                  <Form.Group className="mb-3" controlId="formBasicCompanyLogo">
                    <Form.Label>Company Logo</Form.Label>

                    <Form.Control
                      type="file"
                      name="logo"
                      // value={password}
                      // placeholder="Password"
                      // onChange={(e) => setpassword(e.target.value)}
                      {...register("logo", {
                        onChange: (e) => logoPreview(e),
                        required: "true",
                      })}
                    />
                    {errors.logo && (
                      <p className="text-danger">Please upload company logo</p>
                    )}
                    {previewSource && (
                      <img
                        src={previewSource}
                        alt="logo"
                        style={{ height: "200px", width: "200px" }}
                      />
                    )}
                  </Form.Group>
                </div>
              </div>

              <div className="row">
                <Form.Group
                  className="mb-3"
                  controlId="formBasicTeamBackground"
                >
                  <Form.Label>Describe your team and background*</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="teambackground"
                    // value={password}
                    // placeholder="Password"
                    // onChange={(e) => setpassword(e.target.value)}
                    {...register("teambackground", { required: "true" })}
                  />
                  {errors.teambackground && (
                    <p className="text-danger">Please fill the details</p>
                  )}
                </Form.Group>
              </div>
              <div className="row">
                <Form.Group
                  className="mb-3"
                  controlId="formBasicCompanyandProducts"
                >
                  <Form.Label>Describe your company and products*</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="products"
                    // value={password}
                    // placeholder="Password"
                    // onChange={(e) => setpassword(e.target.value)}
                    {...register("products", { required: "true" })}
                  />
                  {errors.products && (
                    <p className="text-danger">Please fill the details</p>
                  )}
                </Form.Group>
              </div>
              <div className="row">
                <Form.Group
                  className="mb-3"
                  controlId="formBasicProblemToSolve"
                >
                  <Form.Label>
                    Describe the problem you are trying to solve*
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    name="problem"
                    // value={password}
                    // placeholder="Password"
                    // onChange={(e) => setpassword(e.target.value)}
                    {...register("problem", { required: "true" })}
                  />
                  {errors.problem && (
                    <p className="text-danger">Please fill the details</p>
                  )}
                </Form.Group>
              </div>
              <div className="row">
                <Form.Group
                  className="mb-3"
                  controlId="formBasicUniqueAboutCompany"
                >
                  <Form.Label>What is unique about your solution*</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="unique"
                    // value={password}
                    // placeholder="Password"
                    // onChange={(e) => setpassword(e.target.value)}
                    {...register("unique", { required: "true" })}
                  />
                  {errors.unique && (
                    <p className="text-danger">Please fill the details</p>
                  )}
                </Form.Group>
              </div>
              <div className="row">
                <Form.Group
                  className="mb-3"
                  controlId="formBasicValueProposition"
                >
                  <Form.Label>
                    What is your value proposition for the customer
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    name="valueproposition"
                    // value={password}
                    // placeholder="Password"
                    // onChange={(e) => setpassword(e.target.value)}
                    {...register("valueproposition", { required: "true" })}
                  />
                  {errors.valueproposition && (
                    <p className="text-danger">Please fill the details</p>
                  )}
                </Form.Group>
              </div>
              <div className="row">
                <Form.Group className="mb-3" controlId="formBasicCompetitors">
                  <Form.Label>
                    Who are your competitors and what is your competative
                    advantage
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    name="competition"
                    // value={password}
                    // placeholder="Password"
                    // onChange={(e) => setpassword(e.target.value)}
                    {...register("competition", { required: "true" })}
                  />
                  {errors.competition && (
                    <p className="text-danger">Please fill the details</p>
                  )}
                </Form.Group>
              </div>
              <div className="row">
                <Form.Group className="mb-3" controlId="formBasicRevenueModel">
                  <Form.Label>Explain your revenue model?*</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="revenuemodel"
                    // value={password}
                    // placeholder="Password"
                    // onChange={(e) => setpassword(e.target.value)}
                    {...register("revenuemodel", { required: "true" })}
                  />
                  {errors.revenuemodel && (
                    <p className="text-danger">Please fill the details</p>
                  )}
                </Form.Group>
              </div>
              <div className="row">
                <Form.Group className="mb-3" controlId="formBasicMarketSize">
                  <Form.Label>
                    What is the potential market size of the product
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    name="marketsize"
                    // value={password}
                    // placeholder="Password"
                    // onChange={(e) => setpassword(e.target.value)}
                    {...register("marketsize", { required: "true" })}
                  />
                  {errors.marketsize && (
                    <p className="text-danger">Please fill the details</p>
                  )}
                </Form.Group>
              </div>
              <div className="row">
                <Form.Group className="mb-3" controlId="formBasicMarketing">
                  <Form.Label>
                    How do you market or plan to market your products and
                    services*
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    name="marketingplan"
                    // value={password}
                    // placeholder="Password"
                    // onChange={(e) => setpassword(e.target.value)}
                    {...register("marketingplan", { required: "true" })}
                  />
                  {errors.marketingplan && (
                    <p className="text-danger">Please fill the details</p>
                  )}
                </Form.Group>
              </div>
              <div className="row">
                <Form.Group
                  className="mb-3"
                  controlId="formBasicIncubationTypePhysical"
                >
                  <Form.Label>Type of incubation needed</Form.Label>
                  <Form.Check
                    type="radio"
                    name="incubationtype"
                    value="physical"
                    label="physical incubation"
                    // value={password}
                    // placeholder="Password"
                    // onChange={(e) => setpassword(e.target.value)}
                    {...register("incubationtype", { required: "true" })}
                  />
                  {errors.incubationtype && (
                    <p className="text-danger">Please select a option</p>
                  )}
                </Form.Group>
              </div>
              <div className="row">
                <Form.Group
                  className="mb-3"
                  controlId="formBasicIncubationTypeVirtual"
                >
                  <Form.Check
                    type="radio"
                    name="incubationtype"
                    value="virtual"
                    label="virtual Incubation"
                    // value={password}
                    // placeholder="Password"
                    // onChange={(e) => setpassword(e.target.value)}
                    {...register("incubationtype", { required: "true" })}
                  />
                  {errors.incubationtype && (
                    <p className="text-danger">Please select a option</p>
                  )}
                </Form.Group>
              </div>
              <div className="row">
                <Form.Group
                  className="mb-3"
                  controlId="formBasicBusinessProposal"
                >
                  <Form.Label>Upload a detailed business proposal</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="businessproposal"
                    // value={password}
                    // placeholder="Password"
                    // onChange={(e) => setpassword(e.target.value)}
                    {...register("businessproposal", { required: "true" })}
                  />
                  {errors.businessproposal && (
                    <p className="text-danger">Please fill the details</p>
                  )}
                </Form.Group>
              </div>

              <Button
                variant="primary"
                type="submit"
                style={{ display: "flex" }}
              >
                Submit
                {loading && <Loading />}
              </Button>
            </Form>
          </div>
        </Container>
    </div>
  );
};

export default HomePage;
