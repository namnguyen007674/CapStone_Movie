import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import style from "./Auth.module.scss";

export default function Auth() {
  // set active cho tiêu đề
  const [activeItem, setActiveItem] = useState("");
  // Lấy url và set lại giá trị State để active
  const location = useLocation();
  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location.pathname]);

  return (
    <div className={style.BgAuth}>
      <div className={style.auth}>
        <div className={style.account}>
          <Link to={"/sign-up"} style={{ textDecoration: "none" }}>
            <h1
              className={`${style.heading} ${
                activeItem === "/sign-up" ? `${style.active}` : ""
              }`}
            >
              ĐĂNG KÝ
            </h1>
          </Link>
          <span className={style.symbol}>|</span>
          <Link to={"/sign-in"} style={{ textDecoration: "none" }}>
            <h1
              className={`${style.heading} ${
                activeItem === "/sign-in" ? `${style.active}` : ""
              }`}
            >
              ĐĂNG NHẬP
            </h1>
          </Link>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
