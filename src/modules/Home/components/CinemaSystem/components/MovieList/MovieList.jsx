import React from "react";
import { getMovieInCinema } from "../../../../../../apis/cinema";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import ButtonTime from "../../../../../../components/ButtonTime";
import Loading from "../../../../../../components/Loading/Loading";
import style from "./Movielist.module.scss";

export default function MovieList({ cinemaComplexId, cinemaId }) {
  const { data:showTimeMovie = [],isLoading } = useQuery({
    queryKey: ["movieInSystem", cinemaId],
    queryFn: () => getMovieInCinema(cinemaId),
    enabled: !!cinemaId,
  });

  // Tìm rạp trong hệ thống rạp
  const cinemaComplex = showTimeMovie[0]?.lstCumRap.find(
    (item) => item.maCumRap === cinemaComplexId
  );
if(isLoading) {
  return <Loading/>
}
  return (
    <div className={style.movielist}>
      {cinemaComplex?.danhSachPhim.map((item,index) => (
        <div key={index} className={style.movielistItem}>
          <img src={item.hinhAnh} alt="" />
          <div className={style.movielistTime}>
            <h2 className={style.movielistName}>
              <span className={style.movielistAge}>C18</span>
              {item.tenPhim}
            </h2>
            <div className={style.movielistTicket}>
              {item.lstLichChieuTheoPhim.map((movieTime,index) => (
                <div key={index} className={style.ticketTime}>
                  <Link to={`tickets/${movieTime.maLichChieu}`}>
                    <ButtonTime movieTime={movieTime} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
