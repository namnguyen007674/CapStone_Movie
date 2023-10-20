import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getCinemaSystems } from "../../../../apis/cinema";
import CinemaList from "./components/CinemaList";
import MovieList from "./components/MovieList/MovieList";
import Loading from "../../../../components/Loading/Loading";
import AccordionCinemaSystem from "./components/AccordionCinemaSystem/AccordionCinemaSystem";
import style from "./CinemaSystem.module.scss";

export default function CinemaSystem() {
  // State mã cụm rạp chiếu
  const [cinemaComplexId, setcinemaComplexId] = useState("");
  // State mã hệ thống rạp
  const [cinemaId, setCinemaId] = useState("");
  const { data: cinemaSystem = [], isLoading } = useQuery({
    queryKey: ["cinemaSystems"],
    queryFn: getCinemaSystems,
  });

  const handleGetCinemaSystemId = (cinemaId) => {
    setCinemaId(cinemaId);
  };

  useEffect(() => {
    if (cinemaSystem.length > 0) {
      setCinemaId(cinemaSystem[0].maHeThongRap);
    }
  }, [cinemaSystem]);
  // Lấy mã cụm rạp chiếu
  const handleGetCinenmaComplexId = (cinemaId) => {
    setcinemaComplexId(cinemaId);
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <section className={style.bgCinemaSystem}>
      <Container className={style.spacingCinema}>
        <div className={style.cinemaSystemList} id="Cụm Rạp">
          <Grid container>
            <Grid item md={1}>
              <div className={style.cinema}>
                {cinemaSystem.map((cinema) => (
                  <div className={style.cinemaLogo} key={cinema.maHeThongRap}>
                    <img
                      onClick={() =>
                        handleGetCinemaSystemId(cinema.maHeThongRap)
                      }
                      src={cinema.logo}
                      width={30}
                      height={30}
                      alt=""
                    />
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
                <MovieList
                  cinemaComplexId={cinemaComplexId}
                  cinemaId={cinemaId}
                />
              )}
            </Grid>
          </Grid>
        </div>

        {/* reponsvie cinema  */}
        <AccordionCinemaSystem cinemaSystem={cinemaSystem} />
      </Container>
    </section>
  );
}
