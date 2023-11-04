import React from "react";
import AdminSideBar from "./components/AdminSideBar";
import { Grid } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
export default function AdminLayout() {
  return (
    <>
      <Header/>
      <Grid container sx={{paddingTop:'69px'}}>
        <Grid item md={2}>
          <AdminSideBar />
        </Grid>
        <Grid item md={10} sx={{ paddingLeft: "0" }}>
          <Outlet />
        </Grid>
      </Grid>
    </>
  );
}
