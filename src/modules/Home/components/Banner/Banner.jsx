import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import cn from 'classnames/bind'
import bannerStyle from "./Banner.module.scss";
const bannerItemStyle = cn.bind(bannerStyle)
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <ArrowForwardIosIcon
      className={bannerItemStyle(className,"arrowItem")}
      style={{
        ...style,
        fontSize: "30px",
        display: "block",
        right: "20px",
        color: "#fff",
      }}
      onClick={onClick}
    />
  );
}
function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <ArrowBackIosIcon
      className={bannerItemStyle(className,"arrowItem")}
      style={{
        ...style,
        display: "block",
        fontSize: "30px",
        left: "20px",
        color: "#fff",
        zIndex: "9",
      }}
      onClick={onClick}
    />
  );
}

export default function Banner() {

  const banners = [
    <img
      src="https://s3img.vcdn.vn/123phim/2021/04/ban-tay-diet-quy-evil-expeller-16177781815781.png"
      alt=""
      className={bannerStyle.bannerImg}
    />,
    <img
      src="https://s3img.vcdn.vn/123phim/2021/04/lat-mat-48h-16177782153424.png"
      alt=""
      className={bannerStyle.bannerImg}
    />,
    <img
      src="https://s3img.vcdn.vn/123phim/2021/04/nguoi-nhan-ban-seobok-16177781610725.png"
      alt=""
      className={bannerStyle.bannerImg}
    />,
  ];
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    autoplay: true,
  };
  return (
    <Slider {...settings}>
      {banners.map((banner, index) => {
        return (
          <div className={bannerStyle.bannerItem}>
            {banner}
          </div>
        );
      })}
    </Slider>
  );
}
