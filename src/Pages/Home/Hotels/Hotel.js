import { Luggage } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Rating,
  Typography,
} from "@mui/material";

import React from "react";
import { NavLink } from "react-router-dom";

const Hotel = ({ hotel }) => {
  const { _id, name, rent, img1, star, location } = hotel;
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        sx={{
          maxWidth: 400,
          backgroundColor: "#1D2440",
          border: 1,
          borderColor: "white",
        }}
      >
        <CardActionArea>
          <CardMedia component="img" height="300" width="400" image={img1} />
          <CardContent>
            <Typography
              sx={{ color: "white", fontWeight: "medium" }}
              gutterBottom
              variant="h5"
              component="div"
            >
              {name}
            </Typography>
            <Rating
              name="read-only"
              style={{
                color: "#F27D42",
                backgroundColor: "white",
                borderRadius: 40,
                padding: 8,
              }}
              value={star}
              readOnly
            />
            <Typography
              sx={{ color: "#F27D42", fontWeight: "medium", paddingTop: 2 }}
              variant="body2"
              color="text.secondary"
            >
              Located at {location}
            </Typography>

            <Typography
              sx={{ color: "white", fontWeight: "medium" }}
              variant="body2"
              color="text.secondary"
            >
              Price: ${rent}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions style={{ alignItems: "center" }}>
          <NavLink style={{ textDecoration: "none" }} to={`/book/${_id}`}>
            <Button
              sx={{ backgroundColor: "#F27D42" }}
              variant="contained"
              size="small"
              color="primary"
            >
              <Luggage /> Book Now!!
            </Button>
          </NavLink>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default Hotel;
