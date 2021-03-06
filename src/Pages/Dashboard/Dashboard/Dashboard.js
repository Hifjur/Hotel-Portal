import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import { Login, Logout, Person } from "@mui/icons-material";

const drawerWidth = 240;

function Dashboard(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { admin, user, logout } = useAuth();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box style={{ backgroundColor: "#55bdca", height: "100%" }}>
      <Toolbar />
      <Divider />
      <div>
        <NavLink
          style={{
            display: "block",
            marginY: 3,
            textDecoration: "none",
            color: "white",
          }}
          to="/home"
        >
          <Button
            sx={{ backgroundColor: "#55bdca", color: "whtie" }}
            color="inherit"
          >
            Home Page
          </Button>
        </NavLink>
        {!admin && (
          <Box>
            <NavLink
              style={{
                display: "block",
                marginY: 3,
                textDecoration: "none",
                color: "white",
              }}
              to="/"
            >
              <Button
                sx={{ backgroundColor: "#55bdca", color: "whtie" }}
                color="inherit"
              >
                Explore More
              </Button>
            </NavLink>
            <NavLink
              style={{
                display: "block",
                marginY: 3,
                textDecoration: "none",
                color: "white",
              }}
              to="/dashboard"
            >
              <Button
                sx={{ backgroundColor: "#55bdca", color: "whtie" }}
                color="inherit"
              >
                My Orders
              </Button>
            </NavLink>
          </Box>
        )}
        {admin && (
          <Box>
            <NavLink
              style={{
                display: "block",
                marginY: 3,
                textDecoration: "none",
                color: "white",
              }}
              to={`/dashboard`}
            >
              <Button
                sx={{ backgroundColor: "#55bdca", color: "whtie" }}
                color="inherit"
              >
                Mange All Orders
              </Button>
            </NavLink>
            <NavLink
              style={{
                display: "block",
                marginY: 3,
                textDecoration: "none",
                color: "white",
              }}
              to={`/dashboard/makeAdmin`}
            >
              <Button
                sx={{ backgroundColor: "#55bdca", color: "whtie" }}
                color="inherit"
              >
                Make Admin
              </Button>
            </NavLink>
            <NavLink
              style={{
                display: "block",
                marginY: 3,
                textDecoration: "none",
                color: "white",
              }}
              to={`/dashboard/addhotel`}
            >
              <Button
                sx={{ backgroundColor: "#55bdca", color: "whtie" }}
                color="inherit"
              >
                Add New Hotel
              </Button>
            </NavLink>
            <NavLink
              style={{
                display: "block",
                marginY: 3,
                textDecoration: "none",
                color: "white",
              }}
              to={`/dashboard/managehotels`}
            >
              <Button
                sx={{ backgroundColor: "#55bdca", color: "whtie" }}
                color="inherit"
              >
                Manage Hotels
              </Button>
            </NavLink>
          </Box>
        )}
      </div>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", hight: "100%" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "#1D2440",
          paddingY: 1,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: "D3BDBD" }}
          >
            Dashboard
          </Typography>
          {user?.email ? (
            <Box>
              <Typography
                variant="h6"
                sx={{
                  display: "inline",
                  backgroundColor: "#F27D42",
                  borderBottom: "3px solid white",
                  borderRadius: "10px",
                  padding: "9px",
                  marginY: "3px",
                }}
              >
                <Person /> {user.displayName}
              </Typography>
              <Button
                sx={{
                  backgroundColor: "#1D2440",
                  color: "#D3BDBD",
                  m: 2,
                }}
                variant="contained"
                onClick={logout}
                color="inherit"
              >
                <Logout></Logout>
              </Button>
            </Box>
          ) : (
            <NavLink
              style={{ textDecoration: "none", color: "white", m: 2 }}
              to="/login"
            >
              <Button color="inherit">
                <Login />
              </Button>
            </NavLink>
          )}
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

Dashboard.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Dashboard;
