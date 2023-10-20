import React from "react";
import Header from "../../components/Header";
import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer";
import HideAppBar from "../../components/Header/HideNav/HideNav";

export default function MainLayout() {
  return (
    <>
      <HideAppBar/>
      <Outlet />
      <Footer/>
    </>
    
  );
}
