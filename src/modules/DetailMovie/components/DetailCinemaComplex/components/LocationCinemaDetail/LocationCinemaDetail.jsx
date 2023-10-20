import { Grid } from "@mui/material";
import React from "react";
import style from "./LocationCinemaDetail.module.scss";
import ButtonTime from "../../../../../../components/ButtonTime";
import { Link } from "react-router-dom";


export default function CinemaListOfDetail({ listOfCinemaDetail }) {
  return (
    <div className={style.locationOfDetailList}>
      {listOfCinemaDetail?.map((cinema, index) => {
        // Tên và địa chỉ cụm rạp
        return (
          <Grid container key={index}>
            <Grid item md={12}>
              <div className={style.itemCinema}>
                <h4 className={style.name}>
                  {cinema.tenCumRap}
                </h4>
                <h5 className={style.address}>
                  {cinema.diaChi}
                </h5>
              </div>
            </Grid>

            {cinema.lichChieuPhim.map((movieTime, index) => {
              // Thời gian chiếu phim

              return (
                <Grid key={index} item md={3}>
                  <div className={style.btnTime}>
                    <Link to={`/tickets/${movieTime.maLichChieu}`}>
                      <ButtonTime movieTime={movieTime} />
                    </Link>
                  </div>
                </Grid>
              );
            })}
          </Grid>
        );
      })}
    </div>
  );
}
