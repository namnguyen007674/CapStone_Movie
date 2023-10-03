import React from "react";
import { getMovieInCinema } from "../../../../../../apis/cinema";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import ButtonTime from "./ButtonTime/ButtonTime";
import style from "./movielist.module.scss";

export default function MovieList({ cinemaComplexId, cinemaId }) {
  const { data = [] } = useQuery({
    queryKey: ["movieInSystem", cinemaId],
    queryFn: () => getMovieInCinema(cinemaId),
    enabled: !!cinemaId,
  });

  // Tìm rạp trong hệ thống rạp
  const cinemaComplex = data[0]?.lstCumRap.find(
    (item) => item.maCumRap === cinemaComplexId
  );

  console.log(data);
  return (
    <div className={style.movielist}>
      {cinemaComplex?.danhSachPhim.map((item,index) => (
        <div key={index} className={style.movielist_item}>
          <img src={item.hinhAnh} alt="" />
          <div className={style.movielist_time}>
            <h2 className={style.movielist_name}>
              <span className={style.movielist_age}>C18</span>
              {item.tenPhim}
            </h2>
            <div className={style.movielist_ticket}>
              {item.lstLichChieuTheoPhim.map((movieTime,index) => (
                <div key={index} className={style.ticket_time}>
                  <Link>
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
