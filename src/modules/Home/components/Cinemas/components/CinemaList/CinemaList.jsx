import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getCinemaInSystem } from "../../../../../../apis/cinema";
import style from './cinemalist.module.scss'
import { useEffect } from "react";

export default function CinemaList({onGetCinemaComplexId,cinemaId}) {

  const { data = [] } = useQuery({
    queryKey: ["cinemaInSystem",cinemaId],
    queryFn: () => getCinemaInSystem(cinemaId),
    enabled:!!cinemaId
  });

  useEffect(()=>{
    if(data.length > 0){
      // Truyền id lần đầu cho MovieList
      onGetCinemaComplexId(data[0].maCumRap)
    }
  },[data])


  return (
    <div className={style.location}>
      {data.map((item)=>(
        <div onClick={()=>onGetCinemaComplexId(item.maCumRap)} className={style.location_item} key={item.maCumRap}>
          <h4 className={style.location_name}>{item.tenCumRap}</h4>
          <h5 className={style.location_address}>{item.diaChi}</h5>
        </div>
      ))}
    </div>
  );
}
