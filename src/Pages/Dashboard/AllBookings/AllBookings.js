import React, { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { NavLink } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { DeleteOutlineOutlined } from "@mui/icons-material";
import { Box } from "@mui/system";

const AllBookings = () => {
  const { user, token } = useAuth();
  const [Bookings, setBookings] = useState([]);
  const [success, setSucsess] = useState(false);
  useEffect(() => {
    const url = `https://serene-lake-86965.herokuapp.com/bookings?email=${user.email}`;
    fetch(url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setBookings(data));
  }, [user.email, token, success]);

  const handleDelete = (_id) => {
    setSucsess(false);
    const id = {_id };
    if (
      window.confirm("Are you sure you want to Cancle this booking?")
    ) {
      const url = `https://serene-lake-86965.herokuapp.com/bookings`;
      fetch(url, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify(id),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            setSucsess(true);
            console.log(data);
          }
        });
    } else {
      // Do nothing!
      console.log("Thing was not saved to the database.");
    }
  };
  return (
    <>
      <Typography
        variant="h1"
        sx={{
          fontWeight: 500,
          fontSize: { xs: 50 },
          paddingY: "30px",
          color: "white",
          backgroundColor: "#1D2440",
        }}
      >
        ORDERS
      </Typography>
      <Box sx={{ width: "100%", display: { xs: "none", md: "block" } }}>
        <TableContainer component={Paper}>
          <Table aria-label=" List">
            <TableHead>
              <TableRow>
                <TableCell>Custormer's Name</TableCell>
                <TableCell align="right">Hotel Preview</TableCell>
                <TableCell align="right">Hotel Name</TableCell>
                <TableCell align="right">Rent</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Payment</TableCell>
                <TableCell align="right">Cancle</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Bookings.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <span style={{ fontSize: "20px", color: "gray" }}>
                      {row.customerName}
                    </span>{" "}
                    <br />
                    <span style={{ color: "green" }}>
                      Address: {row.road} {row.PO} <br />
                      {row.city}
                    </span>
                  </TableCell>
                  <TableCell align="right">
                    <img
                      style={{
                        height: "100px",
                        width: "125px",
                        borderRadius: "20px",
                      }}
                      src={row.img}
                      alt=""
                    />
                  </TableCell>
                  <TableCell align="right">{row.hotelName}</TableCell>
                  <TableCell align="right">${row.rent}</TableCell>
                  <TableCell align="right">{row.status}</TableCell>
                  <TableCell align="right">
                    {row.payment ? (
                      "Paid"
                    ) : (
                      <NavLink
                        style={{ textDecoration: "none" }}
                        to={`/dashboard/payment/${row._id}`}
                      >
                        <Button
                          sx={{ backgroundColor: "#F27D42", m: 1 }}
                          variant="contained"
                        >
                          Payment
                        </Button>
                      </NavLink>
                    )}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      onClick={() => handleDelete(row._id)}
                      sx={{ backgroundColor: "#F27D42", m: 1 }}
                      variant="contained"
                    >
                      <DeleteOutlineOutlined></DeleteOutlineOutlined>
                    </Button>{" "}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box sx={{ width: "100%", display: { xs: "block", md: "none" } }}>
        <TableContainer component={Paper}>
          <Table aria-label=" List">
            <TableBody>
              {Bookings.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{
                    display: { xs: "grid" },
                    gridAutoColumns: { xs: "1fr" },
                    gap: { xs: 1 },
                  }}
                >
                  <TableCell align="center" component="th" scope="row">
                    <span
                      style={{
                        fontSize: "20px",
                        color: "gray",
                        fontWeight: 500,
                      }}
                    >
                      Custormer's Name:
                    </span>
                    <span
                      style={{
                        fontSize: "20px",
                        color: "black",
                        fontWeight: 500,
                      }}
                    >
                      {" "}
                      {row.customerName}
                    </span>{" "}
                    <br />
                    <span style={{ color: "green" }}>
                      Address: {row.road} {row.PO} <br />
                      {row.city}
                    </span>
                  </TableCell>
                  <TableCell align="center">
                    <span
                      style={{
                        fontSize: "20px",
                        color: "gray",
                        fontWeight: 500,
                      }}
                    >
                      Hotel Preview
                    </span>{" "}
                    <br />{" "}
                    <img
                      style={{
                        height: "100px",
                        width: "125px",
                        borderRadius: "20px",
                      }}
                      src={row.img}
                      alt=""
                    />
                  </TableCell>
                  <TableCell align="center">
                    <span
                      style={{
                        fontSize: "20px",
                        color: "gray",
                        fontWeight: 500,
                      }}
                    >
                      Hotels:
                    </span>
                    <span
                      style={{
                        fontSize: "20px",
                        color: "black",
                        fontWeight: 500,
                      }}
                    >
                      {row.hotelName}
                    </span>
                  </TableCell>
                  <TableCell align="center">
                    <span
                      style={{
                        fontSize: "20px",
                        color: "gray",
                        fontWeight: 500,
                      }}
                    >
                      Rent:
                    </span>
                    <span
                      style={{
                        fontSize: "20px",
                        color: "black",
                        fontWeight: 500,
                      }}
                    >
                      {row.rent}
                    </span>
                  </TableCell>
                  <TableCell align="center">
                    <span
                      style={{
                        fontSize: "20px",
                        color: "gray",
                        fontWeight: 500,
                      }}
                    >
                      Status:
                    </span>
                    <span
                      style={{
                        fontSize: "20px",
                        color: "black",
                        fontWeight: 500,
                      }}
                    >
                      {row.status}
                    </span>
                  </TableCell>
                  <TableCell align="center">
                    <NavLink style={{ textDecoration: "none" }} to="/payment">
                      <Button
                        sx={{ backgroundColor: "#F27D42", m: 1 }}
                        variant="contained"
                      >
                        Payment
                      </Button>
                    </NavLink>
                    <Button
                      onClick={() => handleDelete(row._id)}
                      sx={{ backgroundColor: "#F27D42", m: 1 }}
                      variant="contained"
                    >
                      <DeleteOutlineOutlined></DeleteOutlineOutlined>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default AllBookings;
