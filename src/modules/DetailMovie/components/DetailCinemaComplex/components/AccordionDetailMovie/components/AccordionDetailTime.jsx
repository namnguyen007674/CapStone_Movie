import React from "react";
import ButtonTime from "../../../../../../../components/ButtonTime";
import { Link } from "react-router-dom";
import style from './AccordionDetailTime.module.scss'
export default function AccordionDetailTime({ detailShowTime }) {
  return (
    <div className={style.deatailListTicket}>
      {detailShowTime.map((showTime) => (
        <div key={showTime.maRap} className={style.btnAccordionDetaiTime}>
          <Link  to={`/tickets/${showTime.maLichChieu}`}>
            <ButtonTime movieTime={showTime} />
          </Link>
        </div>
      ))}
    </div>
  );
}
