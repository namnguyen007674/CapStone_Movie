import React from "react";
import { Grid, Rating } from "@mui/material";
import dayjs from "dayjs";
import ModalPlay from "./components/ModalPlay";
import style from "./Profilemovie.module.scss";
import { Link } from "react-router-dom";
export default function ProfileMovie({ detailMovie }) {
  const time = dayjs(detailMovie.ngayKhoiChieu).format("DD/MM/YYYY");

  return (
    <div className={style.profile}>
      <div className={style.title}>
        <Link to="/">
          <h3 className={style.homeActive}>Trang chủ</h3>
        </Link>
        <h3>{`| ${detailMovie.tenPhim}`}</h3>
      </div>
      <div className={style.profileContent}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <div className={style.profileImg}>
              <img src={detailMovie.hinhAnh} alt="" />
              <div className={style.profileOverlay}>
                <span className={style.btnPlay}>
                  <ModalPlay trailer={detailMovie.trailer} />
                </span>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={8}>
            <div className={style.profileItem}>
              <div className={style.profileName}>
                <h3>{detailMovie.tenPhim}</h3>
              </div>
              <div className={style.profileDesc}>
                <p>{detailMovie.moTa}</p>
              </div>
              <div className={style.movieInfo}>
                <ul>
                  <li>
                    <span>Khởi Chiếu:</span>
                    <span className={style.dateShow}>{time}</span>
                  </li>
                  <li>
                    <span>Đánh giá:</span>
                    <span className={style.rate}>
                      <Rating
                        name="read-only"
                        value={detailMovie.danhGia / 2}
                        readOnly
                      />
                    </span>
                  </li>
                </ul>
              </div>
              <div className={style.btnDetail}>
                <ModalPlay trailer={detailMovie.trailer}>
                  <span className={`${style.btnItem} ${style.btnTrailer}`}>
                    XEM TRAILER
                  </span>
                </ModalPlay>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
