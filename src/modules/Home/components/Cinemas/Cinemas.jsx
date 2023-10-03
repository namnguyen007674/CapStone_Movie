import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getCinemaSystems } from "../../../../apis/cinema";
import CinemaList from "./components/CinemaList";
import style from "./cinema.module.scss";
import MovieList from "./components/MovieList/MovieList";

export default function Cinemas() {
  // State mã cụm rạp chiếu
  const [cinemaComplexId, setcinemaComplexId] = useState("");
  // State mã hệ thống rạp
  const [cinemaId, setCinemaId] = useState("");
  const { data = [] } = useQuery({
    queryKey: ["cinemaSystems"],
    queryFn: getCinemaSystems,
  });

  const handleGetCinemaSystemId = (cinemaId) => {
    setCinemaId(cinemaId);
  };
  useEffect(() => {
    if (data.length > 0) {
      // dispatch(getSystemId(data[0].maHeThongRap))
      setCinemaId(data[0].maHeThongRap);
    }
  }, [data]);
  console.log(cinemaId);
  // Lấy mã cụm rạp chiếu
  const handleGetCinenmaComplexId = (cinemaId) => {
    setcinemaComplexId(cinemaId);
  };
  return (
    <div className={style.spacing_cinema} id="Cụm Rạp">
      <Grid container>
        <Grid item md={1}>
          <div className={style.cinema}>
            {data.map((cinema) => (
              <div
                className={style.cinema_logo}
                key={cinema.maHeThongRap}
                
              >
                <img onClick={() => handleGetCinemaSystemId(cinema.maHeThongRap)} src={cinema.logo} width={30} height={30} alt="" />
              </div>
            ))}
          </div>
        </Grid>
        <Grid item md={5}>
          {cinemaId && (
            <CinemaList
              onGetCinemaComplexId={handleGetCinenmaComplexId}
              cinemaId={cinemaId}
            />
          )}
        </Grid>
        <Grid item md={6}>
          {cinemaId && (
            <MovieList cinemaComplexId={cinemaComplexId} cinemaId={cinemaId} />
          )}
        </Grid>
      </Grid>
    </div>
  );
}
