import React, { useEffect, useState } from "react";
// import Header from "../../components/Header";
import Footer from "../../components/Footer";
import HideAppBar from "../../components/Header/HideNav/HideNav";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { BackToTop } from "./index";
import { Outlet } from "react-router-dom";
export default function MainLayout() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <>
      <HideAppBar />
      <Outlet />
      <Footer />
      {showBackToTop && (
        <BackToTop onClick={handleBackToTop} className="back-to-top-button">
          <ExpandLessIcon sx={{ fontSize: "80px" }} />
        </BackToTop>
      )}
    </>
  );
}
