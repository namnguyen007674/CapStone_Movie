import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getCinemaInSystem } from "../../../../../../apis/cinema";
import style from './Cinemalist.module.scss'
import { useEffect } from "react";
import Loading from "../../../../../../components/Loading/Loading";

export default function CinemaList({onGetCinemaComplexId,cinemaId}) {

  const { data:cinemaList = [],isLoading } = useQuery({
    queryKey: ["cinemaInSystem",cinemaId],
    queryFn: () => getCinemaInSystem(cinemaId),
    enabled:!!cinemaId
  });

  useEffect(()=>{
    if(cinemaList.length > 0){
      // Truyền id lần đầu cho MovieList
      onGetCinemaComplexId(cinemaList[0].maCumRap)
    }
  },[cinemaList])

if(isLoading) {
  return <Loading/>
}
  return (
    <div className={style.cinemaListLocation}>
      {cinemaList.map((item)=>(
        <div onClick={()=>onGetCinemaComplexId(item.maCumRap)} className={style.locationItem} key={item.maCumRap}>
          <h4 className={style.locationName}>{item.tenCumRap}</h4>
          <h5 className={style.locationAddress}>{item.diaChi}</h5>
        </div>
      ))}
    </div>
  );
}
