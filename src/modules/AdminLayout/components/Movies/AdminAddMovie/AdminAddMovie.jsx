import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Box,
  Container,
  Grid,
  TextField,
  Switch,
  FormControlLabel,
  Typography,
  Alert,
  AlertTitle,
} from "@mui/material";
import dayjs from "dayjs";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { addMovie } from "../../../../../apis/adminMovie";
import { Link, useNavigate } from "react-router-dom";
import style from "./AdminAddMovie.module.scss";
import Swal from "sweetalert2";

const signupSchema = object({
  tenPhim: string().required("Tên phim không được để trống"),
  trailer: string()
    .required("Trailer không được để trống")
    .url("Trailer không đúng định dạng"),
  moTa: string().required("Mô tả không được để trống"),
  ngayKhoiChieu: string().required("Ngày khởi chiếu không được để trống"),
  danhGia: string()
    .required("Đánh giá không được để trống")
    .matches("^(10|[0-9])$", "Phải là số từ 0 đến 10"),
});

export default function AdminAddMovie() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  // Form thông tin phim
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    reset,
  } = useForm({
    defaultValues: {
      tenPhim: "",
      trailer: "",
      moTa: "",
      maNhom: "",
      ngayKhoiChieu: "",
      dangChieu: false,
      sapChieu: false,
      hot: false,
      danhGia: "",
      hinhAnh: "",
    },
    resolver: yupResolver(signupSchema),
    mode: "onTouched",
  });
  // API xử lý thêm phim
  const { mutate: onSubmit,error } = useMutation({
    mutationFn: (value) => {
      const formData = new FormData();
      formData.append("tenPhim", value.tenPhim);
      formData.append("trailer", value.trailer);
      formData.append("moTa", value.moTa);
      formData.append("maNhom", "GP03");
      formData.append("ngayKhoiChieu", value.ngayKhoiChieu);
      formData.append("dangChieu", value.dangChieu);
      formData.append("sapChieu", value.sapChieu);
      formData.append("hot", value.hot);
      formData.append("danhGia", value.danhGia);
      formData.append("hinhAnh", value.hinhAnh[0]);
      return addMovie(formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movieList"] });
      Swal.fire(
        'Thêm thành công!',
        'Chúc mừng bạn!',
        'success'
      )
      // reset giá trị của form thông tin phim
      reset({
        tenPhim: "",
        trailer: "",
        moTa: "",
        maNhom: "",
        ngayKhoiChieu: "",
        dangChieu: false,
        sapChieu: false,
        hot: false,
        danhGia: "",
        hinhAnh: "",
      });
      // Điều hướng về danh sách phim
      navigate("/admin/movieList");
    },
  });
  const hinhAnh = watch("hinhAnh");
  const [imgPreview, setImgPreview] = useState(
    "https://www.hwh-web.at/images/no-image-available.png"
  );
  // Set lại state cho ImgPreview
  useEffect(() => {
    const file = hinhAnh[0];
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (e) => {
      setImgPreview(e.target.result);
    };
  }, [hinhAnh]);
  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        "& > :not(style)": { m: 1, minWidth: "300px" },
        gap: "1",
      }}
      noValidate
      autoComplete="off"
      className={style.adminAddMovie}
    >
      <Container maxWidth={"md"}>
        <Grid container spacing={3}>
          {/* Tiêu đề form  */}
          <Grid item xs={12} md={12}>
            <h1 className={style.title}>THÊM PHIM MỚI</h1>
            <hr
              style={{
                background: "rgb(0 0 0 / 12%)",
                height: "1px",
                border: "none",
                marginTop: "20px",
              }}
            />
          </Grid>
          {/* Tên Phim */}
          <Grid item xs={6} md={6}>
            <Controller
              name="tenPhim"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  error={!!errors.tenPhim}
                  helperText={errors.tenPhim?.message}
                  id="tenPhim"
                  label="Tên Phim"
                  variant="outlined"
                />
              )}
            />
          </Grid>

          {/* Trailer */}
          <Grid item xs={6} md={6}>
            <Controller
              name="trailer"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  error={!!errors.trailer}
                  helperText={errors.trailer?.message}
                  id="trailer"
                  label="Trailer"
                  variant="outlined"
                />
              )}
            />
          </Grid>

          {/* Mô tả  */}
          <Grid item xs={12} md={12}>
            <Controller
              control={control}
              name="moTa"
              render={({ field }) => (
                <TextField
                  multiline
                  rows={4}
                  fullWidth
                  {...field}
                  error={!!errors.moTa}
                  helperText={errors.moTa?.message}
                  id="moTa"
                  label="Mô Tả"
                  variant="outlined"
                />
              )}
            />
          </Grid>

          {/* Ngày Khởi Chiếu */}
          <Grid item xs={6} md={6}>
            <Typography>Ngày Khởi Chiếu</Typography>
            <TextField
              type="date"
              {...register("ngayKhoiChieu", {
                setValueAs: (value) => {
                  return dayjs(value).format("DD/MM/YYYY");
                },
              })}
              sx={{ marginTop: "10px" }}
              error={!!errors.ngayKhoiChieu}
              helperText={errors.ngayKhoiChieu?.message}
            />
          </Grid>
        </Grid>
        <div className={style.switchChange}>
          <FormControlLabel
            control={<Switch {...register("hot")} />}
            label="Hot"
          />
          <FormControlLabel
            control={<Switch {...register("dangChieu")} />}
            label="Đang Chiếu"
          />
          <FormControlLabel
            control={<Switch {...register("sapChieu")} />}
            label="Sắp Chiếu"
          />
        </div>
        {/* Đánh giá  */}
        <div className={style.rating}>
          <Controller
            name="danhGia"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                sx={{ marginTop: "10px" }}
                id="danhGia"
                label="Số Sao"
                variant="outlined"
                error={!!errors.danhGia}
                helperText={errors.danhGia?.message}
              />
            )}
          />
        </div>
        {/* File  */}
        <div className={style.inputFile}>
          <TextField
            type="file"
            {...register("hinhAnh")}
            error={!!errors.danhGia}
            helperText={errors.hinhAnh?.message}
          />
          <img className={style.imgFile} src={imgPreview} alt="" />
        </div>
        <div className={style.adminAddMovieBtn}>
          <hr
            style={{
              background: "rgb(0 0 0 / 12%)",
              height: "1px",
              border: "none",
              marginTop: "30px",
              width: "100%",
            }}
          />
          <div className={style.btnAddMovie}>
            <Link to="/admin/movieList">
              <Button
                type="submit"
                variant="contained"
                color="error"
                sx={{ marginTop: "20px" }}
              >
                <KeyboardDoubleArrowLeftIcon/>
                DANH SÁCH PHIM
              </Button>
            </Link>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ marginTop: "20px" }}
            >
              THÊM PHIM
            </Button>
          </div>
        </div>
        {error && (
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                {error} — <strong>Hãy kiểm tra lại!</strong>
              </Alert>
            )}
      </Container>
    </Box>
  );
}
