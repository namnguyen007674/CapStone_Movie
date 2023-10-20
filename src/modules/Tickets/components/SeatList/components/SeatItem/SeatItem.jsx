import React from "react";
import seatItem from "./SeatItem.module.scss";
import cn from "classnames/bind";

const seatItemStyle = cn.bind(seatItem);

export default function SeatItem({ seat, handleSelected, isSelected }) {

  return (
    <button
      onClick={() => handleSelected({ ...seat, isSelected: !isSelected })}
      className={seatItemStyle(
        "seatTicket",
        { seatIsBooked: seat.daDat },

        seat.daDat ? "" : seat.loaiGhe === "Vip" ? "seatVip" : "",
        seat.daDat ? "" : isSelected ? "seatIsSelected" : ""
      )}
      disabled={seat.daDat}
    >
      {seat.daDat ? "X" : `${seat.tenGhe}`}
    </button>
  );
}
