import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from "@tanstack/react-query";
import { getBanner } from "../../../../apis/movies";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import style from "./Banner.module.scss";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <ArrowForwardIosIcon
      className={className}
      style={{
        ...style,
        fontSize: "40px",
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
      className={className}
      style={{
        ...style,
        display: "block",
        fontSize: "40px",
        left: "20px",
        color: "#fff",
        zIndex: "9",
      }}
      onClick={onClick}
    />
  );
}

export default function Banner() {
  const { data: banners = [] } = useQuery({
    queryKey: ["banner"],
    queryFn: getBanner,
  });
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
          <img
            key={index}
            className={style.bannerImg}
            src={banner.hinhAnh}
            alt=""
          />
        );
      })}
    </Slider>
  );
}
