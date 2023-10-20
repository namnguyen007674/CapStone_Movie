import React from "react";
import ProfileMovie from "./components/ProfileMovie";
import DetailCinemaComplex from "./components/DetailCinemaComplex";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMovieDetail } from "../../apis/movies";
import { Container } from "@mui/material";
import Loading from "../../components/Loading/Loading";
import style from "./Detailmovie.module.scss";

export default function DetailMovie() {
  const { movieId } = useParams();
  const {
    data:detailMovie = {},
    isLoading,
  } = useQuery({
    queryKey: ["getMovieDetail"],
    queryFn: () => getMovieDetail(movieId),
    enabled: !!movieId,
  });
  if(isLoading){
    return <Loading/>
  }
  // Lấy danh sách chi tiết phim
  return (
    <div className={style.bgDetailmovie}>
      <Container>
        <ProfileMovie detailMovie={detailMovie} />
        <DetailCinemaComplex detailMovie={detailMovie} />
      </Container>
    </div>
  );
}
