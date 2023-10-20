import React from "react";
import style from "./SeatList.module.scss";
import SeatItem from "./components/SeatItem";
import { useTicketContext } from "../../../contexts/TicketsContext/TicketsContext";
import { Container } from "@mui/material";



export default function SeatsList({ seatList }) {
  const { selectSeats, handleSelected } = useTicketContext();

  return (
    <div className={style.seatlist}>
      <Container maxWidth={'md'} >
      <h6 className={style.screen}>MÀN HÌNH</h6>
      <div className={style.seatlistContent}>
      {seatList?.map((seat ) => {
        const isSelected = selectSeats.find(
          (item) => item.maGhe === seat.maGhe
        );
        return (
              <SeatItem
                handleSelected={handleSelected}
                isSelected={isSelected}
                key={seat.maGhe}
                seat={seat}
              />
        );
      })}

      </div>
      </Container>
    </div>
  );
}
