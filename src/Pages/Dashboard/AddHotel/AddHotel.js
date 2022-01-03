import { Add } from "@mui/icons-material";
import { Alert, Button, Container, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const AddHotel = () => {
  const [hotelInfo, setHotelInfo] = useState({});
  const [addedHotels, setAddedHotels] = useState(false);

  const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newInfo = { ...hotelInfo };
    newInfo[field] = value;
    if (newInfo["key"] < 7) {
      setHotelInfo(newInfo);
    } else {
      const keyGenerator = Math.round(Math.random() * 1000);
      const key = keyGenerator.toString();
      newInfo["key"] = key;
      setHotelInfo(newInfo);
    }
  };

  const handleOrderConfirmation = (e) => {
    setAddedHotels(false);
    e.preventDefault();

    fetch("https://serene-lake-86965.herokuapp.com/hotels", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(hotelInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          setAddedHotels(true);
        }
      });

    e.preventDefault();
  };
  return (
    <Container>
      <Typography
        variant="h1"
        sx={{
          fontWeight: 500,
          padding: "30px",
          color: "white",
          marginTop: 3,
          backgroundColor: "#1D2440",
        }}
      >
        Add New Hotels
      </Typography>

      {addedHotels && <Alert severity="success">Successful</Alert>}

      <form
        style={{
          backgroundColor: "white",
          paddingTop: "20px",
          height: "700px",
        }}
        onSubmit={handleOrderConfirmation}
      >
        <TextField
          sx={{ width: "70%", m: 1 }}
          name="name"
          onBlur={handleOnBlur}
          label="Hotel Name"
          id="outlined-size-small"
          size="small"
        />
        <TextField
          sx={{ width: "70%", m: 1 }}
          name="location"
          onBlur={handleOnBlur}
          label="Location"
          id="outlined-size-small"
          size="small"
        />
        <TextField
          required
          sx={{ width: "70%", m: 1 }}
          name="key"
          onBlur={handleOnBlur}
          label="Set Key < 7 to appear on home"
          id="outlined-size-small"
          size="small"
        />

        <TextField
          sx={{ width: "70%", m: 1 }}
          name="img1"
          onBlur={handleOnBlur}
          label="Exterior Image"
          id="outlined-size-small"
          size="small"
        />
        <TextField
          sx={{ width: "70%", m: 1 }}
          name="img2"
          onBlur={handleOnBlur}
          label="Bedroom Image"
          id="outlined-size-small"
          size="small"
        />
        <TextField
          sx={{ width: "70%", m: 1 }}
          name="img3"
          onBlur={handleOnBlur}
          label="Lobby Image"
          id="outlined-size-small"
          size="small"
        />
        <TextField
          sx={{ width: "70%", m: 1 }}
          name="img4"
          onBlur={handleOnBlur}
          label="Washroom Image"
          id="outlined-size-small"
          size="small"
        />
        <TextField
          sx={{ width: "70%", m: 1 }}
          name="rent"
          onBlur={handleOnBlur}
          label="Rent"
          id="outlined-size-small"
          size="small"
        />
        <TextField
          sx={{ width: "70%", m: 1 }}
          name="star"
          onBlur={handleOnBlur}
          label="Star Ratint 0-5"
          id="outlined-size-small"
          size="small"
        />
        <br />
        <Button
          sx={{ backgroundColor: "#F27D42", m: 1 }}
          type="submit"
          variant="contained"
        >
          {" "}
          <Add sx={{ marginX: 1 }} /> Add To Database
        </Button>
      </form>
      <NavLink style={{ textDecoration: "none" }} to="/dashboard">
        <Button sx={{ margin: "20px" }} variant="outlined">
          Dashboard
        </Button>
      </NavLink>
    </Container>
  );
};

export default AddHotel;
