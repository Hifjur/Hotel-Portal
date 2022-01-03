import { Container, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import Hotel from "./Hotel";

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    fetch("https://serene-lake-86965.herokuapp.com/hotels")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setHotels(data);
      });
  }, []);

  return (
    <>
      <Container style={{ backgroundColor: "#1D2440" }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 500,
            paddingY: "15px",
            fontSize: { xs: 20, md: 30 },
            color: "white",
            marginTop: 3,
            backgroundColor: "#1D2440",
          }}
        >
          Search for hotels
        </Typography>
        <TextField
          sx={{
            width: "80%",
            backgroundColor: "white",
            color: "black",
            marginY: 3,
          }}
          id="outlined-basic"
          placeholder="Search by location or name"
          variant="outlined"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <Grid
          sx={{ paddingY: 10 }}
          container
          rowSpacing={3}
          columnSpacing={{ xs: 2, sm: 3, md: 4 }}
        >
          {hotels
            .filter((value) => {
              if (search === "") {
                return value;
              } else if (
                value.name.toLowerCase().includes(search.toLocaleLowerCase()) ||
                value.location
                  .toLocaleLowerCase()
                  .includes(search.toLocaleLowerCase())
              ) {
                return value;
              }
            })
            .map((hotel) => (
              <Hotel key={hotel._id} hotel={hotel}></Hotel>
            ))}
        </Grid>
      </Container>
    </>
  );
};

export default Hotels;
