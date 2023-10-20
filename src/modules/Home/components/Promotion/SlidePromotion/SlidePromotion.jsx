import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "swiper/scss/navigation";
// import required modules
import { Pagination } from "swiper/modules";
import style from './Slidepromotion.module.scss'
export default function SlideMovie() {
  const promotion = [
    <img alt=""
      className={style.slideImg}
      src="https://www.bhdstar.vn/wp-content/uploads/2023/08/MUACBLONTANGCBNHO-KA-1920X1080.png"
    />,
    <img  alt=""
    className={style.slideImg}
      src="https://www.bhdstar.vn/wp-content/uploads/2018/03/U22-web-1.png"
    />,
    <img  alt=""
    className={style.slideImg}
      src="https://www.bhdstar.vn/wp-content/uploads/2018/03/Web-HappyDay.png"
    />,
    <img  alt=""
      className={style.slideImg}
      src="https://www.bhdstar.vn/wp-content/uploads/2018/03/Suat-Khuya-Web.jpg"
    />,
  ];
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        style={{
          "--swiper-pagination-bullet-size": "16px",
          "--swiper-pagination-color": "#45ab3c",
        }}
        breakpoints={{
          576: {
            slidesPerView: 1,
            spaceBetween: 30,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          992: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1020: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
          1200: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <ul>
          {promotion.map((item,index)=>(
            <SwiperSlide key={index}>
              <li className={style.slideItem}>
                {item}
              </li>
            </SwiperSlide>
          ))}
        </ul>
      </Swiper>
    </>
  );
}
