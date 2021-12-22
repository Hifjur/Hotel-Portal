import { Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import Hotel from "./Hotel";

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/hotels")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setHotels(data);
      });
  }, []);
  return (
    <>
      {/* <NavigationBar></NavigationBar> */}
      <Container style={{ backgroundColor: "#1D2440" }}>
        <Typography
          variant="h1"
          sx={{
            fontWeight: 500,
            paddingY: "30px",
            fontSize: { xs: 40, md: 100 },
            color: "white",
            marginTop: 3,
            backgroundColor: "#1D2440",
          }}
        >
          HOTELS
        </Typography>
        <Grid container rowSpacing={3} columnSpacing={{ xs: 2, sm: 3, md: 4 }}>
          {hotels.map((hotel) => (
            <Hotel key={hotel._id} hotel={hotel}></Hotel>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Hotels;
