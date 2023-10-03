import React, { useRef, useState } from "react";
import { getBanner } from "../../../../apis/movies";
import { useQuery } from "@tanstack/react-query";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "swiper/scss/navigation";
// import required modules
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import style from "./banner.module.scss";
export default function Banner() {
  const {
    data: banners = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["banners"],
    queryFn: getBanner,
  });
  return (
    <div >
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {banners.map((item) => (
          <SwiperSlide key={item.maBanner}>
            <img  className={style.banner_img} src={item.hinhAnh} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
