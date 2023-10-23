import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CardItem from "./components/CardItem/CardItem";
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <ArrowForwardIosIcon
      className={className}
      style={{
        ...style,
        fontSize: "40px",
        display: "block",
        right: "-24px",
        color: "#666",
        top: "33%",
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
        left: "-28px",
        top: "34%",
        color: "#666",
        zIndex: "9",
      }}
      onClick={onClick}
    />
  );
}

export default function SlideMovie({ movieList }) {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    dots: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1399.98,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          dots: false,
          infinite:false
        },
      },
      {
        breakpoint: 1204,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          dots: false,
          infinite:false
        },
      },
      {
        breakpoint: 981,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 1,
          infinite:false
        },
      },
      {
        breakpoint: 760,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
          infinite:false
        },
      },
      {
        breakpoint: 524,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite:false
        },
      },
    ],
  };
  return (
    <Slider {...settings}>
      {movieList.map((item, index) => (
        <CardItem key={index} item={item} />
      ))}
    </Slider>
  );
}
