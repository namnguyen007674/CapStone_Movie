import React from "react";
import Button from "@mui/material/Button";
import style from "./DetailSeat.module.scss";
import { useTicketContext } from "../../../contexts/TicketsContext/TicketsContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bookTickets } from "../../../../apis/tickets";
import Loading from "../../../../components/Loading/Loading";
import Swal from "sweetalert2";
export default function DetailSeat({ inforCienma }) {

  const queryClient = useQueryClient()
  // Lấy giá vé và danh sách ghế đang chọn
  const { totalPrice, selectSeats } = useTicketContext();
  // Tạo obj để lấy mã ghế và giá vé mỗi ghế
  const listTickets = selectSeats.map((seat) => ({
    maGhe: seat.maGhe,
    giaVe: seat.giaVe,
  }));
  // Gọi API POST để đặt vé
  const { mutate:handleBookTickets,isLoading } = useMutation({
    mutationFn: () =>
      bookTickets({ maLichChieu: inforCienma.maLichChieu, danhSachVe:listTickets }),
      onSuccess:()=>{
        queryClient.invalidateQueries({queryKey:['tickets']})
        Swal.fire("Đặt vé thành công!", "Chúc mừng bạn!", "success");
      }
  });

  const ticketItems = [
    { label: "Cụm rạp:", value: inforCienma?.tenCumRap },
    { label: "Địa chỉ:", value: inforCienma?.diaChi },
    { label: "Rạp:", value: inforCienma?.tenRap },
    { label: "Ngày chiếu:", value: inforCienma?.ngayChieu },
    { label: "Tên phim:", value: inforCienma?.tenPhim },
  ];
  if(isLoading) {
    <Loading/>
  }
  return (
    <div className={style.detailtickets}>
      <div className={style.detailticketsPrice}>
        <h3>
          {totalPrice.toLocaleString("vi", {
            style: "currency",
            currency: "VND",
          })}
        </h3>
      </div>
      {ticketItems.map((item, index) => (
        <div className={style.detailticketsItem} key={index}>
          <p>{item.label}</p>
          <p>{item.value}</p>
        </div>
      ))}
      <div className={style.detailticketsItem}>
        <p>Chọn:</p>
        <p>
          {selectSeats.map((seat, index) => (
            <span key={index} className={style.detailticketsNumberseat}>
              Ghế: {seat.tenGhe},
            </span>
          ))}
        </p>
      </div>
      <div className={style.detailticketsBtn}>
        <Button
          sx={{ padding: "13px 0", marginTop: "-2px" }}
          fullWidth
          variant="contained"
          color="error"
          onClick={handleBookTickets}
        >
          Đặt vé
        </Button>
      </div>
    </div>
  );
}
