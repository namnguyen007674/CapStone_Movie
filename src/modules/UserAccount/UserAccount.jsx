import React, { useEffect, useState } from "react";
import style from "./UserAccount.module.scss";
import { Outlet, useLocation, Link } from "react-router-dom";
import { Container } from "@mui/material";
// Validation input

export default function UserAccount() {
  // active Item
  const [activeItem, setActiveItem] = useState("");

  const location = useLocation();
  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location.pathname]);
  return (
    <div className={style.bgUseraccount}>
      <Container>
      <div className={style.useraccount}>
        <div className={style.useraccountTitle}>
          <Link to={"user"} style={{ textDecoration: "none" }}>
            <h3
              className={`${style.heading} ${
                activeItem === "/account/user" ? `${style.active}` : ""
              }`}
            >
              Tài Khoản
            </h3>
          </Link>
          <span className={style.symbol}>|</span>
            <Link to={"history"} style={{ textDecoration: "none" }}>
              <h3
                className={`${style.heading} ${
                  activeItem === "/account/history" ? `${style.active}` : ""
                }`}
              >
                Lịch Sử
              </h3>
            </Link>
        </div>
          <hr style={{border:"none",height:'1px',background: "rgb(0 0 0 / 12%)"}} />
        <Outlet />
      </div>
      </Container>
    </div>
  );
}
