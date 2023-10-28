import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { BackToTop } from "./index";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
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
      <Header />
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
