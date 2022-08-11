import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DataTable from "react-data-table-component";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/esm/Button";
import Badge from "react-bootstrap/Badge";
import ProgressBar from "react-bootstrap/ProgressBar";
import Modal from "react-bootstrap/Modal";

const AdminHome = () => {
  const navigate = useNavigate();
  const [applicationDetails, setapplicationDetails] = useState([]);
  const [Declined, setDeclined] = useState([]);
  const [rowId, setrowId] = useState('')
  const [progress, setprogress] = useState(60);
  const [refresh, setrefresh] = useState(false);
  const [show, setShow] = useState(false);
  const [underprocess, setunderprocess] = useState([])

  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  function handleShow(Id){
    setShow(true);
    setrowId(Id)

  }

 

  useEffect(() => {
    const admininfo = localStorage.getItem("adminInfo");
    if (admininfo) {
      navigate("/adminHome");
      (async function() {
        try {
          const config = {
            headers: {
              "Content-type": "application/json",
            },
          };
          const pending = await axios.get("/admin/getPending", config);
          const underProcess = await axios.get(
            "/admin/getunderProcess",
            config
          );
          Promise.any([pending, underProcess]);
          console.log(pending, "jjh");
          setapplicationDetails(pending.data);
          setDeclined(underProcess.data);
        } catch (error) {
          console.error(error);
        }
      })();
    } else {
      navigate("/admin");
    }
  }, [refresh, navigate]);


  console.log(applicationDetails,"apllicationdetails");

  async function underProcess (rowId) {
    // window.location.reload(true)
    // setrefresh([...refresh,!refresh])
    handleClose();
    setrefresh(!refresh);
     
    console.log(rowId)
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const changeProcess = await axios.patch("/admin/startProcess/",rowId,{
        config
      })
      
      



      if(changeProcess){
        console.log(changeProcess)
        
      }
    } catch (error) {
      console.log(error)
    }
  }

  

  const showDetails = (applicationId) => {};

  async function Decline(declineId) {

    console.log(declineId);
     setrefresh(!refresh);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const declineApplication = await axios.patch(
        "/admin/decline",
        { declineId },
        {
          config,
        }
      );
      if (declineApplication) {
        console.log(declineApplication);
      }
    } catch (error) {
      console.log(error);
    }
  };

  async function Approve(approveId) {

    console.log(approveId);
     setrefresh(!refresh);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const approveApplication = await axios.patch(
        "/admin/approve",
        { approveId },
        {
          config,
        }
      );
      if (approveApplication) {
        console.log(approveApplication);
      }
    } catch (error) {
      console.log(error);
    }
  }

  
  const columns = [
    {
      name: "Company logo",
      cell: (row) => (
        <img style={{ width: "60px", height: "60px" }} src={row.image} alt="" />
      ),
      // style: {
      //   height:"50px",
      //   width:"20%"
      // },
    },
    // {
    //   name: "Company Name",
    //   selector: (row) => <Badge bg="primary">{row.companyname}</Badge>,
    //   sortable: true,
    // },
    {
      name: "Company Name",
      selector: (row) => row.companyname,
      sortable: true,
    },

    {
      name: "Company Details",
      selector: (row) => row.teambackground,
      sortable: true,
    },
    {
      name: "View Details",
      cell: (row) => (
        <Button
          onClick={() => {
            showDetails(row._id);
          }}
        >
          open
        </Button>
      ),
    },
    {
      name: "Status",
      cell: (row) => (
        <Button
          variant="warning"
          onClick={() => {
            handleShow(row._id);
          }}
        >
          pending
        </Button>
      ),
    },
    // {
    //   name: "Edit",
    //   cell: (row) => <ProgressBar now={progress}></ProgressBar>,
    //   style: {
    //     display: "block",
    //     marginTop: "16px",
    //   },
    // },
  ];
  const columns2 = [
    {
      name: "Company logo",
      cell: (row) => (
        <img style={{ width: "60px", height: "60px" }} src={row.image} alt="" />
      ),
      // style: {
      //   height:"50px",
      //   width:"20%"
      // },
    },
    {
      name: "Company Name",
      selector: (row) => row.companyname,
      sortable: true,
    },

    {
      name: "Company Details",
      selector: (row) => row.teambackground,
      sortable: true,
    },
    {
      name: "View Details",
      cell: (row) => (
        <Button
          onClick={() => {
            showDetails(row._id);
          }}
        >
          open
        </Button>
      ),
    },
    {
      name: "Decline",
      cell: (row) =>
        row.underProgress ? (
          <Button
            variant="danger"
            onClick={() => {
              Decline(row._id);
            }}
          >
            Decline
          </Button>
        ) : row.Declined ? (
          <h5>
            <Badge bg="danger">Declined</Badge>
          </h5>
        ) : (
          ""
        ),
    },
    {
      name: "Approve",
      cell: (row) =>
        row.underProgress ? (
          <Button
            variant="success"
            onClick={() => {
              Approve(row._id);
            }}
          >
            Approve
          </Button>
        ) : row.Approved ? (
          <h5>
            <Badge bg="success">Approved</Badge>
          </h5>
        ) : (
          ""
        ),
    }
  ];

  return (
    <div>
      <Container className="mt-4">
        <div className="row">
          {/* <Button variant="primary" onClick={handleShow}>
            Launch static backdrop modal
          </Button> */}

          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Start Process</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Do you want to start processing this application?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={() => {
            underProcess({ rowId });
          }}>Start</Button>
            </Modal.Footer>
          </Modal>
          <div style={{ border: "1px solid black" }}>
            <DataTable
              title="New Applicant List"
              columns={columns}
              data={applicationDetails}
              pagination
              fixedHeader
              highlightOnHover
            />
          </div>
        </div>
        <div className="row mt-5">
          <div style={{ border: "1px solid black" }}>
            <DataTable
              title="Incubation Applications"
              columns={columns2}
              data={Declined}
              pagination
              fixedHeader
              highlightOnHover
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AdminHome;
