import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "swiper/scss/navigation";
// import required modules
import { Pagination } from "swiper/modules";
import Carditem from "./components/CardItem";
export default function SlideMovie({ data }) {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        style={{
          "--swiper-pagination-bullet-size": "16px",
          "--swiper-pagination-color": "#45ab3c",
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {data.map((item) => (
          <SwiperSlide key={item.maPhim}>
            <Carditem item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
