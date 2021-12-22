import { Grid } from "@mui/material";
import React from "react";
import useAuth from "../../../Hooks/useAuth";
import ManageAllOrders from "../AddProducts/ManageAllOrders/ManageAllOrders";
import AllBookings from "../AllBookings/AllBookings";

const DashboardHome = () => {
  const { admin } = useAuth();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {admin ? (
          <ManageAllOrders></ManageAllOrders>
        ) : (
          <AllBookings></AllBookings>
        )}
      </Grid>
    </Grid>
  );
};

export default DashboardHome;
