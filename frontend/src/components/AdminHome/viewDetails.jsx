import React,{useEffect, useState} from 'react'
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/esm/Container';
import { useNavigate,useParams } from 'react-router-dom';
import Loading from '../Loading';
import { Link } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";

const viewDetails = () => {
    const navigate = useNavigate();
    const [details, setdetails] = useState([])
    const applicationId = useParams();

    useEffect(() => {
      try {
        (async function() {
          const { data } = await axios.get(
            `/admin/viewDetails/${applicationId.applicationId}`
          );
          setdetails(data)
          
        })();
      } catch (error) {
        throw new error(error.response.data.message);
      }
    }, []);

  return (
    <Container className="loginContainer" style={{ width: "800px" }}>
      <div style={{ border: "3px solid black", padding: "20px" }}>
        <Form>
          <div className="row">
            <div className="col-6 d-flex">
              <Form.Group controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <li>{details.name}</li>
              </Form.Group>
            </div>
            <div className="col-6 d-flex">
              <Form.Group className="mb-3" controlId="formBasicAddress">
                <Form.Label>Address</Form.Label>
                <li>{details.address}</li>
              </Form.Group>
            </div>
            <div className="col-6 d-flex">
              <Form.Group className="mb-3" controlId="formBasicCity">
                <Form.Label>City</Form.Label>
                <li>{details.city}</li>
              </Form.Group>
            </div>
            <div className="col-6 d-flex">
              <Form.Group className="mb-3" controlId="formBasiState">
                <Form.Label>State</Form.Label>
                <li>{details.state}</li>
              </Form.Group>
            </div>
            <div className="col-6 d-flex">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <li>{details.email}</li>
              </Form.Group>
            </div>
            <div className="col-6 d-flex">
              <Form.Group className="mb-3" controlId="formBasicPhone">
                <Form.Label>Phone</Form.Label>
                <li>{details.phone}</li>
              </Form.Group>
            </div>
            <div className="col-6 d-flex">
              <Form.Group className="mb-3" controlId="formBasicCompanyname">
                <Form.Label>Company name</Form.Label>
                <li>{details.companyname}</li>
              </Form.Group>
            </div>

            <div className="col-6 d-flex">
              <Form.Group className="mb-3" controlId="formBasicCompanyLogo">
                <Form.Label>Company Logo</Form.Label>
                <img
                  src={details.image}
                  alt="logo"
                  style={{ height: "200px", width: "200px" }}
                />
              </Form.Group>
            </div>
          </div>

          <div className="row">
            <Form.Group className="mb-3" controlId="formBasicTeamBackground">
              <Form.Label>Describe your team and background*</Form.Label>
              <li>{details.teambackground}</li>
            </Form.Group>
          </div>
          <div className="row">
            <Form.Group
              className="mb-3"
              controlId="formBasicCompanyandProducts"
            >
              <Form.Label>Describe your company and products*</Form.Label>
              <li>{details.products}</li>
            </Form.Group>
          </div>
          <div className="row">
            <Form.Group className="mb-3" controlId="formBasicProblemToSolve">
              <Form.Label>
                Describe the problem you are trying to solve*
              </Form.Label>
              <li>{details.problem}</li>
            </Form.Group>
          </div>
          <div className="row">
            <Form.Group
              className="mb-3"
              controlId="formBasicUniqueAboutCompany"
            >
              <Form.Label>What is unique about your solution*</Form.Label>
              <li>{details.unique}</li>
            </Form.Group>
          </div>
          <div className="row">
            <Form.Group className="mb-3" controlId="formBasicValueProposition">
              <Form.Label>
                What is your value proposition for the customer
              </Form.Label>
              <li>{details.valueproposition}</li>
            </Form.Group>
          </div>
          <div className="row">
            <Form.Group className="mb-3" controlId="formBasicCompetitors">
              <Form.Label>
                Who are your competitors and what is your competative advantage
              </Form.Label>
              <li>{details.competition}</li>
            </Form.Group>
          </div>
          <div className="row">
            <Form.Group className="mb-3" controlId="formBasicRevenueModel">
              <Form.Label>Explain your revenue model?*</Form.Label>
              <li>{details.revenuemodel}</li>
            </Form.Group>
          </div>
          <div className="row">
            <Form.Group className="mb-3" controlId="formBasicMarketSize">
              <Form.Label>
                What is the potential market size of the product
              </Form.Label>
              <li>{details.marketsize}</li>
            </Form.Group>
          </div>
          <div className="row">
            <Form.Group className="mb-3" controlId="formBasicMarketing">
              <Form.Label>
                How do you market or plan to market your products and services*
              </Form.Label>
              <li>{details.marketingplan}</li>
            </Form.Group>
          </div>
          <div className="row">
            <Form.Group
              className="mb-3"
              controlId="formBasicIncubationTypePhysical"
            >
              <Form.Label>Type of incubation needed</Form.Label>
              <li>{details.incubationtype}</li>
            </Form.Group>
          </div>

          <div className="row">
            <Form.Group className="mb-3" controlId="formBasicBusinessProposal">
              <Form.Label>Upload a detailed business proposal</Form.Label>
              <li>{details.businessproposal}</li>
            </Form.Group>
          </div>
          <Link to="/adminHome">
            <Button variant="primary" type="submit" style={{ display: "flex" }}>
              Close
            </Button>
          </Link>
        </Form>
      </div>
    </Container>
  );
}

export default viewDetails