import React from "react";
import ButtonTime from "../../../../../../../components/ButtonTime";
import { Link } from "react-router-dom";

export default function AccordionDetailTime({ detailShowTime }) {
  return (
    <>
      {detailShowTime.map((showTime) => (
        <Link key={showTime.maRap} to={`/tickets/${showTime.maLichChieu}`}>
        <ButtonTime  movieTime={showTime}/>
        </Link>
      ))}
    </>
  );
}
