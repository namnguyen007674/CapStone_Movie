import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { getTickets } from "../../apis/tickets";
import { Grid } from "@mui/material";
import SeatList from "./components/SeatList";
import DetailSeat from "./components/DetailSeat";
import style from "./Tickets.module.scss";
import Loading from "../../components/Loading/Loading";
export default function Tickets() {
  const { showtimeId } = useParams();
  const { data:ticketsList = [],isLoading } = useQuery({
    queryKey: ["tickets"],
    queryFn: () => getTickets(showtimeId),
  });
  if(isLoading){
    return <Loading/>
  }
  return (
    <div className={style.tickets}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <SeatList seatList={ticketsList.danhSachGhe} />
          <div className={style.btnList}>
            <div className={style.btnGroup}>
              <button
                className={`${style.btnDisable} ${style.btnItem} `}
              >X</button>
              <p>Đã đặt</p>
            </div>
            <div className={style.btnGroup}>
              <button className={style.btnItem}></button>
              <p>Thường</p>
            </div>
            <div className={style.btnGroup}>
              <button
                className={`${style.btnVip} ${style.btnItem} `}
              ></button>
              <p>Vip</p>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <DetailSeat inforCienma={ticketsList.thongTinPhim} />
        </Grid>
      </Grid>
    </div>
  );
}
