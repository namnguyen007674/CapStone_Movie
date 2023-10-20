import React from "react";
import Banner from "./components/Banner";
import MovieList from "./components/MovieShowTime";
import CinemaSystem from "./components/CinemaSystem";
import Member from "./components/Member";
import Promotion from "./components/Promotion/Promotion";

export default function Home() {
  return (
    <main>
      <Banner />
      <MovieList />
      <CinemaSystem />
      <Member />
      <Promotion />
    </main>
  );
}
