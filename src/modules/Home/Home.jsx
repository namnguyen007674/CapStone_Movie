import React from "react";
import Banner from "./components/Banner";
import MovieList from "./components/MovieShowTime";
import Cinemas from "./components/Cinemas/Cinemas";
import { Container } from "@mui/material";
import style from "./home.module.scss"

export default function Home() {
  return (
    <>
      <Banner />
      <MovieList />
      <div className={style.bg_cinemaSystem}>
        <Container>
          <Cinemas/>
        </Container>
      </div>
    </>
  );
}
