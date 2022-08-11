import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import DataTable from "react-data-table-component";
import Container from 'react-bootstrap/esm/Container';
import Button from "react-bootstrap/Button";
const AdminDashboard = () => {

    const navigate = useNavigate();
    const [userDetails, setuserDetails] = useState([])
    const [Declined, setDeclined] = useState([])
    const [search, setsearch] = useState("");
    const [filerValue, setfilterValue] = useState([])
    const [refresh, setRefresh] = useState(false);

    

//dashboard fetch all user details
    useEffect(() => {
      const admininfo = localStorage.getItem("adminInfo");
      if (admininfo) {
        navigate("/admindashboard");
        (async function() {
          try {
            const config = {
              headers: {
                "Content-type": "application/json",
              },
            };
            const { data } = await axios.get("/admin/admindashboard", config);
            console.log(data, "userdatat");
           
            setfilterValue(data);
          } catch (error) {}
        })();
      } else {
        navigate("/admin");
      }
    }, [refresh, navigate]);

//filter using name
    useEffect(() => {
      const result = userDetails.filter((users) => {
        return users.name.toLowerCase().match(search.toLowerCase());
      });
      setfilterValue(result);
    }, [search]);
//delete user
    const deleteuser = async (userId) => {
    if (window.confirm(`Sure to Delete?`)) {
      try {
        const config = {
          headers: {
            'Content-type': 'application/json',
          },
        };
        await axios.delete('/admin/delete', {
          params: {
            id: userId,
          },
          config,
        });
        setRefresh(!refresh);
      } catch (error) {
        throw new error(error.response.data.message);
      }
    }
  };
  //edit user
   const editHandler = async (userId) => {
     try {
       navigate(`/edit/${userId}`);
     } catch (error) {
       throw new error(error.response.data.message);
     }
   };


    const columns = [
      {
        name: "Name",
        selector: (row) => row.name,
        sortable: true,
      },
      {
        name: "Email",
        selector: (row) => row.email,
        sortable: true,
      },
      {
        name: "Phone",
        selector: (row) => row.phone,
        sortable: true,
      },
      {
        name: "Edit",
        cell: (row) => (
          <Button
            variant="primary"

            onClick={() => {
              editHandler(row._id);
            }}
          >
            Edit
          </Button>
        ),
      },
      {
        name: "Delete",
        cell: (row) => (
          <Button
            variant="danger"

            onClick={() => {
              deleteuser(row._id);
            }}
          >
            Delete
          </Button>
        ),
      },
    ];
  return (
    <Container>
      <div style={{ border: "1px solid black" }}>
        <DataTable
          title="User List"
          columns={columns}
          data={filerValue}
          pagination
          fixedHeader
          highlightOnHover
          subHeader
          subHeaderComponent={
            <input
              type="text"
              placeholder="Search"
              className="w-25 form-control"
              value={search}
              onChange={(e) => {
                setsearch(e.target.value);
              }}
            />
          }
        />
      </div>
    </Container>
  );
}

export default AdminDashboard