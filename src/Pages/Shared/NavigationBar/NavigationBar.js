import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Home, Login, Logout, Person } from "@mui/icons-material";
import useAuth from "../../../Hooks/useAuth";
import { NavLink } from "react-router-dom";
import menueIcon from "../../../images/menu_white_24dp.svg";
import { Menu, MenuItem } from "@mui/material";

const navStylePhone = {
  padding: 20,
  fontSize: "20px",
  fontWight: "400px",
  textDecoration: "none",
  color: "black",
  fontFamily: "Chakra Petch",
};

const NavigationBar = () => {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box sx={{ flexGrow: 1, flexDirection: "row" }}>
      <AppBar
        sx={{
          py: 2,
          backgroundColor: "#1D2440",
          display: { md: "block", xs: "none" },
        }}
        position="static"
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 0 }}
          ></IconButton>
          <Box style={{ display: { xs: "block", md: "hidden" } }}></Box>
          <NavLink
            style={{
              alignContent: "center",
              m: 2,
              display: { xs: "inline", md: "inline" },
              textDecoration: "none",
              color: "white",
            }}
            to="/"
          >
            <Button
              sx={{
                m: 2,
                display: { xs: "none", md: "inline" },
                backgroundColor: "#1D2440",
                color: "#D3BDBD",
              }}
              variant="contained"
              color="inherit"
            >
              <Home />
            </Button>
          </NavLink>
          <Typography
            variant="h6"
            component="div"
            sx={{
              display: { xs: "none", md: "inline" },
              m: 2,
              flexGrow: 1,
              color: "#1D2440",
            }}
          >
            Hotel Portal
          </Typography>

          {user?.email ? (
            <Box>
              <NavLink
                style={{
                  display: { xs: "none", md: "inline" },
                  m: 2,
                  textDecoration: "none",
                  color: "white",
                }}
                to="/dashboard"
              >
                <Button
                  sx={{
                    m: 2,
                    display: { xs: "none", md: "inline" },
                    backgroundColor: "#1D2440",
                    color: "#D3BDBD",
                  }}
                  variant="contained"
                  color="inherit"
                >
                  Dashboard
                </Button>
              </NavLink>

              <Button
                sx={{
                  m: 2,
                  display: { xs: "none", md: "inline" },
                  backgroundColor: "#1D2440",
                  color: "#D3BDBD",
                }}
                variant="contained"
                onClick={logout}
                color="inherit"
              >
                <Logout></Logout>
              </Button>
              <Typography
                variant="h6"
                sx={{
                  m: 2,
                  display: { xs: "inline", md: "inline" },
                  backgroundColor: "#F27D42",
                  borderBottom: "3px solid white",
                  borderRadius: "10px",
                  padding: "9px",
                }}
              >
                <Person /> {user.displayName}
              </Typography>
            </Box>
          ) : (
            <NavLink
              style={{
                m: 2,
                display: { xs: "none", md: "inline" },
                textDecoration: "none",
                color: "white",
              }}
              to="/login"
            >
              <Button color="inherit">
                <Login></Login>
              </Button>
            </NavLink>
          )}
        </Toolbar>
      </AppBar>
      <Button
        sx={{ display: { md: "none", xs: "block" }, margin: 0 }}
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <img style={{ fill: "white" }} src={menueIcon} alt="" />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{ width: "100%", margin: 0 }}
      >
        <MenuItem onClick={handleClose}>
          <NavLink style={navStylePhone} to="/">
            Home
          </NavLink>
        </MenuItem>
        {user?.email ? (
          <Box>
            <MenuItem onClick={handleClose}>
              <NavLink
                style={{
                  display: { xs: "block", md: "inline" },
                  m: 2,
                  textDecoration: "none",
                  color: "white",
                }}
                to="/dashboard"
              >
                <Button
                  sx={{
                    display: { xs: "block", md: "hidden" },
                    backgroundColor: "#1D2440",
                    color: "#D3BDBD",
                  }}
                  variant="contained"
                  color="inherit"
                >
                  Dashboard
                </Button>
              </NavLink>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Button
                sx={{
                  m: 2,
                  display: { xs: "block", md: "hidden" },
                  backgroundColor: "#1D2440",
                  color: "#D3BDBD",
                }}
                variant="contained"
                onClick={logout}
                color="inherit"
              >
                <Logout></Logout>
              </Button>
            </MenuItem>
          </Box>
        ) : (
          <Box>
            <MenuItem onClick={handleClose}>
              <NavLink
                style={{ m: 2, textDecoration: "none", color: "white" }}
                to="/login"
              >
                <Button color="inherit">
                  <Login></Login>
                </Button>
              </NavLink>
            </MenuItem>
          </Box>
        )}
      </Menu>
    </Box>
  );
};

export default NavigationBar;
