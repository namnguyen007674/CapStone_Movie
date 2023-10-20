import React from "react";
import { Link } from "react-router-dom";
import style from "./CardItem.module.scss";
import BookOnlineRoundedIcon from "@mui/icons-material/BookOnlineRounded";
export default function CardItem({ item }) {
  return (
    <div className={style.cardMovie}>
      <Link className={style.cardItem} to={`detail/${item.maPhim}`}>
        <img src={item.hinhAnh} alt={item.biDanh} />
      </Link>
        <Link className={style.cardItem} to={`detail/${item.maPhim}`}>
          <span className={style.cardName}>{item.tenPhim}</span>
        </Link>
        <Link className={style.cardTicket} to={`detail/${item.maPhim}`}>
          <button className={style.btnCard}>
            <BookOnlineRoundedIcon
              style={{ transform: "rotateZ(45deg)", fontSize: "16px" }}
            />
            <span>MUA VÉ</span>
          </button>
        </Link>
    </div>
  );
}
