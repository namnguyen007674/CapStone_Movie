import React from "react";
import TabList from "./components/TabList";
import { useQuery } from "@tanstack/react-query";
import { getMoives } from "../../../../apis/movies";
import style from './movieshowtime.module.scss'



export default function MovieShowTime() {
  const {data = [],isLoading,error} = useQuery({
    queryKey:["movie"],queryFn:getMoives
  })
  return (
    <div id="Xem Phim" className={style.bg_movieShowtime}>
      <TabList data={data}/>
    </div>
  )
}
