import React from "react";
import { Link } from "react-router-dom";
import style from "./card.module.scss";
import BookOnlineRoundedIcon from '@mui/icons-material/BookOnlineRounded';
export default function Carditem({ item }) {
  return (
    <div className={style.card_movie}>
      <Link className={style.card_item}>
        <img src={item.hinhAnh} alt="" />
      </Link>
      <Link className={style.card_item}>
        <span className={style.card_name}>{item.tenPhim}</span>
      </Link>
      <Link className={style.card_ticket}>
        <button className={style.btn_card} >
          <BookOnlineRoundedIcon style={{ transform: 'rotateZ(45deg)',fontSize:"16px" }}/>
          <span>
            MUA VÉ
          </span>
          </button>
      </Link>
    </div>
  );
}
