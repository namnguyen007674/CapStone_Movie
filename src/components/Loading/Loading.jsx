import React from 'react'
import style from './Loading.module.scss'
export default function Loading() {
  return (
    <div className={style.loading}>
      <img src="/img/loadingsmall.gif" alt="" />
    </div>
  )
}
