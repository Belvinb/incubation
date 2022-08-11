import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DataTable from "react-data-table-component";
import Container from "react-bootstrap/esm/Container";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useLocation } from "react-router-dom";
import "./AdminRecordList.css";


const AdminRecordList = () => {
  const navigate = useNavigate();
  const [record, setrecord] = useState([])
  let location = useLocation();
  useEffect(() => {
    function recordDetails(){
      
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        axios.get("/admin/recordList/",config).then((response)=>{
          console.log(response)
          setrecord(response.data)
        })
    }
    recordDetails();
  }, [location])
  

   const columns = [
     {
       name: "Company logo",
       cell: (row) => (
         <img
           style={{ width: "60px", height: "60px" }}
           src={row.image}
           alt=""
         />
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
       name: "Progress",
       cell: (row) =>
         row.pending ? (
           <ProgressBar
             now={30}
             label="pending"
             variant="warning"
           ></ProgressBar>
         ) : row.underProgress ? (
           <ProgressBar
             now={60}
             label="processing"
             variant="info"
           ></ProgressBar>
         ) : row.Approved ? (
           <ProgressBar
             now={100}
             label="Approved"
             variant="success"
           ></ProgressBar>
         ) : (
           <ProgressBar
             now={100}
             label="Declined"
             variant="danger"
           ></ProgressBar>
         ),
       style: {
         display: "block",
         marginTop: "16px",
         paddingRight:"2rem",
         

       },
     },
   ];
  


    
  return (
    <Container className="mt-4">
      <div style={{ border: "1px solid black" }}>
        <DataTable
          title="Record List"
          columns={columns}
          data={record}
          pagination
          fixedHeader
          highlightOnHover
        />
      </div>
    </Container>
  );
};

export default AdminRecordList;
