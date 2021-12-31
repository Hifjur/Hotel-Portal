import { Container, ImageList, ImageListItem, Typography } from "@mui/material";
import React from "react";
import man1 from "../../../images/man1.png";
import man2 from "../../../images/man2.png";
import man3 from "../../../images/man3.png";

const imgList = [{ img: man1 }, { img: man2 }, { img: man3 }];
const Employee = () => {
  return (
    <Container sx={{ paddingY: 10 }}>
      <ImageList sx={{ width: "100%", height: 400 }} cols={3} rowHeight={164}>
        {imgList.map((item) => (
          <ImageListItem key={item.img}>
            <img
              style={{
                borderRadius: "50%",
                width: "300px",
                border: "3px solid white",
                borderColor: "white",
              }}
              src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
      <Typography
        sx={{
          color: "white",
          fontWeight: { xs: "200", md: "700" },
          fontSize: { xs: 22, md: 50 },
        }}
      >
        The people behind <br />{" "}
        <span style={{ color: "#1D2440" }}>Hotel Reservasation Portal</span>
      </Typography>
    </Container>
  );
};

export default Employee;
