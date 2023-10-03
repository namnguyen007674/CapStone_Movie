import dayjs from 'dayjs'
import React from 'react'
import style from './buttontime.module.scss'
export default function ButtonTime({movieTime}) {
  const time =dayjs(movieTime.ngayChieuGioChieu).format("DD-MM-YYYY ~ HH:mm")

  return (
    <button className={style.button_ticket}>{time}</button>
  )
}
