import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import LocationCinemaDetail from "./components/LocationCinemaDetail";
import AccordionDetailMovie from "./components/AccordionDetailMovie";
import style from "./DetailCinemaComplex.module.scss";
export default function CinemaOfMovie({ detailMovie }) {
  // Danh sách Hệ Thống Rạp Chiếu
  const cinemaSystemList = detailMovie.heThongRapChieu;
  // Đặt State cho danh sách cụm rạp chiếu
  const [listOfCinemaDetail, setlistOfCinemaDetail] = useState([]);

  const handleCinemaComplex = (cinemaComplex) => {
    // Lấy danh sách cụm rạp và set State
    setlistOfCinemaDetail(cinemaComplex);
  };

  useEffect(() => {
    if (cinemaSystemList.length >= 0) {
      setlistOfCinemaDetail(cinemaSystemList[0]?.cumRapChieu || []);
    }
  }, [cinemaSystemList]);
  return (
    <div className={style.spacingDetailCinema}>
      <Typography
        sx={{ color: "white", fontSize: "25px", marginBottom: "20px" }}
      >
        Danh sách rạp
      </Typography>
      <Grid container className={style.bgDetailCinema}>
        <Grid item md={2}>
          <div className={style.detailCinema}>
            {cinemaSystemList?.map((cinema) => (
              <div key={cinema.maHeThongRap} className={style.logo}>
                <img
                  onClick={() => handleCinemaComplex(cinema.cumRapChieu)}
                  src={cinema.logo}
                  width={30}
                  height={30}
                  alt=""
                />
              </div>
            ))}
          </div>
        </Grid>
        <Grid item md={10}>
          {listOfCinemaDetail && (
            <LocationCinemaDetail listOfCinemaDetail={listOfCinemaDetail} />
          )}
        </Grid>
      </Grid>
      {/* Các rạp chiếu  */}
      {cinemaSystemList && (
        <AccordionDetailMovie cinemaSystemList={cinemaSystemList} />
      )}
    </div>
  );
}
