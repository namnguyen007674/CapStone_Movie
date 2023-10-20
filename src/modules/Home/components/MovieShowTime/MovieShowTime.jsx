import React from "react";
import TabList from "./components/TabList";
import { useQuery } from "@tanstack/react-query";
import { getMoives } from "../../../../apis/movies";
import Loading from "../../../../components/Loading/Loading";
import style from './MovieShowTime.module.scss'



export default function MovieShowTime() {
  const {data:movieList = [],isLoading} = useQuery({
    queryKey:["movie"],queryFn:getMoives
  })
  if(isLoading) {
    return <Loading/>
  }
  return (
    <section id="Xem Phim" className={style.bgMovieShowtime}>
      <TabList movieList={movieList}/>
    </section>
  )
}
