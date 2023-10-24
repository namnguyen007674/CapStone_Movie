import { Grid } from "@mui/material";
import React from "react";
import { useUserContext } from "../../../contexts/UserContext/UserContext";
import { useQuery } from "@tanstack/react-query";
import { bookingHistory } from "../../../../apis/user";
import dayjs from "dayjs";
import Loading from "../../../../components/Loading/Loading";
import style from "./BookingHistory.module.scss";

export default function BookingHistory() {
  const { currentUser } = useUserContext();
  const { data:inforUser = {}, isLoading } = useQuery({
    queryKey: ["bookingHistory"],
    queryFn: () => bookingHistory(currentUser.taiKhoan),
  });
  const detailBooking = inforUser?.thongTinDatVe;
  if (isLoading) {
    return <Loading />;
  }
  return (
    <Grid className={style.booking} container spacing={2}>
      {detailBooking?.map((item) => {
        return (
          <Grid key={item.maVe} item xs={12} md={6}>
            <Grid sx={{ padding: "15px" }} container>
              <Grid item xs={12}>
                <h3 className={style.bookingTitle}>
                  Ngày đặt: {dayjs(item.ngayDat).format("DD/MM/YYYY~HH:mm")}
                </h3>
              </Grid>
              <Grid item xs={12}>
                <h3 className={`${style.bookingTitle} ${style.bookingName}`}>
                  Tên Phim: {item.tenPhim}
                </h3>
              </Grid>
              <Grid item xs={12}>
                <h3 className={style.bookingTitle}>
                  Thời lượng: {item.thoiLuongPhim} phút
                </h3>
                <h3 className={style.bookingTitle}>
                  Giá vé:{" "}
                  {item.giaVe.toLocaleString("vi", {
                    style: "currency",
                    currency: "VND",
                  })}
                </h3>
              </Grid>
              <Grid item xs={12}>
                <h3
                  className={`${style.bookingTitle} ${style.bookingCinema} `}
                >
                  Tên rạp: {item.danhSachGhe[0].tenHeThongRap}
                </h3>
              </Grid>
              <Grid item xs={12}>
                <h3 className={style.bookingTitle}>
                  Rạp: {item.danhSachGhe[0].tenCumRap}
                </h3>
                <h3 className={style.bookingTitle}>
                  Ghế:
                  {item.danhSachGhe.map((item,index) => (
                    <span key={index} > {item.tenGhe},</span>
                  ))}
                </h3>
              </Grid>
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
}
