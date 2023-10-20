import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { Link, useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { updateMovie, getMovie } from "../../../../../apis/adminMovie";
import style from "./AdminUpdateMovie.module.scss";
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

export default function AdminUpdateMovie() {
  const queryClinet = useQueryClient()
  // Hàm điều hướng 
  const navigate = useNavigate()
  const { movieId } = useParams();
  // Lấy thông tin phim
  const { data = {} } = useQuery({
    queryKey: ["getMovie"],
    queryFn: () => getMovie(movieId),
    enabled: !!movieId,
  });
  // Cập nhật thông tin phim
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
      formData.append("maPhim", movieId);
      return updateMovie(formData);
    },
    onSuccess: () => {
      queryClinet.invalidateQueries({queryKey:['movieList']})
      Swal.fire(
        'Cập nhật thành công!',
        'Chúc mừng bạn!',
        'success'
      )
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
        maPhim: "",
      });
      navigate('/admin/movieList')
    },
  });

  // Form phim
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
      maPhim: "",
    },
    resolver: yupResolver(signupSchema),
    mode: "onTouched",
  });
  // Theo dõi giá trị hình ảnh khi nó bị thay đổi
  const hinhAnh = watch("hinhAnh");

  // Xử lý handleSubmit thành công
  const [imgPreview, setImgPreview] = useState(
    "https://www.hwh-web.at/images/no-image-available.png"
  );

  useEffect(() => {
    if (data) {
      const ngayKhoiChieu = dayjs(data.ngayKhoiChieu).format("YYYY-MM-DD"); // Định dạng ngày tháng theo 'YYYY-MM-DD'
      reset({ ...data, ngayKhoiChieu: ngayKhoiChieu,hinhAnh:"" });
    }
  }, [data]);

  // set State ImgPreview
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
      className={style.adminUpdateMovie}
    >
      <Container maxWidth={"md"}>
        <Grid container spacing={3}>
          {/* Tiêu đề form  */}
          <Grid item xs={12} md={12}>
            <h1 className={style.title}>CẬP NHẬT PHIM</h1>
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
            <Typography sx={{ fontSize: "16px" }}>Ngày Khởi Chiếu</Typography>
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

        {/* Switch  */}
        <div className={style.switchChange}>
          <Controller
            name="hot"
            control={control}
            render={({ field }) => {
              return (
                <FormControlLabel
                  control={
                    <Switch
                      {...field}
                      checked={field.value}
                    />
                  }
                  label="Hot"
                />
              );
            }}
          />
          <Controller
            name="dangChieu"
            control={control}
            render={({ field }) => {
              return (
                <FormControlLabel
                  control={<Switch {...field} checked={field.value} />}
                  label="Đang Chiếu"
                />
              );
            }}
          />
          <Controller
            name="sapChieu"
            control={control}
            render={({ field }) => {
              return (
                <FormControlLabel
                  control={<Switch {...field} checked={field.value} />}
                  label="Sắp Chiếu"
                />
              );
            }}
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
        <div className={style.btnAdminUpdateMovie}>
          <hr
            style={{
              background: "rgb(0 0 0 / 12%)",
              height: "1px",
              border: "none",
              width: "100%",
            }}
          />
          <div className={style.btnUpdateMovie}>
            <Link to="/admin/movieList">
              <Button
                type="submit"
                variant="contained"
                color="error"
                sx={{ marginTop: "20px" }}
              >
                <KeyboardDoubleArrowLeftIcon />
                DANH SÁCH PHIM
              </Button>
            </Link>
            <Button
              type="submit"
              variant="contained"
              color="success"
              sx={{ marginTop: "20px" }}
            >
              CẬP NHẬT
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
