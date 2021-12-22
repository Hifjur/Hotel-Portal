import {
  Button,
  TextField,
  Alert,
  Typography,
  Container,
  Grid,
  ImageList,
  ImageListItem,
} from "@mui/material";
import { width } from "@mui/system";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import NavigationBar from "../../Shared/NavigationBar/NavigationBar";

const Book = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const initialInfo = {
    customerName: user.displayName,
    email: user.email,
    phone: "",
  };
  const [bookingInfo, setBookingInfo] = useState(initialInfo);
  const [bookingComplete, setBookingComplete] = useState(false);
  const history = useNavigate();

  const [hotel, setHotel] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/hotels/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setHotel(data);
      });
  }, [id]);
  const { name, rent, img1, img2, img3, img4, location } = hotel;
  const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newInfo = { ...bookingInfo };
    newInfo[field] = value;
    setBookingInfo(newInfo);
  };
  const imageList = [
    {
      img: img1,
      title: "Building",
    },
    {
      img: img2,
      title: "Bedroom",
    },
    {
      img: img3,
      title: "Lobby",
    },
    {
      img: img4,
      title: "Washroom",
    },
  ];

  const handleOrderConfirmation = (e) => {
    const orderIdgenerator = Math.floor(Math.random() * 100000000000000);
    e.preventDefault();
    const bookings = {
      ...bookingInfo,
      productName: name,
      productUniqueId: id,
      status: "pending",
      price: rent,
      img: img1,
      orderId: `${orderIdgenerator}`,
    };
    fetch("http://localhost:5000/bookings", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(bookings),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          setBookingComplete(true);
          history("/payment");
        }
      });

    e.preventDefault();
  };
  return (
    <>
      <NavigationBar />
      <Container>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            style={{
              padding: 10,
              borderRadius: 5,
              width: "100%",
            }}
          >
            <ImageList
              sx={{ width: "100%", height: 400 }}
              variant="woven"
              cols={4}
              gap={8}
            >
              {imageList.map((item) => (
                <ImageListItem key={item.img}>
                  <img
                    src={`${item.img}?w=161&fit=crop&auto=format`}
                    srcSet={`${item.img}?w=161&fit=crop&auto=format&dpr=2 2x`}
                    alt={item.title}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Grid>
        </Grid>

        <Typography
          sx={{ color: "white", fontWeight: "700" }}
          gutterBottom
          variant="h3"
          component="div"
        >
          {name}
        </Typography>
        <Typography
          sx={{ color: "#F27D42", fontWeight: "medium" }}
          variant="body2"
          color="text.secondary"
        >
          {location}
        </Typography>
        <Typography
          sx={{ color: "#1D2440", fontWeight: "medium", fontSize: "30px" }}
          variant="body2"
          color="text.secondary"
        >
          Rent: ${rent}
        </Typography>
        <Typography
          sx={{ color: "white", paddingTop: 5, fontWeight: "700" }}
          gutterBottom
          variant="h5"
          component="div"
        >
          Enter Deails to Book A room
        </Typography>
        {bookingComplete && (
          <Alert severity="success">Booking Successful</Alert>
        )}

        <form
          style={{
            paddingTop: "20px",
            borderRadius: "30px",
          }}
          onSubmit={handleOrderConfirmation}
        >
          <TextField
            sx={{ width: "70%", m: 1 }}
            name="customerName"
            onBlur={handleOnBlur}
            label="Name"
            defaultValue={user.displayName}
            id="filled-basic"
            variant="filled"
            size="small"
          />

          <TextField
            sx={{ width: "70%", m: 1 }}
            name="email"
            onBlur={handleOnBlur}
            label="Email"
            defaultValue={user.email}
            id="filled-basic"
            variant="filled"
            size="small"
          />
          <TextField
            sx={{ width: "70%", m: 1 }}
            name="phone"
            onBlur={handleOnBlur}
            label="Phone Number"
            id="filled-basic"
            variant="filled"
            size="small"
          />
          <TextField
            sx={{ width: "70%", m: 1 }}
            name="road"
            onBlur={handleOnBlur}
            label="Road Number"
            id="filled-basic"
            variant="filled"
            size="small"
          />
          <TextField
            sx={{ width: "70%", m: 1 }}
            name="PO"
            onBlur={handleOnBlur}
            label="Postal code"
            id="filled-basic"
            variant="filled"
            size="small"
          />
          <TextField
            sx={{ width: "70%", m: 1 }}
            name="city"
            onBlur={handleOnBlur}
            label="City"
            id="filled-basic"
            variant="filled"
            size="small"
          />
          <TextField
            disabled
            sx={{ width: "70%", m: 1 }}
            name="status"
            onBlur={handleOnBlur}
            label="Booking Status"
            id="filled-basic"
            variant="filled"
            size="small"
            defaultValue="pending"
          />
          <br />
          <Button
            sx={{ backgroundColor: "#F27D42", m: 1 }}
            type="submit"
            variant="contained"
          >
            Payment
          </Button>
        </form>
        <NavLink style={{ textDecoration: "none" }} to="/">
          <Button sx={{ margin: "20px" }} variant="outlined">
            Look at more hotels
          </Button>
        </NavLink>
      </Container>
    </>
  );
};

export default Book;
